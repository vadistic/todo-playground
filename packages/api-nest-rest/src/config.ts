import convict from 'convict'

/* eslint-disable @typescript-eslint/camelcase */
export const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  debug: {
    env: 'DEBUG',
    default: false,
  },
  db_file: {
    env: 'DB_FILE',
    default: '',
  },
})
/* eslint-enable @typescript-eslint/camelcase */

config.loadFile('./.env.json')
