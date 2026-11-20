"use client"

import { useState } from "react"
import { Star, Trash } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"

function Stars({ value }: { value: number }) {
  return <span className="flex gap-0.5 text-[#b7823e]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} weight={value >= star ? "fill" : "thin"} />)}</span>
}
function dateLabel(value: string) { return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) }

export function ProductFeedbackSection({ productId, scope = "vendor", section }: { productId: number; scope?: "vendor" | "admin"; section: "reviews" | "comments" }) {
  const { engagement, error, isLoading, refresh } = useProductEngagement(productId, scope)
  const [changingId, setChangingId] = useState<number | null>(null)
  async function remove(commentId: number) {
    if (!window.confirm("Delete this comment?")) return
    setChangingId(commentId)
    try { await productEngagementService.removeComment(productId, commentId); await refresh() } finally { setChangingId(null) }
  }
  if (section === "comments") return <section className="mt-8"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Customer feedback</p><h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-brand">Comments</h3>{error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}{isLoading ? <p className="mt-5 text-sm text-brand-gray-3">Loading comments…</p> : null}{!isLoading && !(engagement?.comments.items.length) ? <p className="mt-5 text-sm text-brand-gray-3">No comments yet.</p> : null}{!isLoading && engagement?.comments.items.length ? <div className="mt-5 divide-y divide-[#e3e9df] border-y border-[#e3e9df]">{engagement.comments.items.map((comment) => <article className="flex flex-wrap items-start justify-between gap-4 py-4" key={comment.id}><div><p className="font-semibold text-brand">{comment.commenter.name}</p><p className="mt-1 text-sm leading-6 text-brand-light">{comment.body}</p><p className="mt-2 text-xs text-brand-gray-3">{dateLabel(comment.created_at)} · Visible to shoppers</p></div><Button aria-label="Delete comment" isDisabled={changingId === comment.id} onPress={() => void remove(comment.id)} size="icon-sm" variant="destructive"><Trash size={15} /></Button></article>)}</div> : null}</section>
  const summary = engagement?.summary
  return <section className="mt-9 border-t border-[#dce4da] pt-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Customer feedback</p><h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-brand">Reviews</h3></div><p className="text-sm text-brand-light"><span className="font-semibold text-brand">{(summary?.average ?? 0).toFixed(1)} / 5</span> · {summary?.count ?? 0} review{summary?.count === 1 ? "" : "s"}</p></div>{error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}{isLoading ? <p className="mt-5 text-sm text-brand-gray-3">Loading customer feedback…</p> : <div className="mt-5 divide-y divide-[#e3e9df] border-y border-[#e3e9df]">{engagement?.reviews.items.length ? engagement.reviews.items.map((review) => <article className="py-4" key={review.id}><div className="flex flex-wrap items-center justify-between gap-3"><Stars value={review.rating} /><span className="text-xs text-brand-gray-3">{dateLabel(review.created_at)}</span></div><p className="mt-3 font-semibold text-brand">{review.title || "Customer review"}</p>{review.review ? <p className="mt-1 text-sm leading-6 text-brand-light">{review.review}</p> : null}<p className="mt-2 text-xs text-brand-gray-3">{review.reviewer.name}{review.is_verified_purchase ? " · Verified purchase" : ""}</p></article>) : <p className="py-4 text-sm text-brand-gray-3">No reviews yet.</p>}</div>}</section>
}
