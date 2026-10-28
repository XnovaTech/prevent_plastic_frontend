"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Clock,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react/dist/ssr"

import type { BlogPost } from "@/mock/blogPageMock"

type BlogSectionProps = {
  posts: readonly BlogPost[]
}

const toneClasses: Record<BlogPost["tone"], string> = {
  sage: "bg-[#e8eee5] text-[#38684f]",
  peach: "bg-[#f8ebe5] text-[#a65e46]",
  lavender: "bg-[#f0edf6] text-[#695381]",
  butter: "bg-[#f5f1df] text-[#8a7440]",
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e7e9e1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#cbd8cc] hover:shadow-[0_18px_48px_-28px_rgba(27,65,56,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2"
      href={`/blog/${post.slug}`}
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#edf1ea]">
          <Image
            alt={post.imageAlt}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            src={post.image}
          />
          <span
            className={`absolute top-4 left-4 inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase ${toneClasses[post.tone]}`}
          >
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-serif text-[21px] leading-[1.15] tracking-[-0.035em] text-brand sm:text-[23px]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[12px] leading-6 text-brand-light sm:text-[13px]">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-brand-gray-3">
              <span className="inline-flex items-center gap-1.5">
                <Calendar aria-hidden="true" size={13} />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" size={13} />
                {post.readTime}
              </span>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="shrink-0 text-brand-3 transition-transform group-hover:translate-x-1"
              size={17}
            />
          </div>
        </div>
      </article>
    </Link>
  )
}

export function BlogSection({ posts }: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All stories")
  const [searchTerm, setSearchTerm] = useState("")
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const visiblePosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All stories" || post.category === activeCategory
    const matchesSearch =
      !normalizedSearch ||
      `${post.title} ${post.excerpt} ${post.category}`
        .toLowerCase()
        .includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })
  const leadPost =
    visiblePosts.find((post) => post.featured) ?? visiblePosts[0]
  const remainingPosts = leadPost
    ? visiblePosts.filter((post) => post.id !== leadPost.id)
    : []

  return (
    <section
      aria-labelledby="journal-title"
      className="px-4 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-20 lg:px-12 lg:pt-12 lg:pb-24"
      id="blog"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          aria-label="Journal stories"
          className="scroll-mt-6"
          id="journal-stories"
        >
          <header className="flex flex-col gap-5 border-b border-[#e3e7df] pb-6 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                THE JOURNAL
              </p>
              <h1
                className="mt-2 font-serif text-[34px] leading-tight tracking-[-0.045em] text-brand sm:text-[42px]"
                id="journal-title"
              >
                Stories from the market
              </h1>
              <p className="mt-2 max-w-[600px] text-[12px] leading-6 text-brand-light sm:text-[13px]">
                Notes on secondhand finds, local makers, repair and care, and
                thoughtful everyday living.
              </p>
            </div>

            <label className="flex min-h-12 w-full items-center gap-3 rounded-full border border-[#dfe5dc] bg-white px-4 text-brand-3 transition-colors focus-within:border-brand-3 lg:max-w-[360px]">
              <MagnifyingGlass aria-hidden="true" size={18} />
              <span className="sr-only">Search journal stories</span>
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-brand outline-none placeholder:text-brand-gray-4"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search stories"
                type="search"
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  aria-label="Clear search"
                  className="inline-flex size-8 items-center justify-center rounded-full text-brand-gray-4 transition-colors hover:bg-[#f1f3ee] hover:text-brand"
                  onClick={() => setSearchTerm("")}
                  type="button"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              )}
            </label>
          </header>

          <div className="flex flex-wrap items-center gap-2 py-5">
            {["All stories", ...categories].map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  aria-pressed={isActive}
                  className={`min-h-10 rounded-full border px-4 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 ${
                    isActive
                      ? "border-brand-2 bg-brand-2 text-white"
                      : "border-[#dfe5dc] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f6f7f3]"
                  }`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              )
            })}
            <p
              aria-live="polite"
              className="ml-auto text-[11px] text-brand-gray-4"
            >
              {visiblePosts.length}{" "}
              {visiblePosts.length === 1 ? "story" : "stories"}
            </p>
          </div>

          {leadPost ? (
            <div className="space-y-6 sm:space-y-8">
              <article className="group overflow-hidden rounded-[26px] border border-[#e7e9e1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#cbd8cc] hover:shadow-[0_20px_56px_-30px_rgba(27,65,56,0.35)]">
                <Link
                  className="grid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 lg:grid-cols-[1.12fr_0.88fr]"
                  href={`/blog/${leadPost.slug}`}
                >
                  <div className="relative min-h-[250px] overflow-hidden bg-[#edf1ea] sm:min-h-[340px] lg:min-h-[420px]">
                    <Image
                      alt={leadPost.imageAlt}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      fill
                      loading="eager"
                      sizes="(max-width: 1023px) 100vw, 55vw"
                      src={leadPost.image}
                    />
                    <span
                      className={`absolute top-4 left-4 inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase ${toneClasses[leadPost.tone]}`}
                    >
                      {leadPost.featured ? "Featured story" : leadPost.category}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-5 uppercase">
                      {leadPost.eyebrow}
                    </p>
                    <h3 className="mt-3 font-serif text-[28px] leading-[1.08] tracking-[-0.045em] text-brand sm:text-[36px]">
                      {leadPost.title}
                    </h3>
                    <p className="mt-4 text-[13px] leading-7 text-brand-light">
                      {leadPost.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7e9e1] pt-5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-brand-gray-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar aria-hidden="true" size={13} />
                          {leadPost.publishedAt}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock aria-hidden="true" size={13} />
                          {leadPost.readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-3">
                        Read story
                        <ArrowRight
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                          size={15}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              {remainingPosts.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#d8e0d7] bg-[#f7f8f4] px-5 py-12 text-center sm:py-16">
              <h3 className="font-serif text-2xl tracking-[-0.03em] text-brand">
                No stories found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-light">
                Try another search or choose a different topic to find a story.
              </p>
              <button
                className="mt-5 inline-flex min-h-10 items-center rounded-full bg-brand-2 px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                onClick={() => {
                  setActiveCategory("All stories")
                  setSearchTerm("")
                }}
                type="button"
              >
                Show all stories
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
