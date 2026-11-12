"use client"

import { BlogSection } from "@/components/blog/blogSection"
import { usePublicBlogs } from "@/hooks/useBlogs"
import type { BlogPost as PresentationPost } from "@/mock/blogPageMock"

export function PublicBlogList() {
  const { posts, isLoading, error } = usePublicBlogs()
  if (isLoading) return <div className="px-4 py-20 text-center text-sm text-brand-light">Loading journal stories…</div>
  if (error) return <div className="px-4 py-20 text-center text-sm text-red-700">{error}</div>
  const presented = posts.map((post, index): PresentationPost => ({
    id: String(post.id), slug: post.slug, title: post.title, eyebrow: post.category?.name ?? "COMMUNITY STORY", excerpt: post.excerpt ?? "Read this story from our community.", content: post.body,
    author: post.author.name ?? "Prevent Plastic community", authorRole: "Community contributor", authorImage: post.images[0]?.url ?? "/products/ceramicPlates.jpg",
    publishedAt: post.published_at ? new Date(post.published_at).toLocaleDateString() : "", readTime: "4 min read", image: post.images[0]?.url ?? "/products/ceramicPlates.jpg", imageAlt: post.title,
    images: post.images.map((image) => ({ src: image.url, alt: post.title })), category: post.category?.name ?? "Stories", tone: (["sage", "peach", "lavender", "butter"] as const)[index % 4], featured: index < 2,
    likes: post.likes_count, commentCount: post.comments_count, ratingAverage: 0, ratingCount: 0, comments: [], reviews: [],
  }))
  return <BlogSection posts={presented} />
}
