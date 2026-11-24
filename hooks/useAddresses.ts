"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { addressService } from "@/services/addressService"
import type { UserAddress } from "@/types/address"

const addressesKey = ["addresses"] as const

export function useAddresses() {
  const client = useQueryClient()
  const query = useQuery({
    queryKey: addressesKey,
    queryFn: addressService.list,
  })
  const create = useMutation({
    mutationFn: addressService.create,
    onSuccess: () => client.invalidateQueries({ queryKey: addressesKey }),
  })
  const update = useMutation({
    mutationFn: ({ id, input }: { id: number; input: Parameters<typeof addressService.update>[1] }) =>
      addressService.update(id, input),
    onSuccess: () => client.invalidateQueries({ queryKey: addressesKey }),
  })
  return {
    addresses: query.data ?? [],
    error: query.error,
    isLoading: query.isLoading,
    create: create.mutateAsync,
    update: update.mutateAsync,
    isSaving: create.isPending || update.isPending,
  }
}
