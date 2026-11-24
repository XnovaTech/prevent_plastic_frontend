"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useVendorOrders } from "@/hooks/useOrders"
import type { PaymentStatus } from "@/types/order"

const statuses: PaymentStatus[] = ["unpaid", "pending", "paid", "failed", "partially_refunded", "refunded"]

function VendorPaymentStatus({ vendorOrderId, initialStatus }: { vendorOrderId: number; initialStatus: PaymentStatus }) {
  const { updatePayment, isUpdatingPayment } = useVendorOrders(false)
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => setStatus(initialStatus), [initialStatus])

  return <div className="flex min-w-48 items-center justify-end gap-2"><Select aria-label="Payment status" isDisabled={isUpdatingPayment} onSelectionChange={(key) => setStatus(String(key) as PaymentStatus)} selectedKey={status}><SelectTrigger className="h-9 min-w-36 rounded-full border-[#dce4da] bg-white px-3 text-xs font-semibold text-brand capitalize shadow-none hover:bg-[#f7faf4] focus-visible:border-brand-2/50 focus-visible:ring-brand-2/15"><SelectValue>{status.replaceAll("_", " ")}</SelectValue></SelectTrigger><SelectContent className="rounded-[18px] border border-[#dce4da] bg-white p-1 text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]">{statuses.map((item) => <SelectItem className="capitalize" id={item} key={item}>{item.replaceAll("_", " ")}</SelectItem>)}</SelectContent></Select><Button isDisabled={isUpdatingPayment || status === initialStatus} onPress={() => void updatePayment({ vendorOrderId, status })} size="sm">{isUpdatingPayment ? "Saving…" : "Save"}</Button></div>
}

export function VendorPaymentManagement() {
  const { orders, isLoading, error } = useVendorOrders()

  if (isLoading) return <p className="text-sm text-brand-gray-3">Loading payments…</p>
  if (error) return <p className="text-sm text-red-600">Unable to load payments. Please refresh and try again.</p>

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Shop payments</p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Payments for your orders.</h2>
      </div>
      <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
        <Table aria-label="Vendor payments">
          <TableHeader>
            <TableHead isRowHeader>Vendor order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead className="text-right">Order</TableHead>
          </TableHeader>
          <TableBody items={orders}>
            {(order) => (
              <TableRow id={order.id}>
                <TableCell className="font-semibold text-brand">{order.vendor_order_number}</TableCell>
                <TableCell>{order.order?.customer?.name ?? "-"}</TableCell>
                <TableCell className="capitalize">{(order.order?.payment_method ?? "-").replaceAll("_", " ")}</TableCell>
                <TableCell>Ks {Number(order.grand_total).toLocaleString()}</TableCell>
                <TableCell><VendorPaymentStatus initialStatus={(order.order?.payment?.status ?? order.order?.payment_status ?? "unpaid") as PaymentStatus} vendorOrderId={order.id} /></TableCell>
                <TableCell className="text-right"><Link className="text-xs font-semibold text-brand-3" href={`/vendor/orders/${order.id}`}>View order</Link></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {orders.length === 0 ? <p className="px-5 py-10 text-center text-sm text-brand-gray-3">No payments yet.</p> : null}
      </Card>
    </div>
  )
}
