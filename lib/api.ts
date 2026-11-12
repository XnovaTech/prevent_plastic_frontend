import axios from "axios"

import { useAuthStore } from "@/stores/authStore"

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL

if (!configuredApiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured")
}

export const API_BASE_URL = configuredApiUrl
export const BACKEND_BASE_URL = configuredApiUrl.replace(/\/api\/v1\/?$/, "")

const defaultHeaders = {
  Accept: "application/json",
}

let csrfRequest: Promise<void> | null = null

export const csrfApi = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: defaultHeaders,
  withCredentials: true,
  withXSRFToken: true,
})

export function ensureCsrfCookie(): Promise<void> {
  if (!csrfRequest) {
    const request = csrfApi
      .get("/sanctum/csrf-cookie")
      .then(() => undefined)
      .catch((error: unknown) => {
        throw error
      })
      .finally(() => {
        csrfRequest = null
      })

    csrfRequest = request
  }

  return csrfRequest
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { ...defaultHeaders, "Content-Type": "application/json" },
  withCredentials: true,
  withXSRFToken: true,
})

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase()

  if (
    typeof window !== "undefined" &&
    method &&
    !["get", "head", "options"].includes(method)
  ) {
    await ensureCsrfCookie()
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearUser()
    }

    return Promise.reject(error)
  }
)
