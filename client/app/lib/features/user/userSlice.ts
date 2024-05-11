import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/lib/store'
import { User } from "@/app/auth/api";

const initialState: User = {
  username: "123",
  id: null,
  token: "",
  role: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
  },
})

export const { setUser } = userSlice.actions

export const selectRole = (state: RootState) => state.user.role;
export default userSlice.reducer