import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  imagesUrl: [];
  category: string;
  createdBy: string;
  createdAt: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

// === ASYNC THUNKS ===

// === GET ALL PRODUCTS (Admin Only) ===
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/get"); // → GET /api/products

      // Backend should return: { success: true, products: [...] }
      return response.data; // ← This becomes action.payload
    } catch (err: any) {
      // Handle 401 → will be caught by interceptor (auto refresh)
      // Handle 403 → not admin
      // Handle 500 → server error
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch products";

      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        console.log(state.products);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        // Since action.payload is of type unknown, safely assign error
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch products";
      });
  },
});

export const { clearProductsError } = productSlice.actions;
export default productSlice.reducer;
