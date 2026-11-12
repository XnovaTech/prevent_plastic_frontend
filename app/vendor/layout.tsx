import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { vendorRoutes } from "@/components/dashboard/dashboardRoutes"
import { RouteGuard } from "@/components/auth/routeGuard"

export default function VendorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RouteGuard role="vendor">
      <DashboardLayout
        eyebrow="Your corner of the market"
        navigation={vendorRoutes}
        roleLabel="Vendor"
        title="Vendor workspace"
      >
        {children}
      </DashboardLayout>
    </RouteGuard>
  )
}
