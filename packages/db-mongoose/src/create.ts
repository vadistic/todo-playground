import mongoose, { Model, Mongoose } from 'mongoose'
import { TaskDocument, TaskModel } from './schema'
import { createServices } from './services'
import { CONFIG } from './config'

export interface Models {
  task: Model<TaskDocument>
}

export interface MongooseModule {
  db: Mongoose
  services: ReturnType<typeof createServices>
  models: Models
}

export const createModule = async (): Promise<MongooseModule> => {
  await mongoose.connect(CONFIG.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    loggerLevel: 'error',
  })

  const models = { task: TaskModel }

  return {
    db: mongoose,
    services: createServices(models),
    models,
  }
}