"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addressService } from "@/services/addressService"
import { orderService } from "@/services/orderService"
import { useAuthStore } from "@/stores/authStore"

function formatAddress(
  address: Awaited<ReturnType<typeof addressService.list>>[number]
) {
  return [
    address.address_line_1,
    address.address_line_2,
    address.township,
    address.city,
    address.state_region,
    address.postal_code,
    address.country,
  ]
    .filter(Boolean)
    .join(", ")
}

export function useCheckout() {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const mutation = useMutation({
    mutationFn: async (
      paymentMethod: "cash_on_delivery" | "bank_transfer" | "online"
    ) => {
      if (!user) throw new Error("Please sign in before checkout.")
      const addresses = await addressService.list()
      const hasDeliveryPhone = (address: (typeof addresses)[number]) =>
        Boolean(address.recipient_phone || user.phone)
      const address =
        addresses.find((item) => item.is_default && hasDeliveryPhone(item)) ??
        addresses.find(hasDeliveryPhone) ??
        addresses.find((item) => item.is_default) ??
        addresses[0]
      if (!address) throw new Error("Add a delivery address before checkout.")
      const phone = address.recipient_phone ?? user.phone
      if (!phone)
        throw new Error(
          "Add a delivery contact phone number to your saved address before checkout."
        )
      return orderService.place({
        shipping_address: {
          name: address.recipient_name ?? user.name,
          phone,
          address: formatAddress(address),
        },
        payment_method: paymentMethod,
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["customer-orders"] }),
      ])
    },
  })
  return {
    checkout: mutation.mutateAsync,
    error: mutation.error instanceof Error ? mutation.error.message : "",
    isCheckingOut: mutation.isPending,
  }
}
