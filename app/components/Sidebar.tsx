import type { Dispatch, SetStateAction } from "react"
import { Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedYear: string
  setSelectedYear: Dispatch<SetStateAction<string>>
  aerialMaps: Record<string, string>
}

export default function Sidebar({ isOpen, setIsOpen, selectedYear, setSelectedYear, aerialMaps }: SidebarProps) {
  const isMobile = useIsMobile()

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const MenuContent = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight">NYC Aerial Photos</h2>
      </div>
      <div className="space-y-2">
        <label htmlFor="year-select" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Select Year
        </label>
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger id="year-select" className="w-full bg-background">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent
            className="z-[9999] bg-popover/95 backdrop-blur-sm border-2"
            position="popper"
            sideOffset={4}
          >
            {Object.keys(aerialMaps).map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="text-sm font-medium transition-colors hover:bg-accent focus:bg-accent text-foreground"
              >
                {year} Aerial Photography
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground">
        View historical aerial photography of New York City from different years.
      </p>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} className="z-[10000]">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-background/98 z-[10001]">
          <SheetHeader>
            <SheetTitle>
              <MenuContent />
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-[9997] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      {isOpen && (
        <div
          className="fixed top-16 left-4 z-[9998] w-80 rounded-lg border-2 bg-background/98 p-6 shadow-lg backdrop-blur-sm animate-in slide-in-from-left-1/2"
          role="dialog"
          aria-label="Map Year Selection"
        >
          <MenuContent />
        </div>
      )}
    </>
  )
}