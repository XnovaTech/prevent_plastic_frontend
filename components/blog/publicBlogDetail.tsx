"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
} from "@phosphor-icons/react/dist/ssr"

import { BlogEngagement } from "@/components/blog/blogEngagement"
import { BlogGallery } from "@/components/blog/blogGallery"
import { usePublicBlog, usePublicBlogs } from "@/hooks/useBlogs"
import { resolveMediaUrl } from "@/lib/media"
import type { BlogPost } from "@/types/blog"

const toneClasses = [
  "bg-[#e8eee5] text-[#38684f]",
  "bg-[#f8ebe5] text-[#a65e46]",
  "bg-[#f0edf6] text-[#695381]",
  "bg-[#f5f1df] text-[#8a7440]",
] as const

function toneFor(post: BlogPost) {
  return toneClasses[post.id % toneClasses.length]
}

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function publishedDate(post: BlogPost) {
  return post.published_at
    ? new Date(post.published_at).toLocaleDateString()
    : ""
}

function imagesFor(post: BlogPost) {
  return post.images
    .map((image) => ({ src: resolveMediaUrl(image.url), alt: post.title }))
    .filter((image) => Boolean(image.src))
}

export function PublicBlogDetail({ slug }: { slug: string }) {
  const { post, isLoading, error } = usePublicBlog(slug)
  const { posts } = usePublicBlogs()

  if (isLoading) {
    return (
      <div className="px-4 py-20 text-center text-sm text-brand-light">
        Loading story…
      </div>
    )
  }

  if (!post) {
    return <div className="px-4 py-20 text-center text-sm text-red-700">{error}</div>
  }

  const authorName = post.author.name ?? "Prevent Plastic community"
  const categoryName = post.category?.name ?? "Stories"
  const relatedPosts = posts
    .filter((related) => related.slug !== post.slug)
    .sort(
      (first, second) =>
        Number(second.category?.id === post.category?.id) -
        Number(first.category?.id === post.category?.id),
    )

  return (
    <article className="px-4 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-[1200px]">
        <Link
          className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-full text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 sm:mb-10"
          href="/blog"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          All stories
        </Link>

        <header className="mx-auto max-w-[1000px] pb-7 sm:pb-9">
          <span className={`inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] uppercase ${toneFor(post)}`}>
            {categoryName}
          </span>
          <h1 className="mt-4 font-serif text-[38px] leading-[1.04] tracking-[-0.05em] text-brand sm:text-[52px] lg:text-[64px]">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-brand-light sm:text-[17px] sm:leading-8">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[#e3e7df] pt-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8eee5] font-serif text-sm font-semibold text-brand-3">
                {initialsFor(authorName)}
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-brand-6">{authorName}</span>
                <span className="mt-0.5 text-[10px] text-brand-gray-3">Community contributor</span>
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-brand-gray-3">
              <Calendar aria-hidden="true" size={14} />
              {publishedDate(post)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-brand-gray-3">
              <Clock aria-hidden="true" size={14} />
              4 min read
            </span>
          </div>
        </header>

        <BlogGallery images={imagesFor(post)} />

        <div className="mx-auto mt-9 max-w-[900px] sm:mt-12">
          <div
            className="prose prose-sm prose-headings:font-serif prose-headings:tracking-[-0.04em] prose-headings:text-brand prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[27px] prose-h3:text-brand prose-p:my-5 prose-p:text-[15px] prose-p:leading-[1.9] prose-p:text-brand-light prose-li:my-2 prose-li:text-[14px] prose-li:leading-7 prose-li:text-brand-light prose-strong:text-brand prose-a:text-brand-2 prose-a:no-underline hover:prose-a:underline sm:prose-base sm:prose-p:text-[16px] max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>

        <BlogEngagement
          commentsCount={post.comments_count}
          likesCount={post.likes_count}
          slug={post.slug}
        />

        {relatedPosts.length > 0 ? (
          <section aria-labelledby="related-stories-title" className="mx-auto mt-14 max-w-[1200px] sm:mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">KEEP EXPLORING</p>
                <h2 className="mt-2 font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[36px]" id="related-stories-title">
                  More stories for you
                </h2>
              </div>
              <Link
                className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2"
                href="/blog"
              >
                Browse all
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((related) => {
                const relatedImage = imagesFor(related)[0]

                return (
                  <Link
                    className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e7e9e1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#cbd8cc] hover:shadow-[0_18px_48px_-28px_rgba(27,65,56,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2"
                    href={`/blog/${related.slug}`}
                    key={related.id}
                  >
                    <article className="flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#edf1ea]">
                        {relatedImage ? (
                          <Image
                            alt={relatedImage.alt}
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            src={relatedImage.src}
                            unoptimized
                          />
                        ) : null}
                        <span className={`absolute top-4 left-4 inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase ${toneFor(related)}`}>
                          {related.category?.name ?? "Stories"}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h3 className="font-serif text-[21px] leading-[1.15] tracking-[-0.035em] text-brand sm:text-[23px]">
                          {related.title}
                        </h3>
                        {related.excerpt ? (
                          <p className="mt-3 line-clamp-2 text-[12px] leading-6 text-brand-light sm:text-[13px]">
                            {related.excerpt}
                          </p>
                        ) : null}
                        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-3">
                          Read story
                          <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={15} />
                        </span>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  )
}
