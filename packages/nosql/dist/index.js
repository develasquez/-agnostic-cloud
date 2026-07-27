// src/errors.ts
var CloudError = class extends Error {
  constructor(message, cloud, service, operation) {
    super(message);
    this.cloud = cloud;
    this.service = service;
    this.operation = operation;
    this.name = this.constructor.name;
  }
  cloud;
  service;
  operation;
};
var CloudNotConfiguredError = class extends CloudError {
  constructor(cloud, service) {
    super(`Cloud not configured: ${cloud}`, cloud, service, "init");
  }
};
var InvalidCloudError = class extends CloudError {
  constructor(cloud, service) {
    super(`Invalid cloud provider: ${cloud}. Must be 'aws', 'gcp', or 'azure'`, cloud, service, "init");
  }
};
var AuthError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message ?? `Authentication failed for ${service}`, cloud, service, operation);
  }
};
var TimeoutError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation timed out: ${operation}`, cloud, service, operation);
  }
};
var ValidationError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message, cloud, service, operation);
  }
};
var NotImplementedError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation not implemented for ${cloud} ${service}: ${operation}`, cloud, service, operation);
  }
};

// src/resolver.ts
function resolveCloud(config, service) {
  if (config.cloud) {
    if (config.cloud !== "aws" && config.cloud !== "gcp" && config.cloud !== "azure") {
      throw new InvalidCloudError(config.cloud, service);
    }
    return config.cloud;
  }
  const env = process.env["CLOUD_PROVIDER"]?.toLowerCase();
  if (env === "aws" || env === "gcp" || env === "azure") {
    return env;
  }
  throw new CloudNotConfiguredError(config.cloud ?? "undefined", service);
}

// src/dynamodb.strategy.ts
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  QueryCommand,
  ScanCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// src/retry.ts
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 100;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * baseDelayMs;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// src/dynamodb.strategy.ts
var DynamoDbStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "dynamodb");
    this.client = new DynamoDBClient({ region: config.region ?? "us-east-1", ...config.config });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  async putItem(collection, id, item) {
    await withRetry(() => this.client.send(new PutItemCommand({
      TableName: collection,
      Item: marshall({ id, ...item })
    })), this.retryConfig);
  }
  async getItem(collection, id) {
    const result = await withRetry(() => this.client.send(new GetItemCommand({
      TableName: collection,
      Key: marshall({ id })
    })), this.retryConfig);
    if (!result.Item) return null;
    return unmarshall(result.Item);
  }
  async updateItem(collection, id, changes) {
    const updateExpression = Object.keys(changes).map((key) => `#${key} = :${key}`).join(", ");
    const expressionAttributeNames = Object.keys(changes).reduce(
      (acc, key) => ({ ...acc, [`#${key}`]: key }),
      {}
    );
    const expressionAttributeValues = marshall(
      Object.entries(changes).reduce(
        (acc, [key, value]) => ({ ...acc, [`:${key}`]: value }),
        {}
      )
    );
    const result = await withRetry(() => this.client.send(new UpdateItemCommand({
      TableName: collection,
      Key: marshall({ id }),
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW"
    })), this.retryConfig);
    return unmarshall(result.Attributes);
  }
  async deleteItem(collection, id) {
    await withRetry(() => this.client.send(new DeleteItemCommand({
      TableName: collection,
      Key: marshall({ id })
    })), this.retryConfig);
  }
  async query(collection, filter, options) {
    const hasKeyFilter = Object.keys(filter).some((f) => f === "id");
    if (hasKeyFilter) {
      const expressions2 = buildQueryExpressions(filter);
      const result2 = await withRetry(() => this.client.send(new QueryCommand({
        TableName: collection,
        KeyConditionExpression: expressions2.condition,
        FilterExpression: expressions2.filter,
        ExpressionAttributeNames: expressions2.names,
        ExpressionAttributeValues: marshall(expressions2.values),
        Limit: options?.limit
      })), this.retryConfig);
      return {
        items: (result2.Items ?? []).map((i) => unmarshall(i)),
        count: result2.Count ?? 0,
        nextToken: result2.LastEvaluatedKey?.["id"]?.S
      };
    }
    const expressions = buildQueryExpressions(filter);
    const result = await withRetry(() => this.client.send(new ScanCommand({
      TableName: collection,
      FilterExpression: expressions.filter ?? expressions.condition,
      ExpressionAttributeNames: expressions.names,
      ExpressionAttributeValues: marshall(expressions.values),
      Limit: options?.limit
    })), this.retryConfig);
    return {
      items: (result.Items ?? []).map((i) => unmarshall(i)),
      count: result.Count ?? 0,
      nextToken: result.LastEvaluatedKey?.["id"]?.S
    };
  }
};
function buildQueryExpressions(filter) {
  const names = {};
  const values = {};
  const conditions = [];
  const filters = [];
  for (const [field, ops] of Object.entries(filter)) {
    names[`#${field}`] = field;
    for (const [op, val] of Object.entries(ops)) {
      const sanitizedOp = op.replace(/\$/g, "");
      const valueKey = `:${field}_${sanitizedOp}`;
      values[valueKey] = val;
      const expr = `#${field} ${operatorMap[op] ?? "="} ${valueKey}`;
      if (op === "$eq" || op === "$gt" || op === "$gte") {
        conditions.push(expr);
      } else {
        filters.push(expr);
      }
    }
  }
  return {
    condition: conditions.length > 0 ? conditions.join(" AND ") : void 0,
    filter: filters.length > 0 ? filters.join(" AND ") : void 0,
    names,
    values
  };
}
var operatorMap = {
  $eq: "=",
  $ne: "<>",
  $gt: ">",
  $gte: ">=",
  $lt: "<",
  $lte: "<=",
  $in: "IN",
  $contains: "CONTAINS",
  $exists: "attribute_exists"
};

// src/firestore.strategy.ts
import { Firestore } from "@google-cloud/firestore";
var FirestoreStrategy = class {
  db;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "firestore");
    this.db = new Firestore(config.config);
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  async putItem(collection, id, item) {
    await this.retry(() => this.db.collection(collection).doc(id).set(item));
  }
  async getItem(collection, id) {
    const doc = await this.retry(() => this.db.collection(collection).doc(id).get());
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }
  async updateItem(collection, id, changes) {
    await this.retry(() => this.db.collection(collection).doc(id).update(changes));
    const doc = await this.retry(() => this.db.collection(collection).doc(id).get());
    return { id: doc.id, ...doc.data() };
  }
  async deleteItem(collection, id) {
    await this.retry(() => this.db.collection(collection).doc(id).delete());
  }
  async query(collection, filter, options) {
    let query = this.db.collection(collection);
    for (const [field, ops] of Object.entries(filter)) {
      for (const [op, val] of Object.entries(ops)) {
        const operator = firestoreOperatorMap[op];
        if (operator) {
          query = query.where(field, operator, val);
        }
      }
    }
    if (options?.orderBy) {
      query = query.orderBy(options.orderBy.field, options.orderBy.direction);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.offset(options.offset);
    }
    if (options?.select) {
      query = query.select(...options.select);
    }
    const snapshot = await this.retry(() => query.get());
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { items, count: items.length };
  }
};
var firestoreOperatorMap = {
  $eq: "==",
  $ne: "!=",
  $gt: ">",
  $gte: ">=",
  $lt: "<",
  $lte: "<=",
  $in: "in"
};

// src/cosmos.strategy.ts
import { CosmosClient } from "@azure/cosmos";
var CosmosDbStrategy = class {
  client;
  databaseId;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "cosmosdb");
    const connectionString = config.config?.["connectionString"];
    const endpoint = config.config?.["endpoint"];
    const key = config.config?.["key"];
    this.client = connectionString ? new CosmosClient(connectionString) : new CosmosClient({ endpoint, key });
    this.databaseId = config.config?.["databaseId"] ?? "agnostic-cloud";
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  createdContainers = /* @__PURE__ */ new Set();
  async ensureContainer(collection) {
    if (this.createdContainers.has(collection)) return;
    const db = this.client.database(this.databaseId);
    try {
      await db.containers.createIfNotExists({ id: collection, partitionKey: "/id" });
    } catch {
    }
    this.createdContainers.add(collection);
  }
  container(collection) {
    return this.client.database(this.databaseId).container(collection);
  }
  async putItem(collection, id, item) {
    await this.ensureContainer(collection);
    await this.retry(() => this.container(collection).items.create({ id, ...item }));
  }
  async getItem(collection, id) {
    try {
      const { resource } = await this.retry(() => this.container(collection).item(id, id).read());
      return resource ?? null;
    } catch {
      return null;
    }
  }
  async updateItem(collection, id, changes) {
    const existing = await this.getItem(collection, id);
    const updated = { ...existing, ...changes };
    const { resource } = await this.retry(() => this.container(collection).item(id, id).replace(updated));
    return resource;
  }
  async deleteItem(collection, id) {
    await this.retry(() => this.container(collection).item(id, id).delete());
  }
  async query(collection, filter, options) {
    const conditions = buildCondition(filter);
    const queryStr = conditions.length > 0 ? `SELECT * FROM c WHERE ${conditions.join(" AND ")}` : "SELECT * FROM c";
    const { resources } = await this.retry(() => this.container(collection).items.query({
      query: queryStr
    }, {
      maxItemCount: options?.limit
    }).fetchAll());
    return {
      items: resources ?? [],
      count: resources?.length ?? 0
    };
  }
};
function buildCondition(filter) {
  const conditions = [];
  for (const [field, ops] of Object.entries(filter)) {
    for (const [op, val] of Object.entries(ops)) {
      const mappedOp = cosmosOperatorMap[op] ?? "=";
      const stringVal = typeof val === "string" ? `'${val}'` : String(val);
      conditions.push(`c.${field} ${mappedOp} ${stringVal}`);
    }
  }
  return conditions;
}
var cosmosOperatorMap = {
  $eq: "=",
  $ne: "!=",
  $gt: ">",
  $gte: ">=",
  $lt: "<",
  $lte: "<="
};

// src/index.ts
var strategyRegistry = {
  aws: DynamoDbStrategy,
  gcp: FirestoreStrategy,
  azure: CosmosDbStrategy
};
function createNoSql(config) {
  const cloud = resolveCloud(config, "nosql");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "nosql");
  return new Strategy(config);
}
export {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  TimeoutError,
  ValidationError,
  createNoSql
};
//# sourceMappingURL=index.js.map