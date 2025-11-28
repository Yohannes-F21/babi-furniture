// features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";
import Public_Api from "../../lib/publicApi";

const API_BASE = "http://localhost:4000/api";

// Types
interface User {
  id: string;
  userName: string;
  email: string;
  role: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  // token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoggedOut: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  // token: null,
  isLoading: true,
  isAuthenticated: false,
  isLoggedOut: false,
  error: null,
};

// === ASYNC THUNKS ===

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Public_Api.post("/auth/login", credentials);
      const { accessToken, user } = response.data;

      if (user.role !== "admin") {
        return rejectWithValue("Access denied: Admin only");
      }

      return { accessToken, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await Public_Api.post("/auth/logout");
      return true;
    } catch (err: any) {
      console.warn("Backend logout failed:", err.message);
      return true; // Force local logout
    }
  }
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Public_Api.post("/auth/refresh-token");
      return response.data;
    } catch (err: any) {
      return rejectWithValue("Session expired");
    }
  }
);

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreAuth: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            state.user = JSON.parse(storedUser);
            // state.token = state.user?.accessToken || null;
          } catch {
            localStorage.removeItem("user");
          }
        }
      }
    },
    // ← ADD LOGOUT REDUCER
    logout: (state) => {
      state.user = null;
      // state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggedOut = true;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    setAuthReady: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // === LOGIN ===
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isLoggedOut = false;
        const mergedUser = {
          ...action.payload.user,
          accessToken: action.payload.accessToken,
        };
        state.user = mergedUser;
        localStorage.setItem("user", JSON.stringify(mergedUser));

        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // === REFRESH TOKEN ===
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.user) {
          const mergedUser = {
            ...action.payload.user,
            accessToken: action.payload.accessToken,
          };
          state.user = mergedUser;
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(mergedUser));
        } else {
          state.isAuthenticated = true;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
        // state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });

    // === LOGOUT ===
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        // Use reducer to clear
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Force clear
        state.user = null;
        // state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

// Export actions
export const { restoreAuth, logout, setAuthReady } = authSlice.actions;

export default authSlice.reducer;
