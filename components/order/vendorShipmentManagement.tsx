"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useShipments, useVendorOrders } from "@/hooks/useOrders"
import { notifyError, notifySuccess } from "@/lib/notifications"
import type { ShipmentStatus } from "@/types/order"

const statuses: ShipmentStatus[] = ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered", "failed", "returned"]
const field = "h-11 rounded-[14px] border-[#dfe6dc] bg-white text-brand"

export function VendorShipmentManagement() {
  const { orders } = useVendorOrders()
  const { shipments, isLoading, create, isCreating, update, isUpdating } = useShipments()
  const [form, setForm] = useState({ vendor_order_id: "", carrier_name: "", tracking_number: "", delivery_contact_name: "", delivery_contact_phone: "", estimated_delivery_at: "", delivery_note: "" })
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.vendor_order_id) return notifyError("Choose a vendor order for this shipment.")
    try {
      await create({ ...form, vendor_order_id: Number(form.vendor_order_id), estimated_delivery_at: form.estimated_delivery_at || undefined })
      setForm({ vendor_order_id: "", carrier_name: "", tracking_number: "", delivery_contact_name: "", delivery_contact_phone: "", estimated_delivery_at: "", delivery_note: "" })
      notifySuccess("Shipment created.")
    } catch (error) { notifyError(error) }
  }

  return <div className="mx-auto max-w-5xl space-y-6">
    <div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Fulfilment</p><h1 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Shipments.</h1></div>
    <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"><h2 className="font-semibold text-brand">Create shipment</h2><form className="mt-5 grid gap-4 md:grid-cols-2" noValidate onSubmit={submit}>
      <div className="md:col-span-2"><Label htmlFor="vendor-order">Vendor order</Label><Input className={field + " mt-2"} id="vendor-order" list="vendor-orders" onChange={(event) => set("vendor_order_id", event.target.value)} placeholder="Select an order number" value={form.vendor_order_id} /><datalist id="vendor-orders">{orders.filter((order) => !order.shipment && !["cancelled", "refunded"].includes(order.status)).map((order) => <option key={order.id} value={order.id}>{order.vendor_order_number}</option>)}</datalist></div>
      <div><Label htmlFor="carrier">Carrier</Label><Input className={field + " mt-2"} id="carrier" onChange={(event) => set("carrier_name", event.target.value)} value={form.carrier_name} /></div>
      <div><Label htmlFor="tracking">Tracking number</Label><Input className={field + " mt-2"} id="tracking" onChange={(event) => set("tracking_number", event.target.value)} value={form.tracking_number} /></div>
      <div><Label htmlFor="contact-name">Delivery contact</Label><Input className={field + " mt-2"} id="contact-name" onChange={(event) => set("delivery_contact_name", event.target.value)} value={form.delivery_contact_name} /></div>
      <div><Label htmlFor="contact-phone">Delivery phone</Label><Input className={field + " mt-2"} id="contact-phone" onChange={(event) => set("delivery_contact_phone", event.target.value)} value={form.delivery_contact_phone} /></div>
      <div><Label htmlFor="eta">Estimated delivery</Label><Input className={field + " mt-2"} id="eta" onChange={(event) => set("estimated_delivery_at", event.target.value)} type="datetime-local" value={form.estimated_delivery_at} /></div>
      <div className="md:col-span-2"><Label htmlFor="note">Delivery note</Label><Textarea className="mt-2 border-[#dfe6dc] bg-white text-brand" id="note" onChange={(event) => set("delivery_note", event.target.value)} value={form.delivery_note} /></div>
      <Button isDisabled={isCreating} type="submit">{isCreating ? "Creating…" : "Create shipment"}</Button>
    </form></Card>
    <div className="space-y-4">{isLoading ? <p className="text-sm text-brand-gray-3">Loading shipments…</p> : shipments.map((shipment) => <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none" key={shipment.id}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Vendor order {shipment.vendor_order_id}</p><h2 className="mt-1 font-semibold text-brand">{shipment.carrier_name || "Carrier pending"} {shipment.tracking_number ? "· " + shipment.tracking_number : ""}</h2><p className="mt-2 text-sm text-brand-light">{shipment.delivery_contact_name || "No delivery contact"} {shipment.delivery_contact_phone ? "· " + shipment.delivery_contact_phone : ""}</p></div><div className="flex flex-wrap gap-2">{statuses.map((status) => <Button isDisabled={isUpdating || status === shipment.status} key={status} onPress={() => void update({ id: shipment.id, status, status_note: "Shipment status updated by vendor." }).then(() => notifySuccess("Shipment status updated.")).catch(notifyError)} size="sm" variant={status === shipment.status ? "default" : "outline"}>{status.replaceAll("_", " ")}</Button>)}</div></div><div className="mt-5 border-t border-[#e3e9df] pt-4"><p className="text-sm font-semibold text-brand">Tracking history</p><ol className="mt-3 space-y-3">{shipment.history.map((entry) => <li className="text-sm text-brand-light" key={entry.id}><span className="font-semibold capitalize text-brand">{entry.status.replaceAll("_", " ")}</span><span> · {new Date(entry.created_at).toLocaleString()}</span>{entry.note ? <p className="mt-1">{entry.note}</p> : null}</li>)}</ol></div></Card>)}</div>
  </div>
}
