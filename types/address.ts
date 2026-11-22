export type UserAddress = {
  id: number
  label: string | null
  recipient_name: string | null
  recipient_phone: string | null
  address_line_1: string
  address_line_2: string | null
  township: string | null
  city: string | null
  state_region: string | null
  postal_code: string | null
  country: string | null
  is_default: boolean
}
