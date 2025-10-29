import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")
      if (token && user) {
        state.token = token
        state.user = JSON.parse(user)
      }
    },
  },
})

export const { setLoading, setUser, setError, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
