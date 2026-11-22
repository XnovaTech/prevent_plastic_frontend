import axios from "axios"

import { API_BASE_URL, api } from "@/lib/api"
import type { ApiResponse } from "@/types/auth"
import type {
  AboutFaq,
  AboutFaqInput,
  AboutGalleryImage,
  AboutItem,
  AboutItemInput,
  AboutMedia,
  AboutSection,
  AboutSectionInput,
  AboutUs,
  AboutUsInput,
} from "@/types/aboutUs"

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: 8000,
})

export const aboutUsService = {
  async publicShow(): Promise<AboutUs | null> {
    const response = await publicApi.get<ApiResponse<AboutUs | null>>("/about")
    return response.data.data
  },
  async adminShow(): Promise<AboutUs | null> {
    const response = await api.get<ApiResponse<AboutUs | null>>("/admin/about")
    return response.data.data
  },
  async save(input: AboutUsInput): Promise<AboutUs> {
    const response = await api.put<ApiResponse<AboutUs>>("/admin/about", input)
    return response.data.data
  },
  async publish(): Promise<AboutUs> {
    const response = await api.post<ApiResponse<AboutUs>>("/admin/about/publish")
    return response.data.data
  },
  async reset(): Promise<void> {
    await api.delete("/admin/about")
  },
  async initializeLayout(): Promise<AboutUs> {
    const response = await api.post<ApiResponse<AboutUs>>(
      "/admin/about/initialize-layout"
    )
    return response.data.data
  },
  async createSection(input: AboutSectionInput): Promise<AboutSection> {
    const response = await api.post<ApiResponse<AboutSection>>(
      "/admin/about/sections",
      input
    )
    return response.data.data
  },
  async updateSection(
    id: number,
    input: AboutSectionInput
  ): Promise<AboutSection> {
    const response = await api.patch<ApiResponse<AboutSection>>(
      `/admin/about/sections/${id}`,
      input
    )
    return response.data.data
  },
  async removeSection(id: number): Promise<void> {
    await api.delete(`/admin/about/sections/${id}`)
  },
  async createItem(
    sectionId: number,
    input: AboutItemInput
  ): Promise<AboutItem> {
    const response = await api.post<ApiResponse<AboutItem>>(
      `/admin/about/sections/${sectionId}/items`,
      input
    )
    return response.data.data
  },
  async updateItem(
    sectionId: number,
    itemId: number,
    input: AboutItemInput
  ): Promise<AboutItem> {
    const response = await api.patch<ApiResponse<AboutItem>>(
      `/admin/about/sections/${sectionId}/items/${itemId}`,
      input
    )
    return response.data.data
  },
  async removeItem(sectionId: number, itemId: number): Promise<void> {
    await api.delete(`/admin/about/sections/${sectionId}/items/${itemId}`)
  },
  async createFaq(input: AboutFaqInput): Promise<AboutFaq> {
    const response = await api.post<ApiResponse<AboutFaq>>(
      "/admin/about/faqs",
      input
    )
    return response.data.data
  },
  async updateFaq(id: number, input: AboutFaqInput): Promise<AboutFaq> {
    const response = await api.patch<ApiResponse<AboutFaq>>(
      `/admin/about/faqs/${id}`,
      input
    )
    return response.data.data
  },
  async removeFaq(id: number): Promise<void> {
    await api.delete(`/admin/about/faqs/${id}`)
  },
  async uploadMedia(
    sectionId: number,
    file: File,
    details?: Pick<
      AboutMedia,
      "alt_text" | "caption" | "media_type" | "sort_order" | "is_active"
    >
  ): Promise<AboutMedia> {
    const form = new FormData()
    form.append("file", file)
    if (details?.alt_text) form.append("alt_text", details.alt_text)
    if (details?.caption) form.append("caption", details.caption)
    if (details?.media_type) form.append("media_type", details.media_type)
    if (details?.sort_order !== undefined)
      form.append("sort_order", String(details.sort_order))
    if (details?.is_active !== undefined)
      form.append("is_active", details.is_active ? "1" : "0")
    const response = await api.post<ApiResponse<AboutMedia>>(
      `/admin/about/sections/${sectionId}/media`,
      form
    )
    return response.data.data
  },
  async uploadGalleryImage(
    sectionId: number,
    file: File,
    details?: Pick<
      AboutGalleryImage,
      "alt_text" | "caption" | "sort_order" | "is_active"
    >
  ): Promise<AboutGalleryImage> {
    const form = new FormData()
    form.append("image", file)
    if (details?.alt_text) form.append("alt_text", details.alt_text)
    if (details?.caption) form.append("caption", details.caption)
    if (details?.sort_order !== undefined)
      form.append("sort_order", String(details.sort_order))
    if (details?.is_active !== undefined)
      form.append("is_active", details.is_active ? "1" : "0")
    const response = await api.post<ApiResponse<AboutGalleryImage>>(
      `/admin/about/sections/${sectionId}/gallery-images`,
      form
    )
    return response.data.data
  },
  async replaceMedia(
    sectionId: number,
    mediaId: number,
    file: File,
    details?: Pick<
      AboutMedia,
      "alt_text" | "caption" | "media_type" | "sort_order" | "is_active"
    >
  ): Promise<AboutMedia> {
    const form = new FormData()
    form.append("file", file)
    if (details?.alt_text) form.append("alt_text", details.alt_text)
    if (details?.caption) form.append("caption", details.caption)
    if (details?.media_type) form.append("media_type", details.media_type)
    if (details?.sort_order !== undefined)
      form.append("sort_order", String(details.sort_order))
    if (details?.is_active !== undefined)
      form.append("is_active", details.is_active ? "1" : "0")
    const response = await api.post<ApiResponse<AboutMedia>>(
      `/admin/about/sections/${sectionId}/media/${mediaId}/replace`,
      form
    )
    return response.data.data
  },
  async replaceGalleryImage(
    sectionId: number,
    imageId: number,
    file: File,
    details?: Pick<
      AboutGalleryImage,
      "alt_text" | "caption" | "sort_order" | "is_active"
    >
  ): Promise<AboutGalleryImage> {
    const form = new FormData()
    form.append("image", file)
    if (details?.alt_text) form.append("alt_text", details.alt_text)
    if (details?.caption) form.append("caption", details.caption)
    if (details?.sort_order !== undefined)
      form.append("sort_order", String(details.sort_order))
    if (details?.is_active !== undefined)
      form.append("is_active", details.is_active ? "1" : "0")
    const response = await api.post<ApiResponse<AboutGalleryImage>>(
      `/admin/about/sections/${sectionId}/gallery-images/${imageId}/replace`,
      form
    )
    return response.data.data
  },
  async updateMedia(
    sectionId: number,
    mediaId: number,
    input: Pick<AboutMedia, "alt_text" | "caption" | "media_type" | "sort_order" | "is_active">
  ): Promise<AboutMedia> {
    const response = await api.patch<ApiResponse<AboutMedia>>(
      `/admin/about/sections/${sectionId}/media/${mediaId}`,
      input
    )
    return response.data.data
  },
  async updateGalleryImage(
    sectionId: number,
    imageId: number,
    input: Pick<
      AboutGalleryImage,
      "alt_text" | "caption" | "sort_order" | "is_active"
    >
  ): Promise<AboutGalleryImage> {
    const response = await api.patch<ApiResponse<AboutGalleryImage>>(
      `/admin/about/sections/${sectionId}/gallery-images/${imageId}`,
      input
    )
    return response.data.data
  },
  async removeMedia(sectionId: number, mediaId: number): Promise<void> {
    await api.delete(`/admin/about/sections/${sectionId}/media/${mediaId}`)
  },
  async removeGalleryImage(sectionId: number, imageId: number): Promise<void> {
    await api.delete(
      `/admin/about/sections/${sectionId}/gallery-images/${imageId}`
    )
  },
}
