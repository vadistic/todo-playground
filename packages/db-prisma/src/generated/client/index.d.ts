import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: 76857c35ba1e1764dd5473656ecbbb2f739e1822
 * Prisma Client JS version: 2.0.0-beta.2
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tasks
 * const tasks = await prisma.task.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tasks
   * const tasks = await prisma.task.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): TaskDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model Task
 */

export type Task = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  content: string | null
  finished: boolean
}

export type TaskSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  content?: boolean
  finished?: boolean
}

export type TaskGetPayload<
  S extends boolean | null | undefined | TaskArgs,
  U = keyof S
> = S extends true
  ? Task
  : S extends undefined
  ? never
  : S extends FindManyTaskArgs
  ? 'include' extends U
    ? Task 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Task ? Task[P]
: 
 never
    }
  : Task
: Task


export interface TaskDelegate {
  /**
   * Find zero or one Task.
   * @param {FindOneTaskArgs} args - Arguments to find a Task
   * @example
   * // Get one Task
   * const task = await prisma.task.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTaskArgs>(
    args: Subset<T, FindOneTaskArgs>
  ): CheckSelect<T, TaskClient<Task | null>, TaskClient<TaskGetPayload<T> | null>>
  /**
   * Find zero or more Tasks.
   * @param {FindManyTaskArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tasks
   * const tasks = await prisma.task.findMany()
   * 
   * // Get first 10 Tasks
   * const tasks = await prisma.task.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTaskArgs>(
    args?: Subset<T, FindManyTaskArgs>
  ): CheckSelect<T, Promise<Array<Task>>, Promise<Array<TaskGetPayload<T>>>>
  /**
   * Create a Task.
   * @param {TaskCreateArgs} args - Arguments to create a Task.
   * @example
   * // Create one Task
   * const user = await prisma.task.create({
   *   data: {
   *     // ... data to create a Task
   *   }
   * })
   * 
  **/
  create<T extends TaskCreateArgs>(
    args: Subset<T, TaskCreateArgs>
  ): CheckSelect<T, TaskClient<Task>, TaskClient<TaskGetPayload<T>>>
  /**
   * Delete a Task.
   * @param {TaskDeleteArgs} args - Arguments to delete one Task.
   * @example
   * // Delete one Task
   * const user = await prisma.task.delete({
   *   where: {
   *     // ... filter to delete one Task
   *   }
   * })
   * 
  **/
  delete<T extends TaskDeleteArgs>(
    args: Subset<T, TaskDeleteArgs>
  ): CheckSelect<T, TaskClient<Task>, TaskClient<TaskGetPayload<T>>>
  /**
   * Update one Task.
   * @param {TaskUpdateArgs} args - Arguments to update one Task.
   * @example
   * // Update one Task
   * const task = await prisma.task.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TaskUpdateArgs>(
    args: Subset<T, TaskUpdateArgs>
  ): CheckSelect<T, TaskClient<Task>, TaskClient<TaskGetPayload<T>>>
  /**
   * Delete zero or more Tasks.
   * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
   * @example
   * // Delete a few Tasks
   * const { count } = await prisma.task.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TaskDeleteManyArgs>(
    args: Subset<T, TaskDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tasks.
   * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tasks
   * const task = await prisma.task.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TaskUpdateManyArgs>(
    args: Subset<T, TaskUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Task.
   * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
   * @example
   * // Update or create a Task
   * const task = await prisma.task.upsert({
   *   create: {
   *     // ... data to create a Task
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Task we want to update
   *   }
   * })
  **/
  upsert<T extends TaskUpsertArgs>(
    args: Subset<T, TaskUpsertArgs>
  ): CheckSelect<T, TaskClient<Task>, TaskClient<TaskGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyTaskArgs, 'select' | 'include'>): Promise<number>
}

export declare class TaskClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Task findOne
 */
export type FindOneTaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * Filter, which Task to fetch.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task findMany
 */
export type FindManyTaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * Filter, which Tasks to fetch.
  **/
  where?: TaskWhereInput | null
  /**
   * Determine the order of the Tasks to fetch.
  **/
  orderBy?: TaskOrderByInput | null
  /**
   * Skip the first `n` Tasks.
  **/
  skip?: number | null
  /**
   * Get all Tasks that come after the Task you provide with the current order.
  **/
  after?: TaskWhereUniqueInput | null
  /**
   * Get all Tasks that come before the Task you provide with the current order.
  **/
  before?: TaskWhereUniqueInput | null
  /**
   * Get the first `n` Tasks.
  **/
  first?: number | null
  /**
   * Get the last `n` Tasks.
  **/
  last?: number | null
}


/**
 * Task create
 */
export type TaskCreateArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * The data needed to create a Task.
  **/
  data: TaskCreateInput
}


/**
 * Task update
 */
export type TaskUpdateArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * The data needed to update a Task.
  **/
  data: TaskUpdateInput
  /**
   * Choose, which Task to update.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task updateMany
 */
export type TaskUpdateManyArgs = {
  data: TaskUpdateManyMutationInput
  where?: TaskWhereInput | null
}


/**
 * Task upsert
 */
export type TaskUpsertArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * The filter to search for the Task to update in case it exists.
  **/
  where: TaskWhereUniqueInput
  /**
   * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
  **/
  create: TaskCreateInput
  /**
   * In case the Task was found with the provided `where` argument, update it with this data.
  **/
  update: TaskUpdateInput
}


/**
 * Task delete
 */
export type TaskDeleteArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
  /**
   * Filter which Task to delete.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task deleteMany
 */
export type TaskDeleteManyArgs = {
  where?: TaskWhereInput | null
}


/**
 * Task without action
 */
export type TaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: TaskSelect | null
}



/**
 * Deep Input Types
 */


export type TaskWhereInput = {
  id?: string | UUIDFilter | null
  createdAt?: Date | string | DateTimeFilter | null
  updatedAt?: Date | string | DateTimeFilter | null
  name?: string | StringFilter | null
  content?: string | NullableStringFilter | null
  finished?: boolean | BooleanFilter | null
  AND?: Enumerable<TaskWhereInput> | null
  OR?: Enumerable<TaskWhereInput> | null
  NOT?: Enumerable<TaskWhereInput> | null
}

export type TaskWhereUniqueInput = {
  id?: string | null
}

export type TaskCreateInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  name: string
  content?: string | null
  finished?: boolean | null
}

export type TaskUpdateInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  name?: string | null
  content?: string | null
  finished?: boolean | null
}

export type TaskUpdateManyMutationInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  name?: string | null
  content?: string | null
  finished?: boolean | null
}

export type UUIDFilter = {
  equals?: string | null
  not?: string | UUIDFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type DateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | DateTimeFilter | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type BooleanFilter = {
  equals?: boolean | null
  not?: boolean | BooleanFilter | null
}

export type TaskOrderByInput = {
  id?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  name?: OrderByArg | null
  content?: OrderByArg | null
  finished?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
