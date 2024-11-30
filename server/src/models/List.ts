import { ProjectSchema } from '../utils/customSchema'
import mongoose, { Document, Schema } from 'mongoose'

interface IList extends Document {
  name: string
  board: mongoose.Types.ObjectId
}

const listSchema: Schema = new ProjectSchema(
  {
    name: { type: String, required: true },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  { timestamps: true }
)

listSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'list',
})

const List = mongoose.model<IList>('List', listSchema)

export default List
export { IList }
