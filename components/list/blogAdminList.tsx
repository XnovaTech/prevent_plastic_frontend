"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DotsThree, PencilSimple, Plus, Trash } from "@phosphor-icons/react"

import { Button, LinkButton } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminBlogs } from "@/hooks/useBlogs"
import type { BlogStatus } from "@/types/blog"

const statuses: (BlogStatus | "all")[] = [
  "all",
  "draft",
  "pending_review",
  "approved",
  "rejected",
  "published",
  "archived",
]

export function BlogAdminList() {
  const router = useRouter()
  const { posts, isLoading, error, refresh, transition, remove } =
    useAdminBlogs()
  const [status, setStatus] = useState<BlogStatus | "all">("all")

  async function act(id: number, action: "approve" | "publish" | "reject") {
    const reason =
      action === "reject" ? window.prompt("Rejection reason") : undefined
    if (action === "reject" && !reason) return
    await transition(id, action, reason ?? undefined)
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
            Journal control
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
            Blog management
          </h2>
          <p className="mt-2 text-sm text-brand-light">
            Review community submissions and publish the stories that belong in
            the Journal.
          </p>
        </div>
        <LinkButton href="/admin/blog/new">
          <Plus size={16} /> Create blog
        </LinkButton>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {statuses.map((item) => (
          <Button
            key={item}
            onPress={() => {
              setStatus(item)
              void refresh(item === "all" ? undefined : item)
            }}
            variant={status === item ? "default" : "outline"}
          >
            {item.replace("_", " ")}
          </Button>
        ))}
      </div>
      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      {isLoading ? (
        <p className="text-sm text-brand-light">Loading blogs…</p>
      ) : (
        <div className="overflow-x-auto rounded-[26px] border border-[#e3e9df] bg-white">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[28%]" />
            <col className="w-[15%]" />
            <col className="w-[13%]" />
            <col className="w-[14%]" />
            <col className="w-[10%]" />
            <col className="w-[8%]" />
            <col className="w-[12%]" />
          </colgroup>
            <thead className="border-b border-[#e3e9df] text-xs text-brand-gray-3">
              <tr>
                <th className="p-4">Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-center">Comments</th>
                <th className="text-center">Likes</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  className="border-b border-[#eef1ea] last:border-0"
                  key={post.id}
                >
                  <td className="p-4">
                    <Link
                      className="font-semibold text-brand hover:text-brand-3"
                      href={`/admin/blog/${post.id}`}
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-xs text-brand-gray-3">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td>{post.author.name}</td>
                  <td>{post.category?.name ?? "—"}</td>
                  <td className="capitalize">
                    {post.status.replace("_", " ")}
                  </td>
                    <td className="text-center font-semibold text-brand">{post.comments_count}</td>
                    <td className="text-center font-semibold text-brand">{post.likes_count}</td>
                    <td className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-2">
                      {post.status === "pending_review" && (
                        <Button
                          size="sm"
                          onPress={() => void act(post.id, "approve")}
                        >
                          Approve
                        </Button>
                      )}
                      {post.status === "pending_review" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onPress={() => void act(post.id, "reject")}
                        >
                          Reject
                        </Button>
                      )}
                      {post.status === "approved" && (
                        <Button
                          size="sm"
                          onPress={() => void act(post.id, "publish")}
                        >
                          Publish
                        </Button>
                      )}
                        <DropdownMenuTrigger>
                          <Button aria-label="Blog actions" size="sm" variant="outline">
                            <DotsThree size={18} weight="bold" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuItem onAction={() => router.push(`/admin/blog/${post.id}`)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onAction={() => router.push(`/admin/blog/${post.id}/edit`)}>
                              <PencilSimple size={15} /> Edit blog
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onAction={() => {
                                if (window.confirm("Delete this blog?")) void remove(post.id)
                              }}
                            >
                              <Trash size={15} /> Delete blog
                            </DropdownMenuItem>
                          </DropdownMenu>
                        </DropdownMenuTrigger>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <p className="p-8 text-center text-sm text-brand-light">
              No blogs match this filter.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
