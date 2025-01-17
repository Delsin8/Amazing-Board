import { BoardAccessibility } from '../../../shared/types'

export interface IBoard {
  id: string
  title: string
  description?: string
  accessibility: BoardAccessibility
  lists: IList[]
}

export interface IBoardNormalized extends Omit<IBoard, 'lists'> {
  lists: string[]
}

export interface IList {
  id: string
  name: string
  cards: ICard[]
  position: number
}

export interface IListNormalized extends Omit<IList, 'cards'> {
  cards: string[]
}

export interface ICard {
  id: string
  name: string
  position: number
  list: string
}
