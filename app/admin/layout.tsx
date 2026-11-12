import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { adminRoutes } from "@/components/dashboard/dashboardRoutes"
import { RouteGuard } from "@/components/auth/routeGuard"

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RouteGuard role="admin">
      <DashboardLayout
        eyebrow="Control room"
        navigation={adminRoutes}
        roleLabel="Admin"
        title="Admin workspace"
      >
        {children}
      </DashboardLayout>
    </RouteGuard>
  )
}
