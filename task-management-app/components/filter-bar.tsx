"use client"

import { Button } from "@/components/ui/button"

interface FilterBarProps {
  activeFilter: string
  onFilterChange: (filter: "all" | "completed" | "pending" | "high" | "medium" | "low") => void
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { id: "all", label: "All Tasks" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
    { id: "high", label: "High Priority" },
    { id: "medium", label: "Medium Priority" },
    { id: "low", label: "Low Priority" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id as any)}
          className="text-sm"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
