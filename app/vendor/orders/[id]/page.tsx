import { ManagedOrderDetails } from "@/components/order/managedOrderDetails"

export default async function VendorOrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ManagedOrderDetails id={Number(id)} mode="vendor" />
}
