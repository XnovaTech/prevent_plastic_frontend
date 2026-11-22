"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useCommentManagement } from "@/hooks/useCommentManagement"

export function CommentManagement({ scope }: { scope: "admin" | "vendor" }) {
  const { comments, isLoading, error, reply, isReplying } = useCommentManagement(scope)
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  if (isLoading) return <p className="text-sm text-brand-gray-3">Loading comments…</p>
  if (error) return <p className="text-sm text-red-600">Unable to load comments.</p>
  return <div className="mx-auto max-w-5xl"><div className="mb-8"><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Community conversations</p><h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">Comments to answer.</h2></div><div className="space-y-4">{comments.map((comment) => <Card className="rounded-[24px] border-[#e3e9df] bg-white p-5 shadow-none" key={comment.id}><p className="text-[10px] font-bold tracking-[.14em] text-brand-gray-3 uppercase">{comment.subject.type} · {comment.subject.title}</p><p className="mt-3 text-sm font-semibold text-brand">{comment.commenter.name}</p><p className="mt-1 text-sm leading-6 text-brand-light">{comment.body}</p>{comment.replies.map((item) => <div className="mt-3 border-l-2 border-brand-2/30 pl-3" key={item.id}><p className="text-xs font-semibold text-brand">{item.commenter.name}</p><p className="mt-1 text-sm text-brand-light">{item.body}</p></div>)}<Textarea className="mt-4 min-h-20" onChange={(event) => setDrafts((current) => ({ ...current, [comment.id]: event.target.value }))} placeholder="Write a reply" value={drafts[comment.id] ?? ""} /><Button className="mt-3 bg-brand-2 text-white" isDisabled={isReplying || !(drafts[comment.id] ?? "").trim()} onPress={async () => { await reply({ id: comment.id, body: drafts[comment.id].trim() }); setDrafts((current) => ({ ...current, [comment.id]: "" })) }}>Send reply</Button></Card>)}{comments.length === 0 ? <p className="text-sm text-brand-gray-3">No comments yet.</p> : null}</div></div>
}
