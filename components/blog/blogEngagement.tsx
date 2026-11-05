"use client"

import { useEffect, useState } from "react"
import { CaretDown, ChatCircleDots, Heart, Star } from "@phosphor-icons/react"

import { BlogComments } from "@/components/blog/blogComments"
import { BlogReviews } from "@/components/blog/blogReviews"
import { useBlogEngagement } from "@/hooks/useBlogEngagement"
import type { BlogPost } from "@/mock/blogPageMock"

type BlogEngagementProps = {
  post: BlogPost
}

const toggleClassName = (isOpen: boolean) =>
  `inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 ${
    isOpen
      ? "border-brand-3 bg-[#e8eee5] text-brand-3"
      : "border-[#dfe5dc] text-brand-3 hover:border-brand-3 hover:bg-[#f6f7f3]"
  }`

const panelClassName =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 motion-safe:duration-300"

export function BlogEngagement({ post }: BlogEngagementProps) {
  const engagement = useBlogEngagement(post)
  const { ratingSummary } = engagement

  const [showReviews, setShowReviews] = useState(false)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (showReviews) {
      document
        .getElementById("reviews")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showReviews])

  useEffect(() => {
    if (showComments) {
      document
        .getElementById("comments")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showComments])

  const ratingLabel =
    ratingSummary.total === 0
      ? "No ratings yet"
      : `${ratingSummary.average.toFixed(1)} · ${ratingSummary.total} ${
          ratingSummary.total === 1 ? "rating" : "ratings"
        }`

  return (
    <div className="mx-auto mt-10 max-w-[900px] space-y-10 sm:mt-12 sm:space-y-14">
      <div className="rounded-[24px] border border-[#e7e9e1] bg-white px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            aria-pressed={engagement.liked}
            aria-label={
              engagement.liked ? "Remove your like" : "Like this story"
            }
            className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2 ${
              engagement.liked
                ? "border-brand-orange bg-brand-peach-bg text-brand-orange-3"
                : "border-[#dfe5dc] text-brand-3 hover:border-brand-3 hover:bg-[#f6f7f3]"
            }`}
            onClick={engagement.toggleLike}
            type="button"
          >
            <Heart
              aria-hidden="true"
              size={16}
              weight={engagement.liked ? "fill" : "regular"}
            />
            {engagement.liked ? "Liked" : "Like"}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                engagement.liked
                  ? "bg-white text-brand-orange-3"
                  : "bg-[#f1f3ee] text-brand-gray-3"
              }`}
            >
              {engagement.likes}
            </span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              aria-controls="comments"
              aria-expanded={showComments}
              className={toggleClassName(showComments)}
              onClick={() => setShowComments((isOpen) => !isOpen)}
              type="button"
            >
              <ChatCircleDots aria-hidden="true" size={15} />
              {engagement.comments.length}{" "}
              {engagement.comments.length === 1 ? "comment" : "comments"}
              <CaretDown
                aria-hidden="true"
                className={`transition-transform duration-300 ${showComments ? "rotate-180" : ""}`}
                size={12}
              />
            </button>

            {/* <button
              aria-controls="reviews"
              aria-expanded={showReviews}
              className={toggleClassName(showReviews)}
              onClick={() => setShowReviews((isOpen) => !isOpen)}
              type="button"
            >
              <Star
                aria-hidden="true"
                className="text-[#b7823e]"
                size={15}
                weight="fill"
              />
              Review &amp; rating · {ratingLabel}
              <CaretDown
                aria-hidden="true"
                className={`transition-transform duration-300 ${showReviews ? "rotate-180" : ""}`}
                size={12}
              />
            </button> */}
          </div>
        </div>

        {!showComments && !showReviews && (
          <p className="mt-2.5 border-t border-[#eef1ea] pt-2.5 text-[10px] leading-5 text-brand-gray-3">
            Tap <span className="font-semibold text-brand-3">Comments</span> or{" "}
            <span className="font-semibold text-brand-3">
              Review &amp; rating
            </span>{" "}
            to open the panel — tap again to close it.
          </p>
        )}
      </div>

      <div className={showReviews ? panelClassName : "hidden"}>
        <BlogReviews
          onAddReview={engagement.addReview}
          reviews={engagement.reviews}
          summary={ratingSummary}
        />
      </div>

      <div className={showComments ? panelClassName : "hidden"}>
        <BlogComments
          comments={engagement.comments}
          onAddComment={engagement.addComment}
        />
      </div>
    </div>
  )
}
