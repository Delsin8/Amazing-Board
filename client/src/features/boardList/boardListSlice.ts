import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import apiClient from '../../api/apiClient'

interface BoardShort {
  id: string
  title: string
  description?: string
}

interface BoardListState {
  boardList: Record<string, BoardShort>
}

const initialState: BoardListState = {
  boardList: {},
}

const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    setBoardList(state, action: PayloadAction<Record<string, BoardShort>>) {
      state.boardList = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoardList.pending, state => {
        // state.loading = true;
        // state.error = null;
      })
      .addCase(fetchBoardList.fulfilled, (state, action) => {
        state.boardList = action.payload
        // state.loading = false;
      })
      .addCase(fetchBoardList.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error.message || 'Failed to load board list';
      })
  },
})

export const fetchBoardList = createAsyncThunk(
  'boardList/fetchBoardList',
  async () => {
    const response = await apiClient.get(`/boards`)
    if (response.status !== 200) {
      throw new Error('Failed to fetch board list')
    }
    return await response.data
  }
)

export const { setBoardList } = boardListSlice.actions

export default boardListSlice.reducer
