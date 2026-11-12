import { AdminBlogDetail } from "@/components/blog/adminBlogDetail"

export default async function AdminBlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AdminBlogDetail id={Number(id)} />
}
