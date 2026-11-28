"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Eye, PencilSimple, Plus, Trash } from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useVendor } from "@/hooks/useVendors"
import { useGeolocation } from "@/hooks/useGeolocation"
import { notifyError, notifySuccess } from "@/lib/notifications"
import { resolveMediaUrl } from "@/lib/media"
import { vendorService } from "@/services/vendorService"
import { useAuthStore } from "@/stores/authStore"
import type { Vendor, VendorBusinessProfileInput, VendorProfileInput } from "@/types/vendor"

const VendorLocationMap = dynamic(
  () => import("@/components/shop/vendorLocationMap").then((module) => module.VendorLocationMap),
  { ssr: false }
)

const field = "h-11 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-sm text-brand shadow-sm shadow-[#274b3e]/[0.02] focus-visible:border-[#7fa88c] focus-visible:ring-[#7fa88c]/20"
const label = "text-xs font-semibold text-brand-5"

function VerificationFiles({ vendor, onPreview }: { vendor: Vendor; onPreview: (file: () => Promise<Blob>) => void }) {
  const files = [
    ...(vendor.documents ?? []).map((document) => ({ id: `document-${document.id}`, label: document.original_filename || document.document_type, meta: document.document_type, file: () => vendorService.previewOwnDocument(vendor.id, document.id) })),
    ...(vendor.certifications ?? []).filter((certification) => Boolean(certification.file_path)).map((certification) => ({ id: `certification-${certification.id}`, label: certification.name, meta: "Certification", file: () => vendorService.previewCertification(vendor.id, certification.id) })),
  ]

  return <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Verification files</h2>{files.length === 0 ? <p className="mt-2 text-sm text-brand-light">No verification files uploaded yet.</p> : <div className="mt-4 space-y-2">{files.map((file) => <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f7f9f4] p-3" key={file.id}><div className="min-w-0"><p className="truncate text-sm font-medium text-brand">{file.label}</p><p className="mt-1 text-xs text-brand-gray-3">{file.meta}</p></div><Button onPress={() => onPreview(file.file)} size="sm" type="button" variant="outline"><Eye size={15} /> Preview</Button></div>)}</div>}</Card>
}

export function VendorProfileManager() {
  const vendorId = useAuthStore((state) => state.user?.vendor?.id ?? null)
  const { isLoading, refresh, save, vendor } = useVendor(vendorId)
  const geolocation = useGeolocation()
  const [profile, setProfile] = useState<Record<string, string>>({})
  const [business, setBusiness] = useState<Record<string, string>>({})
  const [logo, setLogo] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateName, setCertificateName] = useState("")
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!vendor) return
    const frame = window.requestAnimationFrame(() => {
      setProfile({ display_name: vendor.display_name, description: vendor.description ?? "", contact_email: vendor.contact_email ?? "", contact_phone: vendor.contact_phone ?? "", address: vendor.address ?? "", latitude: vendor.latitude?.toString() ?? "", longitude: vendor.longitude?.toString() ?? "", website_url: vendor.website_url ?? "", facebook_url: vendor.facebook_url ?? "", instagram_url: vendor.instagram_url ?? "" })
      setBusiness({ legal_business_name: vendor.business_profile?.legal_business_name ?? "", registration_number: vendor.business_profile?.registration_number ?? "", tax_number: vendor.business_profile?.tax_number ?? "", contact_person: vendor.business_profile?.contact_person ?? "", business_type: vendor.business_profile?.business_type ?? "", business_address: vendor.business_profile?.business_address ?? "" })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [vendor])

  useEffect(() => {
    if (!geolocation.location) return
    const frame = window.requestAnimationFrame(() => {
      setProfile((current) => ({
        ...current,
        latitude: geolocation.location?.latitude.toFixed(7) ?? "",
        longitude: geolocation.location?.longitude.toFixed(7) ?? "",
      }))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [geolocation.location])

  const change = (setter: typeof setProfile, key: string, value: string) => setter((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!vendor || !profile.display_name?.trim()) return notifyError("Shop name is required.")
    setSaving(true)
    try {
      await save({ ...profile, vendor_type: vendor.vendor_type, logo, cover_image: coverImage } as VendorProfileInput, business as VendorBusinessProfileInput)
      setLogo(null); setCoverImage(null)
      notifySuccess("Shop profile saved.")
      setIsEditing(false)
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
  const previewFile = async (load: () => Promise<Blob>) => {
    const previewWindow = window.open("", "_blank")
    try {
      const url = URL.createObjectURL(await load())
      if (previewWindow) previewWindow.location.href = url
      else window.open(url, "_blank")
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (error) {
      previewWindow?.close()
      notifyError(error)
    }
  }

  const latitude = Number(profile.latitude)
  const longitude = Number(profile.longitude)
  const hasLocation = Boolean(profile.latitude?.trim() && profile.longitude?.trim()) && Number.isFinite(latitude) && Number.isFinite(longitude)

  if (isLoading || !vendor) return <p className="text-sm text-brand-gray-3">Loading your shop profile…</p>
  if (!isEditing) return <div className="mx-auto max-w-5xl space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Your storefront</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Shop profile.</h1></div><Button onPress={() => setIsEditing(true)}><PencilSimple size={16} /> Edit profile</Button></div><Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white shadow-none">{vendor.cover_image ? <img alt={`${vendor.display_name} cover`} className="h-52 w-full object-cover" src={resolveMediaUrl(vendor.cover_image)} /> : <div className="h-28 bg-[#f5f8f1]" />}<div className="p-6"><div className="flex flex-wrap items-center gap-5">{vendor.logo ? <img alt={`${vendor.display_name} logo`} className="size-20 rounded-2xl border border-[#e3e9df] object-cover" src={resolveMediaUrl(vendor.logo)} /> : <div className="flex size-20 items-center justify-center rounded-2xl bg-[#f5f8f1] text-xs text-brand-gray-3">No logo</div>}<div><h2 className="text-xl font-semibold text-brand">{vendor.display_name}</h2><p className="mt-1 text-sm capitalize text-brand-light">{vendor.vendor_type} seller</p></div></div><p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-brand-light">{vendor.description || "No shop description supplied."}</p><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-brand-gray-3">Contact email</dt><dd className="mt-1 font-medium text-brand">{vendor.contact_email || "—"}</dd></div><div><dt className="text-brand-gray-3">Contact phone</dt><dd className="mt-1 font-medium text-brand">{vendor.contact_phone || "—"}</dd></div><div><dt className="text-brand-gray-3">Address</dt><dd className="mt-1 font-medium text-brand">{vendor.address || "—"}</dd></div><div><dt className="text-brand-gray-3">Business profile</dt><dd className="mt-1 font-medium text-brand">{vendor.business_profile?.legal_business_name || "—"}</dd></div></dl></div></Card>{vendor.latitude != null && vendor.longitude != null ? <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold text-brand">Shop location</h2><p className="mt-1 text-sm text-brand-light">{vendor.address || "Saved shop location"}</p></div><a className="text-sm font-semibold text-brand-3" href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.latitude},${vendor.longitude}`} rel="noreferrer" target="_blank">Open directions ↗</a></div><div className="mt-4"><VendorLocationMap label={vendor.display_name} latitude={vendor.latitude} longitude={vendor.longitude} /></div></Card> : null}<VerificationFiles onPreview={(file) => void previewFile(file)} vendor={vendor} /></div>
  if (!isEditing) return <div className="mx-auto max-w-5xl space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Your storefront</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Shop profile.</h1></div><Button onPress={() => setIsEditing(true)}><PencilSimple size={16} /> Edit profile</Button></div><Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white shadow-none">{vendor.cover_image ? <img alt={`${vendor.display_name} cover`} className="h-52 w-full object-cover" src={resolveMediaUrl(vendor.cover_image)} /> : <div className="h-28 bg-[#f5f8f1]" />}<div className="p-6"><div className="flex flex-wrap items-center gap-5">{vendor.logo ? <img alt={`${vendor.display_name} logo`} className="size-20 rounded-2xl border border-[#e3e9df] object-cover" src={resolveMediaUrl(vendor.logo)} /> : <div className="flex size-20 items-center justify-center rounded-2xl bg-[#f5f8f1] text-xs text-brand-gray-3">No logo</div>}<div><h2 className="text-xl font-semibold text-brand">{vendor.display_name}</h2><p className="mt-1 text-sm capitalize text-brand-light">{vendor.vendor_type} seller</p></div></div><p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-brand-light">{vendor.description || "No shop description supplied."}</p><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-brand-gray-3">Contact email</dt><dd className="mt-1 font-medium text-brand">{vendor.contact_email || "—"}</dd></div><div><dt className="text-brand-gray-3">Contact phone</dt><dd className="mt-1 font-medium text-brand">{vendor.contact_phone || "—"}</dd></div><div><dt className="text-brand-gray-3">Address</dt><dd className="mt-1 font-medium text-brand">{vendor.address || "—"}</dd></div><div><dt className="text-brand-gray-3">Business profile</dt><dd className="mt-1 font-medium text-brand">{vendor.business_profile?.legal_business_name || "—"}</dd></div></dl></div></Card><Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Verification files</h2><p className="mt-2 text-sm text-brand-light">{vendor.documents?.length ?? 0} document(s) and {vendor.certifications?.length ?? 0} certification(s) saved.</p></Card></div>
  return <form className="mx-auto max-w-5xl space-y-6" onSubmit={submit} noValidate>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Your storefront</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Edit shop profile.</h1></div><Button onPress={() => setIsEditing(false)} type="button" variant="outline">Cancel</Button></div>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Shop information</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><div className="flex flex-col gap-2"><Label className={label}>Shop logo</Label><ImageUploader existingImage={vendor.logo ?? undefined} label="Add shop logo" onChange={setLogo} value={logo} /></div><div className="flex flex-col gap-2"><Label className={label}>Shop cover</Label><ImageUploader existingImage={vendor.cover_image ?? undefined} label="Add shop cover" onChange={setCoverImage} value={coverImage} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="display-name">Shop name</Label><Input className={field} id="display-name" onChange={(event) => change(setProfile, "display_name", event.target.value)} value={profile.display_name ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="contact-email">Contact email</Label><Input className={field} id="contact-email" onChange={(event) => change(setProfile, "contact_email", event.target.value)} type="email" value={profile.contact_email ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="contact-phone">Contact phone</Label><Input className={field} id="contact-phone" onChange={(event) => change(setProfile, "contact_phone", event.target.value)} value={profile.contact_phone ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="website">Website</Label><Input className={field} id="website" onChange={(event) => change(setProfile, "website_url", event.target.value)} value={profile.website_url ?? ""} /></div><div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="description">Shop description</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="description" onChange={(event) => change(setProfile, "description", event.target.value)} value={profile.description ?? ""} /></div><div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="address">Address</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="address" onChange={(event) => change(setProfile, "address", event.target.value)} value={profile.address ?? ""} /></div><div className="flex flex-col gap-2 md:col-span-2"><div className="flex flex-wrap items-end justify-between gap-3"><div><Label className={label}>Shop location</Label><p className="mt-1 text-xs text-brand-gray-3">Used to show your listings to nearby visitors.</p></div><Button onPress={geolocation.locate} type="button" variant="outline">Use my current location</Button></div><div className="grid gap-5 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label className={label} htmlFor="latitude">Latitude</Label><Input className={field} id="latitude" inputMode="decimal" onChange={(event) => change(setProfile, "latitude", event.target.value)} placeholder="e.g. 16.8409" value={profile.latitude ?? ""} /></div><div className="flex flex-col gap-2"><Label className={label} htmlFor="longitude">Longitude</Label><Input className={field} id="longitude" inputMode="decimal" onChange={(event) => change(setProfile, "longitude", event.target.value)} placeholder="e.g. 96.1735" value={profile.longitude ?? ""} /></div></div>{hasLocation ? <div className="mt-1 md:col-span-2"><p className="mb-2 text-xs text-brand-gray-3">Preview pin location</p><VendorLocationMap label={profile.display_name || "Your shop"} latitude={latitude} longitude={longitude} /></div> : null}</div></div></Card>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Business details</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{[["legal_business_name", "Legal business name"], ["registration_number", "Registration number"], ["tax_number", "Tax number"], ["contact_person", "Contact person"], ["business_type", "Business type"]].map(([key, text]) => <div className="flex flex-col gap-2" key={key}><Label className={label} htmlFor={key}>{text}</Label><Input className={field} id={key} onChange={(event) => change(setBusiness, key, event.target.value)} value={business[key] ?? ""} /></div>)}<div className="flex flex-col gap-2 md:col-span-2"><Label className={label} htmlFor="business-address">Business address</Label><Textarea className="rounded-[14px] border-[#dfe6dc] bg-white text-brand" id="business-address" onChange={(event) => change(setBusiness, "business_address", event.target.value)} value={business.business_address ?? ""} /></div></div></Card>
    <Button isDisabled={saving} type="submit">{saving ? "Saving…" : "Save profile"}</Button>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Documents</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Input className={field} onChange={(event) => setDocumentType(event.target.value)} placeholder="Document type" value={documentType} /><Input accept=".pdf,image/jpeg,image/png,image/webp" className={field} onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)} type="file" /><Button onPress={uploadDocument} type="button"><Plus size={16} /> Add document</Button></div><div className="mt-4 space-y-2">{vendor.documents?.map((document) => <div className="flex items-center justify-between rounded-xl bg-[#f7f9f4] p-3 text-sm" key={document.id}><span>{document.document_type} · {document.original_filename} <span className="capitalize text-brand-gray-3">({document.verification_status})</span></span><Button onPress={() => void vendorService.removeDocument(vendor.id, document.id).then(refresh).catch(notifyError)} size="sm" type="button" variant="outline"><Trash size={15} /></Button></div>)}</div></Card>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Certifications</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Input className={field} onChange={(event) => setCertificateName(event.target.value)} placeholder="Certification name" value={certificateName} /><Input accept=".pdf,image/jpeg,image/png,image/webp" className={field} onChange={(event) => setCertificateFile(event.target.files?.[0] ?? null)} type="file" /><Button onPress={uploadCertification} type="button"><Plus size={16} /> Add certification</Button></div><div className="mt-4 space-y-2">{vendor.certifications?.map((certification) => <div className="flex items-center justify-between rounded-xl bg-[#f7f9f4] p-3 text-sm" key={certification.id}><span>{certification.name}</span><Button onPress={() => void vendorService.removeCertification(vendor.id, certification.id).then(refresh).catch(notifyError)} size="sm" type="button" variant="outline"><Trash size={15} /></Button></div>)}</div></Card>
  </form>
}
