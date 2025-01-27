import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
  selectedYear: string
  aerialMaps: Record<string, string>
}

export default function MapComponent({ selectedYear, aerialMaps }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.TileLayer | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [40.7128, -74.006],
        zoom: 13,
        minZoom: 10,
        maxZoom: 19,
        zoomControl: false,
      })

      L.control
        .zoom({
          position: "bottomleft",
        })
        .addTo(mapRef.current)
    }

    const map = mapRef.current

    if (layerRef.current) {
      map.removeLayer(layerRef.current)
    }

    layerRef.current = L.tileLayer(aerialMaps[selectedYear], {
      tileSize: 256,
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.nyc.gov/doitt">NYC DoITT</a>',
    }).addTo(map)

    return () => {
      if (map) {
        map.remove()
        mapRef.current = null
      }
    }
  }, [selectedYear, aerialMaps])

  return <div id="map" className="h-full w-full" />
}

