import { BoardAccessibility } from '../types/common'
import { ProjectSchema } from '../utils/customSchema'
import mongoose, { Document, Schema } from 'mongoose'

interface IBoard extends Document {
  title: string
  accessibility: BoardAccessibility
  owner?: mongoose.Types.ObjectId
  allowedUsers: mongoose.Types.ObjectId[]
  description?: string
}

const boardSchema: Schema = new ProjectSchema(
  {
    title: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    allowedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    accessibility: {
      type: String,
      enum: [BoardAccessibility.Private, BoardAccessibility.Public],
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
