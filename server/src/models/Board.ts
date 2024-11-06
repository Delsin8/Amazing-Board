import mongoose, { Document, Schema } from 'mongoose'

interface IBoard extends Document {
  name: string
}

const boardSchema: Schema = new Schema({
  name: { type: String, required: true },
})

const Board = mongoose.model<IBoard>('Board', boardSchema)

export default Board
export { IBoard }
