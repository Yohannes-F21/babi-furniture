// store/productSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicApi from "@/lib/publicApi";

export interface User {
  userName: string;
  email: string;
}

export interface Product {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  thumbnailUrl: string;
  imagesUrl: string[];
  category: string;
  createdBy: User;
  isFeatured: boolean;
  createdAt: string;
}

export interface ProductFormData {
  title: string;
  category: string;
  description: string;
  price: string;
  thumbnail: File;
  images: File[];
  isFeatured: boolean;
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

// GET ALL PRODUCTS
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.get("/products/get");
      return response.data.data; // adjust based on your backend
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: ProductFormData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category.toLowerCase());
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("isFeatured", String(formData.isFeatured));

      // Append thumbnail
      data.append("thumbnail", formData.thumbnail);

      // Append multiple images
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await publicApi.post("/products/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data; // the newly created product
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create product";
      return rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, formData }: { id: string; formData: ProductFormData },
    { rejectWithValue }
  ) => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category.toLowerCase());
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("isFeatured", String(formData.isFeatured));

      if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);
      formData.images.forEach((img) => data.append("images", img));

      const response = await publicApi.put(`/products/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

// DELETE PRODUCT (you already have this, just for completeness)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await publicApi.delete(`/products/delete/${productId}`);
      return { id: productId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
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
    // GET PRODUCTS
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to load products";
      });

    // CREATE PRODUCT
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add new product to the beginning of the list
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create product";
      });

    // DELETE PRODUCT
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string" ? action.payload : "Delete failed";
      });
    // UPDATE PRODUCT
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) state.products[index] = action.payload;
    });
  },
});

export const { clearProductsError } = productSlice.actions;
export default productSlice.reducer;
