"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { cartService } from "@/services/cartService"

const cartKey = ["cart"] as const

export function useCart() {
  const queryClient = useQueryClient()
  const cart = useQuery({
    queryKey: cartKey,
    queryFn: cartService.get,
    retry: false,
  })
  const update = useMutation({
    mutationFn: cartService.setItem,
    onSuccess: (data) => queryClient.setQueryData(cartKey, data),
  })
  const remove = useMutation({
    mutationFn: cartService.removeItem,
    onSuccess: (data) => queryClient.setQueryData(cartKey, data),
  })
  return {
    cart: cart.data,
    error: cart.error,
    isLoading: cart.isLoading,
    refresh: cart.refetch,
    removeItem: remove.mutateAsync,
    setItem: update.mutateAsync,
    isUpdating: update.isPending || remove.isPending,
  }
}
