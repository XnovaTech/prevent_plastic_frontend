import { AdminBlogDetailContent } from "@/components/blog/adminBlogDetailContent"

export default async function AdminBlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AdminBlogDetailContent id={Number(id)} />
}
