import mongoose, { Document, Schema, Query } from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { TaskBase } from '@todo/shared-db'

export const configureSchema = (schema: Schema) => {
  // add timestamps fields

  schema.set('timestamps', true)

  // add virtualised id getter
  schema.set('id', true)

  // fix serialisers
  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  })

  schema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  })

  // lean always fetch virtual fields
  // FIXME: this is a bit too hacky
  schema.pre(/^find/, function(this: Query<any>, next) {
    const opts = (this as any)._mongooseOptions

    if (opts.lean) {
      // also skip those in lean
      this.select('-_id')
      this.select('-__v')

      if (opts.lean === true) opts.lean = { virtuals: true }
      else opts.lean = { virtuals: true, ...opts.lean }
    }

    next()
  })

  return schema
}

export type TaskDocument = TaskBase & Document

export const TaskDef: mongoose.SchemaDefinition = {
  name: { type: String, required: true },
  content: String,
  finished: { type: Boolean, required: true, default: false },
}

export const TaskSchema = new mongoose.Schema(TaskDef)

configureSchema(TaskSchema)

TaskSchema.plugin(mongooseLeanVirtuals)

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema)
