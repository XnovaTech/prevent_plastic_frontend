"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VendorConversation } from "@/components/order/vendorConversation"
import { resolveMediaUrl } from "@/lib/media"
import {
  useAdminOrder,
  useAdminVendorOrder,
  useVendorOrder,
  useVendorOrders,
} from "@/hooks/useOrders"

type Mode = "vendor" | "admin" | "admin-vendor"

const nextStatus: Record<string, string | undefined> = {
  pending: "confirmed",
  confirmed: "processing",
  processing: "ready_for_delivery",
  ready_for_delivery: "shipped",
  shipped: "delivered",
}

export function ManagedOrderDetails({ id, mode }: { id: number; mode: Mode }) {
  const vendorOrder = useVendorOrder(id, mode === "vendor")
  const adminOrder = useAdminOrder(id, mode === "admin")
  const adminVendorOrder = useAdminVendorOrder(id, mode === "admin-vendor")
  const vendorOrders = useVendorOrders(false)
  const query =
    mode === "vendor"
      ? vendorOrder
      : mode === "admin"
        ? adminOrder
        : adminVendorOrder
  const record = query.data as any
  const isParentOrder = mode === "admin"
  const backHref =
    mode === "vendor"
      ? "/vendor/orders"
      : mode === "admin"
        ? "/admin/orders"
        : "/admin/vendor-orders"

  if (query.isLoading) {
    return <p className="text-sm text-brand-gray-3">Loading order…</p>
  }

  if (query.error || !record) {
    return <p className="text-sm text-red-600">Unable to load this order.</p>
  }

  const vendorOrdersForDisplay = isParentOrder
    ? (record.vendor_orders ?? [])
    : [record]
  const shipping = isParentOrder
    ? record.shipping_address
    : record.order?.shipping_address
  const customer = isParentOrder ? record.customer : record.order?.customer
  const paymentStatus = isParentOrder
    ? record.payment_status
    : record.order?.payment_status

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <Link className="text-sm font-semibold text-brand-3" href={backHref}>
          ← Back to orders
        </Link>
        <p className="mt-6 text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          {isParentOrder ? "Marketplace order" : "Vendor fulfilment"}
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
          {record.order_number ?? record.vendor_order_number}
        </h2>
      </div>

      <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none">
        <div className="grid gap-5 text-sm sm:grid-cols-3">
          <div>
            <p className="text-brand-gray-3">Customer</p>
            <p className="mt-1 font-semibold text-brand">
              {customer?.name ?? "-"}
            </p>
            <p className="text-brand-gray-3">{customer?.email ?? ""}</p>
          </div>
          <div>
            <p className="text-brand-gray-3">Payment status</p>
            <p className="mt-1 font-semibold text-brand capitalize">
              {(paymentStatus ?? "unpaid").replaceAll("_", " ")}
            </p>
          </div>
          <div>
            <p className="text-brand-gray-3">Delivery address</p>
            <p className="mt-1 font-semibold text-brand">
              {shipping?.name ?? "-"}
            </p>
            <p className="text-brand-gray-3">{shipping?.address ?? ""}</p>
          </div>
        </div>
      </Card>

      {vendorOrdersForDisplay.map((vendorOrder: any) => {
        const next = nextStatus[vendorOrder.status]
        return (
          <Card
            className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"
            key={vendorOrder.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
                  {vendorOrder.vendor?.display_name ?? "Vendor order"}
                </p>
                <h3 className="mt-1 font-semibold text-brand">
                  {vendorOrder.vendor_order_number}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-sm">
                  <p className="font-semibold text-brand capitalize">
                    Approval: {vendorOrder.approval_status}
                  </p>
                  <p className="mt-1 text-brand-gray-3 capitalize">
                    Fulfilment: {vendorOrder.status.replaceAll("_", " ")}
                  </p>
                </div>
                {mode === "vendor" &&
                vendorOrder.approval_status === "pending" ? (
                  <Button
                    isDisabled={vendorOrders.isApproving}
                    onPress={() => void vendorOrders.approve(vendorOrder.id)}
                    size="sm"
                  >
                    Approve
                  </Button>
                ) : null}
                {mode === "vendor" && next ? (
                  <Button
                    isDisabled={vendorOrders.isUpdating}
                    onPress={() =>
                      void vendorOrders.update({
                        id: vendorOrder.id,
                        status: next,
                      })
                    }
                    size="sm"
                  >
                    Mark {next.replaceAll("_", " ")}
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="mt-5 divide-y divide-[#e3e9df]">
              {(vendorOrder.items ?? []).map((item: any) => (
                <div
                  className="flex items-center justify-between gap-4 py-3"
                  key={item.id}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {item.product_image ? <img alt={item.product_name} className="size-12 shrink-0 rounded-xl border border-[#e3e9df] object-cover" src={resolveMediaUrl(item.product_image)} /> : null}
                    <div>
                    <p className="font-medium text-brand">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-brand-gray-3">
                      Qty {item.quantity}
                    </p>
                    </div>
                  </div>
                  <p className="font-semibold text-brand">
                    Ks {Number(item.line_total).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            {mode === "vendor" ? (
              <div className="mt-4 border-t border-[#e3e9df] pt-4"><p className="mb-2 text-xs text-brand-gray-3">Messages are shared only for the products in this vendor order.</p><VendorConversation triggerLabel="Message customer" vendorName={customer?.name ?? "Customer"} vendorOrderId={vendorOrder.id} /></div>
            ) : null}
          </Card>
        )
      })}
    </div>
  )
}
