import { Firestore } from '@google-cloud/firestore'
import type { NoSqlConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { NoSqlStrategy, Document, QueryFilter, QueryOptions, QueryResult } from './interface.js'

export class FirestoreStrategy implements NoSqlStrategy {
  private db: Firestore
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: NoSqlConfig) {
    resolveCloud(config, 'firestore')
    this.db = new Firestore(config.config)
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  async putItem(collection: string, id: string, item: Document): Promise<void> {
    await this.retry(() => this.db.collection(collection).doc(id).set(item))
  }

  async getItem(collection: string, id: string): Promise<Document | null> {
    const doc = await this.retry(() => this.db.collection(collection).doc(id).get())
    if (!doc.exists) return null
    return { id: doc.id, ...doc.data() }
  }

  async updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document> {
    await this.retry(() => this.db.collection(collection).doc(id).update(changes))
    const doc = await this.retry(() => this.db.collection(collection).doc(id).get())
    return { id: doc.id, ...doc.data() }
  }

  async deleteItem(collection: string, id: string): Promise<void> {
    await this.retry(() => this.db.collection(collection).doc(id).delete())
  }

  async query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult> {
    let query: FirebaseFirestore.Query = this.db.collection(collection)

    for (const [field, ops] of Object.entries(filter)) {
      for (const [op, val] of Object.entries(ops)) {
        const operator = firestoreOperatorMap[op]
        if (operator) {
          query = query.where(field, operator, val)
        }
      }
    }

    if (options?.orderBy) {
      query = query.orderBy(options.orderBy.field, options.orderBy.direction)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.offset(options.offset)
    }

    if (options?.select) {
      query = query.select(...options.select)
    }

    const snapshot = await this.retry(() => query.get())
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))

    return { items, count: items.length }
  }
}

const firestoreOperatorMap: Record<string, FirebaseFirestore.WhereFilterOp> = {
  $eq: '==',
  $ne: '!=',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
  $in: 'in',
}
