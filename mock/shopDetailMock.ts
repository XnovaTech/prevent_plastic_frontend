import { catalogPageMock } from "@/mock/catalogPageMock"
import type { HomeProduct } from "@/mock/homePageMock"

export type ShopReview = {
  id: string
  author: string
  rating: number
  date: string
  comment: string
}

export type ShopDetail = {
  slug: string
  name: string
  type: "sme" | "individual"
  kind: string
  location: string
  description: string
  rating: number
  reviewCount: number
  joinedYear: string
  followers: number
  products: HomeProduct[]
  reviews: ShopReview[]
  badges: string[]
}

export const shops: ShopDetail[] = [
  {
    slug: "second-bloom-studio",
    name: "Second Bloom Studio",
    type: "sme",
    kind: "Local small business",
    location: "Yangon",
    description:
      "Curated second-hand homeware and decor. Giving beautiful pieces a second bloom with care and intention.",
    rating: 4.9,
    reviewCount: 128,
    joinedYear: "2023",
    followers: 842,
    badges: ["Verified Seller", "Top Rated"],
    products: catalogPageMock.sme.products.filter(
      (p) => p.merchant === "Second Bloom Studio"
    ),
    reviews: [
      {
        id: "r1",
        author: "Aye Mi",
        rating: 5,
        date: "Oct 2025",
        comment: "Beautiful items, well packed and exactly as described.",
      },
      {
        id: "r2",
        author: "Ko Zaw",
        rating: 5,
        date: "Sep 2025",
        comment: "Great curation and very responsive seller.",
      },
      {
        id: "r3",
        author: "Su Su",
        rating: 4,
        date: "Sep 2025",
        comment: "Lovely pieces, delivery took a bit but worth it.",
      },
    ],
  },
  {
    slug: "myas-thrift-corner",
    name: "Mya's Thrift Corner",
    type: "individual",
    kind: "Independent seller",
    location: "Mandalay",
    description:
      "A cozy corner of pre-loved fashion and everyday finds. Curated with love, passed on with care.",
    rating: 4.8,
    reviewCount: 96,
    joinedYear: "2024",
    followers: 654,
    badges: ["Quick Responder"],
    products: [
      ...catalogPageMock.sme.products.filter(
        (p) => p.merchant === "Mya's Thrift Corner"
      ),
      ...catalogPageMock.individual.products.filter(
        (p) => p.merchant === "Mya's Thrift Corner"
      ),
    ],
    reviews: [
      {
        id: "r1",
        author: "Thiri",
        rating: 5,
        date: "Oct 2025",
        comment: "Accurate description and fast communication.",
      },
      {
        id: "r2",
        author: "Nandar",
        rating: 5,
        date: "Oct 2025",
        comment: "Love the pieces! Will definitely shop again.",
      },
      {
        id: "r3",
        author: "Min Min",
        rating: 4,
        date: "Aug 2025",
        comment: "Great finds, reasonably priced.",
      },
    ],
  },
  {
    slug: "thants-finds",
    name: "Thant's Finds",
    type: "individual",
    kind: "Independent seller",
    location: "Yangon",
    description:
      "Vintage gems and timeless pieces with stories to tell. Hand-picked for those who love character.",
    rating: 4.9,
    reviewCount: 84,
    joinedYear: "2024",
    followers: 521,
    badges: ["Verified Seller"],
    products: [
      ...catalogPageMock.sme.products.filter(
        (p) => p.merchant === "Thant's Finds"
      ),
      ...catalogPageMock.individual.products.filter(
        (p) => p.merchant === "Thant's Finds"
      ),
    ],
    reviews: [
      {
        id: "r1",
        author: "Hnin",
        rating: 5,
        date: "Oct 2025",
        comment: "Unique finds and great condition.",
      },
      {
        id: "r2",
        author: "Zarni",
        rating: 5,
        date: "Sep 2025",
        comment: "Carefully packed, very happy with purchase.",
      },
      {
        id: "r3",
        author: "Ei Ei",
        rating: 5,
        date: "Sep 2025",
        comment: "Beautiful vintage pieces, exactly as pictured.",
      },
    ],
  },
  {
    slug: "yangon-vintage",
    name: "Yangon Vintage",
    type: "individual",
    kind: "Independent seller",
    location: "Yangon",
    description:
      "Retro clothing and accessories with personality. Every piece is hand-selected for style and wearability.",
    rating: 4.7,
    reviewCount: 63,
    joinedYear: "2024",
    followers: 410,
    badges: ["Quick Responder"],
    products: catalogPageMock.individual.products.filter(
      (p) => p.merchant === "Yangon Vintage"
    ),
    reviews: [
      {
        id: "r1",
        author: "Thiri",
        rating: 5,
        date: "Oct 2025",
        comment: "Great vintage pieces, exactly as pictured.",
      },
      {
        id: "r2",
        author: "Nandar",
        rating: 4,
        date: "Sep 2025",
        comment: "Nice selection, reasonable prices.",
      },
    ],
  },
  {
    slug: "circular-home",
    name: "Circular Home",
    type: "sme",
    kind: "Local small business",
    location: "Bago",
    description:
      "Secondhand furniture and home decor. Quality pieces that keep homes beautiful and waste out of landfills.",
    rating: 4.9,
    reviewCount: 156,
    joinedYear: "2023",
    followers: 720,
    badges: ["Verified Seller", "Top Rated"],
    products: catalogPageMock.sme.products.filter(
      (p) => p.merchant === "Circular Home"
    ),
    reviews: [
      {
        id: "r1",
        author: "Aye Mi",
        rating: 5,
        date: "Oct 2025",
        comment: "Beautiful furniture, well packed.",
      },
      {
        id: "r2",
        author: "Ko Zaw",
        rating: 5,
        date: "Sep 2025",
        comment: "Great quality and fast delivery.",
      },
    ],
  },
  {
    slug: "preloved-kids",
    name: "Preloved Kids",
    type: "individual",
    kind: "Independent seller",
    location: "Mandalay",
    description:
      "Kids' clothes and toys that grow with your family. Gently loved pieces ready for their next adventure.",
    rating: 4.6,
    reviewCount: 89,
    joinedYear: "2024",
    followers: 390,
    badges: [],
    products: catalogPageMock.individual.products.filter(
      (p) => p.merchant === "Preloved Kids"
    ),
    reviews: [
      {
        id: "r1",
        author: "Su Su",
        rating: 5,
        date: "Oct 2025",
        comment: "Cute kids' clothes in great condition.",
      },
    ],
  },
  {
    slug: "studio-repair",
    name: "Studio Repair",
    type: "sme",
    kind: "Local small business",
    location: "Yangon",
    description:
      "Electronics and appliance repair. Making good things last longer with skilled care and honest pricing.",
    rating: 4.8,
    reviewCount: 71,
    joinedYear: "2023",
    followers: 280,
    badges: ["Verified Seller"],
    products: catalogPageMock.sme.products.filter(
      (p) => p.merchant === "Studio Repair"
    ),
    reviews: [
      {
        id: "r1",
        author: "Min Min",
        rating: 5,
        date: "Sep 2025",
        comment: "Fixed my appliance quickly and affordably.",
      },
    ],
  },
  {
    slug: "green-shelf",
    name: "Green Shelf",
    type: "sme",
    kind: "Local small business",
    location: "Naypyidaw",
    description:
      "Books and stationery with character. Pre-loved reads ready for new stories.",
    rating: 4.5,
    reviewCount: 44,
    joinedYear: "2024",
    followers: 195,
    badges: [],
    products: catalogPageMock.sme.products.filter(
      (p) => p.merchant === "Green Shelf"
    ),
    reviews: [],
  },
  {
    slug: "urban-cycle",
    name: "Urban Cycle",
    type: "sme",
    kind: "Local small business",
    location: "Yangon",
    description:
      "Bicycles and cycling gear. Refurbished rides ready for the road.",
    rating: 4.9,
    reviewCount: 38,
    joinedYear: "2023",
    followers: 310,
    badges: ["Verified Seller"],
    products: catalogPageMock.sme.products.filter(
      (p) => p.merchant === "Urban Cycle"
    ),
    reviews: [
      {
        id: "r1",
        author: "Thiri",
        rating: 5,
        date: "Oct 2025",
        comment: "Great bike, smooth ride.",
      },
    ],
  },
  {
    slug: "retro-sounds",
    name: "Retro Sounds",
    type: "individual",
    kind: "Independent seller",
    location: "Mandalay",
    description:
      "Vinyl records and audio gear. Analog sound with timeless appeal.",
    rating: 4.7,
    reviewCount: 52,
    joinedYear: "2024",
    followers: 265,
    badges: [],
    products: catalogPageMock.individual.products.filter(
      (p) => p.merchant === "Retro Sounds"
    ),
    reviews: [
      {
        id: "r1",
        author: "Nandar",
        rating: 5,
        date: "Sep 2025",
        comment: "Great vinyl collection.",
      },
    ],
  },
]

export function getShopBySlug(slug: string): ShopDetail | null {
  return shops.find((shop) => shop.slug === slug) ?? null
}

export function getShopByName(name: string): ShopDetail | null {
  return shops.find((shop) => shop.name === name) ?? null
}
