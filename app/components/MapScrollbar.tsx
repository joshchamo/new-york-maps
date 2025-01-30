import { Dispatch, SetStateAction } from 'react'

interface MapScrollbarProps {
  years: string[]
  selectedYear: string
  setSelectedYear: Dispatch<SetStateAction<string>>
}

export default function MapScrollbar({
  years,
  selectedYear,
  setSelectedYear
}: MapScrollbarProps) {
  return (
    <nav 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-full mx-auto px-4"
      role="navigation"
      aria-label="Historical map years"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-2 transition-opacity hover:opacity-100">
        <div 
          className="flex gap-2 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-orientation="horizontal"
        >
          {years.map((year) => (
            <button
              key={year}
              role="tab"
              aria-selected={year === selectedYear}
              aria-controls={`map-${year}`}
              onClick={() => setSelectedYear(year)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                ${year === selectedYear 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}