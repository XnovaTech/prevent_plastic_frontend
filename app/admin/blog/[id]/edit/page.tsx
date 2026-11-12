import { EditAdminBlogForm } from "@/components/form/editAdminBlogForm"

export default async function EditAdminBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <EditAdminBlogForm id={Number(id)} />
}
