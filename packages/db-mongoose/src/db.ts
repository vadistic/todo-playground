import { DbBase, seedAll } from '@todo/lib-db'
import mongoose, { Connection } from 'mongoose'

import { config } from './config'
import { Models, createModels } from './models'
import { createService, Service } from './service'

export interface MongooseDb extends DbBase {
  ctn: Connection
  service: Service
  models: Models
}

export const createDb = async (): Promise<MongooseDb> => {
  const ctn = await mongoose.createConnection(config.get('db_url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: config.get('db_name'), // alows db_name env override db_url
    loggerLevel: config.get('debug') ? 'info' : 'error',
  })

  const models = createModels(ctn)
  const service = createService(ctn, models)

  const connect = async () => {
    // console.warn('NOT IMPLEMENTED', 'connect()')
  }

  const close = async () => {
    await ctn.close()
  }

  const seed = async () => {
    await seedAll(service)
  }

  const drop = async () => {
    await ctn.dropDatabase()
  }

  const sync = async () => {
    // mongodb does not really need sync but syncing indexes will do
    const p = Object.values(ctn.models).map((model) => model.syncIndexes())

    await Promise.all(p)
  }

  const isConnected = () => {
    return ctn.readyState === 1
  }

  return {
    ctn,
    service,
    models,
    close,
    connect,
    seed,
    drop,
    sync,
    isConnected,
  }
}
