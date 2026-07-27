# Task Specification: T005 — Research Boto3 API Patterns

**Source**: `tasks.md` — cloud-abstraction
**Classification**: `[API]`
**Created**: 2026-07-24

## Operational Classification

| Tag | Applies |
|-----|---------|
| `[DATABASE]` | No |
| `[SECURITY-CRITICAL]` | No |
| `[API]` | Yes |
| `[MIGRATION]` | No |
| `[UI]` | No |
| `[INFRASTRUCTURE]` | No |

## Prerequisites Before Starting

- [ ] Load `spec.md` and review all user stories to understand what services need interfaces
- [ ] Confirm Python 3.x and `boto3` are available for research

## Dependencies

- **Blocked by**: T004 (dev tooling — for reference only)
- **Blocks**: T011 (storage interface), T022 (secrets interface), T028 (cache interface), T036 (pubsub interface), T047 (KMS interface), T055 (NoSQL interface)

---

## Execution Directives

### Before

1. Read `spec.md` — understand the service categories and their scope
2. Read `data-model.md` — understand the current assumed interfaces (to validate against real SDKs)

### During

1. Install `boto3` and examine the following service APIs — focus on method signatures, parameter types, and return types:

   **S3 (boto3.client('s3')):**
   - `put_object(Bucket, Key, Body, ContentType, Metadata, CacheControl)` → `PutObjectOutput`
   - `get_object(Bucket, Key)` → `GetObjectOutput` (note: returns StreamingBody)
   - `list_objects_v2(Bucket, Prefix, MaxKeys, StartAfter)` → `ListObjectsV2Output`
   - `delete_object(Bucket, Key)` → `DeleteObjectOutput`
   - `head_object(Bucket, Key)` → `HeadObjectOutput` (equivalent to exists)

   **Secrets Manager (boto3.client('secretsmanager')):**
   - `get_secret_value(SecretId)` → `GetSecretValueResponse`
   - `create_secret(Name, SecretString, Description, Tags)` → `CreateSecretResponse`
   - `update_secret(SecretId, SecretString)` → `UpdateSecretResponse`
   - `delete_secret(SecretId, RecoveryWindowInDays, ForceDeleteWithoutRecovery)` → `DeleteSecretResponse`
   - `list_secrets(MaxResults, NextToken)` → `ListSecretsResponse`

   **KMS (boto3.client('kms')):**
   - `encrypt(KeyId, Plaintext, EncryptionContext)` → `EncryptResponse`
   - `decrypt(CiphertextBlob, EncryptionContext)` → `DecryptResponse`
   - `create_key(Description, Tags)` → `CreateKeyResponse`
   - `schedule_key_deletion(KeyId, PendingWindowInDays)` → `ScheduleKeyDeletionResponse`

   **SNS (boto3.client('sns')):**
   - `publish(TopicArn, Message, MessageAttributes)` → `PublishResponse`

   **SQS (boto3.client('sqs')):**
   - `send_message(QueueUrl, MessageBody, MessageAttributes, MessageGroupId)` → `SendMessageResponse`
   - `receive_message(QueueUrl, MaxNumberOfMessages, VisibilityTimeout)` → `ReceiveMessageResponse`
   - `delete_message(QueueUrl, ReceiptHandle)` → `DeleteMessageResponse`

   **DynamoDB (boto3.client('dynamodb')):**
   - `put_item(TableName, Item)` → `PutItemOutput`
   - `get_item(TableName, Key)` → `GetItemOutput`
   - `update_item(TableName, Key, UpdateExpression, ExpressionAttributeValues)` → `UpdateItemOutput`
   - `delete_item(TableName, Key)` → `DeleteItemOutput`
   - `query(TableName, KeyConditionExpression, ExpressionAttributeValues, FilterExpression, Limit)` → `QueryOutput`

   **ElastiCache / Redis (boto3.client('elasticache')):**
   - Note: ElastiCache management is infra-level. The cache abstraction should use Redis protocol directly via `ioredis`, not the AWS ElastiCache management API.

2. Document all method signatures with exact parameter names, types, and return types
3. Identify common patterns across SDKs:
   - How does each SDK handle pagination?
   - How does each SDK handle streaming/large payloads?
   - What error types does each SDK throw?
   - What credential/auth patterns do they use?
4. Compare with the current `data-model.md` interfaces and flag any mismatches

### After

1. Log findings in a decision record at `.specify/decisions/boto3-research.md`
2. Flag any interface assumptions in `data-model.md` that conflict with real SDK contracts
3. Update `data-model.md` if significant discrepancies found

---

## Definition of Done

- [ ] All 7 Boto3 service APIs examined and documented
- [ ] Common patterns (pagination, streaming, errors, auth) identified
- [ ] Discrepancies between current data model and real SDKs documented
- [ ] Decision record written to `.specify/decisions/boto3-research.md`
