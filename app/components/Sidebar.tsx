import { useRef } from "react"
import type { Dispatch, SetStateAction } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedYear: string
  setSelectedYear: Dispatch<SetStateAction<string>>
  aerialMaps: Record<string, string>
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  selectedYear,
  setSelectedYear,
  aerialMaps,
}: SidebarProps) {
  const isMobile = useIsMobile()
  const scrollRef = useRef<HTMLDivElement>(null)
  const sortedYears = Object.keys(aerialMaps).sort((a, b) => Number(b) - Number(a))

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

const YearWheel = () => (
  <div className="relative mt-4 h-48 overflow-hidden w-full">
    <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-white/95 pointer-events-none z-10" />
    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/95 pointer-events-none z-10" />
    <div className="absolute left-1/2 top-1/2 h-10 w-[calc(100%)] -translate-x-1/2 -translate-y-1/2 bg-blue-100/30 pointer-events-none" />
    
    <div 
      ref={scrollRef}
      className="year-wheel h-full w-full overflow-y-scroll scrollbar-hide"
    >
      <div className="h-[calc(50%-20px)]" />
      {sortedYears.map((year) => (
        <button
          key={year}
          onClick={() => handleYearChange(year)}
          className={`
            year-item
            flex h-10 w-full items-center justify-center
            text-lg font-medium transition-colors
            ${selectedYear === year 
              ? 'text-blue-600 scale-105' 
              : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          {year}
        </button>
      ))}
      <div className="h-[calc(50%-20px)]" />
    </div>
  </div>
)

return (
  <>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
      className="fixed left-4 top-4 z-[9999] bg-white/95 shadow-md hover:bg-white"
      aria-label="Toggle menu"
    >
      <MapPin className="h-6 w-6" />
    </Button>

    <aside 
      className={`
        fixed left-4 top-0
        z-[9998]
        w-40
        h-auto
        max-h-[340px]
        mt-16
        bg-white/95
        border 
        rounded-lg
        p-3
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)]'}
      `}
      role="complementary"
      aria-label="Year selector"
    >
      <h2 className="text-sm font-semibold leading-tight mb-2 text-center">
        New York City<br />Aerial Photography
      </h2>
      <YearWheel />
    </aside>
  </>
)}