import { api } from "@/lib/api"
import type { ApiResponse } from "@/types/auth"
import type {
  Vendor,
  VendorBusinessProfileInput,
  VendorCertification,
  VendorDocument,
  VendorProfileInput,
  VendorStatus,
} from "@/types/vendor"

function appendInput(formData: FormData, input: Record<string, unknown>) {
  Object.entries(input).forEach(([key, value]) => {
    if (value instanceof File) formData.append(key, value)
    else if (value !== undefined && value !== null && value !== "") formData.append(key, String(value))
  })
}

export const vendorService = {
  async list(status?: VendorStatus): Promise<Vendor[]> {
    const response = await api.get<ApiResponse<Vendor[]>>("/admin/vendors", { params: status ? { status } : undefined })
    return response.data.data
  },

  async show(id: number): Promise<Vendor> {
    const response = await api.get<ApiResponse<Vendor>>(`/vendors/${id}`)
    return response.data.data
  },

  async update(id: number, input: VendorProfileInput): Promise<Vendor> {
    const formData = new FormData()
    appendInput(formData, input)
    formData.append("_method", "PUT")
    const response = await api.post<ApiResponse<Vendor>>(`/vendors/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },

  async saveBusinessProfile(id: number, input: VendorBusinessProfileInput): Promise<void> {
    await api.put(`/vendors/${id}/business-profile`, input)
  },

  async addDocument(id: number, documentType: string, file: File): Promise<VendorDocument> {
    const formData = new FormData()
    formData.append("document_type", documentType)
    formData.append("file", file)
    const response = await api.post<ApiResponse<VendorDocument>>(`/vendors/${id}/documents`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },

  async removeDocument(vendorId: number, documentId: number): Promise<void> {
    await api.delete(`/vendors/${vendorId}/documents/${documentId}`)
  },

  async addCertification(id: number, input: { name: string; certificate_number?: string; issuer?: string; file?: File | null }): Promise<VendorCertification> {
    const formData = new FormData()
    appendInput(formData, input)
    const response = await api.post<ApiResponse<VendorCertification>>(`/vendors/${id}/certifications`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },

  async removeCertification(vendorId: number, certificationId: number): Promise<void> {
    await api.delete(`/vendors/${vendorId}/certifications/${certificationId}`)
  },

  async approve(id: number): Promise<Vendor> {
    const response = await api.post<ApiResponse<Vendor>>(`/admin/vendors/${id}/approve`)
    return response.data.data
  },

  async reject(id: number, rejectionReason: string): Promise<Vendor> {
    const response = await api.post<ApiResponse<Vendor>>(`/admin/vendors/${id}/reject`, { rejection_reason: rejectionReason })
    return response.data.data
  },

  async suspend(id: number): Promise<Vendor> {
    const response = await api.post<ApiResponse<Vendor>>(`/admin/vendors/${id}/suspend`)
    return response.data.data
  },

  async verifyDocument(vendorId: number, documentId: number, verificationStatus: VendorDocument["verification_status"], remarks?: string): Promise<VendorDocument> {
    const response = await api.patch<ApiResponse<VendorDocument>>(`/admin/vendors/${vendorId}/documents/${documentId}`, { verification_status: verificationStatus, remarks })
    return response.data.data
  },

  async previewDocument(vendorId: number, documentId: number): Promise<Blob> {
    const response = await api.get(`/admin/vendors/${vendorId}/documents/${documentId}/file`, {
      responseType: "blob",
    })
    return response.data
  },

  async previewOwnDocument(vendorId: number, documentId: number): Promise<Blob> {
    const response = await api.get(`/vendors/${vendorId}/documents/${documentId}/file`, {
      responseType: "blob",
    })
    return response.data
  },

  async previewCertification(vendorId: number, certificationId: number): Promise<Blob> {
    const response = await api.get(`/vendors/${vendorId}/certifications/${certificationId}/file`, {
      responseType: "blob",
    })
    return response.data
  },
}
