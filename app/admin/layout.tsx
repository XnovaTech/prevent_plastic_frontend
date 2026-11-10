import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { adminRoutes } from "@/components/dashboard/dashboardRoutes"

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardLayout
      eyebrow="Control room"
      navigation={adminRoutes}
      roleLabel="Admin"
      title="Admin workspace"
    >
      {children}
    </DashboardLayout>
  )
}
