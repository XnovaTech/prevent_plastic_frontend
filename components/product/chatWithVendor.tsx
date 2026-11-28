"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  ChatCircleDots,
  Package,
  PaperPlaneTilt,
  Storefront,
} from "@phosphor-icons/react"

import { Dialog, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { conversationService, type Conversation } from "@/services/orderService"
import { useAuthStore } from "@/stores/authStore"
import { notifyError } from "@/lib/notifications"

type ChatMessage = {
  id: number
  author: "vendor" | "shopper"
  text: string
}

type ChatWithVendorProps = {
  merchant: string
  productId: number
  productName?: string
  shopKind?: string
  className?: string
}

function greetingFor(productName?: string) {
  return productName
    ? `Hi! Thanks for asking about “${productName}”. It's still available — how can I help?`
    : "Hi! Thanks for stopping by. How can I help you today?"
}

export function ChatWithVendor({
  merchant,
  productId,
  productName,
  shopKind,
  className,
}: ChatWithVendorProps) {
  const user = useAuthStore((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (!conversation || !isOpen || !user) return
    const interval = window.setInterval(() => {
      void conversationService.show(conversation.id).then((current) => {
        setConversation(current)
        setMessages(current.messages.map((message) => ({
          id: message.id,
          author: message.sender?.id === user.id ? "shopper" : "vendor",
          text: message.body,
        })))
      }).catch(() => undefined)
    }, 15_000)
    return () => window.clearInterval(interval)
  }, [conversation?.id, isOpen, user])

  async function handleOpenChange(open: boolean) {
    setIsOpen(open)

    if (!open) {
      setDraft("")
      return
    }

    if (!user) {
      setIsOpen(false)
      setError("Please sign in to message this seller.")
      return
    }

    setError("")
    setIsLoading(true)
    try {
      const current = await conversationService.startForProduct(productId)
      setConversation(current)
      setMessages(current.messages.map((message) => ({
        id: message.id,
        author: message.sender?.id === user.id ? "shopper" : "vendor",
        text: message.body,
      })))
    } catch {
      notifyError("Unable to open this conversation. Please try again.")
      setIsOpen(false)
      setError("Unable to open this conversation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const text = draft.trim()
    if (!text) {
      return
    }

    if (!conversation || !user) return
    setError("")
    setIsLoading(true)
    try {
      const current = await conversationService.send(conversation.id, text)
      setConversation(current)
      setMessages(current.messages.map((message) => ({
        id: message.id,
        author: message.sender?.id === user.id ? "shopper" : "vendor",
        text: message.body,
      })))
      setDraft("")
    } catch {
      notifyError("Unable to send your message. Please try again.")
      setError("Unable to send your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        className={`mt-2 text-xs ${className ?? ""}`}
        isDisabled={isLoading}
        onPress={() => void handleOpenChange(true)}
        size="sm"
        variant="outline"
      >
        <ChatCircleDots aria-hidden="true" size={16} weight="fill" />
        Chat with Vendor
      </Button>

      {error && !isOpen ? (
        <p aria-live="polite" className="mt-3 text-xs text-red-700">
          {error}
        </p>
      ) : null}

      <Dialog
        className="flex max-h-[85vh] w-full flex-col overflow-hidden sm:max-w-md"
        isDismissable
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        showCloseButton
      >
        <DialogTitle className="sr-only">Chat with {merchant}</DialogTitle>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-[#e4ecdf] pb-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-2 text-white">
              <Storefront aria-hidden="true" size={19} weight="fill" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-brand">
                {merchant}
              </p>
              <DialogDescription className="mt-0.5 flex items-center gap-1.5 text-[10px] text-brand-gray-4">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-[#3f9b6d]"
                />
                <span className="truncate">
                  {shopKind ?? "Seller"} · Usually replies in a few minutes
                </span>
              </DialogDescription>
            </div>
          </div>

          {productName && (
            <p className="mt-3 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full bg-brand-yellow-bg/80 px-3 py-1.5 text-[10px] font-semibold text-brand-4">
              <Package aria-hidden="true" size={12} />
              <span className="truncate">About: {productName}</span>
            </p>
          )}

          <div
            aria-live="polite"
            className="mt-3.5 flex max-h-[38vh] min-h-[170px] flex-col gap-2.5 overflow-y-auto pr-1"
            ref={listRef}
            role="log"
          >
            {messages.map((message) => (
              <div
                className={
                  message.author === "shopper"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
                key={message.id}
              >
                <p
                  className={
                    message.author === "shopper"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-2 px-3.5 py-2 text-[12px] leading-5 text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm border border-[#e6ede2] bg-[#f4f8f2] px-3.5 py-2 text-[12px] leading-5 text-brand"
                  }
                >
                  {message.text}
                </p>
              </div>
            ))}
            {!messages.length && !isLoading ? (
              <p className="text-center text-xs text-brand-gray-3">
                Send a message to start the conversation.
              </p>
            ) : null}
          </div>

          {error ? <p className="mt-3 text-xs text-red-700">{error}</p> : null}

          <form
            className="mt-3.5 flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#d8e5d3] bg-white/70 px-4 backdrop-blur-md focus-within:border-brand-2/40">
              <input
                aria-label={`Message ${merchant}`}
                className="min-w-0 flex-1 bg-transparent text-[12px] text-brand outline-none placeholder:text-brand-gray-3"
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Message ${merchant}...`}
                disabled={isLoading}
                type="text"
                value={draft}
              />
            </div>
            <button
              aria-label="Send message"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-2 text-white transition-colors hover:bg-[#1f6157] disabled:opacity-40"
              disabled={isLoading || !draft.trim()}
              type="submit"
            >
              <PaperPlaneTilt aria-hidden="true" size={17} weight="fill" />
            </button>
          </form>

          <p className="mt-3 text-center text-[9px] leading-4 text-brand-gray-3">
            Messages stay on Prevent Plastic — never share payment details
            outside the platform.
          </p>
        </div>
      </Dialog>
    </>
  )
}
