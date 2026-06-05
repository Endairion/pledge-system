import { ChevronDown } from "lucide-react"

interface PledgeStatusFilterProps {
  value: string
  onChange: (status: string) => void
  isOpen: boolean
  onToggle: () => void
  dropdownRef: React.RefObject<HTMLDivElement | null>
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "renewed", label: "Renewed" },
  { value: "redeemed", label: "Redeemed" },
  { value: "auctioned", label: "Auctioned" },
  { value: "forfeited", label: "Forfeited" },
]

/**
 * Custom status dropdown filter for pledges.
 * 
 * Displays filter options for pledge status with visual feedback.
 */
export function PledgeStatusFilter({
  value,
  onChange,
  isOpen,
  onToggle,
  dropdownRef,
}: PledgeStatusFilterProps) {
  const selectedLabel = STATUS_OPTIONS.find(opt => opt.value === value)?.label || "All Statuses"

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-background dark:bg-slate-950 border rounded-md shadow-lg z-50 min-w-max">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                onToggle()
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                value === option.value ? "bg-slate-100 dark:bg-slate-800 font-semibold" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
