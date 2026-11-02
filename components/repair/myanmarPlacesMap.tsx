"use client"

import { useEffect, useMemo, useRef } from "react"
import * as L from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import type { MyanmarPlace } from "@/components/repair/repairMapExperience"
import { categoryColors } from "@/components/repair/repairMapConfig"

const MYANMAR_OVERVIEW_BOUNDS: L.LatLngBoundsExpression = [
  [8, 92],
  [28, 101],
]

const categoryGlyphs = [
  '<path d="M14.8 5.2a4 4 0 0 0-5.3 5.3L4.8 15.2a2.1 2.1 0 1 0 3 3l4.7-4.7a4 4 0 0 0 5.3-5.3l-2.4 2.4-3-3 2.4-2.4Z"/>',
  '<circle cx="8" cy="15.5" r="3.1"/><path d="m10.3 13.3 7-7 2.2 2.2-1.6 1.6 1.5 1.5-2 2-1.5-1.5-3.4 3.4"/>',
  '<circle cx="6.5" cy="16.5" r="3"/><circle cx="17.5" cy="16.5" r="3"/><path d="m6.5 16.5 4-7 4 7H6.5Zm4-7h4l3 7m-6-7-2-2"/>',
  '<path d="M7 4v6m3-6v6m-5 0h7l-3.5 4V20M17 4v16m0-16c2.5 3 2.5 6 0 8"/>',
  '<path d="M6 4v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V4M9 12v8m6-8v8M7 20h10"/>',
  '<path d="M4 10h16v10H4zM3 10l2-5h14l2 5M3 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0M9 20v-5h6v5"/>',
  '<path d="m12 4 3 3-3 3M15 7H9a4 4 0 0 0-4 4v1m7 8-3-3 3-3m-3 3h6a4 4 0 0 0 4-4v-1"/>',
  '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 6h4m-3 12h2"/>',
  '<path d="m12 3 3.2 5.5H8.8L12 3Zm-2.4 8.5H4l3.2 5.5L9.6 11.5Zm4.8 0 2.4 5.5 3.2-5.5h-5.6ZM7.2 17h9.6"/>',
  '<path d="M12 20v-8m0 2c-5 0-7-3-7-7 5 0 7 3 7 7Zm0-3c0-4 2-6 7-6 0 4-2 6-7 6Z"/>',
]

type MyanmarPlacesMapProps = {
  divisionPlaces: MyanmarPlace[]
  places: MyanmarPlace[]
  selectedPlaceId: string | null
  onSelectPlace: (place: MyanmarPlace) => void
  focusPlace: MyanmarPlace | null
  selectedDivision: string | null
}

function MapController({
  divisionPlaces,
  places,
  focusPlace,
  selectedDivision,
}: Pick<
  MyanmarPlacesMapProps,
  "divisionPlaces" | "places" | "focusPlace" | "selectedDivision"
>) {
  const map = useMap()
  const fittedMap = useRef(false)
  const previousDivision = useRef<string | null>(null)

  const resetView = () => {
    map.flyToBounds(MYANMAR_OVERVIEW_BOUNDS, {
      animate: true,
      duration: 0.8,
      padding: [28, 28],
      maxZoom: 7,
    })
  }

  useEffect(() => {
    if (!places.length || fittedMap.current) return

    const bounds = L.latLngBounds(
      places.map((place) => [place.latitude, place.longitude])
    )
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 7 })
    fittedMap.current = true
  }, [map, places])

  useEffect(() => {
    if (previousDivision.current === selectedDivision) return

    const previous = previousDivision.current
    previousDivision.current = selectedDivision

    if (selectedDivision && divisionPlaces.length) {
      const bounds = L.latLngBounds(
        divisionPlaces.map((place) => [place.latitude, place.longitude])
      )
      map.flyToBounds(bounds, {
        animate: true,
        duration: 0.8,
        padding: [36, 36],
        maxZoom: 8,
      })
    } else if (previous !== null) {
      map.flyToBounds(MYANMAR_OVERVIEW_BOUNDS, {
        animate: true,
        duration: 0.8,
        padding: [28, 28],
        maxZoom: 7,
      })
    }
  }, [divisionPlaces, map, selectedDivision])

  useEffect(() => {
    if (!focusPlace) return
    map.flyTo([focusPlace.latitude, focusPlace.longitude], 14, {
      animate: true,
      duration: 0.8,
    })
  }, [focusPlace, map])

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        aria-label="Zoom in"
        className="flex size-10 items-center justify-center rounded-xl border border-[#e1e8df] bg-white/95 text-xl text-brand shadow-lg shadow-brand/10 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
        onClick={() => map.zoomIn()}
        type="button"
      >
        +
      </button>
      <button
        aria-label="Zoom out"
        className="flex size-10 items-center justify-center rounded-xl border border-[#e1e8df] bg-white/95 text-xl text-brand shadow-lg shadow-brand/10 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
        onClick={() => map.zoomOut()}
        type="button"
      >
        −
      </button>
      <button
        aria-label="Show Myanmar overview"
        className="mt-1 flex size-10 items-center justify-center rounded-xl border border-[#e1e8df] bg-white/95 text-brand-3 shadow-lg shadow-brand/10 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
        onClick={resetView}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="17"
          viewBox="0 0 24 24"
          width="17"
        >
          <path
            d="M4 9V4h5M20 9V4h-5M4 15v5h5m11-5v5h-5M8 8l-4-4m12 4 4-4M8 16l-4 4m12-4 4 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </button>
    </div>
  )
}

export function MyanmarPlacesMap({
  divisionPlaces,
  places,
  selectedPlaceId,
  onSelectPlace,
  focusPlace,
  selectedDivision,
}: MyanmarPlacesMapProps) {
  const icons = useMemo(
    () =>
      categoryColors.map((color, index) => {
        const createIcon = (selected: boolean) => {
          const size = selected ? 44 : 38
          const glyph = categoryGlyphs[index] ?? categoryGlyphs[0]

          return L.divIcon({
            className: selected
              ? "myanmar-place-icon myanmar-place-icon-selected"
              : "myanmar-place-icon",
            html: `<svg aria-hidden="true" class="myanmar-place-pin" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="17.5" fill="${color}" stroke="#fff" stroke-width="2.5"/><g transform="translate(9 9)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">${glyph}</g></svg>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          })
        }

        return {
          normal: createIcon(false),
          selected: createIcon(true),
        }
      }),
    []
  )

  return (
    <MapContainer
      center={[19.5, 96.5]}
      className="myanmar-leaflet-map h-full w-full"
      maxBounds={[
        [5, 88],
        [31, 105],
      ]}
      maxBoundsViscosity={0.75}
      minZoom={5}
      scrollWheelZoom
      zoom={6}
      zoomControl={false}
    >
      <TileLayer
        attribution="Satellite imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        maxZoom={19}
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        attribution="Labels & boundaries &copy; Esri"
        maxZoom={19}
        opacity={0.95}
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        zIndex={300}
      />
      <MapController
        divisionPlaces={divisionPlaces}
        focusPlace={focusPlace}
        places={places}
        selectedDivision={selectedDivision}
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount()
          const label = count.toLocaleString()
          const width = Math.max(64, 34 + label.length * 11)

          return L.divIcon({
            className: "myanmar-place-cluster",
            html: `<span aria-label="${label} locations, zoom in to see category markers" class="myanmar-place-cluster-content" title="${label} locations — zoom in to see category markers"><strong>${label}</strong><small>places</small></span>`,
            iconSize: L.point(width, 34),
            iconAnchor: [width / 2, 17],
          })
        }}
        maxClusterRadius={58}
        disableClusteringAtZoom={8}
        showCoverageOnHover={false}
      >
        {places.map((place) => (
          <Marker
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
            icon={
              place.id === selectedPlaceId
                ? icons[place.categoryIndex].selected
                : icons[place.categoryIndex].normal
            }
            key={place.id}
            position={[place.latitude, place.longitude]}
            title={place.name}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-brand">{place.name}</p>
                <p className="mt-1 text-xs text-brand-light">
                  {place.categoryLabel}
                </p>
                <a
                  className="mt-3 inline-flex text-xs font-semibold text-brand-3"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Get directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
