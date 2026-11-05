"use client"

import { useCallback, useRef, useState } from "react"

export type GeolocationStatus =
  "idle" | "locating" | "ready" | "denied" | "unavailable"

export type UserLocation = {
  latitude: number
  longitude: number
}

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>("idle")
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const requestId = useRef(0)

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("unavailable")
      setErrorMessage("This browser can't share your location.")
      return
    }

    const currentRequest = ++requestId.current
    setStatus("locating")
    setErrorMessage(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (currentRequest !== requestId.current) return

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setStatus("ready")
      },
      (error) => {
        if (currentRequest !== requestId.current) return

        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied")
          setErrorMessage(
            "Location permission denied — allow it to focus the map on you."
          )
        } else {
          setStatus("unavailable")
          setErrorMessage("We couldn't get your location. Please try again.")
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 10000,
      }
    )
  }, [])

  return { status, location, errorMessage, locate }
}
