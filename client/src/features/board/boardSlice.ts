import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import apiClient from '../../api/apiClient'
import {
  IBoard,
  IBoardNormalized,
  ICard,
  IList,
  IListNormalized,
} from '../../types/commonTypes'
import { normalize } from 'normalizr'
import { boardSchema } from './schemas'

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
      .addCase(reorderCard.pending, state => {
        console.log(state)
        // state.loading = true
        // state.error = null
      })
      .addCase(reorderCard.fulfilled, (state, action) => {
        // const data = normalize(action.payload, boardSchema)
        // console.log(action.payload)
        // state.board = data.entities.board![data.result] as IBoardNormalized
        // state.lists = data.entities.lists as Record<string, IListNormalized>
        // state.cards = data.entities.cards as Record<string, ICard>
        // state.loading = false
      })
      .addCase(reorderCard.rejected, (state, action) => {
        // state.loading = false
        // state.error = action.error.message || 'Failed to load board list'
      })
  },
})

export const fetchBoard = createAsyncThunk(
  'board/fetchBoard',
  async (boardId: string) => {
    const response = await apiClient.get(`/boards/${boardId}`)
    if (response.status !== 200) {
      throw new Error('Failed to fetch board list')
    }
    return await response.data
  }
)

export const reorderCard = createAsyncThunk(
  'board/reorderCard',
  async (
    {
      cardId,
      listId,
      boardId,
      position,
    }: {
      cardId: string
      listId: string
      boardId: string
      position: number
    },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({
        cardId,
        listId,
        boardId,
        position,
      })
      const response = await apiClient.patch(`/cards/reorder`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to fetch board list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const reorderList = createAsyncThunk(
  'board/reorderList',
  async (
    {
      listId,
      boardId,
      position,
    }: { listId: string; boardId: string; position: number },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ listId, position, boardId })
      const response = await apiClient.patch(`/lists/reorder`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to fetch board list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const { clearBoardData, updateListPosition, updateCardPosition } =
  boardSlice.actions
export default boardSlice.reducer
