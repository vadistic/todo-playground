/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { Schema, Query } from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

export const configureSchema = (schema: Schema) => {
  // add timestamps fields

  schema.set('timestamps', true)

  // add virtualised id getter
  schema.set('id', true)

  // no versioning
  schema.set('versionKey', false)

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

  // FIXME: super brute force
  schema.post(/^find/, function (this: Query<any>, doc, next) {
    const opts = (this as any)._mongooseOptions

    // only do it for lean queries where nothing can break
    if (opts.lean) {
      // handle findMany and such
      if (Array.isArray(doc)) {
        doc.forEach((el) => {
          el.id = el._id.toString()
          delete el._id
        })
      } else {
        doc.id = doc._id.toString()
        delete doc._id
      }
    }

    next()
  })

  schema.plugin(mongooseLeanVirtuals)

  return schema
}
