import convict, { Schema } from 'convict'

/* eslint-disable @typescript-eslint/camelcase */
export const configSchema = {
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  debug: {
    env: 'DEBUG',
    default: false,
  },

  mongodb_user: {
    default: (undefined as unknown) as string,
    format: String,
    env: 'MONGODB_USER',
  },
  mongodb_pass: {
    default: (undefined as unknown) as string,
    format: String,
    env: 'MONGODB_PASS',
  },
  mongodb_name: {
    default: (undefined as unknown) as string,
    format: String,
    env: 'MONGODB_NAME',
  },
  mongodb_port: {
    default: (undefined as unknown) as number,
    format: 'port',
    env: 'MONGODB_PORT',
  },
  mongodb_host: {
    default: (undefined as unknown) as string,
    format: String,
    env: 'MONGODB_HOST',
  },
}
/* eslint-enable @typescript-eslint/camelcase */

export type Config = typeof configSchema extends Schema<infer T> ? T : never

export const config = convict(configSchema).validate({ allowed: 'strict' })
