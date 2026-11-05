"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Armchair,
  ArrowUpRight,
  Bicycle,
  Check,
  DeviceMobile,
  ForkKnife,
  Key,
  MapPin,
  MagnifyingGlass,
  Plant,
  Recycle,
  Storefront,
  TShirt,
  X,
  Wrench,
} from "@phosphor-icons/react/dist/ssr"

import {
  categoryColors,
  categoryLabels,
  nearbyRadiusMiles,
  repairDivisionBoundarySourceUrl,
  repairDivisions,
  repairMapSourceUrl,
} from "@/components/repair/repairMapConfig"
import { RepairPosterCarousel } from "@/components/repair/repairPosterCarousel"
import { useGeolocation, type UserLocation } from "@/hooks/useGeolocation"

type RawMyanmarMap = {
  categories: string[]
  places: [number, string, number, number, number][]
}

export type MyanmarPlace = {
  id: string
  categoryIndex: number
  categoryLabel: string
  division: string
  name: string
  latitude: number
  longitude: number
}

type MyanmarMapData = {
  categories: string[]
  places: MyanmarPlace[]
}

const MyanmarPlacesMap = dynamic(
  () =>
    import("@/components/repair/myanmarPlacesMap").then(
      (module) => module.MyanmarPlacesMap
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-label="Loading the Myanmar map"
        className="h-[440px] animate-pulse bg-[#e7ece5] sm:h-[540px] lg:h-[680px]"
      />
    ),
  }
)

function isRawMap(value: unknown): value is RawMyanmarMap {
  if (typeof value !== "object" || value === null) return false

  const candidate = value as Record<string, unknown>
  const categories = candidate.categories
  const places = candidate.places

  return (
    Array.isArray(categories) &&
    categories.length > 0 &&
    categories.every((category) => typeof category === "string") &&
    Array.isArray(places) &&
    places.every(
      (place) =>
        Array.isArray(place) &&
        place.length === 5 &&
        Number.isInteger(place[0]) &&
        typeof place[1] === "string" &&
        typeof place[2] === "number" &&
        Number.isFinite(place[2]) &&
        typeof place[3] === "number" &&
        Number.isFinite(place[3]) &&
        Number.isInteger(place[4]) &&
        place[4] >= 0 &&
        place[4] < repairDivisions.length
    )
  )
}

function formatPlaceCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count)
}

function isInsideMapArea(location: UserLocation) {
  return (
    location.latitude >= 5 &&
    location.latitude <= 31 &&
    location.longitude >= 88 &&
    location.longitude <= 105
  )
}

function distanceInMiles(
  from: UserLocation,
  to: { latitude: number; longitude: number }
) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180
  const earthRadiusMiles = 3958.8

  const deltaLatitude = toRadians(to.latitude - from.latitude)
  const deltaLongitude = toRadians(to.longitude - from.longitude)
  const latitude1 = toRadians(from.latitude)
  const latitude2 = toRadians(to.latitude)

  const haversine =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) ** 2

  return 2 * earthRadiusMiles * Math.asin(Math.min(1, Math.sqrt(haversine)))
}

const categoryIcons = [
  Wrench,
  Key,
  Bicycle,
  ForkKnife,
  Armchair,
  Storefront,
  TShirt,
  DeviceMobile,
  Recycle,
  Plant,
]

export function RepairMapExperience() {
  const [mapData, setMapData] = useState<MyanmarMapData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState("")
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)
  const [activeCategories, setActiveCategories] = useState<string[] | null>(
    null
  )
  const [nearbyOnly, setNearbyOnly] = useState(true)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [focusPlace, setFocusPlace] = useState<MyanmarPlace | null>(null)
  const geolocation = useGeolocation()
  const [dismissedLocation, setDismissedLocation] =
    useState<UserLocation | null>(null)

  // Auto-locate on mount so the map focuses on the user's nearby area
  // instead of rendering the whole Myanmar overview first.
  useEffect(() => {
    geolocation.locate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadMapData() {
      setLoadError(null)

      try {
        const response = await fetch("/data/myanmar-green-places.json", {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Map data could not be loaded (HTTP ${response.status}).`
          )
        }

        const payload: unknown = await response.json()

        if (!isRawMap(payload)) {
          throw new Error("The Myanmar map data is not in a valid format.")
        }

        const places = payload.places.flatMap((place, index) => {
          const [categoryIndex, name, latitude, longitude, divisionIndex] =
            place
          const category = payload.categories[categoryIndex]
          const division = repairDivisions[divisionIndex]

          if (
            !category ||
            !division ||
            latitude < 5 ||
            latitude > 31 ||
            longitude < 88 ||
            longitude > 105
          ) {
            return []
          }

          return [
            {
              id: String(index),
              categoryIndex,
              categoryLabel: categoryLabels[category] ?? category,
              division,
              name: name.trim() || "Unnamed place",
              latitude,
              longitude,
            },
          ]
        })

        setMapData({
          categories: payload.categories.map(
            (category) => categoryLabels[category] ?? category
          ),
          places,
        })
      } catch (error) {
        if (controller.signal.aborted) return
        setLoadError(
          error instanceof Error
            ? error.message
            : "The Myanmar map could not be loaded."
        )
      }
    }

    void loadMapData()

    return () => controller.abort()
  }, [reloadKey])

  const categories = useMemo(() => mapData?.categories ?? [], [mapData])
  const divisions = repairDivisions

  const divisionPlaces = useMemo(() => {
    if (!mapData) return []

    return selectedDivision
      ? mapData.places.filter((place) => place.division === selectedDivision)
      : mapData.places
  }, [mapData, selectedDivision])

  const divisionCounts = useMemo(() => {
    const counts = new Map<string, number>()

    for (const place of mapData?.places ?? []) {
      counts.set(place.division, (counts.get(place.division) ?? 0) + 1)
    }

    return counts
  }, [mapData])

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()

    for (const place of divisionPlaces) {
      counts.set(
        place.categoryLabel,
        (counts.get(place.categoryLabel) ?? 0) + 1
      )
    }

    return counts
  }, [divisionPlaces])

  const visiblePlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return divisionPlaces.filter((place) => {
      const matchesCategory =
        activeCategories === null ||
        activeCategories.includes(place.categoryLabel)
      const matchesQuery =
        !normalizedQuery ||
        `${place.name} ${place.categoryLabel}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategories, divisionPlaces, query])

  const searchResults = query.trim() ? visiblePlaces.slice(0, 8) : []
  const selectedPlace =
    visiblePlaces.find((place) => place.id === selectedPlaceId) ?? null

  const withinMapArea =
    geolocation.location !== null && isInsideMapArea(geolocation.location)
  const locationIsDismissed =
    geolocation.location !== null && geolocation.location === dismissedLocation
  const userLocation =
    geolocation.location && !locationIsDismissed && withinMapArea
      ? geolocation.location
      : null
  const outsideMapArea =
    geolocation.location !== null && !locationIsDismissed && !withinMapArea

  const mapPlaces = useMemo(() => {
    if (!nearbyOnly || !userLocation) return visiblePlaces
    return visiblePlaces.filter(
      (place) => distanceInMiles(userLocation, place) <= nearbyRadiusMiles
    )
  }, [nearbyOnly, userLocation, visiblePlaces])

  const nearbyCount = useMemo(() => {
    if (!userLocation) return 0

    return visiblePlaces.filter(
      (place) => distanceInMiles(userLocation, place) <= nearbyRadiusMiles
    ).length
  }, [userLocation, visiblePlaces])

  const locationMessage = outsideMapArea
    ? "Your location is outside this map's area of Myanmar."
    : geolocation.errorMessage

  const toggleCategory = useCallback(
    (category: string) => {
      setActiveCategories((current) => {
        const next = new Set(current ?? categories)

        if (next.has(category)) {
          next.delete(category)
        } else {
          next.add(category)
        }

        return next.size === categories.length ? null : Array.from(next)
      })
    },
    [categories]
  )

  const focusOnPlace = (place: MyanmarPlace) => {
    setSelectedPlaceId(place.id)
    setFocusPlace(place)
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <header className="mb-7 flex flex-col gap-5 sm:mb-9 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[740px]">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            KEEP GOOD THINGS GOING
          </p>
          <h1
            className="mt-3 font-serif text-[36px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[48px] lg:text-[56px]"
            id="repair-title"
          >
            Explore Myanmar&apos;s green places
          </h1>
          <p className="mt-4 max-w-[680px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
            Find repair, reuse, recycling, and other local services across
            Myanmar. Search by name, or zoom in to explore category markers.
          </p>
        </div>

        <a
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-full border border-[#d6e0d4] bg-white/80 px-5 text-xs font-semibold text-brand-3 transition-colors hover:border-brand-3 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
          href={repairMapSourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open source map
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <div className="mb-5 flex flex-wrap gap-2.5">
        <div className="flex items-center gap-2 rounded-full border border-[#e1e8df] bg-white/80 px-4 py-2.5">
          <MapPin aria-hidden="true" className="text-brand-3" size={16} />
          <span className="text-[11px] font-semibold text-brand-6">
            {mapData ? formatPlaceCount(mapData.places.length) : "—"} places
          </span>
        </div>
        <div className="rounded-full border border-[#e1e8df] bg-white/80 px-4 py-2.5 text-[11px] text-brand-light">
          {categories.length || "—"} categories
        </div>
        <div className="rounded-full border border-[#e1e8df] bg-white/80 px-4 py-2.5 text-[11px] text-brand-light">
          Myanmar
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-5">
        <aside className="flex min-w-0 flex-col gap-4">
          <section className="rounded-[24px] border border-[#e3e8e0] bg-white/90 p-4 shadow-[0_14px_38px_-32px_rgba(27,65,56,0.5)] sm:p-5">
            <label className="flex min-h-12 items-center gap-3 rounded-[14px] border border-[#dfe6dc] bg-[#fbfcfa] px-3.5 text-brand-3 transition-colors focus-within:border-brand-3">
              <MagnifyingGlass aria-hidden="true" size={18} />
              <span className="sr-only">Search places or categories</span>
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-brand outline-none placeholder:text-brand-gray-4"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search places or categories"
                type="search"
                value={query}
              />
              {query && (
                <button
                  aria-label="Clear search"
                  className="flex size-8 items-center justify-center rounded-full text-brand-gray-4 transition hover:bg-[#edf1ea] hover:text-brand"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              )}
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-[11px] font-semibold text-brand-6">
                Filter by division or state
              </span>
              <select
                className="min-h-12 w-full rounded-[14px] border border-[#dfe6dc] bg-[#fbfcfa] px-3.5 text-sm text-brand transition-colors outline-none focus:border-brand-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                onChange={(event) => {
                  setSelectedDivision(event.target.value || null)
                  setSelectedPlaceId(null)
                  setFocusPlace(null)
                }}
                value={selectedDivision ?? ""}
              >
                <option value="">All locations</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division} (
                    {formatPlaceCount(divisionCounts.get(division) ?? 0)})
                  </option>
                ))}
              </select>
              <span
                aria-live="polite"
                className="mt-2 block text-[10px] text-brand-gray-3"
              >
                {formatPlaceCount(divisionPlaces.length)} places in{" "}
                {selectedDivision ?? "Myanmar"}
              </span>
            </label>

            {userLocation && (
              <button
                className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#dfe6dc] bg-[#f7f9f5] px-3 py-2 text-left text-[11px] font-semibold text-brand-6 transition-colors hover:bg-[#eef3ea]"
                onClick={() => setNearbyOnly((value) => !value)}
                type="button"
              >
                <span>
                  {nearbyOnly
                    ? `Showing nearby places (${nearbyCount} within ${nearbyRadiusMiles} miles)`
                    : "Showing all places on the map"}
                </span>
                <span className="text-[10px] font-bold text-brand-3">
                  {nearbyOnly ? "Show all" : "Nearby only"}
                </span>
              </button>
            )}

            {query.trim() && (
              <div aria-live="polite" className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-[11px] font-semibold text-brand-6">
                    Search results
                  </h2>
                  <span className="text-[10px] text-brand-gray-4">
                    {formatPlaceCount(visiblePlaces.length)} found
                  </span>
                </div>
                {searchResults.length ? (
                  <ul className="max-h-64 divide-y divide-[#edf0e9] overflow-y-auto">
                    {searchResults.map((place) => (
                      <li key={place.id}>
                        <button
                          className={`w-full rounded-lg px-2.5 py-3 text-left transition-colors hover:bg-[#f5f7f2] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-2 ${
                            selectedPlaceId === place.id ? "bg-[#f1f5ed]" : ""
                          }`}
                          onClick={() => focusOnPlace(place)}
                          type="button"
                        >
                          <span className="block truncate text-xs font-semibold text-brand-6">
                            {place.name}
                          </span>
                          <span className="mt-1 block truncate text-[10px] text-brand-gray-3">
                            {place.categoryLabel} · {place.division}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-xl bg-[#f7f8f5] px-3 py-4 text-xs leading-5 text-brand-light">
                    No places match this search. Try another name or category.
                  </p>
                )}
              </div>
            )}

            {selectedPlace && (
              <div className="mt-4 rounded-[16px] border border-[#dfe8dc] bg-[#f5f8f2] p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-3">
                    <MapPin aria-hidden="true" size={15} weight="fill" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-5 font-semibold text-brand-6">
                      {selectedPlace.name}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-brand-gray-3">
                      {selectedPlace.categoryLabel} · {selectedPlace.division}
                    </p>
                    <a
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-brand-3 hover:text-brand-orange"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Get directions
                      <ArrowUpRight aria-hidden="true" size={12} />
                    </a>
                  </div>
                  <button
                    aria-label="Clear selected place"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-brand-gray-4 hover:bg-white hover:text-brand"
                    onClick={() => setSelectedPlaceId(null)}
                    type="button"
                  >
                    <X aria-hidden="true" size={14} />
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-[24px] border border-[#e3e8e0] bg-white/90 p-4 shadow-[0_14px_38px_-32px_rgba(27,65,56,0.5)] sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-brand-6">
                  Browse by category
                </h2>
                <p className="mt-1 text-[10px] text-brand-gray-3">
                  Filter places on the map
                </p>
              </div>
              {activeCategories !== null && (
                <button
                  className="shrink-0 text-[10px] font-semibold text-brand-3 hover:text-brand-orange"
                  onClick={() => setActiveCategories(null)}
                  type="button"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
              {categories.map((category, index) => {
                const isActive =
                  activeCategories === null ||
                  activeCategories.includes(category)
                const color = categoryColors[index] ?? "#23614e"
                const CategoryIcon = categoryIcons[index] ?? MapPin

                return (
                  <button
                    aria-pressed={isActive}
                    className={`flex min-h-12 w-full items-center gap-2.5 rounded-xl border px-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-2 ${
                      isActive
                        ? "border-[#e5ebe3] bg-[#f7f9f5] text-brand-6"
                        : "border-transparent text-brand-gray-3 hover:bg-[#fafbf8]"
                    }`}
                    key={category}
                    onClick={() => toggleCategory(category)}
                    type="button"
                  >
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-lg"
                      style={{
                        backgroundColor: `${color}18`,
                        color,
                      }}
                    >
                      <CategoryIcon
                        aria-hidden="true"
                        size={16}
                        weight="duotone"
                      />
                    </span>
                    <span className="min-w-0 flex-1 text-[10px] leading-4 font-medium sm:text-[11px]">
                      {category}
                    </span>
                    <span className="text-[10px] text-brand-gray-4 tabular-nums">
                      {formatPlaceCount(categoryCounts.get(category) ?? 0)}
                    </span>
                    {isActive && (
                      <Check
                        aria-hidden="true"
                        className="shrink-0 text-brand-3"
                        size={14}
                        weight="bold"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        </aside>

        <section
          aria-label="Interactive map of green places in Myanmar"
          className="isolate relative h-[440px] overflow-hidden rounded-[24px] border border-[#dfe6dc] bg-[#e9eee7] shadow-[0_18px_48px_-34px_rgba(27,65,56,0.4)] sm:h-[540px] sm:rounded-[28px] lg:h-[680px]"
        >
          {loadError ? (
            <div
              aria-live="polite"
              className="flex h-full min-h-[440px] flex-col items-center justify-center px-6 text-center sm:min-h-[540px] lg:min-h-[680px]"
            >
              <p className="text-sm font-semibold text-brand-6">
                We couldn&apos;t load the map data
              </p>
              <p className="mt-2 max-w-md text-xs leading-5 text-brand-light">
                {loadError}
              </p>
              <button
                className="mt-4 min-h-10 rounded-full bg-brand-2 px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                onClick={() => setReloadKey((key) => key + 1)}
                type="button"
              >
                Try again
              </button>
            </div>
          ) : mapData ? (
            <>
              <MyanmarPlacesMap
                divisionPlaces={divisionPlaces}
                focusPlace={focusPlace}
                locationStatus={geolocation.status}
                onLocate={geolocation.locate}
                onResetView={() => setDismissedLocation(geolocation.location)}
                onSelectPlace={(place) => setSelectedPlaceId(place.id)}
                places={mapPlaces}
                selectedDivision={selectedDivision}
                selectedPlaceId={selectedPlaceId}
                userLocation={userLocation}
              />
              <div
                aria-live="polite"
                className="pointer-events-none absolute bottom-4 left-4  flex max-w-[calc(100%-2rem)] flex-col items-start gap-2 sm:bottom-5 sm:left-5"
              >
                <div className="rounded-full border border-white/80 bg-white/95 px-3.5 py-2 text-[10px] font-semibold text-brand-6 shadow-lg shadow-brand/10 backdrop-blur-sm">
                  {formatPlaceCount(visiblePlaces.length)} places shown
                </div>
                {geolocation.status === "locating" && (
                  <div className="rounded-full border border-white/80 bg-white/95 px-3.5 py-2 text-[10px] font-semibold text-brand-3 shadow-lg shadow-brand/10 backdrop-blur-sm">
                    Finding your location…
                  </div>
                )}
                {userLocation && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3.5 py-2 text-[10px] font-semibold text-brand-6 shadow-lg shadow-brand/10 backdrop-blur-sm">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-brand-2 ring-2 ring-brand-2/25"
                    />
                    You&apos;re here · {formatPlaceCount(nearbyCount)} places
                    within {nearbyRadiusMiles} miles
                  </div>
                )}
                {locationMessage && (
                  <div
                    role="status"
                    className="rounded-full border border-[#f0dcc9] bg-[#fff6ee] px-3.5 py-2 text-[10px] font-semibold text-brand-orange-3 shadow-lg shadow-brand/10 backdrop-blur-sm"
                  >
                    {locationMessage}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              aria-label="Loading Myanmar locations"
              className="flex h-full min-h-[440px] items-center justify-center sm:min-h-[540px] lg:min-h-[680px]"
              role="status"
            >
              <Recycle
                aria-hidden="true"
                className="size-10 animate-spin text-brand-2"
              />
              <span className="sr-only">Loading map locations</span>
            </div>
          )}
        </section>
      </div>

      <p className="mt-4 text-[10px] leading-5 text-brand-gray-3">
        Location pins are based on the shared Green Consumption and Production
        map for Myanmar. Division filters use 2019 administrative boundaries
        from{" "}
        <a
          className="font-semibold text-brand-3 underline underline-offset-2 hover:text-brand-orange"
          href={repairDivisionBoundarySourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          geoBoundaries
        </a>{" "}
        (CC BY 4.0); coastal locations outside those simplified boundaries are
        listed separately, and Naypyidaw is matched by place name. Map data may
        change; open the source map to confirm the latest details. Satellite
        imagery and map labels © Esri, Maxar, and Earthstar Geographics.
      </p>

      <RepairPosterCarousel />
    </div>
  )
}
