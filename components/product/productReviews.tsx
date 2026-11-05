"use client"

import { useMemo, useState, type FormEvent } from "react"
import { ArrowDown, Star, ThumbsUp } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type {
  ProductReview,
  ProductReviewSummary,
} from "@/mock/productDetailMock"

type ProductReviewsProps = {
  productName: string
  summary: ProductReviewSummary
}

const ratingLabels = [
  "",
  "Not for me",
  "Could be better",
  "Good",
  "Great",
  "Love it",
]

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

export function ProductReviews({ productName, summary }: ProductReviewsProps) {
  const [localReviews, setLocalReviews] = useState<ProductReview[]>([])
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [status, setStatus] = useState("")

  const total = summary.count + localReviews.length

  const reviews = useMemo(
    () => [...localReviews, ...summary.reviews],
    [localReviews, summary.reviews]
  )

  const distribution = useMemo(() => {
    const next = [...summary.distribution]
    for (const review of localReviews) {
      next[review.rating - 1] += 1
    }
    return next
  }, [localReviews, summary.distribution])

  const average = useMemo(() => {
    const base = summary.distribution.reduce(
      (sum, amount, index) => sum + amount * (index + 1),
      0
    )
    const added = localReviews.reduce((sum, review) => sum + review.rating, 0)
    return Math.round(((base + added) / total) * 10) / 10
  }, [localReviews, summary.distribution, total])

  const recommendPercent = Math.round(
    ((distribution[3] + distribution[4]) / total) * 100
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (rating === 0) {
      setStatus("Pick a star rating to share how it went.")
      return
    }

    if (!body.trim()) {
      setStatus("Add a few words about your find before posting.")
      return
    }

    const review: ProductReview = {
      id: `local-${localReviews.length + 1}`,
      author: name.trim() || "You",
      rating,
      date: "Just now",
      title: title.trim() || ratingLabels[rating],
      body: body.trim(),
    }

    setLocalReviews((previous) => [review, ...previous])
    setStatus(
      `Thanks — your ${rating}-star review for “${productName}” is now in the list.`
    )
    setRating(0)
    setName("")
    setTitle("")
    setBody("")
  }

  return (
    <section className="pb-14 sm:pb-20" id="reviews">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-6 flex flex-wrap items-end justify-between gap-4"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              WHAT PEOPLE SAY
            </p>
            <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
              Ratings &amp; reviews
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
            href="#write-review"
          >
            Write a review
            <ArrowDown aria-hidden="true" size={14} />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div
            className="h-fit rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl"
            data-aos="fade-up"
          >
            <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
              RATING SUMMARY
            </p>

            <div className="mt-3 flex items-end gap-3">
              <p className="font-serif text-[46px] leading-none tracking-[-0.04em] text-brand">
                {average.toFixed(1)}
              </p>
              <div className="pb-1">
                <StarRating value={average} size={15} />
                <p className="mt-1 text-[10px] text-brand-gray-4">
                  {total} reviews
                </p>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-bg/80 px-3 py-1.5 text-[10px] font-semibold text-brand-4">
              <ThumbsUp aria-hidden="true" size={12} weight="fill" />
              {recommendPercent}% would buy again
            </div>

            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const amount = distribution[star - 1]
                const percent = Math.round((amount / total) * 100)

                return (
                  <div className="flex items-center gap-2" key={star}>
                    <span className="flex w-8 shrink-0 items-center gap-0.5 text-[10px] font-semibold text-brand-gray-4">
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
            <div
              className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                  COMMUNITY REVIEWS
                </p>
                <p className="text-[10px] text-brand-gray-3">
                  Showing {reviews.length} of {total}
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <article
                    className="border-t border-[#e9ece4]/70 pt-4 first:border-t-0 first:pt-0"
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
                    <p className="mt-1 text-[12px] leading-5 text-brand-light">
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
              className="scroll-mt-24 rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl"
              id="write-review"
            >
              <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                WRITE A REVIEW
              </p>
              <h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.03em] text-brand">
                How did this find treat you?
              </h3>

              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <span
                    className="text-[11px] font-semibold text-brand-5"
                    id="review-rating-label"
                  >
                    Your rating{" "}
                    <span aria-hidden="true" className="text-brand-orange-3">
                      *
                    </span>
                  </span>
                  <div
                    aria-labelledby="review-rating-label"
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
                    <Label
                      className="text-[10px] font-semibold text-brand-5"
                      htmlFor="review-name"
                    >
                      Your name
                    </Label>
                    <Input
                      autoComplete="nickname"
                      className="h-10 rounded-[14px] border-[#dfe6dc] bg-white text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                      id="review-name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder="How should we credit you?"
                      value={name}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      className="text-[10px] font-semibold text-brand-5"
                      htmlFor="review-title"
                    >
                      Headline
                    </Label>
                    <Input
                      className="h-10 rounded-[14px] border-[#dfe6dc] bg-white text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                      id="review-title"
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Sum it up in a few words"
                      value={title}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[10px] font-semibold text-brand-5"
                    htmlFor="review-body"
                  >
                    Your review{" "}
                    <span aria-hidden="true" className="text-brand-orange-3">
                      *
                    </span>
                  </Label>
                  <Textarea
                    className="min-h-[110px] rounded-[16px] border-[#dfe6dc] bg-white text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                    id="review-body"
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Condition, packaging, the seller — tell the community how it went."
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
      </div>
    </section>
  )
}
