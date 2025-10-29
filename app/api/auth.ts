import axiosInstance from "./axios"

export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/register", data)
    return response.data
  },

  login: async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/login", data)
    return response.data
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await axiosInstance.post("/auth/forgot-password", data)
    return response.data
  },

  resetPassword: async (data: { token: string; password: string }) => {
    const response = await axiosInstance.post("/auth/reset-password", data)
    return response.data
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await axiosInstance.post("/auth/change-password", data)
    return response.data
  },
}
