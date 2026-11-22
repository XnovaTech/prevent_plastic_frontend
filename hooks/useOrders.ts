"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { orderService } from "@/services/orderService"
import type { PaymentStatus } from "@/types/order"

function rows<T>(page: { data: T[] } | T[] | undefined): T[] {
  return Array.isArray(page) ? page : (page?.data ?? [])
}

export function useCustomerOrders(enabled = true) {
  const query = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => orderService.customerOrders(),
    enabled,
    refetchInterval: enabled ? 15_000 : false,
  })

  return {
    orders: rows(query.data),
    isLoading: query.isLoading,
    error: query.error,
  }
}

export function useCustomerOrder(id: number) {
  return useQuery({
    queryKey: ["customer-orders", id],
    queryFn: () => orderService.customerOrder(id),
    enabled: Number.isInteger(id) && id > 0,
    refetchInterval: 15_000,
  })
}

export function useVendorOrders(enabled = true) {
  const client = useQueryClient()
  const query = useQuery({
    queryKey: ["vendor-orders"],
    queryFn: () => orderService.vendorOrders(),
    enabled,
  })
  const update = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      orderService.updateVendorOrder(id, { status }),
    onSuccess: () => client.invalidateQueries({ queryKey: ["vendor-orders"] }),
  })
  const approve = useMutation({
    mutationFn: orderService.approveVendorOrder,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ["vendor-orders"] }),
        client.invalidateQueries({ queryKey: ["customer-orders"] }),
        client.invalidateQueries({ queryKey: ["admin-orders"] }),
        client.invalidateQueries({ queryKey: ["admin-vendor-orders"] }),
      ])
    },
  })
  return {
    orders: rows(query.data),
    isLoading: query.isLoading,
    error: query.error,
    update: update.mutateAsync,
    isUpdating: update.isPending,
    approve: approve.mutateAsync,
    isApproving: approve.isPending,
  }
}

export function useVendorOrder(id: number, enabled = true) {
  return useQuery({
    queryKey: ["vendor-orders", id],
    queryFn: () => orderService.vendorOrder(id),
    enabled: enabled && Number.isInteger(id) && id > 0,
  })
}

export function useAdminOrders(enabled = true) {
  const query = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => orderService.adminOrders(),
    enabled,
  })
  return {
    orders: rows(query.data),
    isLoading: query.isLoading,
    error: query.error,
  }
}

export function useAdminOrder(id: number, enabled = true) {
  return useQuery({
    queryKey: ["admin-orders", id],
    queryFn: () => orderService.adminOrder(id),
    enabled: enabled && Number.isInteger(id) && id > 0,
  })
}
export function useAdminVendorOrders(enabled = true) {
  const query = useQuery({
    queryKey: ["admin-vendor-orders"],
    queryFn: () => orderService.adminVendorOrders(),
    enabled,
  })
  return {
    orders: rows(query.data),
    isLoading: query.isLoading,
    error: query.error,
  }
}

export function useAdminVendorOrder(id: number, enabled = true) {
  return useQuery({
    queryKey: ["admin-vendor-orders", id],
    queryFn: () => orderService.adminVendorOrder(id),
    enabled: enabled && Number.isInteger(id) && id > 0,
  })
}

export function useAdminPayments(enabled = true) {
  const client = useQueryClient()
  const query = useQuery({
    queryKey: ["admin-payments"],
    queryFn: () => orderService.adminPayments(),
    enabled,
  })
  const update = useMutation({
    mutationFn: ({
      id,
      status,
      transaction_reference,
    }: {
      id: number
      status: PaymentStatus
      transaction_reference?: string
    }) => orderService.updateAdminPayment(id, { status, transaction_reference }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ["admin-payments"] }),
        client.invalidateQueries({ queryKey: ["admin-orders"] }),
        client.invalidateQueries({ queryKey: ["admin-vendor-orders"] }),
        client.invalidateQueries({ queryKey: ["customer-orders"] }),
        client.invalidateQueries({ queryKey: ["vendor-orders"] }),
      ])
    },
  })
  return {
    payments: rows(query.data),
    isLoading: query.isLoading,
    error: query.error,
    update: update.mutateAsync,
    isUpdating: update.isPending,
  }
}
