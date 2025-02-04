import { IBoardNormalized, ICard, IListNormalized } from 'types/commonTypes'
import { boardSchema } from './schemas'
import { createCard, fetchBoard } from './boardThunks'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'

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
        targetListId: string
        sourceListId: string
        position: number
      }>
    ) {
      const { cardId, sourceListId, targetListId, position } = action.payload

      state.cards[cardId].position = position
      state.cards[cardId].list = targetListId

      if (sourceListId === targetListId) return

      state.lists[sourceListId].cards = state.lists[sourceListId].cards.filter(
        card => card !== cardId
      )
      state.lists[targetListId].cards.push(cardId)
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
    updateListItem(state, action: PayloadAction<IListNormalized>) {
      state.lists[action.payload.id] = action.payload
    },
    updateListColor(
      state,
      action: PayloadAction<{ listId: string; color: string }>
    ) {
      state.lists[action.payload.listId].color = action.payload.color
    },
  },
  extraReducers: builder => {
    builder
      /* Fetch board */
      .addCase(fetchBoard.pending, state => {
        // state.loading = true
        // state.error = null
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        const data = normalize(action.payload, boardSchema)
        state.board = data.entities.board![data.result] as IBoardNormalized
        state.lists = data.entities.lists as Record<string, IListNormalized>
        state.cards = data.entities.cards as Record<string, ICard>
        // state.loading = false
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        // state.loading = false
        // state.error = action.error.message || 'Failed to load board list'
      })
      /* Create card */
      .addCase(createCard.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.cards[action.payload.id] = action.payload
        state.lists[action.payload.list]?.cards.push(action.payload.id)
      })
  },
})

export const {
  clearBoardData,
  updateListPosition,
  updateCardPosition,
  updateCardName,
  updateListItem,
  updateListColor,
} = boardSlice.actions
export default boardSlice.reducer
