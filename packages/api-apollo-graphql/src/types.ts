export type Depromisify<T> = T extends Promise<infer U> ? U : never
