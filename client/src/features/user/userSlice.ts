import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'types/commonTypes'

interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      state.user = action.payload.user
    },
    clearUser: state => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
