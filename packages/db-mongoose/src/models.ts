import { Model, Connection } from 'mongoose'

import { TaskDocument, TaskSchema } from './task/task.schema'

export type TaskModel = Model<TaskDocument>

export interface Models {
  task: TaskModel
}

export const createModels = (ctn: Connection) => ({
  task: ctn.model<TaskDocument>('Task', TaskSchema),
})
