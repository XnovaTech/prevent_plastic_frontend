import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { vendorRoutes } from "@/components/dashboard/dashboardRoutes"

export default function VendorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardLayout
      eyebrow="Your corner of the market"
      navigation={vendorRoutes}
      roleLabel="Vendor"
      title="Vendor workspace"
    >
      {children}
    </DashboardLayout>
  )
}
