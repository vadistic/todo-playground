import { Schema, Document } from 'mongoose'

export const addFakeId = (schema: Schema) => {
  schema.virtual('id').get(function(this: Document) {
    return this._id.toHexString()
  })

  schema.set('toJSON', {
    virtuals: true,
  })

  return schema
}
