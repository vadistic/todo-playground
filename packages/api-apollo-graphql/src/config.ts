import { configSchema as dbConfigSchema } from '@todo/db-marshall'
import convict, { Schema } from 'convict'

/* eslint-disable @typescript-eslint/camelcase */
export const configSchema = {
  ...dbConfigSchema,
  api_port: {
    env: 'PORT',
    default: 8000,
    format: 'port',
  },
  api_graphql_route: {
    env: 'GRAPHQL_PATH',
    default: 'graphql',
    format: String,
  },
}
/* eslint-enable @typescript-eslint/camelcase */

export type Config = typeof configSchema extends Schema<infer U> ? U : never

export const config = convict(configSchema)
