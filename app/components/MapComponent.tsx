import { useEffect, useRef, useState, useCallback } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
  selectedYear: string
  aerialMaps: Record<string, string>
}

export default function MapComponent({ 
  selectedYear, 
  aerialMaps
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.TileLayer | null>(null)
  const initialZoom = 12
  const [currentZoom, setCurrentZoom] = useState(initialZoom)

  const handleZoomEnd = useCallback(() => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom()
      if (newZoom !== currentZoom) {
        setCurrentZoom(newZoom)
      }
    }
  }, [currentZoom])

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [40.7128, -74.006],
        zoom: initialZoom,
        minZoom: initialZoom - 1,
        maxZoom: 19,
        zoomControl: false
      })

      L.control
        .zoom({
          position: "bottomleft"
        })
        .addTo(mapRef.current)

      mapRef.current.on('zoomend', handleZoomEnd)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off('zoomend', handleZoomEnd)
      }
    }
  }, [handleZoomEnd])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const newLayer = L.tileLayer(aerialMaps[selectedYear], {
      minZoom: initialZoom - 1,
      maxZoom: 19,
      tileSize: 256,
      attribution: '&copy; <a href="https://www.nyc.gov/doitt">NYC DoITT</a>'
    })

    newLayer.addTo(map)

    if (layerRef.current) {
      layerRef.current.remove()
    }

    layerRef.current = newLayer
  }, [selectedYear, aerialMaps])

  return <div id="map" className="h-full w-full" />
}