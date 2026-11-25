export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_for_delivery"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export type ApprovalStatus = "pending" | "approved"

export type CartItem = {
  id: number
  product_id: number
  variant_id: number | null
  quantity: number
  unit_price: string
  product: {
    id: number
    name: string
    slug: string
    sku: string | null
    images: {
      id: number
      image_path: string
      alt_text: string | null
      is_primary: boolean
    }[]
    vendor: { id: number; display_name: string } | null
    category?: { name: string } | null
  }
  variant: { id: number; sku: string | null; price: string } | null
}

export type Cart = { id: number; currency: string; items: CartItem[] }

export type OrderItem = {
  id: number
  product_name: string
  product_sku: string | null
  variant_description?: string | null
  product_image: string | null
  quantity: number
  unit_price: string
  line_total: string
}
export type ShipmentStatus = "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed" | "returned"
export type ShipmentHistory = { id: number; status: ShipmentStatus; note: string | null; updated_by: number | null; created_at: string }
export type Shipment = {
  id: number
  vendor_order_id: number
  tracking_number: string | null
  carrier_name: string | null
  delivery_contact_name: string | null
  delivery_contact_phone: string | null
  estimated_delivery_at: string | null
  status: ShipmentStatus
  shipped_at: string | null
  delivered_at: string | null
  delivery_note: string | null
  history: ShipmentHistory[]
}
export type VendorOrder = {
  id: number
  vendor_order_number: string
  order_id: number
  subtotal: string
  delivery_fee: string
  discount_amount: string
  grand_total: string
  status: OrderStatus
  approval_status: ApprovalStatus
  approved_at: string | null
  vendor_note: string | null
  cancellation_reason: string | null
  shipment?: Shipment | null
  items: OrderItem[]
  vendor?: { id: number; display_name: string; slug?: string | null; logo?: string | null }
  order?: {
    id: number
    order_number: string
    approval_status: ApprovalStatus
    customer: { id: number; name: string; email: string } | null
    shipping_address: ShippingAddress
    payment_method: string
    payment_status: string
    payment?: { id: number; status: PaymentStatus } | null
  }
}

export type ShippingAddress = {
  name: string
  phone: string
  address: string
}

export type Order = {
  id: number
  order_number: string
  subtotal: string
  discount_amount: string
  delivery_fee: string
  tax_amount: string
  grand_total: string
  status: OrderStatus
  approval_status: ApprovalStatus
  payment_method: string
  payment_status: string
  customer?: { id: number; name: string; email: string } | null
  shipping_address?: ShippingAddress
  billing_address?: Record<string, string> | null
  customer_note?: string | null
  placed_at: string | null
  vendor_orders: VendorOrder[]
}
export type Paginated<T> = {
  data: T[]
  links?: Record<string, string | null>
  meta?: { current_page: number; last_page: number; total: number }
}

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded"

export type Payment = {
  id: number
  order_id: number
  payment_method: string
  status: PaymentStatus
  amount: string
  transaction_reference: string | null
  order?: {
    id: number
    order_number: string
    customer: { id: number; name: string; email: string } | null
  }
}
