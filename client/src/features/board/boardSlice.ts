import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import apiClient from '../../api/apiClient'
import { IBoard, ICard, IList } from '../../types/commonTypes'
import { normalize } from 'normalizr'
import { boardSchema } from './schemas'

interface BoardState {
  board: IBoard | null
  lists: Record<string, IList>
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
    updateCardPosition(state, action: PayloadAction<ICard>) {
      state.cards[action.payload.id] = action.payload
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
        state.board = data.entities.boards![data.result] as IBoard
        state.lists = data.entities.lists as Record<string, IList>
        state.cards = data.entities.cards as Record<string, ICard>
        // state.loading = false
      })
      .addCase(fetchBoard.rejected, (state, action) => {
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

export const { clearBoardData, updateCardPosition } = boardSlice.actions
export default boardSlice.reducer
