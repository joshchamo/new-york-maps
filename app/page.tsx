"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Sidebar from "./components/Sidebar"

const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
})

const aerialMaps = {
  "2022 Aerial Photography":
    "https://tiles.arcgis.com/tiles/yG5s3afENB5iO9fj/arcgis/rest/services/NYC_Orthos_2022/MapServer/tile/{z}/{y}/{x}",
  "2018 Aerial Photography":
    "https://tiles.arcgis.com/tiles/yG5s3afENB5iO9fj/arcgis/rest/services/NYC_Orthos_2018/MapServer/tile/{z}/{y}/{x}",
  "2016 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8",
  "2014 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8",
  "2012 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8",
  "2010 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8",
  "2008 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8",
  "2006 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8",
  "2004 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8",
  "1996 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8",
  "1951 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8",
  "1924 Aerial Photography": "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8",
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2022 Aerial Photography")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="relative h-screen w-full">
      <main className="h-full w-full">
        <MapComponent selectedYear={selectedYear} aerialMaps={aerialMaps} />
      </main>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        aerialMaps={aerialMaps}
      />
    </div>
  )
}

