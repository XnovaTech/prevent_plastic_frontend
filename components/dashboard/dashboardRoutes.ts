import type { DashboardNavItem } from "@/components/dashboard/dashboardLayout"

export const adminRoutes: DashboardNavItem[] = [
  { href: "/admin", label: "Overview", icon: "chart" },
  {
    href: "/admin/orders",
    label: "Order Management",
    icon: "package",
    children: [
      { href: "/admin/orders", label: "Customer Orders", icon: "package" },
      { href: "/admin/vendor-orders", label: "Vendor Orders", icon: "package" },
    ],
  },
  { href: "/admin/payments", label: "Payments", icon: "package" },
  { href: "/admin/comments", label: "Comments", icon: "heart" },
  { href: "/admin/about", label: "About Us", icon: "heart" },
  { href: "/admin/categories", label: "Categories", icon: "tag" },
  { href: "/admin/products", label: "Products", icon: "package" },
  {
    href: "/admin/blog",
    label: "Blog Management",
    icon: "tag",
    children: [
      {
        href: "/admin/blog",
        label: "Blog page",
        icon: "tag",
      },
      {
        href: "/admin/blog/categories",
        label: "Blog categories",
        icon: "tag",
      },
    ],
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: "gear",
    section: "account",
  },
]

export const vendorRoutes: DashboardNavItem[] = [
  { href: "/vendor", label: "Overview", icon: "chart" },
  { href: "/vendor/orders", label: "Orders", icon: "package" },
  { href: "/vendor/comments", label: "Comments", icon: "heart" },
  { href: "/vendor/products", label: "Products", icon: "package" },
  {
    href: "/vendor/settings",
    label: "Settings",
    icon: "gear",
    section: "account",
  },
]

export const customerRoutes: DashboardNavItem[] = [
  { href: "/customer", label: "Overview", icon: "chart" },
  { href: "/customer/orders", label: "Orders", icon: "package" },
  { href: "/customer/wishlist", label: "Wishlist", icon: "heart" },
  { href: "/customer/addresses", label: "Addresses", icon: "map-pin" },
]
