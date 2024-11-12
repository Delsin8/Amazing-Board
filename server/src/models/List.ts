import mongoose, { Document, Schema } from 'mongoose'

interface IList extends Document {
  name: string
  board: mongoose.Types.ObjectId
}

const listSchema: Schema = new Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
})

const List = mongoose.model<IList>('List', listSchema)

export default List
export { IList }
