"use client"

import { useState, type FormEvent } from "react"
import { Star } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type {
  BlogRatingSummary,
  NewBlogReview,
} from "@/hooks/useBlogEngagement"
import type { BlogReview } from "@/mock/blogPageMock"

type BlogReviewsProps = {
  reviews: readonly BlogReview[]
  summary: BlogRatingSummary
  onAddReview: (review: NewBlogReview) => void
}

const ratingLabels = [
  "",
  "Not for me",
  "Could be better",
  "Good",
  "Great",
  "Loved it",
]

const fieldClassName =
  "h-10 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName = "text-[11px] font-semibold text-brand-5"

function StarRating({ value, size = 13 }: { value: number; size?: number }) {
  const clamped = Math.max(0, Math.min(5, value))
  const percent = (clamped / 5) * 100

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="flex gap-[2px] text-[#d9d4c6]">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star key={index} size={size} weight="thin" />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <span className="flex gap-[2px] text-[#b7823e]">
          {[0, 1, 2, 3, 4].map((index) => (
            <Star key={index} size={size} weight="fill" />
          ))}
        </span>
      </span>
      <span className="sr-only">{clamped.toFixed(1)} out of 5 stars</span>
    </span>
  )
}

export function BlogReviews({
  reviews,
  summary,
  onAddReview,
}: BlogReviewsProps) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [status, setStatus] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (rating === 0) {
      setStatus("Pick a star rating to share how it landed with you.")
      return
    }

    if (!body.trim()) {
      setStatus("Add a few words about the story before posting.")
      return
    }

    onAddReview({
      author: name.trim() || "You",
      rating,
      title: title.trim() || ratingLabels[rating],
      body: body.trim(),
    })

    setStatus(`Thanks — your ${rating}-star rating is now in the list.`)
    setRating(0)
    setName("")
    setTitle("")
    setBody("")
  }

  return (
    <section
      aria-labelledby="blog-reviews-title"
      className="scroll-mt-24"
      id="reviews"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            READER RATINGS
          </p>
          <h2
            className="mt-2 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]"
            id="blog-reviews-title"
          >
            Rate this story
          </h2>
        </div>
        <a
          className="inline-flex min-h-10 items-center gap-2 text-[11px] font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-2"
          href="#write-blog-review"
        >
          Write a review
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="h-fit rounded-[24px] border border-[#e7e9e1] bg-white p-5">
          <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
            RATING SUMMARY
          </p>

          <div className="mt-3 flex items-end gap-3">
            <p className="font-serif text-[42px] leading-none tracking-[-0.04em] text-brand">
              {summary.total === 0 ? "—" : summary.average.toFixed(1)}
            </p>
            <div className="pb-1">
              <StarRating value={summary.average} size={14} />
              <p className="mt-1 text-[10px] text-brand-gray-3">
                {summary.total} {summary.total === 1 ? "rating" : "ratings"}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const amount = summary.distribution[star - 1]
              const percent =
                summary.total === 0
                  ? 0
                  : Math.round((amount / summary.total) * 100)

              return (
                <div className="flex items-center gap-2" key={star}>
                  <span className="flex w-7 shrink-0 items-center gap-0.5 text-[10px] font-semibold text-brand-gray-4">
                    {star}
                    <Star
                      aria-hidden="true"
                      className="text-[#b7823e]"
                      size={10}
                      weight="fill"
                    />
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e7e3d6]">
                    <span
                      className="block h-full rounded-full bg-[#b7823e]"
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                  <span className="w-6 text-right text-[10px] text-brand-gray-3">
                    {percent}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[24px] border border-[#e7e9e1] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                WHAT READERS SAY
              </p>
              <p className="text-[10px] text-brand-gray-3">
                {reviews.length} of {summary.total} shown
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {reviews.map((review) => (
                <article
                  className="border-t border-[#e9ece4] pt-4 first:border-t-0 first:pt-0"
                  key={review.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StarRating value={review.rating} size={12} />
                    <span className="text-[10px] text-brand-gray-3">
                      {review.date}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[13px] font-semibold text-brand">
                    {review.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-6 text-brand-light">
                    {review.body}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold text-brand-gray-4">
                    {review.author}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            className="scroll-mt-24 rounded-[24px] border border-[#e7e9e1] bg-white p-5 sm:p-6"
            id="write-blog-review"
          >
            <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
              WRITE A REVIEW
            </p>
            <h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.03em] text-brand">
              How did this story treat you?
            </h3>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <span
                  className="text-[11px] font-semibold text-brand-5"
                  id="blog-review-rating-label"
                >
                  Your rating{" "}
                  <span aria-hidden="true" className="text-brand-orange-3">
                    *
                  </span>
                </span>
                <div
                  aria-labelledby="blog-review-rating-label"
                  className="mt-1.5 flex flex-wrap items-center gap-1.5"
                  role="radiogroup"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      aria-checked={rating === star}
                      aria-label={`Rate ${star} star${star === 1 ? "" : "s"}`}
                      className="rounded-lg p-1 transition-transform hover:scale-110"
                      key={star}
                      onClick={() => setRating(star)}
                      role="radio"
                      type="button"
                    >
                      <Star
                        aria-hidden="true"
                        className={
                          rating >= star ? "text-[#b7823e]" : "text-[#c9c4b4]"
                        }
                        size={22}
                        weight={rating >= star ? "fill" : "thin"}
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-[11px] text-brand-gray-4">
                    {rating > 0 ? ratingLabels[rating] : "Tap to rate"}
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label className={labelClassName} htmlFor="blog-review-name">
                    Your name
                  </Label>
                  <Input
                    autoComplete="nickname"
                    className={fieldClassName}
                    id="blog-review-name"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="How should we credit you?"
                    value={name}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className={labelClassName} htmlFor="blog-review-title">
                    Headline
                  </Label>
                  <Input
                    className={fieldClassName}
                    id="blog-review-title"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Sum it up in a few words"
                    value={title}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className={labelClassName} htmlFor="blog-review-body">
                  Your review{" "}
                  <span aria-hidden="true" className="text-brand-orange-3">
                    *
                  </span>
                </Label>
                <Textarea
                  className="min-h-[110px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                  id="blog-review-body"
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="What stayed with you? What would you tell a friend about it?"
                  rows={4}
                  value={body}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  className="h-10 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white hover:bg-[#1f6157]"
                  type="submit"
                >
                  Post review
                </Button>
                <p className="text-[10px] text-brand-gray-3">
                  A design preview — reviews stay in this browser session.
                </p>
              </div>

              <p
                aria-live="polite"
                className={
                  status
                    ? "rounded-[14px] border border-[#d8e5d3] bg-brand-yellow-bg/80 px-4 py-3 text-[11px] text-brand-4"
                    : "sr-only"
                }
                role="status"
              >
                {status}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
