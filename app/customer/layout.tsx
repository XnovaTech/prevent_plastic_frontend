import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { customerRoutes } from "@/components/dashboard/dashboardRoutes"
import { RouteGuard } from "@/components/auth/routeGuard"

export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RouteGuard role="customer">
      <DashboardLayout
        eyebrow="Your saved corner of the market"
        navigation={customerRoutes}
        roleLabel="Customer"
        title="Customer workspace"
      >
        {children}
      </DashboardLayout>
    </RouteGuard>
  )
}
