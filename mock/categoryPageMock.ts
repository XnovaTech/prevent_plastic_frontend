import { catalogPageMock } from "@/mock/catalogPageMock"
import { homePageMock, type HomeCategory } from "@/mock/homePageMock"

export type CategorySellerType = "sme" | "individual"

export type CategoryProduct = {
  product: HomeCategoryProduct
  sellerType: CategorySellerType
}

type HomeCategoryProduct = (typeof catalogPageMock)["sme"]["products"][number]

type CategoryRule = {
  categories: readonly string[]
  keywords?: readonly string[]
}

/**
 * Home categories are editorial, catalog categories are the product facets.
 * A rule maps one to the other; keywords narrow broad facets (plants, kitchen,
 * electronics) so a category page doesn't just repeat "Home & living".
 */
const categoryRules: Record<string, CategoryRule> = {
  "home-living": { categories: ["Home & living"] },
  fashion: { categories: ["Style again"] },
  everyday: { categories: ["Everyday things"] },
  books: { categories: [], keywords: ["book", "novel", "magazine"] },
  kitchen: {
    categories: ["Home & living"],
    keywords: ["plate", "bowl", "dining", "ceramic"],
  },
  plants: {
    categories: ["Home & living"],
    keywords: ["plant", "pot", "planter"],
  },
  accessories: { categories: ["Accessories"] },
  electronics: {
    categories: ["Everyday things"],
    keywords: ["camera", "film", "lamp"],
  },
  toys: { categories: [], keywords: ["toy", "game", "puzzle"] },
}

export type CategoryPageConfig = HomeCategory & {
  rule: CategoryRule
}

export const categoryPages: CategoryPageConfig[] = homePageMock.categories
  .filter((category) => category.id !== "repair")
  .map((category) => ({
    ...category,
    rule: categoryRules[category.id] ?? { categories: [] },
  }))

function matchesRule(product: HomeCategoryProduct, rule: CategoryRule) {
  if (!rule.categories.includes(product.category)) {
    return false
  }

  if (!rule.keywords?.length) {
    return true
  }

  const name = product.name.toLowerCase()

  return rule.keywords.some((keyword) => name.includes(keyword))
}

function interleave(groups: CategoryProduct[][]) {
  const merged: CategoryProduct[] = []
  const longest = Math.max(0, ...groups.map((group) => group.length))

  for (let index = 0; index < longest; index += 1) {
    for (const group of groups) {
      const item = group[index]

      if (item) {
        merged.push(item)
      }
    }
  }

  return merged
}

export function getCategoryById(categoryId: string) {
  return categoryPages.find((category) => category.id === categoryId)
}

export const categoryIds = categoryPages.map((category) => category.id)

export function getCategoryProducts(categoryId: string): CategoryProduct[] {
  const config = getCategoryById(categoryId)

  if (!config) {
    return []
  }

  const smeProducts = catalogPageMock.sme.products
    .filter((product) => matchesRule(product, config.rule))
    .map((product) => ({ product, sellerType: "sme" as const }))

  const individualProducts = catalogPageMock.individual.products
    .filter((product) => matchesRule(product, config.rule))
    .map((product) => ({ product, sellerType: "individual" as const }))

  return interleave([smeProducts, individualProducts])
}

export function getCategoryStats(products: readonly CategoryProduct[]) {
  const sme = products.filter((item) => item.sellerType === "sme").length
  const individual = products.length - sme

  return {
    total: products.length,
    sme,
    individual,
    smeSellers: new Set(
      products
        .filter((item) => item.sellerType === "sme")
        .map((item) => item.product.merchant)
    ).size,
    individualSellers: new Set(
      products
        .filter((item) => item.sellerType === "individual")
        .map((item) => item.product.merchant)
    ).size,
  }
}

export function getCategoryFallbackProducts(categoryId: string) {
  const config = getCategoryById(categoryId)

  if (!config) {
    return []
  }

  return homePageMock.popularProducts.slice(0, 4)
}
