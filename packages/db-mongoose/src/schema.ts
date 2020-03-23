import mongoose, { Document } from 'mongoose'
import { TaskBase } from '@todo/shared-db'
import { addFakeId } from './utils'

export type TaskDocument = TaskBase & Document

const TaskDef: mongoose.SchemaDefinition = {
  name: { type: String, required: true },
  content: String,
  finished: { type: Boolean, required: true, default: false },
}

export const TaskSchema = addFakeId(new mongoose.Schema(TaskDef, { timestamps: true }))
