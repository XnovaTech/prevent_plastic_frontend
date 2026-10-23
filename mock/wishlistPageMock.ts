import type { HomeProduct } from "@/mock/homePageMock"

export type WishlistItem = HomeProduct

const wishlistItems: WishlistItem[] = [
  {
    id: "denim-jacket",
    name: "The forever denim jacket",
    category: "Style again",
    price: 56000,
    originalPrice: 70000,
    merchant: "Mya's Thrift Corner",
    condition: "Very good",
    image: "/products/denimJacket.jpg",
    badge: "LOVED",
    badgeTone: "coral",
  },
  {
    id: "film-camera",
    name: "Pocket film camera & lens set",
    category: "Everyday things",
    price: 98000,
    merchant: "Thant's Finds",
    condition: "Good",
    image: "/products/filmCamera.jpg",
    badge: "A GOOD FIND",
    badgeTone: "green",
  },
  {
    id: "wooden-stool",
    name: "Little wooden side stool",
    category: "Home & living",
    price: 72000,
    originalPrice: 90000,
    merchant: "Second Bloom Studio",
    condition: "Very good",
    image: "/products/woodenStool.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
  {
    id: "plant-pot",
    name: "Speckled plant pot",
    category: "Home & living",
    price: 22000,
    merchant: "Second Bloom Studio",
    condition: "Good",
    image: "/products/succulentPot.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
]

export const wishlistPageMock = {
  notice:
    "Changes reset when you refresh for now — saved-item storage is still being confirmed.",
  items: wishlistItems,
  empty: {
    title: "Your wishlist is taking a breather",
    description:
      "Tap the heart on a find you love and it will find a home here.",
    actionLabel: "Find something lovely",
    actionHref: "/sme",
  },
  closing: {
    eyebrow: "KEEP WANDERING",
    heading: "There's always another good find.",
    description:
      "Wander a little further. New pre-loved pieces and local makers are waiting to meet you.",
    actionLabel: "Browse the market",
    actionHref: "/sme",
  },
}
