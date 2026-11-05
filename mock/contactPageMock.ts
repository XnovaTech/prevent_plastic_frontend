export type ContactMethod = {
  id: string
  title: string
  description: string
  value: string
  href?: string
  icon: "email" | "phone" | "visit" | "social"
  tone: "sage" | "peach" | "lavender" | "butter"
  note: string
}

export type ContactFaq = {
  id: string
  question: string
  answer: string
}

export const contactPageMock = {
  hero: {
    eyebrow: "A NOTE, A QUESTION, A HELLO",
    heading: "Good things",
    highlight: "start with a hello.",
    description:
      "Whether you're hunting for a specific find, thinking about selling with us, or simply want to say hello — our inbox is a friendly place to land.",
    primaryAction: { label: "Write us a note", href: "#contact-form" },
    secondaryAction: { label: "Visit the studio", href: "#visit" },
    note: "A design preview — contact details and message delivery are still being confirmed.",
    card: {
      eyebrow: "A NOTE FROM US",
      title: "Hello, you.",
      body: "Tell us about a find, a fix, or a good idea. We read every note with a cup of tea in hand.",
      signature: "— The Prevent Plastic team",
      stamp: "GOOD THINGS, AGAIN",
    },
  },
  methods: [
    {
      id: "email",
      title: "Email us",
      description: "For finds, fixes, and everything in between.",
      value: "hello@preventplastic.com",
      href: "mailto:hello@preventplastic.com",
      icon: "email",
      tone: "sage",
      note: "The quickest way to reach a real person",
    },
    {
      id: "phone",
      title: "Call us",
      description: "A friendly voice, Monday to Friday.",
      value: "+95 9 000 000 000",
      href: "tel:+959000000000",
      icon: "phone",
      tone: "peach",
      note: "10:00–17:00, Mon–Fri",
    },
    {
      id: "visit",
      title: "Visit the studio",
      description: "Come by for a look, a chat, or both.",
      value: "24 Inya Road, Yangon",
      icon: "visit",
      tone: "lavender",
      note: "By appointment — drop us a note first",
    },
    {
      id: "social",
      title: "Follow along",
      description: "Small updates, good finds, less waste.",
      value: "@preventplastic",
      href: "https://www.instagram.com/",
      icon: "social",
      tone: "butter",
      note: "Say hello in the DMs",
    },
  ] satisfies ContactMethod[],
  methodsIntro: {
    eyebrow: "PICK YOUR HELLO",
    title: "Ways to reach us",
    note: "Sample details are shown for this design preview — the real ones will land when confirmed.",
  },
  form: {
    eyebrow: "SEND A LITTLE NOTE",
    title: "Tell us what's on your mind",
    description:
      "Share a little context and we'll point you in the right direction. No detail is too small.",
    topics: [
      "A question about a find",
      "Selling with us",
      "Repair & care",
      "Partnerships & press",
      "Something else",
    ],
    pendingNote: "This form is a design preview and doesn't send messages yet.",
    responseNote: "Email replies usually take a couple of working days.",
  },
  faqs: [
    {
      id: "specific-find",
      question: "I'm looking for something specific. Can you help me find it?",
      answer:
        "Send us a note with the kind of thing you're after — a size, a colour, a room. We can't promise every find, but we love a treasure hunt and will point you toward merchants who might have it.",
    },
    {
      id: "selling",
      question: "I'd like to sell with Prevent Plastic. Where do I start?",
      answer:
        "We'd love to hear from you. Sellers need to apply and be approved before listing, so start with a note about what you make or sell and where you're based. The full application flow is still being confirmed.",
    },
    {
      id: "care",
      question: "Something arrived with a story to tell. How do I care for it?",
      answer:
        "Every pre-loved piece is a little different. Tell us what it is and what's worrying you, and we'll share care guidance or connect you with a local fixer where we can.",
    },
    {
      id: "visit",
      question: "Can I visit the studio without an appointment?",
      answer:
        "Our space is small and often out on market runs, so visits are by appointment for now. Send a note with a time that suits you and we'll confirm.",
    },
    {
      id: "feedback",
      question: "I spotted a bug or have a design thought.",
      answer:
        "Lovely. Tell us the page you were on and what you expected to happen. Screenshots help, but a good description is plenty.",
    },
  ] satisfies ContactFaq[],
  community: {
    eyebrow: "A SMALLER FOOTPRINT, TOGETHER",
    heading: "Every note makes\nthis little market\nmore thoughtful.",
    description:
      "Prevent Plastic is built by people who care about what already exists. Questions, ideas, and gentle nudges all help us make the marketplace a better place to wander.",
    actionLabel: "Meet the community",
    actionHref: "/#community",
    stats: [
      { value: "2 days", label: "typical reply time" },
      { value: "180+", label: "local makers & merchants" },
      { value: "1 community", label: "making less waste together" },
    ],
  },
} as const
