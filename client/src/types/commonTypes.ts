export interface IBoard {
  id: string
  name: string
  description?: string
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
