export type BlogImage = {
  src: string
  alt: string
}

export type BlogComment = {
  id: string
  author: string
  date: string
  body: string
}

export type BlogReview = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  eyebrow: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  authorImage: string
  publishedAt: string
  readTime: string
  image: string
  imageAlt: string
  images: readonly BlogImage[]
  category: string
  tone: "sage" | "peach" | "lavender" | "butter"
  featured: boolean
  likes: number
  commentCount: number
  ratingAverage: number
  ratingCount: number
  comments: readonly BlogComment[]
  reviews: readonly BlogReview[]
}

export const blogPageMock = {
  posts: [
    {
      id: "blog-001",
      slug: "why-secondhand-first",
      title: "Why Secondhand First?",
      eyebrow: "OUR CONCEPT",
      excerpt:
        "Every new product carries a footprint — materials, energy, transport, waste. When you choose pre-loved, you skip all of that.",
      content: `<p>The most sustainable thing you can buy is something that already exists. It's a simple idea, but it changes everything about how we shop.</p><p>When you choose a pre-loved ceramic plate instead of a new one, you're not just getting a beautiful piece — you're skipping the clay mining, the kiln firing, the packaging, and the shipping that comes with something brand new.</p><p>At Prevent Plastic, we believe circular living starts with small, everyday choices. A denim jacket that's already been worn. A wooden stool that's already stood in someone's home. A ceramic mug that's already held morning tea. These things have stories worth continuing.</p><h2>What circular means to us</h2><p>Circular living isn't about being perfect. It's about keeping useful things in circulation longer. It's about repair over replace, pass-on over throw-away, and local over shipped.</p><h2>How to start</h2><ul><li>Look at what you already own before buying something new</li><li>Check local secondhand shops first</li><li>Learn basic repair skills — a button, a hem, a glue joint</li><li>Pass things on when you're done with them</li></ul><p>Every secondhand sale skips new production. That's the logic behind Prevent Plastic, and it's the logic we hope becomes yours too.</p>`,
      author: "Aye Chan",
      authorRole: "Founder & CEO",
      authorImage: "/products/ceramicPlates.jpg",
      publishedAt: "Oct 20, 2025",
      readTime: "5 min read",
      image: "/products/ceramicPlates.jpg",
      imageAlt: "Stack of pre-loved ceramic plates",
      images: [
        {
          src: "/products/ceramicPlates.jpg",
          alt: "Stack of pre-loved ceramic plates",
        },
        {
          src: "/products/wovenMarketBag.jpg",
          alt: "Handwoven market bag carried to a local shop",
        },
        {
          src: "/products/woodenStool.jpg",
          alt: "Sturdy wooden stool from someone else's home",
        },
        {
          src: "/products/denimJacket.jpg",
          alt: "Worn-in denim jacket ready for a second owner",
        },
      ],
      category: "Concept",
      tone: "sage",
      featured: true,
      likes: 23,
      commentCount: 3,
      ratingAverage: 4.7,
      ratingCount: 3,
      comments: [
        {
          id: "blog-001-comment-1",
          author: "Nay Chi",
          date: "Oct 21, 2025",
          body: "The bit about checking what you already own first really landed. I found three mugs hiding at the back of the cupboard yesterday.",
        },
        {
          id: "blog-001-comment-2",
          author: "Kyaw Zin",
          date: "Oct 20, 2025",
          body: "Sharing this with my flatmates — we're starting a little repair box in the kitchen this weekend.",
        },
        {
          id: "blog-001-comment-3",
          author: "May Thiri",
          date: "Oct 20, 2025",
          body: "Would love a follow-up on where to pass things on locally once we're done with them.",
        },
      ],
      reviews: [
        {
          id: "blog-001-review-1",
          author: "Aung Myo",
          rating: 5,
          title: "Changed how I shop",
          body: "Read it twice in one evening. The repair over replace line has stuck with me all week.",
          date: "Oct 22, 2025",
        },
        {
          id: "blog-001-review-2",
          author: "Su Yee",
          rating: 4,
          title: "Simple and honest",
          body: "Short, practical and never preachy. I only wish it were a little longer.",
          date: "Oct 19, 2025",
        },
        {
          id: "blog-001-review-3",
          author: "Htet Aung",
          rating: 5,
          title: "A good starting point",
          body: "Sent this to my parents and we ended up talking about it at dinner. A great intro to circular living.",
          date: "Oct 18, 2025",
        },
      ],
    },
    {
      id: "blog-002",
      slug: "repair-care-guide",
      title: "A Gentle Repair & Care Guide",
      eyebrow: "LIVING WITH LESS WASTE",
      excerpt:
        "Small fixes — a loose button, a wobbly leg, a chipped rim — keep good things in your home longer.",
      content: `<p>Repair is the quiet hero of circular living. A loose button, a wobbly stool leg, a chipped ceramic rim — these aren't reasons to let go. They're invitations to keep going.</p><p>We've put together a small guide to the most common repairs and care routines for the kinds of things you'll find on Prevent Plastic.</p><h2>Ceramics & Homeware</h2><p>Hand-wash where possible. Avoid sudden temperature changes — don't take a cold plate straight from the fridge into a hot oven. A hairline crack doesn't mean the end; kintsugi-style repair with food-safe ceramic adhesive can turn a break into a feature.</p><h2>Textiles & Clothing</h2><p>Wash less, air more. A denim jacket doesn't need washing after every wear — hang it outside to refresh. Learn the running stitch and backstitch; they're enough to fix most seams and reattach buttons.</p><h2>Wood & Furniture</h2><p>Tighten loose screws. Re-glue wobbly joints with wood glue and a clamp overnight. A little beeswax or food-safe mineral oil brings dried wood back to life.</p><p>If a fix feels beyond you, that's okay too. Our community includes local fixers who can help. Reach out and we'll point you in the right direction.</p>`,
      author: "Thiri Myat",
      authorRole: "Head of Design",
      authorImage: "/products/woodenWallShelf.jpg",
      publishedAt: "Oct 15, 2025",
      readTime: "7 min read",
      image: "/products/woodenWallShelf.jpg",
      imageAlt: "Wooden wall shelf and repair tools",
      images: [
        {
          src: "/products/woodenWallShelf.jpg",
          alt: "Wooden wall shelf and repair tools",
        },
        {
          src: "/products/deskLamp.jpg",
          alt: "Desk lamp with a freshly rewired cord",
        },
        {
          src: "/products/filmCamera.jpg",
          alt: "Vintage film camera cleaned and film-tested",
        },
        {
          src: "/products/ceramicPlates.jpg",
          alt: "Ceramic plate mended with food-safe adhesive",
        },
      ],
      category: "Repair & Care",
      tone: "lavender",
      featured: true,
      likes: 17,
      commentCount: 2,
      ratingAverage: 4.5,
      ratingCount: 2,
      comments: [
        {
          id: "blog-002-comment-1",
          author: "Hnin Wai",
          date: "Oct 16, 2025",
          body: "The kintsugi-style tip saved my favourite bowl. The chip is a feature now instead of a flaw.",
        },
        {
          id: "blog-002-comment-2",
          author: "Thet Oo",
          date: "Oct 15, 2025",
          body: "More of these please — a section on bags and straps would be amazing.",
        },
      ],
      reviews: [
        {
          id: "blog-002-review-1",
          author: "Cho Gyi",
          rating: 4,
          title: "Handy and practical",
          body: "Tried the wood glue fix on a wobbly chair and it held overnight just like the guide promised.",
          date: "Oct 17, 2025",
        },
        {
          id: "blog-002-review-2",
          author: "Phyo Phyo",
          rating: 5,
          title: "Worth bookmarking",
          body: "Clear steps and no jargon. I reread the textiles section before every wash day now.",
          date: "Oct 14, 2025",
        },
      ],
    },
    {
      id: "blog-003",
      slug: "meet-mandalay-makers",
      title: "Meet the Makers of Mandalay",
      eyebrow: "LOCAL STORIES",
      excerpt:
        "Behind every listing is a person. We visited three independent sellers in Mandalay to hear their stories.",
      content: `<p>Prevent Plastic isn't just a website — it's a network of people. We traveled to Mandalay to meet three of the independent sellers who make our marketplace what it is.</p><h2>Mya's Thrift Corner</h2><p>Mya curates pre-loved fashion from her home in Mandalay. "Each piece chooses its next owner," she says. Her curation focuses on well-made garments with natural fibers — cotton, linen, denim — that wear in beautifully over time.</p><h2>Thant's Finds</h2><p>Thant specializes in vintage homeware — ceramics, glassware, small furniture. "I look for pieces with character," he explains. "Chips and wear tell stories, not flaws."</p><h2>Preloved Kids</h2><p>Running from a small workshop, Preloved Kids gathers gently used children's clothes and toys. "Kids grow fast," she says. "These things deserve another childhood."</p><p>Meeting them reminded us why we started: circular living is local living. It's people passing good things to people nearby.</p>`,
      author: "Su Su Hlaing",
      authorRole: "Community Lead",
      authorImage: "/products/succulentPot.jpg",
      publishedAt: "Oct 10, 2025",
      readTime: "6 min read",
      image: "/products/succulentPot.jpg",
      imageAlt: "Mandalay makers and their goods",
      images: [
        {
          src: "/products/succulentPot.jpg",
          alt: "Mandalay makers and their goods",
        },
        {
          src: "/products/wovenMarketBag.jpg",
          alt: "Handwoven goods laid out at a maker's stall",
        },
        {
          src: "/products/denimJacket.jpg",
          alt: "Pre-loved garments curated by a local seller",
        },
        {
          src: "/products/filmCamera.jpg",
          alt: "Vintage finds with character and history",
        },
      ],
      category: "Local Stories",
      tone: "peach",
      featured: false,
      likes: 31,
      commentCount: 3,
      ratingAverage: 4.7,
      ratingCount: 3,
      comments: [
        {
          id: "blog-003-comment-1",
          author: "Zin Mar",
          date: "Oct 11, 2025",
          body: "Mya's line — each piece chooses its next owner — is going to stay with me for a long time.",
        },
        {
          id: "blog-003-comment-2",
          author: "Lin Htet",
          date: "Oct 10, 2025",
          body: "Visited Thant's Finds after reading this. He really does remember the story behind every piece.",
        },
        {
          id: "blog-003-comment-3",
          author: "Ei Khaing",
          date: "Oct 10, 2025",
          body: "More maker stories from Yangon next, please!",
        },
      ],
      reviews: [
        {
          id: "blog-003-review-1",
          author: "Nwe Nwe",
          rating: 5,
          title: "Felt like travelling along",
          body: "Warm, human and local. The best story on the journal so far.",
          date: "Oct 12, 2025",
        },
        {
          id: "blog-003-review-2",
          author: "Aye Pa Pa",
          rating: 5,
          title: "Proud to see local makers featured",
          body: "Beautifully written. Sharing it with everyone I know.",
          date: "Oct 11, 2025",
        },
        {
          id: "blog-003-review-3",
          author: "Min Thu",
          rating: 4,
          title: "Lovely read",
          body: "I wanted a few more photos from the visits, but the writing carries it.",
          date: "Oct 9, 2025",
        },
      ],
    },
    {
      id: "blog-004",
      slug: "circular-living-tips",
      title: "5 Small Steps to Less Waste",
      eyebrow: "LIVING WITH LESS WASTE",
      excerpt:
        "Circular living doesn't happen overnight. Here are five gentle ways to start.",
      content: `<p>Living with less waste doesn't mean overhauling your life on day one. It means small, repeated choices that add up.</p><h2>1. Start with what you have</h2><p>Before buying anything new, look around. That jar can store buttons. That box can hold craft supplies. That shirt can become a cleaning rag.</p><h2>2. Shop local, shop secondhand</h2><p>Check Prevent Plastic, your neighborhood thrift shop, or a local market before buying new. Local means less transport, less packaging.</p><h2>3. Repair before replace</h2><p>A loose button, a frayed hem, a wobbly leg — most things can be fixed with ten minutes and a few basic tools.</p><h2>4. Pass things on</h2><p>When you're done with something, list it, gift it, or donate it. Don't let good things sit unused.</p><h2>5. Buy less, choose well</h2><p>When you do buy new, choose quality that will last. Natural materials, repairable construction, timeless design.</p><p>Pick one step this week. That's enough.</p>`,
      author: "Ko Zaw",
      authorRole: "Operations Lead",
      authorImage: "/products/deskLamp.jpg",
      publishedAt: "Oct 5, 2025",
      readTime: "4 min read",
      image: "/products/deskLamp.jpg",
      imageAlt: "Desk lamp and home organization",
      images: [
        {
          src: "/products/deskLamp.jpg",
          alt: "Desk lamp and home organization",
        },
        {
          src: "/products/woodenStool.jpg",
          alt: "Wooden stool kept in circulation",
        },
        {
          src: "/products/wovenMarketBag.jpg",
          alt: "Reusable market bag for local shopping",
        },
        {
          src: "/products/succulentPot.jpg",
          alt: "Small potted plant in a reused container",
        },
      ],
      category: "Tips",
      tone: "butter",
      featured: false,
      likes: 9,
      commentCount: 2,
      ratingAverage: 3.5,
      ratingCount: 2,
      comments: [
        {
          id: "blog-004-comment-1",
          author: "Hla Hla",
          date: "Oct 6, 2025",
          body: "Step five is the hard one, but buy less, choose well is a good mantra to keep around.",
        },
        {
          id: "blog-004-comment-2",
          author: "Oo Wai",
          date: "Oct 5, 2025",
          body: "Started with the jar-for-buttons idea this morning. Tiny win!",
        },
      ],
      reviews: [
        {
          id: "blog-004-review-1",
          author: "Ko Khit",
          rating: 4,
          title: "Small steps, big shift",
          body: "Realistic advice that never guilt-trips you. I have already cut down on packaging waste.",
          date: "Oct 7, 2025",
        },
        {
          id: "blog-004-review-2",
          author: "Thida",
          rating: 3,
          title: "Good basics",
          body: "Great if you are just starting out. Seasoned minimalists might find it familiar.",
          date: "Oct 4, 2025",
        },
      ],
    },
  ] as const,

  categories: [
    { id: "concept", label: "Concept", count: 1 },
    { id: "repair-care", label: "Repair & Care", count: 1 },
    { id: "local-stories", label: "Local Stories", count: 1 },
    { id: "tips", label: "Tips", count: 1 },
  ],
}

export function getAllBlogPosts(): readonly BlogPost[] {
  return blogPageMock.posts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPageMock.posts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPosts(): readonly BlogPost[] {
  return blogPageMock.posts.filter((post) => post.featured)
}

export function getBlogCategories() {
  return blogPageMock.categories
}
