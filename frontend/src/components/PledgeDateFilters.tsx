import { ChevronDown } from "lucide-react"

interface PledgeDateFiltersProps {
  pledgeFromDate: string
  pledgeToDate: string
  expiryFromDate: string
  expiryToDate: string
  onPledgeFromChange: (date: string) => void
  onPledgeToChange: (date: string) => void
  onExpiryFromChange: (date: string) => void
  onExpiryToChange: (date: string) => void
  isOpen: boolean
  onToggle: () => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

/**
 * Advanced date range filters for pledges.
 * 
 * Allows filtering by pledge date range and expiry date range.
 */
export function PledgeDateFilters({
  pledgeFromDate,
  pledgeToDate,
  expiryFromDate,
  expiryToDate,
  onPledgeFromChange,
  onPledgeToChange,
  onExpiryFromChange,
  onExpiryToChange,
  isOpen,
  onToggle,
  hasActiveFilters,
  onClearFilters,
}: PledgeDateFiltersProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          hasActiveFilters
            ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
            : "hover:bg-accent"
        }`}
      >
        <span>Advanced</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pledge Date Range */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Pledge Date Range</h3>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">From</label>
                  <input
                    type="date"
                    value={pledgeFromDate}
                    onChange={(e) => onPledgeFromChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">To</label>
                  <input
                    type="date"
                    value={pledgeToDate}
                    onChange={(e) => onPledgeToChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Expiry Date Range */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Expiry Date Range</h3>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">From</label>
                  <input
                    type="date"
                    value={expiryFromDate}
                    onChange={(e) => onExpiryFromChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">To</label>
                  <input
                    type="date"
                    value={expiryToDate}
                    onChange={(e) => onExpiryToChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-2 border-t">
              <button
                onClick={onClearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Clear all date filters
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
