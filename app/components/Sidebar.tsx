import type { Dispatch, SetStateAction } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedYear: string
  setSelectedYear: Dispatch<SetStateAction<string>>
  aerialMaps: Record<string, string>
}

export default function Sidebar({ isOpen, setIsOpen, selectedYear, setSelectedYear, aerialMaps }: SidebarProps) {
  return (
    <>
      <Button variant="outline" size="icon" className="fixed top-4 left-4 z-[1003]" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-4 z-[1002] w-64 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="mb-4 text-lg font-semibold">NYC Aerial Photos</h1>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent className="z-[1004] text-sm">
              {Object.keys(aerialMaps).map((year) => (
                <SelectItem key={year} value={year} className="text-sm">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
}

