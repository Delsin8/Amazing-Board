import mongoose, { Document, Schema } from 'mongoose'

interface ICard extends Document {
  name: string
  list: mongoose.Types.ObjectId
}

const cardSchema: Schema = new Schema({
  name: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
})

const Card = mongoose.model<ICard>('Card', cardSchema)

export default Card
export { ICard }
