import { BACKEND_BASE_URL } from "@/lib/api"

/** Resolve Laravel public-storage paths for browser-rendered product media. */
export function resolveMediaUrl(source?: string | null): string {
  if (!source) return ""
  if (/^(blob:|data:|https?:\/\/)/i.test(source)) return source

  if (source.startsWith("/storage/")) {
    return `${BACKEND_BASE_URL}${source}`
  }

  if (source.startsWith("/")) return source

  return `${BACKEND_BASE_URL}/storage/${source.replace(/^\/+/, "")}`
}
