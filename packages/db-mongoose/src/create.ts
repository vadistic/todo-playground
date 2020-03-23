import mongoose, { Model, Mongoose } from 'mongoose'
import { TaskSchema, TaskDocument } from './schema'
import { createServices } from './services'
import { DB_URL } from './config'

export interface Models {
  task: Model<TaskDocument>
}

export interface BackendMongoose {
  db: Mongoose
  services: ReturnType<typeof createServices>
  models: Models
}

const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema)

export const createBackend = async (): Promise<BackendMongoose> => {
  await mongoose.connect(DB_URL, {
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
