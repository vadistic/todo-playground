import convict from 'convict'

export const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5050,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    name: {
      doc: 'sqlite database file',
      env: 'DB_FILE',
      format: String,
      default: 'api_apollo_graphql_dev.db',
    },
  },
})

config.loadFile('./.env.json')
