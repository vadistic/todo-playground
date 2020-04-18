import { TaskBase } from '@todo/lib-db'
import mongoose, { Document } from 'mongoose'

import { configureSchema } from '../configure-schema'

export type TaskDocument = TaskBase & Document

export const TaskDefinition: mongoose.SchemaDefinition = {
  name: { type: String, required: true },
  content: String,
  finished: { type: Boolean, required: true, default: false },
}

export const TaskSchema = new mongoose.Schema(TaskDefinition)

configureSchema(TaskSchema)
