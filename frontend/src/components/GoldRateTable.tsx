import { Trash2 } from "lucide-react"
import type { RateDisplay } from "@/hooks/useGoldRates"

interface GoldRateTableProps {
  rates: RateDisplay[]
  onDelete: (rateId: string) => Promise<void>
}

/**
 * Component for displaying gold rates in a table format.
 * 
 * Shows quality name, min/max rates, date added, and delete action for each rate.
 */
export function GoldRateTable({ rates, onDelete }: GoldRateTableProps) {
  const handleDeleteClick = async (rateId: string) => {
    if (!confirm("Are you sure you want to delete this gold rate?")) return
    await onDelete(rateId)
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Quality</th>
              <th className="px-4 py-3 text-left font-medium">Min Rate</th>
              <th className="px-4 py-3 text-left font-medium">Max Rate</th>
              <th className="px-4 py-3 text-left font-medium">Date Added</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rates.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No gold rates configured yet
                </td>
              </tr>
            ) : (
              rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{rate.quality_name}</td>
                  <td className="px-4 py-3">RM {Number(rate.min_rate).toFixed(2)}</td>
                  <td className="px-4 py-3">RM {Number(rate.max_rate).toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {rate.created_at ? new Date(rate.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDeleteClick(rate.id)}
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
