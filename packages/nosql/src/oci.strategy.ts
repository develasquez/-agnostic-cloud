import type { NoSqlConfig } from './config.js'
import { NotImplementedError } from './errors.js'
import type { NoSqlStrategy, Document, QueryFilter, QueryOptions, QueryResult } from './interface.js'

export class OciNoSqlStrategy implements NoSqlStrategy {
  constructor(_config: NoSqlConfig) {
    // Constructor allowed but methods throw NotImplementedError
  }

  async putItem(_collection: string, _id: string, _item: Document): Promise<void> {
    throw new NotImplementedError('NoSQL is not supported on OCI strategy')
  }

  async getItem(_collection: string, _id: string): Promise<Document | null> {
    throw new NotImplementedError('NoSQL is not supported on OCI strategy')
  }

  async updateItem(_collection: string, _id: string, _changes: Partial<Document>): Promise<Document> {
    throw new NotImplementedError('NoSQL is not supported on OCI strategy')
  }

  async deleteItem(_collection: string, _id: string): Promise<void> {
    throw new NotImplementedError('NoSQL is not supported on OCI strategy')
  }

  async query(_collection: string, _filter: QueryFilter, _options?: QueryOptions): Promise<QueryResult> {
    throw new NotImplementedError('NoSQL is not supported on OCI strategy')
  }
}
