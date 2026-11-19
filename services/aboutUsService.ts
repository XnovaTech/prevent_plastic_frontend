import axios from "axios"

import { API_BASE_URL, api } from "@/lib/api"
import type { ApiResponse } from "@/types/auth"
import type { AboutFaq, AboutFaqInput, AboutItem, AboutItemInput, AboutSection, AboutSectionInput, AboutUs, AboutUsInput } from "@/types/aboutUs"

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: 8000,
})

export const aboutUsService = {
  async publicShow(): Promise<AboutUs | null> { const response = await publicApi.get<ApiResponse<AboutUs | null>>("/about"); return response.data.data },
  async adminShow(): Promise<AboutUs | null> { const response = await api.get<ApiResponse<AboutUs | null>>("/admin/about"); return response.data.data },
  async save(input: AboutUsInput): Promise<AboutUs> { const response = await api.put<ApiResponse<AboutUs>>("/admin/about", input); return response.data.data },
  async reset(): Promise<void> { await api.delete("/admin/about") },
  async initializeLayout(): Promise<void> { await api.post("/admin/about/initialize-layout") },
  async createSection(input: AboutSectionInput): Promise<AboutSection> { const response = await api.post<ApiResponse<AboutSection>>("/admin/about/sections", input); return response.data.data },
  async updateSection(id: number, input: AboutSectionInput): Promise<AboutSection> { const response = await api.patch<ApiResponse<AboutSection>>(`/admin/about/sections/${id}`, input); return response.data.data },
  async removeSection(id: number): Promise<void> { await api.delete(`/admin/about/sections/${id}`) },
  async createItem(sectionId: number, input: AboutItemInput): Promise<AboutItem> { const response = await api.post<ApiResponse<AboutItem>>(`/admin/about/sections/${sectionId}/items`, input); return response.data.data },
  async removeItem(sectionId: number, itemId: number): Promise<void> { await api.delete(`/admin/about/sections/${sectionId}/items/${itemId}`) },
  async createFaq(input: AboutFaqInput): Promise<AboutFaq> { const response = await api.post<ApiResponse<AboutFaq>>("/admin/about/faqs", input); return response.data.data },
  async removeFaq(id: number): Promise<void> { await api.delete(`/admin/about/faqs/${id}`) },
  async uploadMedia(sectionId: number, file: File): Promise<void> { const form = new FormData(); form.append("file", file); await api.post(`/admin/about/sections/${sectionId}/media`, form, { headers: { "Content-Type": "multipart/form-data" } }) },
  async uploadGalleryImage(sectionId: number, file: File): Promise<void> { const form = new FormData(); form.append("image", file); await api.post(`/admin/about/sections/${sectionId}/gallery-images`, form, { headers: { "Content-Type": "multipart/form-data" } }) },
  async removeMedia(sectionId: number, mediaId: number): Promise<void> { await api.delete(`/admin/about/sections/${sectionId}/media/${mediaId}`) },
  async removeGalleryImage(sectionId: number, imageId: number): Promise<void> { await api.delete(`/admin/about/sections/${sectionId}/gallery-images/${imageId}`) },
}
