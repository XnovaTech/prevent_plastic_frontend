"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { conversationService } from "@/services/orderService"

export function useProductConversations(productId: number) {
  const queryClient = useQueryClient()
  const key = ["product-conversations", productId] as const
  const conversations = useQuery({
    queryKey: key,
    queryFn: () => conversationService.forProduct(productId),
  })
  const send = useMutation({
    mutationFn: ({ conversationId, body }: { conversationId: number; body: string }) =>
      conversationService.send(conversationId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: key })
    },
  })

  return {
    conversations: conversations.data ?? [],
    error: conversations.error instanceof Error ? conversations.error.message : "",
    isLoading: conversations.isLoading,
    refresh: conversations.refetch,
    send: send.mutateAsync,
    isSending: send.isPending,
  }
}
