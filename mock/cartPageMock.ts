import type { HomeProduct } from "@/mock/homePageMock"

export type CartItem = HomeProduct & {
  quantity: number
}

export type CartReassurance = {
  icon: "leaf" | "storefront" | "chat"
  title: string
  description: string
}

const cartItems: CartItem[] = [
  {
    id: "cart-ceramic-plates",
    name: "Sunday blue ceramic plates",
    category: "Home & living",
    price: 28000,
    merchant: "Second Bloom Studio",
    condition: "Like new",
    image: "/products/ceramicPlates.jpg",
    badge: "JUST IN",
    badgeTone: "green",
    quantity: 1,
  },
  {
    id: "cart-woven-handbag",
    name: "Orange woven handbag",
    category: "Accessories",
    price: 18000,
    originalPrice: 24000,
    merchant: "Mya's Thrift Corner",
    condition: "Good",
    image: "/products/wovenMarketBag.jpg",
    badge: "−25%",
    badgeTone: "coral",
    quantity: 1,
  },
]

const reassurance: CartReassurance[] = [
  {
    icon: "leaf",
    title: "A little lighter on the planet",
    description:
      "Every pre-loved find that gets another chapter is one less thing wasted.",
  },
  {
    icon: "storefront",
    title: "Local people, real finds",
    description:
      "Your bag supports small merchants and makers right around the corner.",
  },
  {
    icon: "chat",
    title: "Questions are welcome",
    description:
      "Not sure about a condition or detail? Say hello before you check out.",
  },
]

export const cartPageMock = {
  items: cartItems,
  summary: {
    eyebrow: "ORDER SUMMARY",
    title: "The lovely details",
    deliveryLabel: "To be confirmed",
    totalLabel: "Total for now",
    checkoutLabel: "Checkout is coming soon",
    pendingNote:
      "Checkout, payment, and delivery are still being confirmed. You can fill your bag, but orders can't be placed yet.",
    guestNote:
      "Browsing as a guest? Fill your bag freely. You'll be asked to sign in before placing an order.",
    sessionNote:
      "Bag changes reset when you refresh for now — cart storage is still being confirmed.",
    continueLabel: "Continue shopping",
    continueHref: "/sme",
  },
  empty: {
    title: "Your bag is feeling light",
    description:
      "A good find is never far away. Wander the market and bring something lovely home.",
    actionLabel: "Find something good",
    actionHref: "/sme",
  },
  reassurance,
}
