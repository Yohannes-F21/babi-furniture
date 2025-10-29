import axiosInstance from "./axios"

export const productsAPI = {
  getAll: async () => {
    const response = await axiosInstance.get("/products")
    return response.data
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  },

  create: async (data: FormData) => {
    const response = await axiosInstance.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  update: async (id: string, data: FormData) => {
    const response = await axiosInstance.put(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/products/${id}`)
    return response.data
  },
}
