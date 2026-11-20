"use client"

import { useState } from "react"
import { CaretDown, ChatCircleDots, Heart } from "@phosphor-icons/react"

import { BlogComments } from "@/components/blog/blogComments"
import { usePublicBlogEngagement } from "@/hooks/useBlogs"

type BlogEngagementProps = {
  slug: string
  likesCount: number
  commentsCount: number
}

const toggleClassName = (isOpen: boolean) =>
  `inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 ${
    isOpen
      ? "border-brand-3 bg-[#e8eee5] text-brand-3"
      : "border-[#dfe5dc] text-brand-3 hover:border-brand-3 hover:bg-[#f6f7f3]"
  }`

const panelClassName =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 motion-safe:duration-300"

export function BlogEngagement({
  slug,
  likesCount,
  commentsCount,
}: BlogEngagementProps) {
  const engagement = usePublicBlogEngagement(slug, likesCount, commentsCount)
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="mx-auto mt-10 max-w-[900px] space-y-10 sm:mt-12 sm:space-y-14">
      <div className="rounded-[24px] border border-[#e7e9e1] bg-white px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            aria-label={engagement.liked ? "Remove your like" : "Like this story"}
            aria-pressed={engagement.liked}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 ${
              engagement.liked
                ? "border-brand-orange bg-brand-peach-bg text-brand-orange-3"
                : "border-[#dfe5dc] text-brand-3 hover:border-brand-3 hover:bg-[#f6f7f3]"
            }`}
            onClick={() => void engagement.toggleLike()}
            type="button"
          >
            <Heart aria-hidden="true" size={16} weight={engagement.liked ? "fill" : "regular"} />
            {engagement.liked ? "Liked" : "Like"}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${engagement.liked ? "bg-white text-brand-orange-3" : "bg-[#f1f3ee] text-brand-gray-3"}`}>
              {engagement.likes}
            </span>
          </button>

          <button
            aria-controls="comments"
            aria-expanded={showComments}
            className={toggleClassName(showComments)}
            onClick={() => {
              const nextOpen = !showComments
              setShowComments(nextOpen)
              if (nextOpen) void engagement.loadComments()
            }}
            type="button"
          >
            <ChatCircleDots aria-hidden="true" size={15} />
            {engagement.commentCount}{" "}
            {engagement.commentCount === 1 ? "comment" : "comments"}
            <CaretDown
              aria-hidden="true"
              className={`transition-transform duration-300 ${showComments ? "rotate-180" : ""}`}
              size={12}
            />
          </button>
        </div>

        {!showComments ? (
          <p className="mt-2.5 border-t border-[#eef1ea] pt-2.5 text-[10px] leading-5 text-brand-gray-3">
            Tap <span className="font-semibold text-brand-3">Comments</span>{" "}
            to join the conversation.
          </p>
        ) : null}
      </div>

      <div className={showComments ? panelClassName : "hidden"}>
        {engagement.isLoadingComments ? (
          <p className="text-sm text-brand-light">Loading comments…</p>
        ) : null}
        <BlogComments
          comments={engagement.commentsLoaded ? engagement.comments : []}
          onAddComment={({ author, body }) => engagement.addComment(body, author)}
        />
        {engagement.message ? (
          <p aria-live="polite" className="mt-3 text-xs text-brand-gray-3">
            {engagement.message}
          </p>
        ) : null}
      </div>
    </div>
  )
}
