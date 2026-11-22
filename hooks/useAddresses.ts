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
  return {
    addresses: query.data ?? [],
    error: query.error,
    isLoading: query.isLoading,
    create: create.mutateAsync,
    isSaving: create.isPending,
  }
}
