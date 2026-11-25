"use client"

import { useState } from "react"
import { CheckCircle, Eye, Prohibit, XCircle } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useVendors } from "@/hooks/useVendors"
import { notifyError } from "@/lib/notifications"
import { vendorService } from "@/services/vendorService"
import type { Vendor, VendorStatus } from "@/types/vendor"

const statuses: Array<"all" | VendorStatus> = ["all", "pending", "active", "rejected", "suspended"]
const statusLabel: Record<"all" | VendorStatus, string> = { all: "All", pending: "Pending", active: "Approved", rejected: "Rejected", suspended: "Suspended" }

export function AdminVendorManagement() {
  const [status, setStatus] = useState<"all" | VendorStatus>("pending")
  const [selected, setSelected] = useState<Vendor | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [rejecting, setRejecting] = useState<Vendor | null>(null)
  const { isLoading, refresh, vendors } = useVendors(status === "all" ? undefined : status)

  const act = async (action: () => Promise<unknown>) => {
    try {
      await action()
      await refresh()
      if (selected) setSelected(await vendorService.show(selected.id))
    } catch (error) {
      notifyError(error)
    }
  }

  const previewDocument = async (vendorId: number, documentId: number) => {
    const previewWindow = window.open("", "_blank")
    try {
      const file = await vendorService.previewDocument(vendorId, documentId)
      const url = URL.createObjectURL(file)
      if (previewWindow) {
        previewWindow.location.href = url
      } else {
        window.open(url, "_blank")
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (error) {
      previewWindow?.close()
      notifyError(error)
    }
  }

  return <div className="mx-auto max-w-6xl">
    <div className="mb-7">
      <div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Marketplace trust</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Vendor applications.</h1></div>
      <div className="mt-6 flex flex-wrap gap-2">{statuses.map((item) => <Button key={item} onPress={() => setStatus(item)} size="sm" variant={status === item ? "default" : "outline"}>{statusLabel[item]}</Button>)}</div>
    </div>
    <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white p-0 shadow-none">
      {isLoading ? <p className="p-8 text-sm text-brand-gray-3">Loading vendor applications…</p> : vendors.length === 0 ? <p className="p-10 text-center text-sm text-brand-gray-3">No vendors in this status.</p> : <div className="divide-y divide-[#edf0ea]">{vendors.map((vendor) => <div className="p-5" key={vendor.id}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-brand">{vendor.display_name}</p><p className="mt-1 text-xs text-brand-gray-3">{vendor.user?.name ?? "Vendor"} · {vendor.user?.email ?? ""} · {vendor.vendor_type}</p><Badge className={`mt-3 border px-2.5 text-xs font-semibold ${vendor.status === "active" ? "border-[#dce8d8] bg-brand-yellow-bg text-brand-3" : vendor.status === "rejected" ? "border-[#f1d3ba] bg-brand-peach-bg text-brand-orange-3" : vendor.status === "suspended" ? "border-border bg-muted text-muted-foreground" : "border-[#dce8d8] bg-[#f7f9f4] text-brand-3"}`} variant="outline">{vendor.status === "pending" ? "Pending review" : vendor.status}</Badge></div><div className="flex flex-wrap gap-2"><Button onPress={() => void act(async () => setSelected(await vendorService.show(vendor.id)))} size="sm" variant="outline"><Eye size={15} /> Review</Button>{vendor.status === "pending" ? <><Button onPress={() => void act(() => vendorService.approve(vendor.id))} size="sm"><CheckCircle size={15} /> Approve</Button><Button onPress={() => { setRejecting(vendor); setRejectionReason("") }} size="sm" variant="outline"><XCircle size={15} /> Reject</Button></> : null}{vendor.status === "active" ? <Button onPress={() => void act(() => vendorService.suspend(vendor.id))} size="sm" variant="outline"><Prohibit size={15} /> Suspend</Button> : null}</div></div>
      </div>)}</div>}
    </Card>
    {selected ? <Dialog isOpen onOpenChange={(open) => !open && setSelected(null)}><DialogHeader><DialogTitle>{selected.display_name}</DialogTitle><DialogDescription>{selected.user?.name} · {selected.user?.email}</DialogDescription></DialogHeader><div className="space-y-4"><p className="text-sm leading-6 text-brand-light">{selected.description || "No shop description supplied."}</p><div className="rounded-2xl bg-[#f7f9f4] p-4 text-sm"><p className="font-semibold text-brand">Business profile</p><p className="mt-1 text-brand-light">{selected.business_profile?.legal_business_name || selected.business_profile?.contact_person || "No additional business information."}</p></div><div><p className="text-sm font-semibold text-brand">Supporting documents</p><div className="mt-2 space-y-2">{selected.documents?.map((document) => <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e3e9df] p-3" key={document.id}><div><p className="text-xs text-brand">{document.document_type} · {document.original_filename}</p><span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${document.verification_status === "approved" ? "bg-brand-yellow-bg text-brand-3" : document.verification_status === "rejected" ? "bg-brand-peach-bg text-brand-orange-3" : "bg-[#f2f5ef] text-brand-gray-3"}`}>{document.verification_status === "approved" ? "Verified" : document.verification_status === "rejected" ? "Declined" : "Awaiting review"}</span></div><div className="flex flex-wrap gap-2"><Button onPress={() => void previewDocument(selected.id, document.id)} size="sm" variant="outline">Preview</Button>{document.verification_status !== "approved" ? <Button onPress={() => void act(() => vendorService.verifyDocument(selected.id, document.id, "approved"))} size="sm" variant="outline">Verify</Button> : null}{document.verification_status !== "rejected" ? <Button onPress={() => void act(() => vendorService.verifyDocument(selected.id, document.id, "rejected", "Document needs correction."))} size="sm" variant="outline">Decline</Button> : null}</div></div>) ?? <p className="text-xs text-brand-gray-3">No documents uploaded.</p>}</div></div></div><DialogFooter showCloseButton /></Dialog> : null}
    {rejecting ? <Dialog isOpen onOpenChange={(open) => !open && setRejecting(null)}><DialogHeader><DialogTitle>Reject {rejecting.display_name}?</DialogTitle><DialogDescription>Tell the vendor what they need to correct.</DialogDescription></DialogHeader><Textarea aria-label="Rejection reason" onChange={(event) => setRejectionReason(event.target.value)} placeholder="Reason for rejection" value={rejectionReason} /><DialogFooter><DialogClose variant="outline">Cancel</DialogClose><Button onPress={() => { if (!rejectionReason.trim()) return notifyError("A rejection reason is required."); void act(async () => { await vendorService.reject(rejecting.id, rejectionReason); setRejecting(null) }) }}>Reject application</Button></DialogFooter></Dialog> : null}
  </div>
}
