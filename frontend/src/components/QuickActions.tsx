import { Plus, RotateCcw, TrendingDown, Eye } from "lucide-react"

interface QuickActionsProps {
  onCreatePledge: () => void
  onViewAll: () => void
}

/**
 * Quick action buttons for store dashboard.
 */
export function QuickActions({ onCreatePledge, onViewAll }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onClick={onCreatePledge}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        <span>Create Pledge</span>
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2">
        <RotateCcw className="h-5 w-5" />
        <span>Renew Pledge</span>
      </button>
      <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2">
        <TrendingDown className="h-5 w-5" />
        <span>Redeem Pledge</span>
      </button>
      <button
        onClick={onViewAll}
        className="bg-slate-600 hover:bg-slate-700 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2"
      >
        <Eye className="h-5 w-5" />
        <span>View All</span>
      </button>
    </div>
  )
}
