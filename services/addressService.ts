import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"
import type { UserAddress } from "@/types/address"

export const addressService = {
  async list(): Promise<UserAddress[]> {
    const response =
      await api.get<CategoryApiResponse<UserAddress[]>>("/addresses")
    return response.data.data
  },
  async create(
    input: Omit<UserAddress, "id" | "is_default"> & { is_default?: boolean }
  ): Promise<UserAddress> {
    const response = await api.post<CategoryApiResponse<UserAddress>>(
      "/addresses",
      input
    )
    return response.data.data
  },
  async update(
    id: number,
    input: Omit<UserAddress, "id" | "is_default"> & { is_default?: boolean }
  ): Promise<UserAddress> {
    const response = await api.put<CategoryApiResponse<UserAddress>>(
      `/addresses/${id}`,
      input
    )
    return response.data.data
  },
}
