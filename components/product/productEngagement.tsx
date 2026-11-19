"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ChatCircleText, Star } from "@phosphor-icons/react"

import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ProductEngagementProps = { productId: number; productName: string }

const ratingLabels = ["", "Not for me", "Could be better", "Good", "Great", "Love it"]

function Stars({ value }: { value: number }) {
  return <span className="flex gap-0.5 text-[#b7823e]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} weight={value >= star ? "fill" : "thin"} />)}</span>
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
}

export function ProductEngagement({ productId, productName }: ProductEngagementProps) {
  const user = useAuthStore((state) => state.user)
  const { engagement, error, isLoading, refresh } = useProductEngagement(productId, "public")
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [comment, setComment] = useState("")
  const [notice, setNotice] = useState("")
  const [sending, setSending] = useState<"review" | "comment" | null>(null)
  const summary = engagement?.summary
  const total = summary?.count ?? 0
  const distribution = summary?.distribution ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) { setNotice("Please sign in to leave a review."); return }
    if (!rating || !review.trim()) { setNotice("Choose a rating and write your review first."); return }
    setSending("review"); setNotice("")
    try {
      await productEngagementService.createReview(productId, { rating, title: title.trim() || undefined, review: review.trim() })
      setRating(0); setTitle(""); setReview("")
      setNotice(`Thank you — your review for “${productName}” is now live.`)
      await refresh()
    } catch { setNotice("We could not post your review. Please try again.") } finally { setSending(null) }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) { setNotice("Please sign in to join the conversation."); return }
    if (!comment.trim()) { setNotice("Write a comment before posting."); return }
    setSending("comment"); setNotice("")
    try {
      await productEngagementService.createComment(productId, comment.trim())
      setComment("")
      setNotice("Your comment is now visible to the community.")
    } catch { setNotice("We could not post your comment. Please try again.") } finally { setSending(null) }
  }

  return <section className="mt-10 pb-14 sm:pb-20" id="reviews"><div className="border-t border-[#dfe7dc] pt-10"><div className="mb-6"><p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">WHAT PEOPLE SAY</p><h2 className="mt-2 font-serif text-[30px] tracking-[-0.04em] text-brand sm:text-[38px]">Ratings, reviews &amp; comments</h2></div>{error ? <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}<div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-[22px] border border-white/65 bg-white/50 p-5 backdrop-blur-xl"><p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">RATING SUMMARY</p><div className="mt-3 flex items-end gap-3"><p className="font-serif text-[46px] leading-none text-brand">{(summary?.average ?? 0).toFixed(1)}</p><div className="pb-1"><Stars value={summary?.average ?? 0} /><p className="mt-1 text-[10px] text-brand-gray-4">{total} review{total === 1 ? "" : "s"}</p></div></div><div className="mt-5 space-y-2">{[5,4,3,2,1].map((star) => { const count = distribution[star] ?? 0; const percent = total ? Math.round((count / total) * 100) : 0; return <div className="flex items-center gap-2" key={star}><span className="w-4 text-[10px] text-brand-gray-4">{star}</span><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e7e3d6]"><span className="block h-full rounded-full bg-[#b7823e]" style={{ width: `${percent}%` }} /></span><span className="w-7 text-right text-[10px] text-brand-gray-3">{percent}%</span></div> })}</div></aside><div className="space-y-5"><div className="rounded-[22px] border border-white/65 bg-white/50 p-5 backdrop-blur-xl"><div className="flex justify-between gap-3"><p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">COMMUNITY REVIEWS</p><p className="text-[10px] text-brand-gray-3">{total} total</p></div><div className="mt-4 space-y-4">{isLoading ? <p className="text-sm text-brand-gray-3">Loading reviews…</p> : engagement?.reviews.items.length ? engagement.reviews.items.map((item) => <article className="border-t border-[#e9ece4]/70 pt-4 first:border-0 first:pt-0" key={item.id}><div className="flex justify-between gap-3"><Stars value={item.rating} /><span className="text-[10px] text-brand-gray-3">{dateLabel(item.created_at)}</span></div><p className="mt-2 text-sm font-semibold text-brand">{item.title || ratingLabels[item.rating]}</p>{item.review ? <p className="mt-1 text-sm leading-6 text-brand-light">{item.review}</p> : null}<p className="mt-2 text-[10px] font-semibold text-brand-gray-4">{item.reviewer.name}{item.is_verified_purchase ? " · Verified purchase" : ""}</p></article>) : <p className="text-sm text-brand-gray-3">No reviews yet. Be the first to share your experience.</p>}</div></div><div className="rounded-[22px] border border-white/65 bg-white/50 p-5 backdrop-blur-xl"><p className="flex items-center gap-2 text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase"><ChatCircleText size={16} /> COMMUNITY COMMENTS</p><div className="mt-4 space-y-3">{engagement?.comments.items.length ? engagement.comments.items.map((item) => <article className="rounded-2xl bg-white/65 p-4" key={item.id}><div className="flex justify-between gap-3"><p className="text-sm font-semibold text-brand">{item.commenter.name}</p><span className="text-[10px] text-brand-gray-3">{dateLabel(item.created_at)}</span></div><p className="mt-1 text-sm leading-6 text-brand-light">{item.body}</p></article>) : <p className="text-sm text-brand-gray-3">No approved comments yet.</p>}</div><form className="mt-4 border-t border-[#e9ece4] pt-4" onSubmit={submitComment}><Label htmlFor="product-comment">Join the conversation</Label><Textarea className="mt-2 min-h-20 border-[#dfe6dc] bg-white text-sm" id="product-comment" onChange={(event) => setComment(event.target.value)} placeholder={user ? "Share a helpful question or comment" : "Sign in to leave a comment"} value={comment} />{user ? <Button className="mt-3 bg-brand-2 text-white hover:bg-[#1f6157]" isDisabled={sending !== null} type="submit">{sending === "comment" ? "Sending…" : "Post comment"}</Button> : <Link className="mt-3 inline-block text-sm font-semibold text-brand-3 underline" href="/login">Sign in to comment</Link>}</form></div><div className="rounded-[22px] border border-white/65 bg-white/50 p-5 backdrop-blur-xl"><p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">WRITE A REVIEW</p><h3 className="mt-2 font-serif text-[22px] text-brand">How did this find treat you?</h3><form className="mt-4 space-y-4" onSubmit={submitReview}><div><Label>Your rating *</Label><div className="mt-2 flex gap-1">{[1,2,3,4,5].map((star) => <button aria-label={`Rate ${star} stars`} className="rounded-lg p-1" key={star} onClick={() => setRating(star)} type="button"><Star className={rating >= star ? "text-[#b7823e]" : "text-[#c9c4b4]"} size={23} weight={rating >= star ? "fill" : "thin"} /></button>)}<span className="ml-2 self-center text-xs text-brand-gray-4">{rating ? ratingLabels[rating] : "Tap to rate"}</span></div></div><div><Label htmlFor="review-title">Headline</Label><Input className="mt-2 border-[#dfe6dc] bg-white text-sm" id="review-title" onChange={(event) => setTitle(event.target.value)} placeholder="Sum it up in a few words" value={title} /></div><div><Label htmlFor="review-body">Your review *</Label><Textarea className="mt-2 min-h-28 border-[#dfe6dc] bg-white text-sm" id="review-body" onChange={(event) => setReview(event.target.value)} placeholder="Condition, packaging, and the seller — tell the community how it went." value={review} /></div>{user ? <Button className="bg-brand-2 text-white hover:bg-[#1f6157]" isDisabled={sending !== null} type="submit">{sending === "review" ? "Posting…" : "Post review"}</Button> : <Link className="text-sm font-semibold text-brand-3 underline" href="/login">Sign in to write a review</Link>}</form></div></div></div>{notice ? <p aria-live="polite" className="mt-4 rounded-2xl border border-[#d8e5d3] bg-brand-yellow-bg/80 px-4 py-3 text-sm text-brand-4">{notice}</p> : null}</div></section>
}
