import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import boardReducer from '../features/board/boardSlice'
import boardListReducer from '../features/boardList/boardListSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    boardList: boardListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
