import { X } from "lucide-react"

interface InterestBreakdownModalProps {
  isOpen: boolean
  duration: number
  totalLoan: number
  monthlyRates: Array<{ month: number; rate: number }>
  onClose: () => void
}

/**
 * Modal displaying interest rate breakdown by month.
 */
export function InterestBreakdownModal({
  isOpen,
  duration,
  totalLoan,
  monthlyRates,
  onClose,
}: InterestBreakdownModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-md space-y-4">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Interest Rate Breakdown</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-2 py-2">Month</th>
                <th className="text-left px-2 py-2">Rate %</th>
                <th className="text-right px-2 py-2">Fee RM</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRates.slice(0, duration).map((row) => (
                <tr key={row.month} className="border-b">
                  <td className="px-2 py-2">{row.month}</td>
                  <td className="px-2 py-2">{row.rate.toFixed(1)}%</td>
                  <td className="px-2 py-2 text-right">RM {(totalLoan * (row.rate / 100)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
