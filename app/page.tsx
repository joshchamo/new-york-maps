"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Sidebar from "./components/Sidebar"

const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
})

const aerialMapsData = new Map([
  ["2022", "https://tiles.arcgis.com/tiles/yG5s3afENB5iO9fj/arcgis/rest/services/NYC_Orthos_2022/MapServer/tile/{z}/{y}/{x}"],
  ["2018", "https://tiles.arcgis.com/tiles/yG5s3afENB5iO9fj/arcgis/rest/services/NYC_Orthos_2018/MapServer/tile/{z}/{y}/{x}"],
  ["2016", "https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8"],
  ["2014", "https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8"],
  ["2012", "https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8"],
  ["2010", "https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8"],
  ["2008", "https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8"],
  ["2006", "https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8"],
  ["2004", "https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8"],
  ["1996", "https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8"],
  ["1951", "https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8"],
  ["1924", "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8"]
])

const aerialMaps = Object.fromEntries(
  Array.from(aerialMapsData.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
)

export default function Page() {
  const [selectedYear, setSelectedYear] = useState("2022")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="relative h-screen w-full">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        aerialMaps={aerialMaps}
      />
      <main className="h-full w-full">
        <MapComponent 
          selectedYear={selectedYear} 
          aerialMaps={aerialMaps}
        />
      </main>
    </div>
  )
}