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
