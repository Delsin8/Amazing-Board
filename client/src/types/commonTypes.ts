import { BoardAccessibility } from '../../../shared/types'

export interface IBoard {
  id: string
  title: string
  description?: string
  accessibility: BoardAccessibility
  lists: string[]
}

export interface IList {
  id: string
  name: string
  cards: string[]
}

export interface ICard {
  id: string
  name: string
  position: number
  list: string
}
