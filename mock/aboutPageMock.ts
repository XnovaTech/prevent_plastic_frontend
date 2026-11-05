export type AboutPageContent = {
  hero: {
    eyebrow: string
    title: string
    highlight: string
    description: string
    primaryAction: { label: string; href: string }
    secondaryAction: { label: string; href: string }
    image: string
    imageAlt: string
    imageLabel: string
  }
  culture: {
    eyebrow: string
    title: string
    description: string
    cards: readonly {
      id: string
      title: string
      description: string
      image: string
      imageAlt: string
    }[]
  }
  introduction: {
    eyebrow: string
    title: string
    description: string
    benefits: readonly {
      id: string
      title: string
      description: string
    }[]
    featureEyebrow: string
    featureTitle: string
    featureDescription: string
    featureImage: string
    featureImageAlt: string
    featureCardTitle: string
    featureCardDescription: string
    featureAction: { label: string; href: string }
  }
  campaign: {
    eyebrow: string
    title: string
    highlight: string
    description: string
    image: string
    imageAlt: string
    imageLabel: string
    quote: string
    quoteAttribution: string
    primaryAction: { label: string; href: string }
    secondaryAction: { label: string; href: string }
    actions: readonly {
      id: string
      title: string
      description: string
    }[]
  }
  values: {
    eyebrow: string
    title: string
    description: string
    image: string
    imageAlt: string
    points: readonly {
      id: string
      title: string
      description: string
    }[]
  }
  impact: {
    eyebrow: string
    title: string
    description: string
    image: string
    imageAlt: string
    points: readonly {
      id: string
      title: string
      description: string
    }[]
  }
  faqIntro: {
    eyebrow: string
    title: string
    description: string
  }
  faqs: readonly {
    id: string
    question: string
    answer: string
  }[]
  cta: {
    eyebrow: string
    title: string
    highlight: string
    description: string
    primaryAction: { label: string; href: string }
    secondaryAction: { label: string; href: string }
    note: string
  }
}

export const aboutPageMock = {
  hero: {
    eyebrow: "OUR STORY",
    title: "Good things deserve",
    highlight: "another chapter.",
    description:
      "Prevent Plastic is a local marketplace for pre-loved finds and thoughtful sellers. We make it easier to discover useful things, give them another life, and support the people behind each find.",
    primaryAction: { label: "Explore the market", href: "/products" },
    secondaryAction: { label: "Meet local shops", href: "/shops" },
    image: "/products/woodenWallShelf.jpg",
    imageAlt: "A vintage wooden wall shelf ready for another home",
    imageLabel: "GOOD THINGS, AGAIN",
  },
  culture: {
    eyebrow: "WHY WORK WITH US?",
    title: "Good people, good work.",
    description:
      "We are a small team that believes pre-loved things deserve another chapter. Here is what it is like to build alongside us.",
    cards: [
      {
        id: "make-your-mark",
        title: "Make your mark",
        description:
          "Everyone plays a role in the impact we create. Our flat structure lets all levels of the organization make decisions and share ideas that drive us forward.",
        image: "/products/woodenWallShelf.jpg",
        imageAlt: "A vintage wooden wall shelf ready for another home",
      },
      {
        id: "thoughtful-space",
        title: "Thoughtful space",
        description:
          "We transformed an old hot pot restaurant into a vibrant Yangon headquarters. Bright and airy with an open floor plan, space is designed for collaboration, comfort and community.",
        image: "/products/filmCamera.jpg",
        imageAlt: "Bright open office space designed for collaboration",
      },
      {
        id: "grow-together",
        title: "Grow together",
        description:
          "From mentoring to our in-house training, there are lots of ways to grow. Our team members have the autonomy and support to try new things and get out of their comfort zone.",
        image: "/prevent/126508.jpg",
        imageAlt: "A woven market bag ready for everyday use",
      },
      {
        id: "adventure-is-out-there",
        title: "Adventure is out there",
        description:
          "Get out of the office and into the village. There are tons of opportunities to get to know and serve our customers across rural Myanmar.",
        image: "/products/deskLamp.jpg",
        imageAlt: "A desk lamp lighting up a workspace",
      },
      {
        id: "transparent",
        title: "Transparent",
        description:
          "You will know what is going on. We share our financials, strategy and decision-making widely. We are an open book.",
        image: "/products/ceramicPlates.jpg",
        imageAlt: "Ceramic plates ready for another table",
      },
      {
        id: "great-colleagues",
        title: "Great colleagues",
        description:
          "We hire smart, talented, and nice people from Myanmar and around the globe. And we do lots of stuff together, from team lunches to after-work sports, water festival shenanigans and more.",
        image: "/products/succulentPot.jpg",
        imageAlt: "A small potted plant bringing life to a home",
      },
    ],
  },
  introduction: {
    eyebrow: "WHY PRE-LOVED",
    title: "Good finds have more to give.",
    description:
      "A secondhand find can be useful, full of character, and ready for many more everyday moments. Here are a few reasons to start with what already exists.",
    benefits: [
      {
        id: "character",
        title: "Find something with character",
        description:
          "Discover pieces with their own look, history, and place in your home.",
      },
      {
        id: "reuse",
        title: "Give useful things another turn",
        description:
          "Choose items that are ready to be enjoyed instead of left unused.",
      },
      {
        id: "local",
        title: "Meet local sellers",
        description:
          "Explore listings from independent sellers and small local shops.",
      },
      {
        id: "choice",
        title: "Make a thoughtful choice",
        description:
          "Take a moment to consider what you need and what is already available.",
      },
      {
        id: "care",
        title: "Keep good things going",
        description:
          "Care for, repair, and enjoy the things you choose for longer.",
      },
      {
        id: "share",
        title: "Pass things along",
        description:
          "When you are ready, help useful pieces find their next home.",
      },
    ],
    featureEyebrow: "LOCAL FINDS, ALL TOGETHER",
    featureTitle: "A little closer to home.",
    featureDescription:
      "Browse pre-loved pieces from local shops and individual sellers. Find something useful, learn about the seller, and explore at your own pace.",
    featureImage: "/prevent/img.jpg",
    featureImageAlt: "A woven market bag listed by a local seller",
    featureCardTitle: "Discover local sellers",
    featureCardDescription:
      "Explore independent sellers and small shops bringing good finds to the marketplace.",
    featureAction: { label: "Meet local shops", href: "/shops" },
  },
  campaign: {
    eyebrow: "THE SECOND-LIFE CAMPAIGN",
    title: "Buy less new.",
    highlight: "Keep more good.",
    description:
      "A small campaign with a simple ask: start with what already exists, choose local when you can, and care for the things you keep.",
    image: "/prevent/126508.jpg",
    imageAlt: "A pre-loved denim jacket ready for another chapter",
    imageLabel: "WEAR IT AGAIN",
    quote:
      "The most sustainable purchase is often the one that already exists.",
    quoteAttribution: "The idea behind the campaign",
    primaryAction: { label: "Explore pre-loved finds", href: "/products" },
    secondaryAction: { label: "See what guides us", href: "#values" },
    actions: [
      {
        id: "secondhand-first",
        title: "Choose secondhand first",
        description:
          "Look for what already exists before buying something new.",
      },
      {
        id: "local-first",
        title: "Support local sellers",
        description: "Keep good things moving within the community.",
      },
      {
        id: "repair-first",
        title: "Repair before replace",
        description: "A little care can add years of everyday use.",
      },
    ],
  },
  values: {
    eyebrow: "WHAT GUIDES US",
    title: "Thoughtful by nature. Local by choice.",
    description:
      "We believe good marketplace experiences start with useful choices, clear information, and respect for the people and things involved.",
    image: "/prevent/126508.jpg",
    imageAlt: "A pre-loved denim jacket with plenty of wear left",
    points: [
      {
        id: "reuse",
        title: "Choose reuse",
        description:
          "Make room for things that already exist before reaching for something new.",
      },
      {
        id: "local",
        title: "Keep it local",
        description:
          "Discover independent sellers and small businesses in the community.",
      },
      {
        id: "clear",
        title: "Share clear details",
        description:
          "Good photos and honest item descriptions help people choose with care.",
      },
      {
        id: "care",
        title: "Make things last",
        description:
          "Everyday care and repair can help useful pieces stay in use longer.",
      },
    ],
  },
  impact: {
    eyebrow: "A MORE THOUGHTFUL WAY TO SHOP",
    title: "Small choices can make room for better habits.",
    description:
      "There is no need to shop perfectly. Starting with what already exists, choosing local when it suits you, and taking care of what you own are simple steps toward using things more thoughtfully.",
    image: "/products/succulentPot.jpg",
    imageAlt: "A small potted plant bringing life to a home",
    points: [
      {
        id: "browse",
        title: "Browse before buying new",
        description: "See whether a pre-loved find is right for what you need.",
      },
      {
        id: "support",
        title: "Support nearby sellers",
        description: "Discover the people and small shops behind each listing.",
      },
      {
        id: "share",
        title: "Pass things along",
        description:
          "When you are ready, help useful items find their next home.",
      },
    ],
  },
  faqIntro: {
    eyebrow: "A FEW QUICK ANSWERS",
    title: "Good to know",
    description:
      "A little more about the marketplace, local sellers, and how the preview works.",
  },
  faqs: [
    {
      id: "what-can-i-find",
      question: "What can I find on Prevent Plastic?",
      answer:
        "The marketplace features pre-loved homeware, clothing, accessories, and other useful everyday items from local shops and individual sellers.",
    },
    {
      id: "can-i-sell",
      question: "Can I sell with Prevent Plastic?",
      answer:
        "We would love to hear what you sell or make. Contact us to start a conversation; seller onboarding details are still being confirmed.",
    },
    {
      id: "checkout",
      question: "Can I place an order through the website?",
      answer:
        "The current marketplace is a design preview. Checkout, payment, and delivery are not connected yet, so orders cannot be placed through the website.",
    },
    {
      id: "why-preloved",
      question: "Why focus on pre-loved things?",
      answer:
        "Choosing something that already exists can help extend its useful life. We want second-hand shopping to feel like a thoughtful first choice.",
    },
  ],
  cta: {
    eyebrow: "START WITH ONE GOOD FIND",
    title: "There is always",
    highlight: "another story.",
    description:
      "Explore pre-loved finds, discover local sellers, and see what might be useful in your everyday life.",
    primaryAction: { label: "Explore the market", href: "/products" },
    secondaryAction: { label: "Contact us", href: "/contact" },
    note: "This is a design preview. Checkout, payment, delivery, and seller onboarding are still being confirmed.",
  },
} as const satisfies AboutPageContent
