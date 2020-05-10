import { ClassType } from '@marcj/estdlib'
import { getDatabaseName } from '@marcj/marshal'
import { resolveCollectionName } from '@marcj/marshal-mongo'
import { Collection, MongoClient } from 'mongodb'

import { config } from './config'

// https://github.com/marcj/marshal.ts/blob/a02b29cb73a907f23c4a78c656ced08db0ead2b5/packages/mongo/src/connection.ts#L6
export class Connection {
  client!: MongoClient

  host = config.mongodb_uri

  defaultDatabase = config.mongodb_name

  username = config.mongodb_user

  password = config.mongodb_pass

  async close(force?: boolean) {
    if (this.client) {
      await this.client.close(force)
    }
  }

  async connect(): Promise<MongoClient> {
    if (this.client) {
      return this.client
    }

    const auth =
      config.mongodb_user && config.mongodb_pass
        ? {
            user: config.mongodb_user,
            password: config.mongodb_pass,
          }
        : undefined

    this.client = await MongoClient.connect(config.mongodb_uri, {
      auth,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
      keepAlive: false,
    })

    return this.client
  }

  async getCollection(classType: ClassType<any>): Promise<Collection> {
    return (await this.connect())
      .db(getDatabaseName(classType) || this.defaultDatabase)
      .collection(resolveCollectionName(classType))
  }
}
