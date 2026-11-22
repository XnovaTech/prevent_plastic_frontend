"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ChatCircle,
  Heart,
  ImageSquare,
  Newspaper,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { usePublicBlog } from "@/hooks/useBlogs"
import { blogService } from "@/services/blogService"
import type { BlogComment } from "@/types/blog"

type DetailTab = "story" | "gallery" | "comments"

export function PublicBlogDetailContent({ slug }: { slug: string }) {
  const { post, isLoading, error } = usePublicBlog(slug)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loadedComments, setLoadedComments] = useState(false)
  const [body, setBody] = useState("")
  const [likes, setLikes] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [tab, setTab] = useState<DetailTab>("story")

  if (isLoading)
    return (
      <div className="px-4 py-20 text-center text-sm text-brand-light">
        Loading story…
      </div>
    )
  if (!post)
    return (
      <div className="px-4 py-20 text-center text-sm text-red-700">{error}</div>
    )

  const loadComments = async () => {
    const response = await blogService.publicComments(slug)
    setComments(response.items)
    setLoadedComments(true)
  }
  const addComment = async () => {
    try {
      const comment = await blogService.addComment(slug, body)
      setComments((current) => [comment, ...current])
      setBody("")
      setMessage("Your comment has been posted.")
    } catch {
      setMessage("Please sign in to post a comment.")
    }
  }
  const toggleLike = async () => {
    try {
      const response = await blogService.toggleLike(slug)
      setLikes(response.likes_count)
    } catch {
      setMessage("Unable to update the like right now.")
    }
  }
  const selectTab = (next: DetailTab) => {
    setTab(next)
    if (next === "comments" && !loadedComments) void loadComments()
  }
  const currentLikes = likes ?? post.likes_count

  return (
    <article className="px-4 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link className="text-xs font-semibold text-brand-3" href="/blog">
          ← All stories
        </Link>
        <header className="mt-6 overflow-hidden border border-[#e3e9df] bg-white">
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="flex min-h-[280px] flex-col justify-center p-7 sm:p-10">
              <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
                {post.category?.name ?? "Community story"}
              </p>
              <h1 className="mt-3 font-serif text-4xl tracking-[-.05em] text-brand sm:text-6xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-brand-light">
                  {post.excerpt}
                </p>
              )}
              <p className="mt-6 text-sm text-brand-gray-3">
                By {post.author.name ?? "Community member"} ·{" "}
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString()
                  : ""}
              </p>
              <Button
                className="mt-6 w-fit bg-brand-2 text-white"
                onPress={toggleLike}
              >
                <Heart size={16} weight="fill" /> {currentLikes}{" "}
                {currentLikes === 1 ? "like" : "likes"}
              </Button>
            </div>
            <div className="min-h-[280px] bg-[#eef3eb]">
              {post.images[0] ? (
                <img
                  alt={post.title}
                  className="h-full min-h-[280px] w-full object-cover"
                  src={post.images[0].url}
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-brand-gray-3">
                  No cover image
                </div>
              )}
            </div>
          </div>
        </header>
        <nav
          aria-label="Story detail sections"
          className="mt-6 flex overflow-x-auto border-b border-[#dce4da]"
        >
          {(
            [
              ["story", "Story", Newspaper],
              ["gallery", `Gallery (${post.images.length})`, ImageSquare],
              ["comments", `Comments (${post.comments_count})`, ChatCircle],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === value ? "border-brand-2 text-brand-2" : "border-transparent text-brand-gray-3 hover:text-brand"}`}
              key={value}
              onClick={() => selectTab(value)}
              type="button"
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>
        {tab === "story" && (
          <section
            className="prose prose-sm prose-headings:font-serif prose-p:leading-8 prose-p:text-brand-light mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        )}
        {tab === "gallery" && (
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            {post.images.length ? (
              post.images.map((image) => (
                <img
                  alt={`${post.title} gallery image`}
                  className="aspect-[4/3] w-full object-cover"
                  key={image.id}
                  src={image.url}
                />
              ))
            ) : (
              <p className="text-sm text-brand-gray-3">
                This story has no gallery images yet.
              </p>
            )}
          </section>
        )}
        {tab === "comments" && (
          <section className="mt-8">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  className="border-b border-[#e7e9e1] pb-4"
                  key={comment.id}
                >
                  <p className="text-sm font-semibold text-brand">
                    {comment.commenter.name ?? "Anonymous"}
                  </p>
                  <p className="mt-1 text-sm text-brand-light">
                    {comment.body}
                  </p>
                  {comment.replies.map((reply) => (
                    <div
                      className="mt-3 border-l-2 border-brand-2/30 pl-3"
                      key={reply.id}
                    >
                      <p className="text-xs font-semibold text-brand">
                        {reply.author.name} · {reply.author.role} · {new Date(reply.created_at).toLocaleDateString()}
                      </p>
                      <p className="mt-1 text-sm text-brand-light">{reply.body}</p>
                    </div>
                  ))}
                </div>
              ))}
              {loadedComments && comments.length === 0 && (
                <p className="text-sm text-brand-gray-3">
                  No comments yet. Start the conversation.
                </p>
              )}
            </div>
            <Textarea
              className="mt-6"
              onChange={(event) => setBody(event.target.value)}
              placeholder="Join the conversation"
              value={body}
            />
            <Button
              className="mt-3 bg-brand-2 text-white"
              isDisabled={!body.trim()}
              onPress={() => void addComment()}
            >
              Post comment
            </Button>
          </section>
        )}
        <p className="mt-4 text-sm text-brand-gray-3">{message}</p>
      </div>
    </article>
  )
}
