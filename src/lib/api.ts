import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  get: async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data
  },

  post: async (url: string, data: any) => {
    const response = await axiosInstance.post(url, data)
    return response.data
  },

  put: async (url: string, data: any) => {
    const response = await axiosInstance.put(url, data)
    return response.data
  },

  delete: async (url: string) => {
    const response = await axiosInstance.delete(url)
    return response.data
  },
}

export default api
