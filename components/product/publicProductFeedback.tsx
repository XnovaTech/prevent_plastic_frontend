"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { CaretDown, ChatCircleText, PencilSimple, Star, ThumbsUp } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"
import { useAuthStore } from "@/stores/authStore"

const ratingLabels = ["", "Not for me", "Could be better", "Good", "Great", "Love it"]

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="flex shrink-0 gap-0.5 leading-none text-[#b7823e]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={size} weight={rating >= star ? "fill" : "thin"} />
      ))}
    </span>
  )
}

function RatingPicker({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) {
  return (
    <div aria-label="Choose a star rating" className="flex items-center gap-0.5" role="radiogroup">
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
          <Star className={rating >= star ? "text-[#b7823e]" : "text-[#c9c4b4]"} size={21} weight={rating >= star ? "fill" : "thin"} />
        </button>
      ))}
      <span className="ml-2 text-xs text-brand-gray-4">{rating ? ratingLabels[rating] : "Tap to rate"}</span>
    </div>
  )
}

type Composer = "review" | "comment" | null

export function PublicProductFeedback({ productId }: { productId: number }) {
  const user = useAuthStore((state) => state.user)
  const { engagement, error, isLoading, refresh } = useProductEngagement(productId, "public")
  const [isExpanded, setIsExpanded] = useState(false)
  const [composer, setComposer] = useState<Composer>(null)
  const [review, setReview] = useState({ rating: 0, title: "", body: "" })
  const [comment, setComment] = useState("")
  const [editingReview, setEditingReview] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [notice, setNotice] = useState("")

  const reviewCount = engagement?.summary.count ?? 0
  const average = engagement?.summary.average ?? 0
  const distribution = engagement?.summary.distribution ?? {}
  const wouldBuyAgain = reviewCount
    ? Math.round((((distribution[4] ?? 0) + (distribution[5] ?? 0)) / reviewCount) * 100)
    : 0

  function openPanel(panel: Exclude<Composer, null>) {
    setIsExpanded(true)
    setComposer((current) => (current === panel ? null : panel))
    setNotice("")
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) {
      setNotice("Please sign in to post a review.")
      return
    }
    if (!review.rating || !review.body.trim()) {
      setNotice("Choose a rating and write your review first.")
      return
    }

    try {
      if (editingReview) {
        await productEngagementService.updateReview(productId, editingReview, {
          rating: review.rating,
          title: review.title,
          review: review.body,
        })
      } else {
        await productEngagementService.createReview(productId, {
          rating: review.rating,
          title: review.title,
          review: review.body,
        })
      }
      setReview({ rating: 0, title: "", body: "" })
      setEditingReview(null)
      setComposer(null)
      setNotice(editingReview ? "Your review was updated." : "Your review is now visible.")
      await refresh()
    } catch {
      setNotice("Unable to post your review. Please try again.")
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) {
      setNotice("Please sign in to post a comment.")
      return
    }
    if (!comment.trim()) return

    try {
      if (editingComment) {
        await productEngagementService.updateComment(productId, editingComment, comment.trim())
      } else {
        await productEngagementService.createComment(productId, comment.trim())
      }
      setComment("")
      setEditingComment(null)
      setComposer(null)
      setNotice(editingComment ? "Your comment was updated." : "Your comment is now visible.")
      await refresh()
    } catch {
      setNotice("Unable to post your comment. Please try again.")
    }
  }

  return (
    <section className="mt-7 w-full pb-5 sm:mt-10 sm:pb-8" id="reviews">
      <div className="border-t border-[#dfe7dc] pt-7">
        <div className="w-full rounded-[22px] border border-[#e3e9df] bg-white/65 p-4 shadow-[0_18px_55px_-45px_rgba(38,74,55,0.5)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-[76px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-[#f4f8ed] px-2">
                <span className="font-serif text-xl leading-none text-brand">{average.toFixed(1)}</span>
                <Stars rating={Math.round(average)} size={10} />
              </div>
              <div className="min-w-0 lg:col-span-7">
                <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-5 uppercase">What people say</p>
                <p className="mt-1 truncate text-sm font-semibold text-brand">
                  {reviewCount ? `${reviewCount} review${reviewCount === 1 ? "" : "s"}` : "No reviews yet"}
                  {reviewCount ? ` · ${wouldBuyAgain}% would buy again` : " · Be the first to share"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button className="h-9 rounded-full px-3 text-[11px] font-semibold text-brand-3" onPress={() => openPanel("review")} variant="outline">
                Write a review
              </Button>
              <Button aria-expanded={isExpanded} className="h-9 rounded-full bg-brand-2 px-3 text-[11px] font-semibold text-white hover:bg-brand-3" onPress={() => setIsExpanded((expanded) => !expanded)}>
                {isExpanded ? "Hide details" : "View reviews"}
                <CaretDown aria-hidden="true" className={isExpanded ? "rotate-180" : ""} size={14} />
              </Button>
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

          {isExpanded ? (
            <div className="mt-5 grid gap-5 border-t border-[#e9ece4] pt-5 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Community reviews</p>
                  <span className="text-[10px] text-brand-gray-3">{reviewCount} total</span>
                </div>
                {isLoading ? (
                  <p className="mt-4 text-sm text-brand-gray-3">Loading reviews…</p>
                ) : engagement?.reviews.items.length ? (
                  <div className="mt-3 divide-y divide-[#e9ece4] rounded-2xl border border-[#e9ece4] bg-white/55 px-4">
                    {engagement.reviews.items.map((item) => (
                      <article className="py-4 first:pt-3 last:pb-3" key={item.id}>
                        {editingReview === item.id ? (
                          <form className="space-y-3" onSubmit={submitReview}>
                            <RatingPicker rating={review.rating} onChange={(rating) => setReview({ ...review, rating })} />
                            <Input aria-label="Review headline" className="h-9 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setReview({ ...review, title: event.target.value })} placeholder="Headline (optional)" value={review.title} />
                            <Textarea aria-label="Review text" className="min-h-20 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setReview({ ...review, body: event.target.value })} placeholder="Tell the community how it went." value={review.body} />
                            <Button className="h-8 rounded-full bg-brand-2 px-3 text-[11px] text-white" type="submit">Save review</Button>
                          </form>
                        ) : (
                          <>
                            <div className="flex items-center justify-between gap-3">
                              <Stars rating={item.rating} />
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-brand-gray-3">{new Date(item.created_at).toLocaleDateString()}</span>
                                {user?.id === item.reviewer.id ? (
                                  <Button aria-label="Edit your review" onPress={() => { setReview({ rating: item.rating, title: item.title ?? "", body: item.review ?? "" }); setEditingReview(item.id); setComposer("review") }} size="icon-xs" variant="outline"><PencilSimple size={13} /></Button>
                                ) : null}
                              </div>
                            </div>
                            <p className="mt-2 text-[13px] font-semibold text-brand">{item.title || ratingLabels[item.rating]}</p>
                            {item.review ? <p className="mt-1 text-xs leading-5 text-brand-light">{item.review}</p> : null}
                            <p className="mt-2 text-[10px] font-semibold text-brand-gray-4">{item.reviewer.name}</p>
                          </>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 rounded-2xl border border-dashed border-[#dfe7dc] bg-[#f8fbf6] px-4 py-5 text-center">
                    <p className="text-sm font-semibold text-brand">No reviews yet</p>
                    <p className="mt-1 text-xs text-brand-gray-3">Your experience can help the next person choose.</p>
                  </div>
                )}

                {engagement?.comments.items.length ? (
                  <div className="mt-4 rounded-2xl border border-[#e9ece4] bg-white/55 p-4">
                    <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase"><ChatCircleText size={15} /> Comments</p>
                    <div className="mt-3 space-y-3">
                      {engagement.comments.items.map((item) => (
                        <article className="border-t border-[#e9ece4] pt-3 first:border-0 first:pt-0" key={item.id}>
                          {editingComment === item.id ? (
                            <form className="space-y-2" onSubmit={submitComment}>
                              <Textarea className="min-h-16 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setComment(event.target.value)} value={comment} />
                              <Button className="h-8 rounded-full bg-brand-2 px-3 text-[11px] text-white" type="submit">Save comment</Button>
                            </form>
                          ) : (
                            <>
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold text-brand">{item.commenter.name}</p>
                                {user?.id === item.commenter.id ? <Button aria-label="Edit your comment" onPress={() => { setComment(item.body); setEditingComment(item.id); setComposer("comment") }} size="icon-xs" variant="outline"><PencilSimple size={13} /></Button> : null}
                              </div>
                              <p className="mt-1 text-xs leading-5 text-brand-light">{item.body}</p>
                            </>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-5 lg:col-span-6">
                <div className="rounded-2xl bg-[#f7faf4] p-4">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Rating summary</p>
                  <div className="mt-3 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percent = reviewCount ? Math.round(((distribution[star] ?? 0) / reviewCount) * 100) : 0
                      return <div className="flex items-center gap-2" key={star}><span className="w-3 text-[10px] text-brand-gray-4">{star}</span><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e7e3d6]"><span className="block h-full rounded-full bg-[#b7823e]" style={{ width: `${percent}%` }} /></span><span className="w-7 text-right text-[10px] text-brand-gray-3">{percent}%</span></div>
                    })}
                  </div>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-bg/80 px-3 py-1.5 text-[10px] font-semibold text-brand-4"><ThumbsUp size={12} weight="fill" />{wouldBuyAgain}% would buy again</p>
                </div>

                {composer === "review" ? (
                  <form className="rounded-2xl border border-[#e3e9df] bg-white p-4" onSubmit={submitReview}>
                    <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">{editingReview ? "Edit your review" : "Write a review"}</p>
                    <div className="mt-3"><Label className="text-[11px] font-semibold text-brand-5">Your rating *</Label><div className="mt-1"><RatingPicker rating={review.rating} onChange={(rating) => setReview({ ...review, rating })} /></div></div>
                    <Input className="mt-3 h-9 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setReview({ ...review, title: event.target.value })} placeholder="Headline (optional)" value={review.title} />
                    <Textarea className="mt-3 min-h-20 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setReview({ ...review, body: event.target.value })} placeholder="Condition, packaging, and the seller…" value={review.body} />
                    {user ? <Button className="mt-3 h-9 rounded-full bg-brand-2 px-4 text-[11px] text-white" type="submit">{editingReview ? "Save review" : "Post review"}</Button> : <Link className="mt-3 inline-block text-xs font-semibold text-brand-3 underline" href="/login">Sign in to review</Link>}
                  </form>
                ) : (
                  <button className="w-full rounded-2xl border border-dashed border-[#d8e5d3] bg-white/65 p-4 text-left transition-colors hover:bg-[#f7faf4]" onClick={() => openPanel("review")} type="button"><p className="text-sm font-semibold text-brand">Share your experience</p><p className="mt-1 text-xs text-brand-gray-3">A quick rating helps this community.</p></button>
                )}

                {composer === "comment" ? (
                  <form className="rounded-2xl border border-[#e3e9df] bg-white p-4" onSubmit={submitComment}>
                    <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Join the conversation</p>
                    <Textarea className="mt-3 min-h-20 rounded-xl border-[#dfe6dc] bg-white text-xs" onChange={(event) => setComment(event.target.value)} placeholder="Ask a helpful question or leave a note." value={comment} />
                    {user ? <Button className="mt-3 h-9 rounded-full bg-brand-2 px-4 text-[11px] text-white" type="submit">{editingComment ? "Save comment" : "Post comment"}</Button> : <Link className="mt-3 inline-block text-xs font-semibold text-brand-3 underline" href="/login">Sign in to comment</Link>}
                  </form>
                ) : (
                  <button className="flex w-full items-center gap-2 rounded-2xl border border-[#e3e9df] bg-white/65 p-4 text-left text-xs font-semibold text-brand-3 transition-colors hover:bg-[#f7faf4]" onClick={() => openPanel("comment")} type="button"><ChatCircleText size={17} /> Add a comment</button>
                )}
              </aside>
            </div>
          ) : null}

          {notice ? <p aria-live="polite" className="mt-4 rounded-xl bg-[#f3f8ef] px-3 py-2 text-xs text-brand-4">{notice}</p> : null}
        </div>
      </div>
    </section>
  )
}
