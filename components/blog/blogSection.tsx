"use client"

import Image from "next/image"
import Link from "next/link"

import type { BlogPost } from "@/mock/blogPageMock"

import { Calendar, Clock } from "@phosphor-icons/react/dist/ssr"

type BlogSectionProps = {
  posts: readonly BlogPost[]
}

const toneClasses: Record<string, string> = {
  sage: "bg-[#e8eee5] text-[#38684f]",
  peach: "bg-[#f8ebe5] text-[#a65e46]",
  lavender: "bg-[#f0edf6] text-[#695381]",
  butter: "bg-[#f5f1df] text-[#8a7440]",
}

export function BlogSection({ posts }: BlogSectionProps) {
  const featured = posts.filter((p) => p.featured)
  const regular = posts.filter((p) => !p.featured)

  return (
    <section className="py-16 sm:py-20" id="blog">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 sm:mb-16 text-center" data-aos="fade-up">
          <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            THE JOURNAL
          </p>
          <h1 className="font-serif text-[38px] leading-tight tracking-[-0.04em] text-brand sm:text-[48px]">
            Stories from the market
          </h1>
          <p className="mt-4 max-w-[540px] mx-auto text-[12px] leading-6 text-brand-light sm:text-[13px]">
            Notes on circular living, secondhand finds, local makers, and repair
            &amp; care from the Prevent Plastic community.
          </p>
        </div>

        {/* Featured posts */}
        {featured.length > 0 && (
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 mb-16 sm:mb-20">
            {featured.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <article className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl transition-all duration-500 hover:border-brand-2 hover:shadow-xl hover:shadow-brand-2/20 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      alt={post.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 640px"
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${toneClasses[post.tone]}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="font-serif text-[22px] leading-tight tracking-[-0.04em] text-white sm:text-[26px]">
                        {post.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-[12px] leading-6 text-brand-light sm:text-[13px]">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-[10px] text-brand-gray-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar aria-hidden="true" size={12} />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock aria-hidden="true" size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Regular posts */}
        {regular.length > 0 && (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regular.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <article className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl transition-all duration-500 hover:border-brand-2 hover:shadow-xl hover:shadow-brand-2/20 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      alt={post.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 400px"
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${toneClasses[post.tone]}`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h2 className="mb-3 font-serif text-[20px] leading-tight tracking-[-0.04em] text-brand sm:text-[24px]">
                      {post.title}
                    </h2>
                    <p className="text-[12px] leading-6 text-brand-light sm:text-[13px]">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-[10px] text-brand-gray-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar aria-hidden="true" size={12} />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock aria-hidden="true" size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
