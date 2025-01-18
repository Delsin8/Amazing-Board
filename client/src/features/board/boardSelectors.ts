import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { denormalize } from 'normalizr'
import { boardSchema } from './schemas'
import { IBoard, ICard } from '../../types/commonTypes'

export const selectBoardState = (state: RootState) => state.board

export const selectBoard = createSelector(
  selectBoardState,
  boardState => boardState.board
)

export const selectLists = createSelector(
  selectBoardState,
  boardState => boardState.lists
)

export const selectCards = createSelector(
  selectBoardState,
  boardState => boardState.cards
)

export const selectListsForBoard = createSelector(
  [selectBoard, (state: RootState) => state.board.lists],
  (board, lists) => {
    if (!board) return []
    return board.lists.map(listId => lists[listId])
  }
)

export const selectDenormalizedBoard = createSelector(
  [selectBoard, selectLists, selectCards],
  (board, lists, cards): IBoard | null => {
    if (!board) return null
    const result: IBoard = denormalize(board, boardSchema, {
      board,
      lists,
      cards,
    })
    result.lists.sort((a, b) => a.position - b.position)
    return result
  }
)

export const selectDenormalizedCards = createSelector(
  [selectCards],
  (cards): ICard[] => {
    return Object.values(cards).sort((a, b) => a.position - b.position)
  }
)
