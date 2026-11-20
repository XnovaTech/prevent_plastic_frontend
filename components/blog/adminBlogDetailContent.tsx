"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChatCircle,
  Heart,
  ImageSquare,
  Newspaper,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react"

import { Button, LinkButton } from "@/components/ui/button"
import { useAdminBlogDetail } from "@/hooks/useBlogs"
import { resolveMediaUrl } from "@/lib/media"

type DetailTab = "story" | "gallery" | "comments"

export function AdminBlogDetailContent({ id }: { id: number }) {
  const router = useRouter()
  const {
    post,
    comments,
    isLoading,
    error,
    transition,
    remove,
    approveComment,
    removeComment,
  } = useAdminBlogDetail(id)
  const [tab, setTab] = useState<DetailTab>("story")

  if (isLoading)
    return <p className="text-sm text-brand-light">Loading blog…</p>
  if (!post) return <p className="text-sm text-red-700">{error}</p>

  async function transitionPost(action: "approve" | "publish" | "reject") {
    const reason =
      action === "reject" ? window.prompt("Rejection reason") : undefined
    if (action === "reject" && !reason) return
    await transition(action, reason ?? undefined)
  }

  async function deletePost() {
    if (!window.confirm("Delete this blog?")) return
    await remove()
    router.push("/admin/blog")
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="text-xs font-semibold text-brand-3" href="/admin/blog">
          ← Back to blogs
        </Link>
        <div className="flex flex-wrap justify-end gap-2">
          <LinkButton href={`/admin/blog/${post.id}/edit`} size="sm" variant="outline">
            <PencilSimple size={15} /> Edit
          </LinkButton>
          <Button onPress={() => void deletePost()} size="sm" variant="destructive">
            <Trash size={15} /> Delete
          </Button>
        </div>
      </div>
      <header className="mt-6 overflow-hidden border border-[#e3e9df] bg-white">
        <div className="flex min-h-[270px] max-w-4xl flex-col justify-center p-7 sm:p-9">
            <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
              {post.status.replace("_", " ")}
            </p>
            <h2 className="mt-2 font-serif text-4xl text-brand">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-3 text-sm leading-7 text-brand-light">
                {post.excerpt}
              </p>
            )}
            <p className="mt-5 text-sm text-brand-gray-3">
              By {post.author.name ?? "Community member"} ·{" "}
              {post.category?.name ?? "Uncategorized"}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-2">
                <Heart size={17} weight="fill" /> {post.likes_count}{" "}
                {post.likes_count === 1 ? "like" : "likes"}
              </span>
              {post.status === "pending_review" && (
                <>
                  <Button
                    size="sm"
                    onPress={() => void transitionPost("approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onPress={() => void transitionPost("reject")}
                  >
                    Reject
                  </Button>
                </>
              )}
              {post.status === "approved" && (
                <Button
                  size="sm"
                  onPress={() => void transitionPost("publish")}
                >
                  Publish
                </Button>
              )}
            </div>
          </div>
      </header>
      {post.rejection_reason && (
        <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Rejection reason: {post.rejection_reason}
        </p>
      )}
      <nav
        aria-label="Blog detail sections"
        className="mt-6 flex overflow-x-auto border-b border-[#dce4da]"
      >
        {(
          [
            ["story", "Story", Newspaper],
            ["gallery", `Gallery (${post.images.length})`, ImageSquare],
            ["comments", `Comments (${comments.length})`, ChatCircle],
          ] as const
        ).map(([value, label, Icon]) => (
          <button
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === value ? "border-brand-2 text-brand-2" : "border-transparent text-brand-gray-3 hover:text-brand"}`}
            key={value}
            onClick={() => setTab(value)}
            type="button"
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      {tab === "story" && (
        <section className="mt-8">
          <div
            className="prose prose-sm prose-p:leading-8 prose-p:text-brand-light max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <div className="mt-8 border-t border-[#e7e9e1] pt-6">
            <h3 className="font-serif text-2xl text-brand">Approval history</h3>
            {post.approval_history?.length ? (
              <div className="mt-3 space-y-2">
                {post.approval_history.map((history) => (
                  <p className="text-sm text-brand-light" key={history.id}>
                    {history.action_by.name ?? "Admin"} moved{" "}
                    {history.old_status ?? "new"} to {history.new_status}
                    {history.reason ? `: ${history.reason}` : ""}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-brand-gray-3">
                No review actions yet.
              </p>
            )}
          </div>
        </section>
      )}
      {tab === "gallery" && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {post.images.length ? (
            post.images.map((image) => (
              <img
                alt={`${post.title} gallery image`}
                className="aspect-[4/3] w-full object-cover"
                key={image.id}
                src={resolveMediaUrl(image.url)}
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
        <section className="mt-8 space-y-3">
          {comments.map((comment) => (
            <div
              className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e7e9e1] pb-4"
              key={comment.id}
            >
              <div>
                <p className="text-sm font-semibold text-brand">
                  {comment.commenter.name ?? "Anonymous"}
                </p>
                <p className="mt-1 text-sm text-brand-light">{comment.body}</p>
                <p className="mt-1 text-xs text-brand-gray-3">
                  {comment.is_approved ? "Approved" : "Pending review"}
                </p>
              </div>
              <div className="flex gap-2">
                {!comment.is_approved && (
                  <Button
                    size="sm"
                    onPress={() => void approveComment(comment.id)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onPress={() => {
                    if (window.confirm("Delete this comment?"))
                      void removeComment(comment.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-brand-gray-3">No comments yet.</p>
          )}
        </section>
      )}
    </div>
  )
}
