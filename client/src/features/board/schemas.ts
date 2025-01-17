import { schema } from 'normalizr'

const cardSchema = new schema.Entity('cards')
const listSchema = new schema.Entity('lists', {
  cards: [cardSchema],
})
export const boardSchema = new schema.Entity('board', {
  lists: [listSchema],
})
