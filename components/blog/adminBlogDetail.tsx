"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useAdminBlogDetail } from "@/hooks/useBlogs"

export function AdminBlogDetail({ id }: { id: number }) {
  const {
    post,
    comments,
    isLoading,
    error,
    transition,
    approveComment,
    removeComment,
  } = useAdminBlogDetail(id)
  if (isLoading)
    return <p className="text-sm text-brand-light">Loading blog…</p>
  if (!post) return <p className="text-sm text-red-700">{error}</p>
  async function transitionPost(action: "approve" | "publish" | "reject") {
    const reason =
      action === "reject" ? window.prompt("Rejection reason") : undefined
    if (action === "reject" && !reason) return
    await transition(action, reason ?? undefined)
  }
  return (
    <div className="mx-auto max-w-5xl">
      <Link className="text-xs font-semibold text-brand-3" href="/admin/blog">
        ← Back to blogs
      </Link>
      <div className="mt-6 rounded-[26px] border border-[#e3e9df] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
              {post.status.replace("_", " ")}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-brand">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-brand-light">
              By {post.author.name} · {post.category?.name ?? "Uncategorized"}
            </p>
          </div>
          <div className="flex gap-2">
            {post.status === "pending_review" && (
              <>
                <Button onPress={() => void transitionPost("approve")}>
                  Approve
                </Button>
                <Button
                  variant="outline"
                  onPress={() => void transitionPost("reject")}
                >
                  Reject
                </Button>
              </>
            )}
            {post.status === "approved" && (
              <Button onPress={() => void transitionPost("publish")}>
                Publish
              </Button>
            )}
          </div>
        </div>
        {post.rejection_reason && (
          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Rejection reason: {post.rejection_reason}
          </p>
        )}
        <p className="mt-5 text-sm leading-7 text-brand-light">
          {post.excerpt}
        </p>
        <div
          className="prose prose-sm prose-p:text-brand-light mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <div className="mt-8 border-t border-[#e7e9e1] pt-6">
          <h3 className="font-serif text-2xl text-brand">Approval history</h3>
          <div className="mt-3 space-y-2">
            {post.approval_history?.map((history) => (
              <p className="text-sm text-brand-light" key={history.id}>
                {history.action_by.name} moved {history.old_status ?? "new"} to{" "}
                {history.new_status}
                {history.reason ? `: ${history.reason}` : ""}
              </p>
            )) ?? (
              <p className="text-sm text-brand-gray-3">
                No review actions yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <section className="mt-6 rounded-[26px] border border-[#e3e9df] bg-white p-6">
        <h3 className="font-serif text-2xl text-brand">Likes</h3>
        {post.likes && post.likes.length > 0 ? (
          <p className="mt-4 text-sm leading-6 text-brand-light">
            Liked by{" "}
            <span className="font-semibold text-brand">
              {post.likes
                .slice(0, 3)
                .map((like) => like.user.name ?? "Registered user")
                .join(", ")}
            </span>
            {post.likes.length > 3 && (
              <>
                {" "}and{" "}
                <span className="font-semibold text-brand">{post.likes.length - 3} others</span>
              </>
            )}
            .
          </p>
        ) : (
          <p className="mt-4 text-sm text-brand-gray-3">No likes yet.</p>
        )}
      </section>
      <section className="mt-6 rounded-[26px] border border-[#e3e9df] bg-white p-6">
        <h3 className="font-serif text-2xl text-brand">Comments</h3>
        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <div
              className="flex flex-wrap items-start justify-between gap-3 rounded-2xl bg-[#f7f9f4] p-4"
              key={comment.id}
            >
              <div>
                <p className="text-sm font-semibold text-brand">
                  {comment.commenter.name}
                </p>
                <p className="mt-1 text-sm text-brand-light">{comment.body}</p>
                <p className="mt-1 text-xs text-brand-gray-3">
                  {comment.is_approved ? "Approved" : "Pending"}
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
        </div>
        {comments.length === 0 && (
          <p className="mt-4 text-sm text-brand-gray-3">No comments yet.</p>
        )}
      </section>
    </div>
  )
}
