"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { PencilSimple, Star } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"
import { useAuthStore } from "@/stores/authStore"

const ratingLabels = [
  "",
  "Not for me",
  "Could be better",
  "Good",
  "Great",
  "Love it",
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-[#b7823e]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} weight={rating >= star ? "fill" : "thin"} />
      ))}
    </span>
  )
}

function RatingPicker({
  rating,
  onChange,
}: {
  rating: number
  onChange: (rating: number) => void
}) {
  return (
    <div
      aria-label="Choose a star rating"
      className="flex items-center gap-1"
      role="radiogroup"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          aria-checked={rating === star}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          className="rounded-lg p-1 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
          key={star}
          onClick={() => onChange(star)}
          role="radio"
          type="button"
        >
          <Star
            className={rating >= star ? "text-[#b7823e]" : "text-[#c9c4b4]"}
            size={23}
            weight={rating >= star ? "fill" : "thin"}
          />
        </button>
      ))}
      <span className="ml-2 self-center text-xs text-brand-gray-4">
        {rating ? ratingLabels[rating] : "Tap to rate"}
      </span>
    </div>
  )
}

export function PublicProductFeedback({ productId }: { productId: number }) {
  const user = useAuthStore((state) => state.user)
  const { engagement, error, isLoading, refresh } = useProductEngagement(
    productId,
    "public"
  )
  const [review, setReview] = useState({ rating: 0, title: "", body: "" })
  const [comment, setComment] = useState("")
  const [editingReview, setEditingReview] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [notice, setNotice] = useState("")

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return setNotice("Please sign in to post a review.")
    if (!review.rating) return setNotice("Choose a star rating before posting.")
    if (!review.body.trim())
      return setNotice("Write your review before posting.")
    await productEngagementService.createReview(productId, {
      rating: review.rating,
      title: review.title,
      review: review.body,
    })
    setReview({ rating: 0, title: "", body: "" })
    setNotice("Your review is now visible.")
    await refresh()
  }
  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return setNotice("Please sign in to post a comment.")
    if (!comment.trim()) return
    await productEngagementService.createComment(productId, comment)
    setComment("")
    setNotice("Your comment is now visible.")
    await refresh()
  }

  return (
    <section className="mt-12 border-t border-[#dfe7dc] pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Community feedback
          </p>
          <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
            Ratings, reviews &amp; comments
          </h2>
        </div>
        <div className="rounded-2xl bg-[#f3f8ef] px-4 py-2 text-right">
          <p className="text-2xl font-semibold text-brand">
            {(engagement?.summary.average ?? 0).toFixed(1)} / 5
          </p>
          <p className="text-xs text-brand-gray-3">
            {engagement?.summary.count ?? 0} reviews
          </p>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-[24px] border border-[#e3e9df] bg-white p-5">
            <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
              Reviews
            </p>
            {isLoading ? (
              <p className="mt-4 text-sm text-brand-gray-3">Loading…</p>
            ) : (
              <div className="mt-4 space-y-4">
                {engagement?.reviews.items.map((item) => (
                  <article
                    className="border-t border-[#edf0ea] pt-4 first:border-0 first:pt-0"
                    key={item.id}
                  >
                    {editingReview === item.id ? (
                      <form
                        className="space-y-2"
                        onSubmit={async (event) => {
                          event.preventDefault()
                          await productEngagementService.updateReview(
                            productId,
                            item.id,
                            {
                              rating: review.rating,
                              title: review.title,
                              review: review.body,
                            }
                          )
                          setEditingReview(null)
                          await refresh()
                        }}
                      >
                        <RatingPicker
                          rating={review.rating}
                          onChange={(rating) =>
                            setReview({ ...review, rating })
                          }
                        />
                        <Input
                          value={review.title}
                          onChange={(event) =>
                            setReview({ ...review, title: event.target.value })
                          }
                        />
                        <Textarea
                          value={review.body}
                          onChange={(event) =>
                            setReview({ ...review, body: event.target.value })
                          }
                        />
                        <Button className="bg-brand-2 text-white" type="submit">
                          Save review
                        </Button>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <Stars rating={item.rating} />
                          {user?.id === item.reviewer.id ? (
                            <Button
                              aria-label="Edit your review"
                              onPress={() => {
                                setReview({
                                  rating: item.rating,
                                  title: item.title ?? "",
                                  body: item.review ?? "",
                                })
                                setEditingReview(item.id)
                              }}
                              size="icon-xs"
                              variant="outline"
                            >
                              <PencilSimple size={13} />
                            </Button>
                          ) : null}
                        </div>
                        <p className="mt-2 font-semibold text-brand">
                          {item.title || "Customer review"}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-brand-light">
                          {item.review}
                        </p>
                        <p className="mt-2 text-xs text-brand-gray-3">
                          {item.reviewer.name}
                        </p>
                      </>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
          <form className="hidden" onSubmit={submitReview}>
            <p className="font-semibold text-brand">Share your experience</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[190px_1fr] sm:items-center">
              <RatingPicker
                rating={review.rating}
                onChange={(rating) => setReview({ ...review, rating })}
              />
              <Input
                placeholder="Review headline"
                value={review.title}
                onChange={(event) =>
                  setReview({ ...review, title: event.target.value })
                }
              />
            </div>
            <Textarea
              className="mt-2"
              placeholder="Write your review"
              value={review.body}
              onChange={(event) =>
                setReview({ ...review, body: event.target.value })
              }
            />
            {user ? (
              <Button className="mt-3 bg-brand-2 text-white" type="submit">
                Post review
              </Button>
            ) : (
              <Link
                className="mt-3 inline-block text-sm font-semibold text-brand-3 underline"
                href="/login"
              >
                Sign in to review
              </Link>
            )}
          </form>
          <form className="hidden" onSubmit={submitReview}>
            <p className="font-semibold text-brand">Share your experience</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[270px_minmax(0,1fr)] sm:items-center">
              <RatingPicker
                rating={review.rating}
                onChange={(rating) => setReview({ ...review, rating })}
              />
              <Input
                placeholder="Review headline"
                value={review.title}
                onChange={(event) =>
                  setReview({ ...review, title: event.target.value })
                }
              />
            </div>
            <Textarea
              className="mt-3"
              placeholder="Write your review"
              value={review.body}
              onChange={(event) =>
                setReview({ ...review, body: event.target.value })
              }
            />
            {user ? (
              <Button className="mt-3 bg-brand-2 text-white" type="submit">
                Post review
              </Button>
            ) : (
              <Link
                className="mt-3 inline-block text-sm font-semibold text-brand-3 underline"
                href="/login"
              >
                Sign in to review
              </Link>
            )}
          </form>
        </div>
        <div className="space-y-4">
          <div className="rounded-[24px] border border-[#e3e9df] bg-white p-5">
            <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
              Comments
            </p>
            <div className="mt-4 space-y-3">
              {engagement?.comments.items.length ? (
                engagement.comments.items.map((item) => (
                  <article
                    className="rounded-2xl bg-[#f7faf4] p-4"
                    key={item.id}
                  >
                    {editingComment === item.id ? (
                      <form
                        className="space-y-2"
                        onSubmit={async (event) => {
                          event.preventDefault()
                          await productEngagementService.updateComment(
                            productId,
                            item.id,
                            comment
                          )
                          setEditingComment(null)
                          setComment("")
                          await refresh()
                        }}
                      >
                        <Textarea
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                        />
                        <Button className="bg-brand-2 text-white" type="submit">
                          Save comment
                        </Button>
                      </form>
                    ) : (
                      <>
                        <div className="flex justify-between gap-3">
                          <p className="font-semibold text-brand">
                            {item.commenter.name}
                          </p>
                          {user?.id === item.commenter.id ? (
                            <Button
                              aria-label="Edit your comment"
                              onPress={() => {
                                setComment(item.body)
                                setEditingComment(item.id)
                              }}
                              size="icon-xs"
                              variant="outline"
                            >
                              <PencilSimple size={13} />
                            </Button>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-brand-light">
                          {item.body}
                        </p>
                      </>
                    )}
                  </article>
                ))
              ) : (
                <p className="text-sm text-brand-gray-3">No comments yet.</p>
              )}
            </div>
          </div>
          <form
            className="rounded-[24px] border border-[#e3e9df] bg-[#f7faf4] p-5"
            onSubmit={submitComment}
          >
            <p className="font-semibold text-brand">Join the conversation</p>
            <Textarea
              className="mt-3"
              placeholder="Write a comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            {user ? (
              <Button className="mt-3 bg-brand-2 text-white" type="submit">
                Post comment
              </Button>
            ) : (
              <Link
                className="mt-3 inline-block text-sm font-semibold text-brand-3 underline"
                href="/login"
              >
                Sign in to comment
              </Link>
            )}
          </form>
          <form
            className="rounded-[24px] border border-[#e3e9df] bg-[#f7faf4] p-5"
            onSubmit={submitReview}
          >
            <p className="font-semibold text-brand">Share your experience</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[270px_minmax(0,1fr)] sm:items-center">
              <RatingPicker
                rating={review.rating}
                onChange={(rating) => setReview({ ...review, rating })}
              />
              <Input
                placeholder="Review headline"
                value={review.title}
                onChange={(event) =>
                  setReview({ ...review, title: event.target.value })
                }
              />
            </div>
            <Textarea
              className="mt-3"
              placeholder="Write your review"
              value={review.body}
              onChange={(event) =>
                setReview({ ...review, body: event.target.value })
              }
            />
            {user ? (
              <Button className="mt-3 bg-brand-2 text-white" type="submit">
                Post review
              </Button>
            ) : (
              <Link
                className="mt-3 inline-block text-sm font-semibold text-brand-3 underline"
                href="/login"
              >
                Sign in to review
              </Link>
            )}
          </form>
        </div>
      </div>
      {notice ? (
        <p className="mt-4 rounded-2xl bg-[#f3f8ef] px-4 py-3 text-sm text-brand-4">
          {notice}
        </p>
      ) : null}
    </section>
  )
}
