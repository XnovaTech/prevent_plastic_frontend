"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useCustomerOrder } from "@/hooks/useOrders"
import { resolveMediaUrl } from "@/lib/media"
import { VendorConversation } from "@/components/order/vendorConversation"

export function CustomerOrderDetails({ id }: { id: number }) {
  const { data: order, isLoading, error } = useCustomerOrder(id)

  if (isLoading) {
    return <p className="text-sm text-brand-gray-3">Loading your order…</p>
  }

  if (error || !order) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Unable to load this order.</p>
        <Link
          className="text-sm font-semibold text-brand-3"
          href="/customer/orders"
        >
          Back to orders
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <Link
          className="text-sm font-semibold text-brand-3"
          href="/customer/orders"
        >
          ← Back to orders
        </Link>
        <p className="mt-6 text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          Order details
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
          {order.order_number}
        </h2>
      </div>

      <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none">
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-brand-gray-3">Approval status</p>
            <p className="mt-1 font-semibold text-brand capitalize">
              {order.approval_status}
            </p>
          </div>
          <div>
            <p className="text-brand-gray-3">Payment</p>
            <p className="mt-1 font-semibold text-brand capitalize">
              {order.payment_method.replaceAll("_", " ")}
            </p>
          </div>
          <div>
            <p className="text-brand-gray-3">Total</p>
            <p className="mt-1 font-semibold text-brand">
              Ks {Number(order.grand_total).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none">
        <div className="grid gap-5 text-sm sm:grid-cols-2">
          <div>
            <p className="text-brand-gray-3">Delivery address</p>
            <p className="mt-1 font-semibold text-brand">
              {order.shipping_address?.name ?? "-"}
            </p>
            <p className="text-brand-gray-3">
              {order.shipping_address?.address ?? ""}
            </p>
            <p className="text-brand-gray-3">
              {order.shipping_address?.phone ?? ""}
            </p>
          </div>
          <div>
            <p className="text-brand-gray-3">Order summary</p>
            <p className="mt-1 text-brand">
              Subtotal: Ks {Number(order.subtotal).toLocaleString()}
            </p>
            <p className="text-brand-gray-3">
              Discount: Ks {Number(order.discount_amount).toLocaleString()} · Delivery: Ks {Number(order.delivery_fee).toLocaleString()} · Tax: Ks {Number(order.tax_amount).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {order.vendor_orders.map((vendorOrder) => (
        <Card
          className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none"
          key={vendorOrder.id}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
                Vendor order
              </p>
              <h3 className="mt-1 font-semibold text-brand">
                {vendorOrder.vendor_order_number}
              </h3>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold text-brand capitalize">
                {vendorOrder.approval_status === "approved"
                  ? "Approved"
                  : "Pending"}
              </p>
              <p className="mt-1 text-brand-gray-3 capitalize">
                Fulfilment: {vendorOrder.status.replaceAll("_", " ")}
              </p>
            </div>
          </div>
          <div className="mt-5 divide-y divide-[#e3e9df]">
            {vendorOrder.items.map((item) => (
              <div
                className="flex items-center justify-between gap-4 py-3"
                key={item.id}
              >
                <div className="flex min-w-0 items-center gap-3">
                  {item.product_image ? (
                    <img
                      alt={item.product_name}
                      className="size-12 rounded-xl object-cover"
                      src={resolveMediaUrl(item.product_image)}
                    />
                  ) : null}
                  <div>
                  <p className="font-medium text-brand">{item.product_name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    {vendorOrder.vendor?.logo ? (
                      <img
                        alt=""
                        className="size-5 rounded-full object-cover"
                        src={resolveMediaUrl(vendorOrder.vendor.logo)}
                      />
                    ) : null}
                    {vendorOrder.vendor?.slug ? (
                      <Link
                        className="font-semibold text-brand-3 underline underline-offset-2"
                        href={`/shop/${vendorOrder.vendor.slug}`}
                      >
                        {vendorOrder.vendor.display_name}
                      </Link>
                    ) : (
                      <span className="font-semibold text-brand-3">
                        {vendorOrder.vendor?.display_name ?? "Local seller"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-gray-3">
                    {item.product_sku ? `${item.product_sku} · ` : ""}Qty {item.quantity}
                  </p>
                  {item.variant_description ? (
                    <p className="text-sm text-brand-gray-3">
                      {item.variant_description}
                    </p>
                  ) : null}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-brand">
                    Ks {Number(item.line_total).toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-brand-gray-3">
                    Ks {Number(item.unit_price).toLocaleString()} each
                  </p>
                </div>
              </div>
            ))}
          </div>
          {vendorOrder.shipment ? <div className="mt-5 rounded-2xl bg-[#f7f9f4] p-4"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[.14em] text-brand-gray-3 uppercase">Shipment tracking</p><p className="mt-1 font-semibold text-brand">{vendorOrder.shipment.carrier_name || "Carrier pending"}{vendorOrder.shipment.tracking_number ? " · " + vendorOrder.shipment.tracking_number : ""}</p><p className="mt-1 text-sm capitalize text-brand-light">Current status: {vendorOrder.shipment.status.replaceAll("_", " ")}</p></div><div className="text-sm text-brand-light">{vendorOrder.shipment.estimated_delivery_at ? <p>Expected: {new Date(vendorOrder.shipment.estimated_delivery_at).toLocaleDateString()}</p> : null}{vendorOrder.shipment.delivery_contact_name ? <p>{vendorOrder.shipment.delivery_contact_name} · {vendorOrder.shipment.delivery_contact_phone}</p> : null}</div></div>{vendorOrder.shipment.delivery_note ? <p className="mt-3 text-sm text-brand-light">{vendorOrder.shipment.delivery_note}</p> : null}<ol className="mt-4 space-y-3 border-l border-[#cfe0cf] pl-4">{vendorOrder.shipment.history.map((entry) => <li className="relative text-sm text-brand-light" key={entry.id}><span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-brand-2" /><p className="font-semibold capitalize text-brand">{entry.status.replaceAll("_", " ")}</p><p className="text-xs text-brand-gray-3">{new Date(entry.created_at).toLocaleString()}</p>{entry.note ? <p className="mt-1">{entry.note}</p> : null}</li>)}</ol></div> : <p className="mt-5 text-sm text-brand-gray-3">Shipment details will appear once the vendor assigns delivery.</p>}
          <VendorConversation
            iconOnly
            vendorName={vendorOrder.vendor?.display_name ?? "this vendor"}
            vendorOrderId={vendorOrder.id}
          />
        </Card>
      ))}
    </div>
  )
}
