import { Search } from "lucide-react"

interface PledgeSearchFormProps {
  search: string
  onSearchChange: (value: string) => void
}

/**
 * Search form component for pledges.
 * 
 * Allows searching by pledge number, customer name, or IC.
 */
export function PledgeSearchForm({ search, onSearchChange }: PledgeSearchFormProps) {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by pledge no, customer name, or IC…"
        className="w-full border rounded-md pl-10 pr-3 py-2 text-sm"
      />
    </div>
  )
}
