export type Document = Record<string, any>

export interface FilterOperator {
  $eq?: any
  $ne?: any
  $gt?: number | string | Date
  $gte?: number | string | Date
  $lt?: number | string | Date
  $lte?: number | string | Date
  $in?: any[]
  $contains?: string
  $exists?: boolean
}

export interface QueryFilter {
  [field: string]: FilterOperator
}

export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: { field: string; direction: 'asc' | 'desc' }
  select?: string[]
}

export interface QueryResult {
  items: Document[]
  count: number
  nextToken?: string
}

export interface NoSqlStrategy {
  putItem(collection: string, id: string, item: Document): Promise<void>
  getItem(collection: string, id: string): Promise<Document | null>
  updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document>
  deleteItem(collection: string, id: string): Promise<void>
  query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult>
}
