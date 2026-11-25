"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { vendorService } from "@/services/vendorService"
import type { Vendor, VendorBusinessProfileInput, VendorProfileInput, VendorStatus } from "@/types/vendor"

export function useVendors(status?: VendorStatus) {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      setVendors(await vendorService.list(status))
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to load vendors.")
          : "Unable to load vendors."
      )
    } finally {
      setIsLoading(false)
    }
  }, [status])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  return { error, isLoading, refresh, vendors }
}

export function useVendor(id: number | null) {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(id))

  const refresh = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    try {
      setVendor(await vendorService.show(id))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!id) return
    void refresh()
  }, [id, refresh])

  const save = async (input: VendorProfileInput, businessProfile: VendorBusinessProfileInput) => {
    if (!id) return
    await vendorService.update(id, input)
    await vendorService.saveBusinessProfile(id, businessProfile)
    await refresh()
  }

  return { isLoading, refresh, save, vendor }
}
