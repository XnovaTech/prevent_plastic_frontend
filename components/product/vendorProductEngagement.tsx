"use client"

import { useState } from "react"
import { Star, Trash } from "@phosphor-icons/react"

import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"
import { Button } from "@/components/ui/button"

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-[#b7823e]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={13} weight={value >= star ? "fill" : "thin"} />
      ))}
    </span>
  )
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export function VendorProductEngagement({
  productId,
  scope = "vendor",
}: {
  productId: number
  scope?: "vendor" | "admin"
}) {
  const { engagement, error, isLoading, refresh } = useProductEngagement(
    productId,
    scope
  )
  const [changingId, setChangingId] = useState<number | null>(null)

  async function remove(commentId: number) {
    if (!window.confirm("Delete this comment?")) return
    setChangingId(commentId)
    try {
      await productEngagementService.removeComment(productId, commentId)
      await refresh()
    } finally {
      setChangingId(null)
    }
  }

  const summary = engagement?.summary
  return (
    <section className="mt-5 rounded-[26px] border border-[#e3e9df] bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Customer feedback
          </p>
          <h3 className="mt-1 font-serif text-3xl tracking-[-0.04em] text-brand">
            Reviews &amp; comments
          </h3>
        </div>
        <div className="rounded-2xl bg-[#f7faf4] px-4 py-2 text-right">
          <p className="text-2xl font-semibold text-brand">
            {(summary?.average ?? 0).toFixed(1)}{" "}
            <span className="text-sm text-brand-gray-3">/ 5</span>
          </p>
          <p className="text-xs text-brand-gray-3">
            {summary?.count ?? 0} review{summary?.count === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {isLoading ? (
        <p className="mt-5 text-sm text-brand-gray-3">
          Loading customer feedback…
        </p>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
              Reviews
            </p>
            <div className="mt-3 space-y-3">
              {engagement?.reviews.items.length ? (
                engagement.reviews.items.map((review) => (
                  <article
                    className="rounded-2xl bg-[#f7faf4] p-4"
                    key={review.id}
                  >
                    <div className="flex justify-between gap-3">
                      <Stars value={review.rating} />
                      <span className="text-[10px] text-brand-gray-3">
                        {dateLabel(review.created_at)}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-brand">
                      {review.title || "Customer review"}
                    </p>
                    {review.review ? (
                      <p className="mt-1 text-sm leading-6 text-brand-light">
                        {review.review}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs text-brand-gray-4">
                      {review.reviewer.name}
                      {review.is_verified_purchase
                        ? " · Verified purchase"
                        : ""}
                    </p>
                  </article>
                ))
              ) : (
                <p className="rounded-2xl bg-[#f7faf4] p-4 text-sm text-brand-gray-3">
                  No reviews yet.
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
              Comments
            </p>
            <div className="mt-3 space-y-3">
              {engagement?.comments.items.length ? (
                engagement.comments.items.map((comment) => (
                  <article
                    className="rounded-2xl bg-[#f7faf4] p-4"
                    key={comment.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-brand">
                          {comment.commenter.name}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-brand-light">
                          {comment.body}
                        </p>
                        <p className="mt-2 text-[10px] text-brand-gray-3">
                          {dateLabel(comment.created_at)} · Visible to shoppers
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          aria-label="Delete comment"
                          isDisabled={changingId === comment.id}
                          onPress={() => void remove(comment.id)}
                          size="icon-sm"
                          variant="destructive"
                        >
                          <Trash size={15} />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-2xl bg-[#f7faf4] p-4 text-sm text-brand-gray-3">
                  No comments yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
