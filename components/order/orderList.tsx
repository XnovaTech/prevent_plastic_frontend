"use client"
import Link from "next/link"
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
import {
  useAdminOrders,
  useAdminVendorOrders,
  useCustomerOrders,
  useVendorOrders,
} from "@/hooks/useOrders"

type Mode = "customer" | "vendor" | "admin" | "admin-vendor"

function vendorNames(row: any): string[] {
  const vendors = row.vendor_orders?.length
    ? row.vendor_orders.map((vendorOrder: any) => vendorOrder.vendor)
    : [row.vendor]

  const names: string[] = vendors
    .map(
      (vendor: { display_name?: string } | null | undefined) =>
        vendor?.display_name
    )
    .filter(
      (name: string | undefined): name is string =>
        typeof name === "string" && name.length > 0
    )

  return [...new Set(names)]
}

export function OrderList({ mode }: { mode: Mode }) {
  const customer = useCustomerOrders(mode === "customer")
  const vendor = useVendorOrders(mode === "vendor")
  const admin = useAdminOrders(mode === "admin")
  const adminVendor = useAdminVendorOrders(mode === "admin-vendor")
  const source =
    mode === "customer"
      ? customer
      : mode === "vendor"
        ? vendor
        : mode === "admin"
          ? admin
          : adminVendor
  const rows = source.orders

  if (source.isLoading) {
    return <p className="text-sm text-brand-gray-3">Loading orders…</p>
  }

  if (source.error) {
    return (
      <p className="text-sm text-red-600">
        Unable to load orders. Please refresh and try again.
      </p>
    )
  }
  const prefix =
    mode === "customer"
      ? "/customer/orders"
      : mode === "vendor"
        ? "/vendor/orders"
        : mode === "admin"
          ? "/admin/orders"
          : "/admin/vendor-orders"
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          {mode === "customer"
            ? "Your purchases"
            : mode === "vendor"
              ? "Shop fulfilment"
              : "Marketplace orders"}
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
          {mode === "customer"
            ? "Your orders."
            : mode === "vendor"
              ? "Orders to prepare."
              : mode === "admin"
                ? "Customer orders."
                : "Vendor orders."}
        </h2>
      </div>
      <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
        <Table aria-label="Orders">
          <TableHeader>
            <TableHead>Order number</TableHead>
            {mode === "customer" ? null : <TableHead>Customer</TableHead>}
            <TableHead>Vendor</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment method</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableHeader>
          <TableBody items={rows as any[]}>
            {(row: any) => (
              <TableRow id={row.id}>
                <TableCell className="font-semibold text-brand">
                  {row.vendor_order_number ?? row.order_number}
                </TableCell>
                {mode === "customer" ? null : (
                  <TableCell>
                    {row.order?.customer?.name ?? row.customer?.name ?? "-"}
                  </TableCell>
                )}
                <TableCell>
                  <div className="space-y-1">
                    {vendorNames(row).map((name) => (
                      <p className="whitespace-nowrap" key={name}>
                        {name}
                      </p>
                    ))}
                    {vendorNames(row).length === 0 ? "-" : null}
                  </div>
                </TableCell>
                <TableCell>
                  Ks {Number(row.grand_total).toLocaleString()}
                </TableCell>
                <TableCell className="capitalize">
                  {(row.payment_method ?? row.order?.payment_method ?? "-").replaceAll(
                    "_",
                    " "
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {(row.payment_status ?? row.order?.payment_status ?? "unpaid").replaceAll(
                    "_",
                    " "
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {(mode === "customer"
                    ? row.approval_status
                    : row.status
                  ).replaceAll("_", " ")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      className="inline-flex h-8 items-center text-xs font-semibold text-brand-3"
                      href={`${prefix}/${row.id}`}
                    >
                      View
                    </Link>
                    {mode === "vendor" && row.approval_status === "pending" ? (
                      <Button
                        isDisabled={vendor.isApproving}
                        onPress={() => void vendor.approve(row.id)}
                        size="sm"
                      >
                        Approve
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-brand-gray-3">
            No orders yet.
          </p>
        ) : null}
      </Card>
    </div>
  )
}
