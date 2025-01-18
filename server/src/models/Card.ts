import { ProjectSchema } from '../utils/customSchema'
import mongoose, { Document, Schema } from 'mongoose'

interface ICard extends Document {
  name: string
  list: mongoose.Types.ObjectId
  position: number
}

const cardSchema: Schema = new ProjectSchema(
  {
    name: { type: String, required: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
)

const Card = mongoose.model<ICard>('Card', cardSchema)

export default Card
export { ICard }
