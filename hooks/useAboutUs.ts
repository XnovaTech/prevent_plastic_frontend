"use client"

import { useCallback } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { aboutUsService } from "@/services/aboutUsService"
import type { AboutUs } from "@/types/aboutUs"

export function useAboutUs(scope: "public" | "admin") {
  const queryClient = useQueryClient()
  const queryKey = ["about-us", scope] as const
  const query = useQuery({
    queryKey,
    queryFn: () =>
      scope === "admin"
        ? aboutUsService.adminShow()
        : aboutUsService.publicShow(),
    ...(scope === "public"
      ? { staleTime: 0, refetchOnMount: "always" as const }
      : {}),
  })

  const updateCachedAbout = useCallback(
    (updater: (current: AboutUs | null) => AboutUs | null) => {
      queryClient.setQueryData<AboutUs | null>(["about-us", scope], (current) =>
        updater(current ?? null)
      )
    },
    [queryClient, scope]
  )

  const refresh = useCallback(async () => {
    await query.refetch()
  }, [query])

  const invalidatePublicAbout = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ["about-us", "public"] })
  }, [queryClient])

  return {
    about: query.data ?? null,
    error: query.error instanceof Error ? query.error.message : "",
    isLoading: query.isLoading,
    refresh,
    updateCachedAbout,
    invalidatePublicAbout,
  }
}
