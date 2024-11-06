import mongoose, { Schema } from 'mongoose'

const listSchema: Schema = new Schema({
  name: { type: String, required: true },
})

const List = mongoose.model('List', listSchema)

export default List
