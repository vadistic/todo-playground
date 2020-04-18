export type Nullable<T> = T | undefined | null
export type PromiseLike<T> = T | Promise<T>
export type Depromisify<T> = T extends Promise<infer U> ? U : never
