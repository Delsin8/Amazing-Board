import { ProjectSchema } from '../utils/customSchema'
import mongoose, { Document, Schema } from 'mongoose'

interface IBoard extends Document {
  name: string
  owner: mongoose.Types.ObjectId
  description?: string
}

const boardSchema: Schema = new ProjectSchema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

boardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'board',
})

const Board = mongoose.model<IBoard>('Board', boardSchema)

export default Board
export { IBoard }
