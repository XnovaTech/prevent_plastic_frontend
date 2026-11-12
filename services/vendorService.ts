import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"

export type Vendor = { id: number; display_name: string; status: string }

export const vendorService = {
  async list(): Promise<Vendor[]> {
    const response = await api.get<CategoryApiResponse<Vendor[]>>("/vendors")
    return response.data.data
  },
}
