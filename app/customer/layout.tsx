import { DashboardLayout } from "@/components/dashboard/dashboardLayout"
import { customerRoutes } from "@/components/dashboard/dashboardRoutes"

export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardLayout
      eyebrow="Your saved corner of the market"
      navigation={customerRoutes}
      roleLabel="Customer"
      title="Customer workspace"
    >
      {children}
    </DashboardLayout>
  )
}
