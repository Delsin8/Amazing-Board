import { Schema } from 'mongoose'

const transform = (_doc: any, ret: any) => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
  return ret
}

export class ProjectSchema extends Schema {
  constructor(definition: any, options: any = {}) {
    super(definition, {
      ...options,
      toJSON: {
        virtuals: true,
        transform,
      },
      toObject: {
        virtuals: true,
        transform,
      },
    })
  }
}
