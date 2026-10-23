"use client"

import { useEffect, useRef, useState } from "react"

import { homePageMock } from "@/mock/homePageMock"

const batchSize = 4

export function useMockProductFeed() {
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const products = homePageMock.moreFinds.slice(0, visibleCount)
  const hasMore = visibleCount < homePageMock.moreFinds.length

  function loadMore() {
    setVisibleCount((count) =>
      Math.min(count + batchSize, homePageMock.moreFinds.length)
    )
  }

  useEffect(() => {
    if (!hasMore) {
      return
    }

    let animationFrame = 0

    function checkSentinelPosition() {
      if (animationFrame) {
        return
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        const sentinel = sentinelRef.current

        if (
          sentinel &&
          sentinel.getBoundingClientRect().top <= window.innerHeight + 180
        ) {
          setVisibleCount((count) =>
            Math.min(count + batchSize, homePageMock.moreFinds.length)
          )
        }
      })
    }

    window.addEventListener("scroll", checkSentinelPosition, {
      passive: true,
    })
    window.addEventListener("resize", checkSentinelPosition)
    checkSentinelPosition()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", checkSentinelPosition)
      window.removeEventListener("resize", checkSentinelPosition)
    }
  }, [hasMore])

  return { hasMore, loadMore, products, sentinelRef }
}
