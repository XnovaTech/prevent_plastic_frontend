"use client"

import Image from "next/image"
import { useId } from "react"

type SeedlingIconProps = {
  className?: string
  size?: number
  /**
   * "line" renders just the outline of the sprout,
   * "color" renders the original multi-colour artwork.
   */
  variant?: "line" | "color"
}

export function SeedlingIcon({
  className,
  size = 18,
  variant = "color",
}: SeedlingIconProps) {
  const filterId = `sprout-outline-${useId().replace(/:/g, "")}`
  // Keeps the outline weight readable at any icon size.
  const outlineWidth = Math.max(0.75, size / 32)

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      {variant === "line" && (
        <svg aria-hidden="true" className="absolute size-0">
          <defs>
            <filter
              height="140%"
              id={filterId}
              width="140%"
              x="-20%"
              y="-20%"
            >
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius={outlineWidth}
                result="dilated"
              />
              <feComposite
                in="dilated"
                in2="SourceAlpha"
                operator="out"
                result="outline"
              />
              <feFlood floodColor="#3f8a24" result="lineColor" />
              <feComposite in="lineColor" in2="outline" operator="in" />
            </filter>
          </defs>
        </svg>
      )}
      <Image
        alt=""
        aria-hidden="true"
        className={`object-contain ${className ?? ""}`}
        height={size}
        src="/illustrations/sproutCurve.svg"
        style={{
          width: size,
          height: size,
          filter: variant === "line" ? `url(#${filterId})` : undefined,
        }}
        unoptimized
        width={size}
      />
    </span>
  )
}
