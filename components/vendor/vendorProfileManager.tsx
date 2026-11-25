"use client"

import { useEffect, useState } from "react"
import { Plus, Trash } from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useVendor } from "@/hooks/useVendors"
import { notifyError, notifySuccess } from "@/lib/notifications"
import { vendorService } from "@/services/vendorService"
import { useAuthStore } from "@/stores/authStore"
import type { VendorBusinessProfileInput, VendorProfileInput } from "@/types/vendor"

const field = "h-11 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-sm text-brand shadow-sm shadow-[#274b3e]/[0.02] focus-visible:border-[#7fa88c] focus-visible:ring-[#7fa88c]/20"
const label = "text-xs font-semibold text-brand-5"

export function VendorProfileManager() {
  const vendorId = useAuthStore((state) => state.user?.vendor?.id ?? null)
  const { isLoading, refresh, save, vendor } = useVendor(vendorId)
  const [profile, setProfile] = useState<Record<string, string>>({})
  const [business, setBusiness] = useState<Record<string, string>>({})
  const [logo, setLogo] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateName, setCertificateName] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!vendor) return
    setProfile({ display_name: vendor.display_name, description: vendor.description ?? "", contact_email: vendor.contact_email ?? "", contact_phone: vendor.contact_phone ?? "", address: vendor.address ?? "", website_url: vendor.website_url ?? "", facebook_url: vendor.facebook_url ?? "", instagram_url: vendor.instagram_url ?? "" })
    setBusiness({ legal_business_name: vendor.business_profile?.legal_business_name ?? "", registration_number: vendor.business_profile?.registration_number ?? "", tax_number: vendor.business_profile?.tax_number ?? "", contact_person: vendor.business_profile?.contact_person ?? "", business_type: vendor.business_profile?.business_type ?? "", business_address: vendor.business_profile?.business_address ?? "" })
  }, [vendor])

  const change = (setter: typeof setProfile, key: string, value: string) => setter((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!vendor || !profile.display_name?.trim()) return notifyError("Shop name is required.")
    setSaving(true)
    try {
      await save({ ...profile, vendor_type: vendor.vendor_type, logo, cover_image: coverImage } as VendorProfileInput, business as VendorBusinessProfileInput)
      setLogo(null); setCoverImage(null)
      notifySuccess("Shop profile saved.")
    } catch (error) { notifyError(error) } finally { setSaving(false) }
  }
  const uploadDocument = async () => {
    if (!vendor || !documentFile || !documentType.trim()) return notifyError("Choose a document type and file.")
    try { await vendorService.addDocument(vendor.id, documentType, documentFile); setDocumentFile(null); setDocumentType(""); await refresh(); notifySuccess("Document uploaded for review.") } catch (error) { notifyError(error) }
  }
  const uploadCertification = async () => {
    if (!vendor || !certificateName.trim()) return notifyError("Certification name is required.")
    try { await vendorService.addCertification(vendor.id, { name: certificateName, file: certificateFile }); setCertificateFile(null); setCertificateName(""); await refresh(); notifySuccess("Certification added.") } catch (error) { notifyError(error) }
  }

  if (isLoading || !vendor) return <p className="text-sm text-brand-gray-3">Loading your shop profile…</p>
  return <form className="mx-auto max-w-5xl space-y-6" onSubmit={submit} noValidate>
    <div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Your storefront</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Shop profile.</h1></div>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Shop information</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><div className="flex flex-col gap-2"><Label className={label}>Shop logo</Label><ImageUploader existingImage={vendor.logo ?? undefined} label="Add shop logo" onChange={setLogo} value={logo} /></div><div className="flex flex-col gap-2"><Label className={label}>Shop cover</Label><ImageUploader existingImage={vendor.cover_image ?? undefined} label="Add shop cover" onChange={setCoverImage} value={coverImage} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="display-name">Shop name</Label><Input className={field} id="display-name" onChange={(event) => change(setProfile, "display_name", event.target.value)} value={profile.display_name ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="contact-email">Contact email</Label><Input className={field} id="contact-email" onChange={(event) => change(setProfile, "contact_email", event.target.value)} type="email" value={profile.contact_email ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="contact-phone">Contact phone</Label><Input className={field} id="contact-phone" onChange={(event) => change(setProfile, "contact_phone", event.target.value)} value={profile.contact_phone ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="website">Website</Label><Input className={field} id="website" onChange={(event) => change(setProfile, "website_url", event.target.value)} value={profile.website_url ?? ""} /></div><div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="description">Shop description</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="description" onChange={(event) => change(setProfile, "description", event.target.value)} value={profile.description ?? ""} /></div><div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="address">Address</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="address" onChange={(event) => change(setProfile, "address", event.target.value)} value={profile.address ?? ""} /></div></div></Card>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Business details</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{[["legal_business_name", "Legal business name"], ["registration_number", "Registration number"], ["tax_number", "Tax number"], ["contact_person", "Contact person"], ["business_type", "Business type"]].map(([key, text]) => <div className="flex flex-col gap-2" key={key}><Label className={label} htmlFor={key}>{text}</Label><Input className={field} id={key} onChange={(event) => change(setBusiness, key, event.target.value)} value={business[key] ?? ""} /></div>)}<div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="business-address">Business address</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="business-address" onChange={(event) => change(setBusiness, "business_address", event.target.value)} value={business.business_address ?? ""} /></div></div></Card>
    <Button isDisabled={saving} type="submit">{saving ? "Saving…" : "Save profile"}</Button>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Documents</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Input className={field} onChange={(event) => setDocumentType(event.target.value)} placeholder="Document type" value={documentType} /><Input accept=".pdf,image/jpeg,image/png,image/webp" className={field} onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)} type="file" /><Button onPress={uploadDocument} type="button"><Plus size={16} /> Add document</Button></div><div className="mt-4 space-y-2">{vendor.documents?.map((document) => <div className="flex items-center justify-between rounded-xl bg-[#f7f9f4] p-3 text-sm" key={document.id}><span>{document.document_type} · {document.original_filename} <span className="capitalize text-brand-gray-3">({document.verification_status})</span></span><Button onPress={() => void vendorService.removeDocument(vendor.id, document.id).then(refresh).catch(notifyError)} size="sm" type="button" variant="outline"><Trash size={15} /></Button></div>)}</div></Card>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Certifications</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Input className={field} onChange={(event) => setCertificateName(event.target.value)} placeholder="Certification name" value={certificateName} /><Input accept=".pdf,image/jpeg,image/png,image/webp" className={field} onChange={(event) => setCertificateFile(event.target.files?.[0] ?? null)} type="file" /><Button onPress={uploadCertification} type="button"><Plus size={16} /> Add certification</Button></div><div className="mt-4 space-y-2">{vendor.certifications?.map((certification) => <div className="flex items-center justify-between rounded-xl bg-[#f7f9f4] p-3 text-sm" key={certification.id}><span>{certification.name}</span><Button onPress={() => void vendorService.removeCertification(vendor.id, certification.id).then(refresh).catch(notifyError)} size="sm" type="button" variant="outline"><Trash size={15} /></Button></div>)}</div></Card>
  </form>
}
