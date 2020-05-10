import { Config as Base } from '@todo/lib-db'

export class Config extends Base {
  sqlitedb_file: string = process.env.SQLITEDB_FILE ?? 'tmp/dev.db'

  sqlitedb_uri: string = process.env.SQLITEDB_URI ?? 'file:../tmp/dev.db'
}

export const config = new Config()
