"use client"

import { useMemo } from "react"
import * as L from "leaflet"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

type VendorLocationMapProps = {
  latitude: number
  longitude: number
  label: string
}

export function VendorLocationMap({ latitude, longitude, label }: VendorLocationMapProps) {
  const pin = useMemo(() => L.divIcon({
    className: "vendor-location-pin-wrapper",
    html: '<span class="vendor-location-pin" aria-hidden="true"></span>',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
  }), [])

  return <div className="overflow-hidden rounded-2xl border border-white/80">
    <MapContainer center={[latitude, longitude]} className="vendor-location-map h-52 w-full" zoom={14} scrollWheelZoom={false} zoomControl={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker alt={label} icon={pin} position={[latitude, longitude]} title={label} />
    </MapContainer>
  </div>
}
