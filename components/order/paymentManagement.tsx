"use client"

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
export function PaymentManagement() {
  const { payments, isLoading, error } = useAdminPayments()

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
            <TableHead isRowHeader>Order</TableHead>
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
                <TableCell className="text-right capitalize">{payment.status.replaceAll("_", " ")}</TableCell>
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
