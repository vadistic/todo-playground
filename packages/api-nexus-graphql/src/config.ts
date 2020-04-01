import convict from 'convict'
import { configSchema as dbConfigSchema } from '@todo/db-prisma'

/* eslint-disable @typescript-eslint/camelcase */
export const configSchema = {
  ...dbConfigSchema,
  port: {
    env: 'PORT',
    default: 8000,
    format: 'port',
  },
  graphql_path: {
    env: 'GRAPHQL_PATH',
    default: 'graphql',
    format: String,
  },
}
/* eslint-enable @typescript-eslint/camelcase */

export type ConfigSchema = typeof configSchema

export const config = convict(configSchema)
