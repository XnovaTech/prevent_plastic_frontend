"use client"

import { useEffect, useRef, useState } from "react"

const defaultBatchSize = 6

export function useInfiniteProducts<T>(
  items: readonly T[],
  batchSize = defaultBatchSize
) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(batchSize, items.length)
  )
  const sentinelRef = useRef<HTMLDivElement>(null)

  const hasMore = visibleCount < items.length
  const products = items.slice(0, visibleCount)

  function loadMore() {
    setVisibleCount((count) => Math.min(count + batchSize, items.length))
  }

  useEffect(() => {
    if (!hasMore) {
      return
    }

    const sentinel = sentinelRef.current

    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((count) => Math.min(count + batchSize, items.length))
        }
      },
      { rootMargin: "320px 0px" }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [batchSize, hasMore, items.length, visibleCount])

  return {
    hasMore,
    loadMore,
    products,
    sentinelRef,
    total: items.length,
    visibleCount,
  }
}
