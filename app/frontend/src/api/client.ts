import axios, { InternalAxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_RAILS_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config): InternalAxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default apiClient
