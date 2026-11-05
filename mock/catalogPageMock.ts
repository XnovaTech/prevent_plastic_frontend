import type { HomeProduct } from "@/mock/homePageMock"

export type CatalogPriceRange = {
  id: string
  label: string
  min: number
  max?: number
}

export type CatalogStat = {
  value: string
  label: string
}

export type CatalogFilters = {
  categories: string[]
  conditions: string[]
  priceRange: string | null
}

export type CatalogCopy = {
  catalogEyebrow: string
  catalogTitle: string
  filterButton: string
  filterSheetTitle: string
  filterSheetDescription: string
  categoryLabel: string
  conditionLabel: string
  priceLabel: string
  resetFilters: string
  showResults: string
  activeFilters: string
  showing: string
  of: string
  findSingular: string
  findPlural: string
  keepScrolling: string
  loadMore: string
  caughtUp: string
  emptyTitle: string
  emptyDescription: string
  emptyAction: string
}

export type CatalogPageConfig = {
  id: "sme" | "individual"
  href: "/shops" | "/products"
  eyebrow: string
  title: string
  highlight: string
  description: string
  note: string
  stats: readonly CatalogStat[]
  products: readonly HomeProduct[]
  categories: readonly string[]
  conditions: readonly string[]
  priceRanges: readonly CatalogPriceRange[]
  copy: CatalogCopy
}

export const catalogPriceRanges: readonly CatalogPriceRange[] = [
  {
    id: "under-30000",
    label: "Under Ks 30,000",
    min: 0,
    max: 29999,
  },
  {
    id: "30000-60000",
    label: "Ks 30,000 – 60,000",
    min: 30000,
    max: 60000,
  },
  {
    id: "60001-100000",
    label: "Ks 60,000 – 100,000",
    min: 60001,
    max: 100000,
  },
  {
    id: "over-100000",
    label: "Over Ks 100,000",
    min: 100001,
  },
]

const catalogCategories = [
  "Home & living",
  "Style again",
  "Everyday things",
  "Accessories",
]

const catalogConditions = ["Like new", "Very good", "Good"]

const catalogCopy: CatalogCopy = {
  catalogEyebrow: "BROWSE THE COLLECTION",
  catalogTitle: "Find your next good thing",
  filterButton: "Filters",
  filterSheetTitle: "Narrow the good stuff",
  filterSheetDescription:
    "Pick a category, condition, or price range. Your finds update as you choose.",
  categoryLabel: "Category",
  conditionLabel: "Condition",
  priceLabel: "Price",
  resetFilters: "Reset all",
  showResults: "Show finds",
  activeFilters: "Active filters",
  showing: "Showing",
  of: "of",
  findSingular: "find",
  findPlural: "finds",
  keepScrolling: "Keep scrolling for more good finds",
  loadMore: "Load more now",
  caughtUp: "You're all caught up. Good things take time.",
  emptyTitle: "No finds match those filters",
  emptyDescription:
    "Try removing a filter or two — there are plenty more good things waiting.",
  emptyAction: "Clear all filters",
}

const smeProducts: HomeProduct[] = [
  {
    id: "sme-ceramic-plates",
    name: "Sunday blue ceramic plates",
    category: "Home & living",
    price: 28000,
    merchant: "Second Bloom Studio",
    condition: "Like new",
    image: "/products/ceramicPlates.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "sme-woven-handbag",
    name: "Orange woven handbag",
    category: "Accessories",
    price: 18000,
    originalPrice: 24000,
    merchant: "Mya's Thrift Corner",
    condition: "Good",
    image: "/products/wovenMarketBag.jpg",
    badge: "−25%",
    badgeTone: "coral",
  },
  {
    id: "sme-reading-lamp",
    name: "Black reading desk lamp",
    category: "Home & living",
    price: 42000,
    merchant: "Thant's Finds",
    condition: "Very good",
    image: "/products/deskLamp.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "sme-denim-jacket",
    name: "The forever denim jacket",
    category: "Style again",
    price: 56000,
    originalPrice: 70000,
    merchant: "Mya's Thrift Corner",
    condition: "Very good",
    image: "/products/denimJacket.jpg",
    badge: "−20%",
    badgeTone: "coral",
  },
  {
    id: "sme-film-camera",
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
    id: "sme-wooden-stool",
    name: "Little wooden side stool",
    category: "Home & living",
    price: 72000,
    originalPrice: 90000,
    merchant: "Second Bloom Studio",
    condition: "Very good",
    image: "/products/woodenStool.jpg",
    badge: "−20%",
    badgeTone: "coral",
  },
  {
    id: "sme-wall-shelf",
    name: "Vintage wooden wall shelf",
    category: "Everyday things",
    price: 24000,
    merchant: "Mya's Thrift Corner",
    condition: "Like new",
    image: "/products/woodenWallShelf.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
  {
    id: "sme-plant-pot",
    name: "Speckled plant pot",
    category: "Home & living",
    price: 22000,
    merchant: "Second Bloom Studio",
    condition: "Good",
    image: "/products/succulentPot.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "sme-weekend-bag",
    name: "Weekend woven handbag",
    category: "Accessories",
    price: 26000,
    merchant: "Mya's Thrift Corner",
    condition: "Like new",
    image: "/products/wovenMarketBag.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
  {
    id: "sme-amber-lamp",
    name: "Amber shade reading lamp",
    category: "Home & living",
    price: 39000,
    merchant: "Thant's Finds",
    condition: "Very good",
    image: "/products/deskLamp.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "sme-little-planter",
    name: "Little speckled planter",
    category: "Home & living",
    price: 19000,
    merchant: "Second Bloom Studio",
    condition: "Good",
    image: "/products/succulentPot.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "sme-camera-set",
    name: "Film camera with lenses",
    category: "Everyday things",
    price: 122000,
    merchant: "Thant's Finds",
    condition: "Good",
    image: "/products/filmCamera.jpg",
    badge: "A GOOD FIND",
    badgeTone: "green",
  },
  {
    id: "sme-serving-bowl",
    name: "Blue-and-white serving bowl",
    category: "Home & living",
    price: 26000,
    merchant: "Second Bloom Studio",
    condition: "Very good",
    image: "/products/ceramicPlates.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "sme-market-tote",
    name: "Everyday market tote",
    category: "Accessories",
    price: 20000,
    merchant: "Mya's Thrift Corner",
    condition: "Good",
    image: "/products/wovenMarketBag.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
]

const individualProducts: HomeProduct[] = [
  {
    id: "individual-denim-jacket",
    name: "The everyday denim jacket",
    category: "Style again",
    price: 48000,
    merchant: "Su's Shelf",
    condition: "Very good",
    image: "/products/denimJacket.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "individual-ceramic-plates",
    name: "Sunday plates, set of four",
    category: "Home & living",
    price: 24000,
    merchant: "Nilar's Nook",
    condition: "Like new",
    image: "/products/ceramicPlates.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "individual-woven-tote",
    name: "Woven market tote",
    category: "Accessories",
    price: 15000,
    merchant: "Aye's Attic",
    condition: "Good",
    image: "/products/wovenMarketBag.jpg",
    badge: "A GOOD FIND",
    badgeTone: "green",
  },
  {
    id: "individual-desk-lamp",
    name: "Warm glow desk lamp",
    category: "Home & living",
    price: 36000,
    merchant: "Ko Min's Corner",
    condition: "Good",
    image: "/products/deskLamp.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "individual-film-camera",
    name: "Pocket film camera",
    category: "Everyday things",
    price: 82000,
    merchant: "Hnin's Finds",
    condition: "Good",
    image: "/products/filmCamera.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
  {
    id: "individual-wooden-stool",
    name: "Little oak side stool",
    category: "Home & living",
    price: 58000,
    merchant: "Nilar's Nook",
    condition: "Very good",
    image: "/products/woodenStool.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "individual-wall-shelf",
    name: "Wooden wall shelf",
    category: "Everyday things",
    price: 20000,
    merchant: "Su's Shelf",
    condition: "Like new",
    image: "/products/woodenWallShelf.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "individual-plant-pot",
    name: "Speckled planter",
    category: "Home & living",
    price: 18000,
    merchant: "Aye's Attic",
    condition: "Good",
    image: "/products/succulentPot.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "individual-weekend-bag",
    name: "Weekend market bag",
    category: "Accessories",
    price: 22000,
    merchant: "Hnin's Finds",
    condition: "Like new",
    image: "/products/wovenMarketBag.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
  {
    id: "individual-faded-denim",
    name: "Faded blue denim jacket",
    category: "Style again",
    price: 44000,
    originalPrice: 55000,
    merchant: "Ko Min's Corner",
    condition: "Good",
    image: "/products/denimJacket.jpg",
    badge: "−20%",
    badgeTone: "coral",
  },
  {
    id: "individual-amber-lamp",
    name: "Amber reading lamp",
    category: "Home & living",
    price: 39000,
    merchant: "Su's Shelf",
    condition: "Very good",
    image: "/products/deskLamp.jpg",
    badge: "LOVED",
    badgeTone: "lavender",
  },
  {
    id: "individual-film-camera-strap",
    name: "Film camera and strap",
    category: "Everyday things",
    price: 112000,
    merchant: "Nilar's Nook",
    condition: "Good",
    image: "/products/filmCamera.jpg",
    badge: "A GOOD FIND",
    badgeTone: "green",
  },
  {
    id: "individual-plate-pair",
    name: "Blue-and-white plate pair",
    category: "Home & living",
    price: 21000,
    merchant: "Aye's Attic",
    condition: "Good",
    image: "/products/ceramicPlates.jpg",
    badge: "JUST IN",
    badgeTone: "green",
  },
  {
    id: "individual-honey-stool",
    name: "Honey oak wooden stool",
    category: "Home & living",
    price: 62000,
    merchant: "Hnin's Finds",
    condition: "Like new",
    image: "/products/woodenStool.jpg",
    badge: "ONE OF A KIND",
    badgeTone: "lavender",
  },
]

export const catalogPageMock = {
  sme: {
    id: "sme",
    href: "/shops",
    eyebrow: "SMALL BUSINESSES, GOOD FINDS",
    title: "Small &",
    highlight: "mighty finds.",
    description:
      "Meet the small businesses and makers giving useful things another chapter. Every find supports a local shop, studio, or workshop.",
    note: "A design preview while the final shops scope is confirmed.",
    stats: [
      { value: "38", label: "small businesses" },
      { value: "140+", label: "good finds" },
    ],
    products: smeProducts,
    categories: catalogCategories,
    conditions: catalogConditions,
    priceRanges: catalogPriceRanges,
    copy: catalogCopy,
  },
  individual: {
    id: "individual",
    href: "/products",
    eyebrow: "FROM ONE HOME TO ANOTHER",
    title: "Good things,",
    highlight: "passed on.",
    description:
      "Good things passed on by people nearby. Thoughtful finds from one home to another, with plenty of life left to give.",
    note: "A design preview while the final products scope is confirmed.",
    stats: [
      { value: "96", label: "individual sellers" },
      { value: "310+", label: "passed-on finds" },
    ],
    products: individualProducts,
    categories: catalogCategories,
    conditions: catalogConditions,
    priceRanges: catalogPriceRanges,
    copy: catalogCopy,
  },
} satisfies Record<"sme" | "individual", CatalogPageConfig>
