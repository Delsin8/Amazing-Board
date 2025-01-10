import { BoardAccessibility } from '../../../shared/types'

export interface IBoard {
  id: string
  name: string
  description?: string
  accessibility: BoardAccessibility
  lists: IList[]
}

export interface IList {
  id: string
  name: string
  cards: ICard[]
}

export interface ICard {
  id: string
  name: string
}
