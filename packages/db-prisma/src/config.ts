import convict from 'convict'

export const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  db: {
    file: {
      doc: 'sqlite database file',
      env: 'DB_FILE',
      type: String,
    },
    url: {
      doc: 'sqlite database url for prisma',
      env: 'DB_URL',
      type: String,
    },
  },
  db_test: {
    file: {
      doc: 'sqlite template database file',
      env: 'DB_FILE_TEST',
      type: String,
    },
    url: {
      doc: 'sqlite template database url for prisma',
      env: 'DB_URL_TEST',
      type: String,
    },
  },
  db_temp: {
    file: {
      doc: 'sqlite temporary database file',
      env: 'DB_FILE_TEST',
      type: String,
    },
    url: {
      doc: 'sqlite temporary database url for prisma',
      env: 'DB_URL_TEST',
      type: String,
    },
  },
})

config.loadFile('./.env.json')
