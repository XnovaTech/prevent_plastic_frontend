"use client"

import { useEffect, useState } from "react"
import { ChatCircleText, PaperPlaneTilt, X } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { conversationService, type Conversation } from "@/services/orderService"

export function VendorConversation({ vendorOrderId, vendorName, triggerLabel = "Chat with vendor" }: { vendorOrderId: number; vendorName: string; triggerLabel?: string }) {
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    let active = true
    const refreshUnread = () => {
      void conversationService.forVendorOrder(vendorOrderId)
        .then((current) => {
          if (active) setUnreadCount(current?.unread_count ?? 0)
        })
        .catch(() => undefined)
    }
    refreshUnread()
    const interval = window.setInterval(refreshUnread, 15_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [vendorOrderId])

  useEffect(() => {
    if (!conversation) return
    const interval = window.setInterval(() => {
      void conversationService.show(conversation.id).then(setConversation).catch(() => undefined)
    }, 15_000)
    return () => window.clearInterval(interval)
  }, [conversation?.id])

  const open = async () => {
    setError("")
    setIsLoading(true)
    try {
      setConversation(await conversationService.start(vendorOrderId))
      setUnreadCount(0)
    } catch {
      setError("Unable to open this vendor conversation. Please sign in again and retry.")
    } finally {
      setIsLoading(false)
    }
  }
  const send = async () => {
    if (!conversation || !message.trim()) return
    setError("")
    setIsLoading(true)
    try {
      setConversation(await conversationService.send(conversation.id, message.trim()))
      setMessage("")
    } catch {
      setError("Unable to send your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return <>
    <Button className="relative mt-2 h-8 px-3 text-xs" onPress={() => void open()} size="sm" variant="outline">
      <ChatCircleText size={15} /> {triggerLabel}{unreadCount > 0 ? <span aria-label={`${unreadCount} unread message${unreadCount === 1 ? "" : "s"}`} className="ml-1 inline-flex min-w-4 items-center justify-center rounded-full bg-brand-orange px-1.5 py-0.5 text-[9px] font-bold text-white">{unreadCount}</span> : null}
    </Button>
    {conversation ? <div className="fixed inset-0 z-50 grid place-items-center bg-brand/25 p-4"><section aria-modal="true" className="w-full max-w-lg rounded-[26px] border border-[#dce6da] bg-white p-5 shadow-xl" role="dialog"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Order conversation</p><h3 className="mt-1 font-serif text-2xl text-brand">{vendorName}</h3></div><Button aria-label="Close conversation" className="size-8 min-w-0 p-0" onPress={() => setConversation(null)} size="sm" variant="outline"><X size={16} /></Button></div><div className="mt-4 max-h-64 space-y-3 overflow-y-auto rounded-2xl bg-[#f5f8f2] p-3">{conversation.messages.length ? conversation.messages.map((entry) => <div className="rounded-xl bg-white p-3 text-sm text-brand" key={entry.id}><p className="font-semibold">{entry.sender?.name ?? "Participant"}</p><p className="mt-1 whitespace-pre-wrap">{entry.body}</p></div>) : <p className="py-6 text-center text-sm text-brand-gray-3">Start the conversation about this order.</p>}</div>{error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}<Textarea className="mt-4 min-h-20" onChange={(event) => setMessage(event.target.value)} placeholder={`Message ${vendorName}`} value={message} /><Button className="mt-3" isDisabled={isLoading || !message.trim()} onPress={() => void send()} size="sm"><PaperPlaneTilt size={15} /> {isLoading ? "Sending…" : "Send message"}</Button></section></div> : null}
  </>
}
