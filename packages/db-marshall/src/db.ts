import 'reflect-metadata'
import { Database } from '@marcj/marshal-mongo'
import { DbBase } from '@todo/lib-db'

import { Connection } from './connection'
import { Service } from './service'

export interface MarshallDb extends DbBase {
  database: Database
  ctn: Connection
  service: Service
}

export const createDb = async (): Promise<MarshallDb> => {
  const ctn = new Connection()
  const database = new Database(ctn as any)

  const service = new Service(database)

  const connect = async () => {
    await ctn.connect()
  }

  const close = async () => {
    await ctn.close(true)
  }

  const sync = async () => {
    // auto
  }

  const drop = async () => {
    await ctn.db.dropDatabase()
  }

  const seed = async () => {
    // console.warn('NOT IMPLEMENTED', 'seed()')
  }

  const isConnected = () => {
    return ctn.client?.isConnected() ?? false
  }

  return {
    database,
    ctn,
    service,
    connect,
    close,
    isConnected,
    sync,
    drop,
    seed,
  }
}
