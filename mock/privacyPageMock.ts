export type PrivacySection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type PrivacyPageContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    updated: string
  }
  sections: PrivacySection[]
  contactNote: {
    title: string
    description: string
    actionLabel: string
    actionHref: string
  }
}

export const privacyPageMock: PrivacyPageContent = {
  hero: {
    eyebrow: "PRIVACY & POLICY",
    title: "Your data, handled with care.",
    description:
      "A plain-language look at what Prevent Plastic collects, why we collect it, and the choices you always have. No legalese walls — just the honest version.",
    updated: "Last updated 4 November 2026",
  },
  sections: [
    {
      id: "what-we-collect",
      title: "What we collect",
      paragraphs: [
        "You can browse the whole marketplace without an account. When you do reach out or interact, we only hold what you choose to share with us.",
      ],
      bullets: [
        "Messages you send to a seller through chat",
        "Reviews and ratings you write for a find",
        "Notes you send through the contact form",
        "Your bag and wishlist, stored in your own browser",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      paragraphs: [
        "Your information is used to run the marketplace — nothing more exotic than that.",
      ],
      bullets: [
        "Reply to your questions and connect you with sellers",
        "Keep your bag and wishlist where you left them",
        "Understand what the community loves so we can improve the browse",
        "Keep the marketplace safe, fair, and friendly",
      ],
    },
    {
      id: "cookies-storage",
      title: "Cookies & local storage",
      paragraphs: [
        "Your bag and wishlist live in your browser's local storage, not on a server — they stay on the device you used. Clearing your browser data resets them.",
        "This is a design preview, so there are no advertising trackers or third-party analytics baked in. If that changes, this page changes with it.",
      ],
    },
    {
      id: "sharing",
      title: "When we share it",
      paragraphs: [
        "We do not sell your personal information. Ever.",
        "We only share what is needed to do the job — for example, passing a delivery note to a seller so they can reach you. Payment and delivery partners will be named here once they are confirmed.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices & rights",
      paragraphs: ["You are in the driver's seat with your data."],
      bullets: [
        "Clear your bag and wishlist at any time from your browser",
        "Ask what we hold about you and request a copy",
        "Ask us to delete what you have shared with us",
        "Opt out of anything non-essential — just say the word",
      ],
    },
    {
      id: "security",
      title: "Keeping it safe",
      paragraphs: [
        "We take reasonable technical and organisational steps to protect what you share with us. No system is perfectly secure, but we treat your trust as part of the product — and we will tell you plainly if something ever needs your attention.",
      ],
    },
    {
      id: "children",
      title: "Children's privacy",
      paragraphs: [
        "Prevent Plastic is made for a general audience and is not directed at children under 13. If you believe a child has shared personal information with us, contact us and we will remove it promptly.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "When this policy changes, we update the date at the top of this page and, for anything significant, we will flag it in the marketplace itself. Checking back here after an update is always the fastest way to see the current version.",
      ],
    },
  ],
  contactNote: {
    title: "Still have a question?",
    description:
      "If anything here is unclear, we would rather explain it than have you guess. Drop us a note and a human will reply.",
    actionLabel: "Contact us",
    actionHref: "/contact",
  },
}
