"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { NewBlogComment } from "@/hooks/useBlogEngagement"
import type { BlogComment } from "@/mock/blogPageMock"

type BlogCommentsProps = {
  comments: readonly BlogComment[]
  onAddComment: (comment: NewBlogComment) => void
}

const fieldClassName =
  "h-10 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName = "text-[11px] font-semibold text-brand-5"

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export function BlogComments({ comments, onAddComment }: BlogCommentsProps) {
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [status, setStatus] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!body.trim()) {
      setStatus("Write a comment before posting.")
      return
    }

    onAddComment({
      author: name.trim() || "You",
      body: body.trim(),
    })

    setStatus("Thanks — your comment is now at the top of the list.")
    setName("")
    setBody("")
  }

  return (
    <section
      aria-labelledby="blog-comments-title"
      className="scroll-mt-24"
      id="comments"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            JOIN THE CONVERSATION
          </p>
          <h2
            className="mt-2 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]"
            id="blog-comments-title"
          >
            Comments
          </h2>
        </div>
        <p className="inline-flex min-h-10 items-center rounded-full bg-[#e8eee5] px-3.5 text-[11px] font-semibold text-brand-3">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </p>
      </div>

      <div className="rounded-[24px] border border-[#e7e9e1] bg-white p-5 sm:p-6">
        {comments.length === 0 ? (
          <div className="py-8 text-center">
            <p className="font-serif text-[20px] tracking-[-0.03em] text-brand">
              No comments yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-brand-light">
              Be the first to share what this story stirred up for you.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                className="border-t border-[#e9ece4] pt-4 first:border-t-0 first:pt-0"
                key={comment.id}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee5] font-serif text-[11px] font-semibold text-brand-3"
                  >
                    {initialsOf(comment.author)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[12px] font-semibold text-brand-6">
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-brand-gray-3">
                        {comment.date}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-6 text-brand-light">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 rounded-[24px] border border-[#e7e9e1] bg-white p-5 sm:p-6">
        <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
          LEAVE A COMMENT
        </p>
        <h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.03em] text-brand">
          Add your voice
        </h3>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label className={labelClassName} htmlFor="blog-comment-name">
              Your name
            </Label>
            <Input
              autoComplete="nickname"
              className={fieldClassName}
              id="blog-comment-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="How should we credit you?"
              value={name}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className={labelClassName} htmlFor="blog-comment-body">
              Your comment{" "}
              <span aria-hidden="true" className="text-brand-orange-3">
                *
              </span>
            </Label>
            <Textarea
              className="min-h-[96px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
              id="blog-comment-body"
              onChange={(event) => setBody(event.target.value)}
              placeholder="A question, a tip, or a story of your own…"
              rows={3}
              value={body}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="h-10 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white hover:bg-[#1f6157]"
              type="submit"
            >
              Post comment
            </Button>
            <p className="text-[10px] text-brand-gray-3">
              A design preview — comments stay in this browser session.
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
    </section>
  )
}
