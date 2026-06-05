import { ChevronLeft, ChevronRight } from "lucide-react"

interface Pledge {
  pledge_no: string
  customer: string
  ic: string
  item_value: number
  loan_amount: number
  status: "active" | "renewed" | "redeemed" | "auctioned" | "forfeited"
  pledged_date: string
  expiry_date: string
}

interface PledgesTableProps {
  pledges: Pledge[]
  page: number
  onPageChange: (page: number) => void
  pageSize: number
  total: number
  onViewPledge: (pledgeNo: string) => void
  statusClasses: Record<string, string>
  statusLabels: Record<string, string>
}

/**
 * Table component for displaying pledges with pagination.
 * 
 * Shows pledge details and provides pagination controls.
 */
export function PledgesTable({
  pledges,
  page,
  onPageChange,
  pageSize,
  total,
  onViewPledge,
  statusClasses,
  statusLabels,
}: PledgesTableProps) {
  const maxPage = Math.ceil(total / pageSize) - 1
  const start = page * pageSize

  return (
    <>
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Pledge No</th>
                <th className="text-left px-4 py-3 font-semibold">Customer</th>
                <th className="text-left px-4 py-3 font-semibold">IC Number</th>
                <th className="text-right px-4 py-3 font-semibold">Item Value</th>
                <th className="text-right px-4 py-3 font-semibold">Loan Amount</th>
                <th className="text-left px-4 py-3 font-semibold w-24">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Pledged</th>
                <th className="text-left px-4 py-3 font-semibold">Expiry</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pledges.map((pledge) => (
                <tr key={pledge.pledge_no} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{pledge.pledge_no}</td>
                  <td className="px-4 py-3">{pledge.customer}</td>
                  <td className="px-4 py-3 font-mono text-xs">{pledge.ic}</td>
                  <td className="px-4 py-3 text-right">RM {pledge.item_value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">RM {pledge.loan_amount.toLocaleString()}</td>
                  <td className="px-4 py-3 w-24">
                    <span
                      className={`inline-block w-20 text-center px-2 py-1 rounded text-xs font-semibold ${
                        statusClasses[pledge.status]
                      }`}
                    >
                      {statusLabels[pledge.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{pledge.pledged_date}</td>
                  <td className="px-4 py-3 text-xs">{pledge.expiry_date}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onViewPledge(pledge.pledge_no)}
                      className="text-primary hover:underline text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {start + 1}–{Math.min(start + pageSize, total)} of {total} pledges
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-1.5 hover:bg-accent disabled:opacity-50 rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>
            Page {page + 1} of {Math.max(1, maxPage + 1)}
          </span>
          <button
            onClick={() => onPageChange(Math.min(maxPage, page + 1))}
            disabled={page >= maxPage}
            className="p-1.5 hover:bg-accent disabled:opacity-50 rounded-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  )
}
