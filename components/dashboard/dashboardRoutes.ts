import type { DashboardNavItem } from "@/components/dashboard/dashboardLayout"

export const adminRoutes: DashboardNavItem[] = [
  { href: "/admin", label: "Overview", icon: "chart" },
  { href: "/admin/vendors", label: "Vendors", icon: "storefront" },
  { href: "/admin/categories", label: "Categories", icon: "tag" },
  { href: "/admin/products", label: "Products", icon: "package" },
    { href: "/admin/blog", label: "Blog", icon: "tag" },
  { href: "/admin/users", label: "Users", icon: "users" },
]

export const vendorRoutes: DashboardNavItem[] = [
  { href: "/vendor", label: "Overview", icon: "chart" },
  { href: "/vendor/shop", label: "My shop", icon: "storefront" },
  { href: "/vendor/products", label: "Products", icon: "package" },
  { href: "/vendor/orders", label: "Orders", icon: "tag" },
]

export const customerRoutes: DashboardNavItem[] = [
  { href: "/customer", label: "Overview", icon: "chart" },
  { href: "/customer/orders", label: "Orders", icon: "package" },
  { href: "/customer/wishlist", label: "Wishlist", icon: "heart" },
  { href: "/customer/addresses", label: "Addresses", icon: "map-pin" },
]
