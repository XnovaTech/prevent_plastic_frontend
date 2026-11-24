import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"
import type { Order, Paginated, Payment, PaymentStatus, VendorOrder } from "@/types/order"

function paginated<T>(payload: Paginated<T> | T[]): Paginated<T> {
  return Array.isArray(payload) ? { data: payload } : payload
}

export const orderService = {
  async place(input: {
    shipping_address: { name: string; phone: string; address: string }
    billing_address?: Record<string, string>
    payment_method: "cash_on_delivery" | "bank_transfer" | "online" | "other"
    customer_note?: string
  }): Promise<Order> {
    const response = await api.post<CategoryApiResponse<Order>>(
      "/orders",
      input
    )
    return response.data.data
  },
  async customerOrders(): Promise<Paginated<Order>> {
    const response =
      await api.get<CategoryApiResponse<Paginated<Order>>>("/orders")
    return paginated(response.data.data)
  },
  async customerOrder(id: number): Promise<Order> {
    const response = await api.get<CategoryApiResponse<Order>>(`/orders/${id}`)
    return response.data.data
  },
  async vendorOrders(
    params?: Record<string, string | number>
  ): Promise<Paginated<VendorOrder>> {
    const response = await api.get<CategoryApiResponse<Paginated<VendorOrder>>>(
      "/vendor/orders",
      { params }
    )
    return paginated(response.data.data)
  },
  async updateVendorOrder(
    id: number,
    input: {
      status: string
      vendor_note?: string
      cancellation_reason?: string
    }
  ): Promise<VendorOrder> {
    const response = await api.patch<CategoryApiResponse<VendorOrder>>(
      `/vendor/orders/${id}`,
      input
    )
    return response.data.data
  },
  async approveVendorOrder(id: number): Promise<VendorOrder> {
    const response = await api.post<CategoryApiResponse<VendorOrder>>(
      `/vendor/orders/${id}/approve`
    )
    return response.data.data
  },
  async vendorOrder(id: number): Promise<VendorOrder> {
    const response = await api.get<CategoryApiResponse<VendorOrder>>(
      `/vendor/orders/${id}`
    )
    return response.data.data
  },
  async updateVendorPayment(
    vendorOrderId: number,
    input: { status: PaymentStatus; transaction_reference?: string }
  ): Promise<Payment> {
    const response = await api.patch<CategoryApiResponse<Payment>>(
      `/vendor/orders/${vendorOrderId}/payment`,
      input
    )
    return response.data.data
  },
  async adminOrders(
    params?: Record<string, string | number>
  ): Promise<Paginated<Order>> {
    const response = await api.get<CategoryApiResponse<Paginated<Order>>>(
      "/admin/orders",
      { params }
    )
    return paginated(response.data.data)
  },
  async adminOrder(id: number): Promise<Order> {
    const response = await api.get<CategoryApiResponse<Order>>(
      `/admin/orders/${id}`
    )
    return response.data.data
  },
  async adminVendorOrders(
    params?: Record<string, string | number>
  ): Promise<Paginated<VendorOrder>> {
    const response = await api.get<CategoryApiResponse<Paginated<VendorOrder>>>(
      "/admin/vendor-orders",
      { params }
    )
    return paginated(response.data.data)
  },
  async adminVendorOrder(id: number): Promise<VendorOrder> {
    const response = await api.get<CategoryApiResponse<VendorOrder>>(
      `/admin/vendor-orders/${id}`
    )
    return response.data.data
  },
  async adminPayments(
    params?: Record<string, string | number>
  ): Promise<Paginated<Payment>> {
    const response = await api.get<CategoryApiResponse<Paginated<Payment>>>(
      "/admin/payments",
      { params }
    )
    return paginated(response.data.data)
  },
}

export type Conversation = {
  id: number
  vendor_order_id: number
  subject: string | null
  unread_count?: number
  vendor?: { id: number; display_name: string; slug?: string | null; logo?: string | null }
  messages: Array<{ id: number; body: string; created_at: string; sender?: { id: number; name: string } }>
}

export const conversationService = {
  async forVendorOrder(vendorOrderId: number): Promise<Conversation | null> {
    const response = await api.get<CategoryApiResponse<Conversation | null>>(
      `/conversations/vendor-orders/${vendorOrderId}`
    )
    return response.data.data
  },
  async start(vendorOrderId: number): Promise<Conversation> {
    const response = await api.post<CategoryApiResponse<Conversation>>("/conversations", {
      vendor_order_id: vendorOrderId,
    })
    return response.data.data
  },
  async send(conversationId: number, body: string): Promise<Conversation> {
    const response = await api.post<CategoryApiResponse<Conversation>>(
      `/conversations/${conversationId}/messages`,
      { body }
    )
    return response.data.data
  },
  async show(conversationId: number): Promise<Conversation> {
    const response = await api.get<CategoryApiResponse<Conversation>>(
      `/conversations/${conversationId}`
    )
    return response.data.data
  },
}
