import axios from "axios"

import { useAuthStore } from "@/stores/authStore"

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL

if (!configuredApiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured")
}

export const API_BASE_URL = configuredApiUrl

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout()
    }

    return Promise.reject(error)
  }
)
