import { cartPageMock } from "@/mock/cartPageMock"
import { catalogPageMock } from "@/mock/catalogPageMock"
import { homePageMock, type HomeProduct } from "@/mock/homePageMock"
import { wishlistPageMock } from "@/mock/wishlistPageMock"

export type ProductGalleryImage = {
  src: string
  alt: string
}

export type ProductShop = {
  name: string
  kind: string
  label: string
  href: "/sme" | "/individual"
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
  const shop: ProductShop = {
    name: product.merchant,
    kind: isIndividual ? "Independent seller" : "Local small business",
    label: isIndividual ? "Individual finds" : "SME finds",
    href: isIndividual ? "/individual" : "/sme",
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

  const source = isIndividualProduct(productId)
    ? catalogPageMock.individual.products
    : catalogPageMock.sme.products
  const sameCategory = source.filter(
    (item) => item.id !== productId && item.category === product.category
  )
  const rest = source.filter(
    (item) => item.id !== productId && item.category !== product.category
  )

  return [...sameCategory, ...rest].slice(0, limit)
}
