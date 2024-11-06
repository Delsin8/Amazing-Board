import mongoose, { Schema } from 'mongoose'

const cardSchema: Schema = new Schema({
  name: { type: String, required: true },
})

const Card = mongoose.model('Card', cardSchema)

export default Card
