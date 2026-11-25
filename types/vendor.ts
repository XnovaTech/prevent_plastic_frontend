export type VendorStatus = "pending" | "active" | "rejected" | "suspended"

export type VendorDocument = {
  id: number
  document_type: string
  original_filename?: string | null
  verification_status: "pending" | "approved" | "rejected"
  remarks?: string | null
  created_at?: string
}

export type VendorCertification = {
  id: number
  name: string
  certificate_number?: string | null
  issuer?: string | null
  issued_at?: string | null
  expires_at?: string | null
  file_path?: string | null
}

export type VendorBusinessProfile = {
  legal_business_name?: string | null
  registration_number?: string | null
  tax_number?: string | null
  contact_person?: string | null
  business_type?: string | null
  business_address?: string | null
}

export type Vendor = {
  id: number
  user_id: number
  vendor_type: "individual" | "business"
  display_name: string
  slug: string
  description?: string | null
  logo?: string | null
  cover_image?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  website_url?: string | null
  facebook_url?: string | null
  instagram_url?: string | null
  address?: string | null
  status: VendorStatus
  rejection_reason?: string | null
  approved_at?: string | null
  user?: { id: number; name: string; email: string; phone?: string | null; status: string }
  business_profile?: VendorBusinessProfile | null
  documents?: VendorDocument[]
  certifications?: VendorCertification[]
}

export type VendorProfileInput = Omit<
  Vendor,
  "id" | "user_id" | "slug" | "status" | "user" | "business_profile" | "documents" | "certifications" | "rejection_reason" | "approved_at"
  | "logo" | "cover_image"
> & {
  logo?: File | null
  cover_image?: File | null
}

export type VendorBusinessProfileInput = VendorBusinessProfile
