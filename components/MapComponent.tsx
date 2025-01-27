import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
  year: string
}

export default function MapComponent({ year }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.TileLayer | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([40.7128, -74.006], 11)
    }

    const map = mapRef.current

    if (layerRef.current) {
      map.removeLayer(layerRef.current)
    }

    const tileUrl = `https://maps.nyc.gov/xyz/1.0.0/photo/${year}/{z}/{x}/{y}.png8`

    layerRef.current = L.tileLayer(tileUrl, {
      minZoom: 8,
      maxZoom: 21,
      attribution: '&copy; <a href="https://www.nyc.gov/doitt">NYC DoITT</a>',
    }).addTo(map)

    return () => {
      if (map) {
        map.remove()
        mapRef.current = null
      }
    }
  }, [year])

  return <div id="map" className="w-full h-full" />
}

