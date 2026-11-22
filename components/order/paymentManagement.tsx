"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminPayments } from "@/hooks/useOrders"
import type { PaymentStatus } from "@/types/order"

const statuses: PaymentStatus[] = [
  "unpaid",
  "pending",
  "paid",
  "failed",
  "partially_refunded",
  "refunded",
]

function StatusControl({
  id,
  initialStatus,
  onSave,
  isSaving,
}: {
  id: number
  initialStatus: PaymentStatus
  onSave: (status: PaymentStatus) => Promise<unknown>
  isSaving: boolean
}) {
  const [status, setStatus] = useState<PaymentStatus>(initialStatus)

  return (
    <div className="flex min-w-44 items-center justify-end gap-2">
      <select
        aria-label="Payment status"
        className="h-9 rounded-full border border-[#dce4da] bg-white px-3 text-xs font-semibold text-brand capitalize"
        onChange={(event) => setStatus(event.target.value as PaymentStatus)}
        value={status}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <Button
        isDisabled={isSaving || status === initialStatus}
        onPress={() => void onSave(status)}
        size="sm"
      >
        Save
      </Button>
    </div>
  )
}

export function PaymentManagement() {
  const { payments, isLoading, error, update, isUpdating } = useAdminPayments()

  if (isLoading) return <p className="text-sm text-brand-gray-3">Loading payments…</p>
  if (error)
    return <p className="text-sm text-red-600">Unable to load payments. Please refresh and try again.</p>

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          Marketplace payments
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
          Payment reconciliation.
        </h2>
      </div>
      <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
        <Table aria-label="Payments">
          <TableHeader>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Payment status</TableHead>
          </TableHeader>
          <TableBody items={payments}>
            {(payment) => (
              <TableRow id={payment.id}>
                <TableCell className="font-semibold text-brand">
                  {payment.order?.order_number ?? `Order #${payment.order_id}`}
                </TableCell>
                <TableCell>{payment.order?.customer?.name ?? "-"}</TableCell>
                <TableCell className="capitalize">
                  {payment.payment_method.replaceAll("_", " ")}
                </TableCell>
                <TableCell>Ks {Number(payment.amount).toLocaleString()}</TableCell>
                <TableCell>
                  <StatusControl
                    id={payment.id}
                    initialStatus={payment.status}
                    isSaving={isUpdating}
                    onSave={(status) => update({ id: payment.id, status })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {payments.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-brand-gray-3">No payments yet.</p>
        ) : null}
      </Card>
    </div>
  )
}
