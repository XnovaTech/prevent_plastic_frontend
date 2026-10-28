import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "@phosphor-icons/react/dist/ssr"

import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { getBlogPostBySlug, getAllBlogPosts } from "@/mock/blogPageMock"

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} — Prevent Plastic`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/blog" />
      <main id="main-content">
        <article className="px-4 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-[900px]">
            <Link
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-brand-3 transition-colors hover:text-brand-orange mb-8 sm:mb-10"
              href="/blog"
            >
              <ArrowLeft aria-hidden="true" size={14} />
              Back to Journal
            </Link>

            <div className="mb-8 sm:mb-10" data-aos="fade-up">
              <span className="inline-flex items-center rounded-full border border-[#d8e0d7] bg-[#edf2e8] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#557360]">
                {post.category}
              </span>
              <h1 className="mt-4 font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[42px] lg:text-[48px]">
                {post.title}
              </h1>
              <p className="mt-3 text-[14px] leading-7 text-brand-light sm:mt-4 sm:text-[15px]">
                {post.excerpt}
              </p>
            </div>

            <div
              className="relative mb-10 sm:mb-12 aspect-[16/9] overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/70 bg-white/40 shadow-lg"
              data-aos="zoom-in"
            >
              <Image
                alt={post.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 80vw, 900px"
                src={post.image}
                priority
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-10 sm:mb-12 text-[11px] text-brand-gray-3 border-b border-[#d8e0d7] pb-6 sm:pb-8">
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/70 bg-white/60">
                  <Image
                    alt={post.author}
                    className="absolute inset-0 w-full h-full object-cover"
                    fill
                    sizes="40px"
                    src={post.authorImage}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-brand-6">
                    {post.author}
                  </span>
                  <span className="text-[10px] text-brand-gray-3">
                    {post.authorRole}
                  </span>
                </div>
              </div>
              <span className="flex items-center gap-1.5">
                <Calendar aria-hidden="true" size={13} />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" size={13} />
                {post.readTime}
              </span>
            </div>

            <div
              className="prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:tracking-[-0.04em] prose-headings:text-brand prose-p:text-brand-light prose-p:leading-7 prose-li:text-brand-light prose-li:leading-7 prose-strong:text-brand prose-a:text-brand-2 prose-a:no-underline hover:prose-a:underline"
              data-aos="fade-up"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#d8e0d7]">
              <p className="text-[12px] text-brand-gray-3 mb-4">
                More from the journal
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {getAllBlogPosts()
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 2)
                  .map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="group flex items-center gap-4 rounded-[20px] border border-white/70 bg-white/60 p-4 transition-all duration-300 hover:border-brand-2 hover:shadow-md hover:shadow-brand-2/10"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-[16px] bg-[#f0f3eb]">
                        <Image
                          alt={related.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="64px"
                          src={related.image}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-brand leading-snug line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="mt-1 text-[11px] text-brand-gray-3">
                          {related.publishedAt}
                        </p>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        className="shrink-0 text-brand-gray-3 transition-transform group-hover:translate-x-0.5"
                        size={14}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
