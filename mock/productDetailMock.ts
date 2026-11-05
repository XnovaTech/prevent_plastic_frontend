import { cartPageMock } from "@/mock/cartPageMock"
import { catalogPageMock } from "@/mock/catalogPageMock"
import { homePageMock, type HomeProduct } from "@/mock/homePageMock"
import { getShopByName } from "@/mock/shopDetailMock"
import { wishlistPageMock } from "@/mock/wishlistPageMock"

export type ProductGalleryImage = {
  src: string
  alt: string
}

export type ProductShop = {
  name: string
  kind: string
  label: string
  href: "/shops" | "/products"
  profileHref: string | null
}

export type ProductFact = {
  label: string
  value: string
}

export type ProductDetail = {
  product: HomeProduct
  gallery: ProductGalleryImage[]
  description: string
  conditionNote: string
  shop: ProductShop
  facts: ProductFact[]
  pendingNote: string
}

export type ProductReview = {
  id: string
  author: string
  rating: number
  date: string
  title: string
  body: string
}

export type ProductReviewSummary = {
  average: number
  count: number
  distribution: number[]
  recommendPercent: number
  reviews: ProductReview[]
}

const allProducts: HomeProduct[] = [
  ...homePageMock.popularProducts,
  ...homePageMock.moreFinds,
  ...homePageMock.saleProducts,
  ...catalogPageMock.sme.products,
  ...catalogPageMock.individual.products,
  ...wishlistPageMock.items,
  ...cartPageMock.items,
]

export const productIds = Array.from(
  new Set(allProducts.map((product) => product.id))
)

const galleryPools: Record<string, readonly string[]> = {
  "Home & living": [
    "/products/ceramicPlates.jpg",
    "/products/succulentPot.jpg",
    "/products/woodenStool.jpg",
    "/products/deskLamp.jpg",
    "/products/woodenWallShelf.jpg",
  ],
  "Style again": [
    "/products/denimJacket.jpg",
    "/products/wovenMarketBag.jpg",
    "/products/ceramicPlates.jpg",
    "/products/deskLamp.jpg",
    "/products/filmCamera.jpg",
  ],
  "Everyday things": [
    "/products/filmCamera.jpg",
    "/products/woodenWallShelf.jpg",
    "/products/deskLamp.jpg",
    "/products/denimJacket.jpg",
    "/products/wovenMarketBag.jpg",
  ],
  Accessories: [
    "/products/wovenMarketBag.jpg",
    "/products/denimJacket.jpg",
    "/products/ceramicPlates.jpg",
    "/products/succulentPot.jpg",
    "/products/deskLamp.jpg",
  ],
}

const categoryDescriptions: Record<string, string> = {
  "Home & living":
    "A considered piece for the home, chosen for its character and the everyday life it still has left to give.",
  "Style again":
    "A wardrobe favourite with a little history already woven in. Easy to style, and even easier to love again.",
  "Everyday things":
    "The useful, quietly brilliant kind of find. Made to be used, cared for, and kept close.",
  Accessories:
    "A small finishing touch with plenty of life left — the kind of piece that makes an everyday outfit feel considered.",
}

const conditionNotes: Record<string, string> = {
  "Like new":
    "Looks and feels barely used, with no major marks noted by the seller.",
  "Very good":
    "A well-cared-for piece with light signs of use that add to its character.",
  Good: "Gently used with visible character — a good find ready for its next chapter.",
}

function isIndividualProduct(productId: string) {
  return catalogPageMock.individual.products.some(
    (product) => product.id === productId
  )
}

export function getProductById(productId: string) {
  return allProducts.find((product) => product.id === productId)
}

export function getProductGallery(product: HomeProduct): ProductGalleryImage[] {
  const pool =
    galleryPools[product.category] ?? Object.values(galleryPools).flat()
  const images = Array.from(
    new Set([product.image, ...pool.filter((image) => image !== product.image)])
  ).slice(0, 5)

  return images.map((src, index) => ({
    src,
    alt:
      index === 0
        ? `${product.name}, ${product.condition.toLowerCase()} condition`
        : `${product.name}, gallery image ${index + 1}`,
  }))
}

export function getProductDetail(productId: string): ProductDetail | null {
  const product = getProductById(productId)

  if (!product) {
    return null
  }

  const isIndividual = isIndividualProduct(product.id)
  const shopName = product.merchant
  const shopProfile = getShopByName(shopName)
  const shop: ProductShop = {
    name: shopName,
    kind: isIndividual ? "Independent seller" : "Local small business",
    label: isIndividual ? "Products" : "Shops",
    href: isIndividual ? "/products" : "/shops",
    profileHref: shopProfile ? `/shop/${shopProfile.slug}` : null,
  }

  return {
    product,
    gallery: getProductGallery(product),
    description:
      categoryDescriptions[product.category] ??
      "A thoughtful find with plenty of life left to give.",
    conditionNote:
      conditionNotes[product.condition] ??
      "Condition notes will be confirmed with the seller.",
    shop,
    facts: [
      { label: "Category", value: product.category },
      { label: "Condition", value: product.condition },
      { label: "Sold by", value: shop.kind },
      { label: "Delivery", value: "Still being confirmed" },
    ],
    pendingNote:
      "This is a design preview. Stock, seller contact, payment, and delivery are still being confirmed.",
  }
}

export function getRelatedProducts(productId: string, limit = 4) {
  const product = getProductById(productId)

  if (!product) {
    return []
  }

  const smeSource = catalogPageMock.sme.products
  const individualSource = catalogPageMock.individual.products

  const smeSameCategory = smeSource.filter(
    (item) => item.id !== productId && item.category === product.category
  )
  const smeRest = smeSource.filter(
    (item) => item.id !== productId && item.category !== product.category
  )
  const individualSameCategory = individualSource.filter(
    (item) => item.id !== productId && item.category === product.category
  )
  const individualRest = individualSource.filter(
    (item) => item.id !== productId && item.category !== product.category
  )

  // Combine both seller types, deduplicate by ID, and limit
  const combined = [
    ...smeSameCategory,
    ...smeRest,
    ...individualSameCategory,
    ...individualRest,
  ]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    )
    .slice(0, limit)

  return combined
}

type ReviewTemplate = Pick<ProductReview, "rating" | "title" | "body">

const reviewTemplates: ReviewTemplate[] = [
  {
    rating: 5,
    title: "Exactly as pictured",
    body: "Arrived looking just like the photos, and the condition was even better than expected. It was wrapped with real care.",
  },
  {
    rating: 5,
    title: "Genuinely delighted",
    body: "This has already found a permanent spot in my kitchen. You can tell its previous owner looked after it well.",
  },
  {
    rating: 4,
    title: "A happy little find",
    body: "Lovely quality for the price and it feels sturdy. The seller answered my questions quickly before I bought.",
  },
  {
    rating: 4,
    title: "Better than expected",
    body: "I was unsure about ordering something pre-loved online, but it arrived spotless and neatly packed.",
  },
  {
    rating: 4,
    title: "Lovely, with one small note",
    body: "A beautiful piece and true to the listing. There is a tiny mark on the base, which the seller had mentioned.",
  },
  {
    rating: 3,
    title: "Good, with a few marks",
    body: "A solid find overall — a couple of visible marks did not show in the photos, but nothing that bothers me.",
  },
  {
    rating: 3,
    title: "Fair for the price",
    body: "Does the job and looks nice in the room. Delivery took a little longer than I hoped, but the chat was friendly.",
  },
  {
    rating: 2,
    title: "Not quite what I expected",
    body: "The condition was a little more worn than the listing suggested. The seller was kind about it, though.",
  },
  {
    rating: 1,
    title: "Arrived with a scratch",
    body: "There is a scratch across the top that I could not see in the gallery. Hoping to sort it out with the seller.",
  },
]

const reviewAuthors = [
  "Aye N.",
  "Ko K.",
  "Hnin T.",
  "Su M.",
  "Min Z.",
  "Thandar A.",
  "Phyo L.",
  "Nay A.",
  "Chit S.",
  "Yamin O.",
]

const reviewDates = [
  "28 Oct 2026",
  "14 Oct 2026",
  "29 Sep 2026",
  "11 Sep 2026",
  "24 Aug 2026",
  "6 Aug 2026",
  "19 Jul 2026",
  "2 Jul 2026",
  "15 Jun 2026",
  "30 May 2026",
]

function hashSeed(input: string) {
  let hash = 2166136261
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function createRandom(seed: number) {
  let state = seed || 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

function pickUnique<T>(pool: T[], random: () => number, amount: number): T[] {
  const shuffled = [...pool]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }
  return shuffled.slice(0, amount)
}

export function getProductReviews(productId: string): ProductReviewSummary {
  const random = createRandom(hashSeed(`reviews:${productId}`))

  const count = 9 + Math.floor(random() * 36)

  // Weighted draw: higher star ratings are more common.
  const weights = [1, 2, 3, 4, 5].map(
    (star) => Math.pow(star, 2.1) * (0.55 + random() * 0.9)
  )
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0)
  const exact = weights.map((weight) => (weight / weightTotal) * count)
  const distribution = exact.map((value) => Math.floor(value))

  // Hand any rounding remainder to the largest fractional parts.
  const remainder = count - distribution.reduce((sum, value) => sum + value, 0)
  const byFraction = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction)
  for (let step = 0; step < remainder; step++) {
    distribution[byFraction[step % byFraction.length].index] += 1
  }

  const starTotal = distribution.reduce(
    (sum, amount, index) => sum + amount * (index + 1),
    0
  )
  const average = Math.round((starTotal / count) * 10) / 10
  const recommendPercent = Math.round(
    ((distribution[3] + distribution[4]) / count) * 100
  )

  const sampleSize = 3 + Math.floor(random() * 3)
  const templates = pickUnique(reviewTemplates, random, sampleSize)
  const authors = pickUnique(reviewAuthors, random, sampleSize)
  const dates = pickUnique(reviewDates, random, sampleSize)

  const reviews = templates.map((template, index) => ({
    id: `${productId}-review-${index + 1}`,
    author: authors[index],
    date: dates[index],
    ...template,
  }))

  return { average, count, distribution, recommendPercent, reviews }
}
