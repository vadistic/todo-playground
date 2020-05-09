import convict from 'convict'

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
  db_name: {
    env: 'DB_NAME',
    default: 'dev',
  },
  db_host: {
    env: 'DB_HOST',
    default: 'localhost',
  },
  db_port: {
    env: 'DB_PORT',
    default: 21017,
    format: 'port',
  },
  db_url: {
    env: 'DB_URL',
    default: 'mongodb://localhost/dev',
  },
}
/* eslint-enable @typescript-eslint/camelcase */

export type ConfigSchema = typeof configSchema

export const config = convict(configSchema)

config.validate({ allowed: 'strict' })
