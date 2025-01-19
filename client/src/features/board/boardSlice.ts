import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IBoardNormalized,
  ICard,
  IListNormalized,
} from '../../types/commonTypes'
import { normalize } from 'normalizr'
import { boardSchema } from './schemas'
import { fetchBoard } from './boardThunks'

interface BoardState {
  board: IBoardNormalized | null
  lists: Record<string, IListNormalized>
  cards: Record<string, ICard>
}

const initialState: BoardState = {
  board: null,
  lists: {},
  cards: {},
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoardData(state) {
      state.board = null
      state.lists = {}
      state.cards = {}
    },
    updateListPosition(
      state,
      action: PayloadAction<{ listId: string; position: number }>
    ) {
      state.lists[action.payload.listId].position = action.payload.position
    },
    updateCardPosition(
      state,
      action: PayloadAction<{
        cardId: string
        listId: string
        position: number
      }>
    ) {
      state.cards[action.payload.cardId].position = action.payload.position
      state.cards[action.payload.cardId].list = action.payload.listId
    },
    updateCardName(
      state,
      action: PayloadAction<{
        cardId: string
        name: string
      }>
    ) {
      state.cards[action.payload.cardId].name = action.payload.name
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoard.pending, state => {
        // state.loading = true
        // state.error = null
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        const data = normalize(action.payload, boardSchema)
        console.log(action.payload)
        state.board = data.entities.board![data.result] as IBoardNormalized
        state.lists = data.entities.lists as Record<string, IListNormalized>
        state.cards = data.entities.cards as Record<string, ICard>
        // state.loading = false
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        // state.loading = false
        // state.error = action.error.message || 'Failed to load board list'
      })
  },
})

export const {
  clearBoardData,
  updateListPosition,
  updateCardPosition,
  updateCardName,
} = boardSlice.actions
export default boardSlice.reducer
