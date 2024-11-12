import mongoose, { Document, Schema } from 'mongoose'

interface IBoard extends Document {
  name: string
  owner: mongoose.Types.ObjectId
  description?: string
}

const boardSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: false },
})

const Board = mongoose.model<IBoard>('Board', boardSchema)

export default Board
export { IBoard }
