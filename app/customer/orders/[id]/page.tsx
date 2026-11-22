import { CustomerOrderDetails } from "@/components/order/customerOrderDetails"

export default async function CustomerOrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <CustomerOrderDetails id={Number(id)} />
}
