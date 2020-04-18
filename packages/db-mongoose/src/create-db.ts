import { DbBase } from '@todo/shared-db'
import mongoose, { Model, Mongoose } from 'mongoose'

import { config } from './config'
import { TaskDocument, TaskModel } from './schema'
import { createServices } from './services'

export interface Models {
  task: Model<TaskDocument>
}

export interface MongooseDb extends DbBase {
  mongoose: Mongoose
  service: ReturnType<typeof createServices>
  models: Models
}

export const createDb = async (): Promise<MongooseDb> => {
  const instance = await mongoose.connect(config.get('db_url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    loggerLevel: config.get('debug') ? 'info' : 'error',
  })

  const models = { task: TaskModel }

  const close = async () => {
    await instance.disconnect()
  }

  return {
    mongoose: instance,
    service: createServices(models, instance),
    models,
    close,
  }
}
