"use client"

import { useEffect, useState } from "react"
import { ChatCircleText, PaperPlaneTilt } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useProductConversations } from "@/hooks/useProductConversations"
import { useAuthStore } from "@/stores/authStore"

export function ProductConversations({ productId }: { productId: number }) {
  const user = useAuthStore((state) => state.user)
  const { conversations, error, isLoading, send, isSending } = useProductConversations(productId)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [draft, setDraft] = useState("")
  const [sendError, setSendError] = useState("")
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0]

  useEffect(() => {
    if (!selectedId && conversations[0]) setSelectedId(conversations[0].id)
  }, [conversations, selectedId])

  async function reply() {
    if (!selected || !draft.trim()) return
    setSendError("")
    try {
      await send({ conversationId: selected.id, body: draft.trim() })
      setDraft("")
    } catch {
      setSendError("Unable to send your reply. Please try again.")
    }
  }

  return <section className="mt-8 border-t border-[#dce4da] pt-7">
    <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase"><ChatCircleText size={16} /> Product conversations</p>
    <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-brand">Shopper messages</h3>
    {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
    {isLoading ? <p className="mt-5 text-sm text-brand-gray-3">Loading conversations…</p> : conversations.length ? <div className="mt-5 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]"><div className="divide-y divide-[#e3e9df] border-y border-[#e3e9df]">{conversations.map((conversation) => <button className={`w-full px-4 py-3 text-left text-sm ${selected?.id === conversation.id ? "bg-[#f3f8ef] text-brand" : "text-brand-light hover:bg-[#f7faf4]"}`} key={conversation.id} onClick={() => setSelectedId(conversation.id)} type="button"><p className="font-semibold">{conversation.customer?.name ?? "Shopper"}</p><p className="mt-1 truncate text-xs">{conversation.messages.at(-1)?.body ?? "No messages yet"}</p></button>)}</div><div className="rounded-[20px] border border-[#e3e9df] bg-[#fdfefa] p-4"><p className="text-sm font-semibold text-brand">{selected?.customer?.name ?? "Shopper"}</p><div className="mt-4 max-h-72 space-y-3 overflow-y-auto">{selected?.messages.map((message) => <p className={message.sender?.id === user?.id ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-2 px-3 py-2 text-sm text-white" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-[#f3f8ef] px-3 py-2 text-sm text-brand"} key={message.id}>{message.body}</p>)}</div><Textarea className="mt-4 min-h-20" onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply" value={draft} />{sendError ? <p className="mt-2 text-xs text-red-700">{sendError}</p> : null}<Button className="mt-3" isDisabled={isSending || !draft.trim()} onPress={() => void reply()} size="sm"><PaperPlaneTilt size={15} />{isSending ? "Sending…" : "Reply"}</Button></div></div> : <p className="mt-5 text-sm text-brand-gray-3">No shopper messages for this product yet.</p>}
  </section>
}
