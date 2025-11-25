"use client"

import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex-1 relative max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-10 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
