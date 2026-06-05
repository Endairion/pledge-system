import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface Redemption {
  id: string
  pledge_no: string
  customer: string
  loan_amount: number
  amount_redeemed: number
  date: string
}

const MOCK_REDEMPTIONS: Redemption[] = [
  { id: "1", pledge_no: "KDE-2026-00003", customer: "Lim Ah Kow", loan_amount: 2100, amount_redeemed: 2100, date: "2026-05-21" },
  { id: "2", pledge_no: "KDE-2026-00004", customer: "Rajkumar a/l Subramaniam", loan_amount: 8400, amount_redeemed: 8400, date: "2026-05-19" },
  { id: "3", pledge_no: "KDE-2026-00001", customer: "Ahmad bin Ali", loan_amount: 3500, amount_redeemed: 3500, date: "2026-05-17" },
  { id: "4", pledge_no: "KDE-2026-00006", customer: "Muhammad Iqbal", loan_amount: 2940, amount_redeemed: 2940, date: "2026-05-12" },
  { id: "5", pledge_no: "KDE-2026-00002", customer: "Siti binti Hassan", loan_amount: 5600, amount_redeemed: 5600, date: "2026-05-08" },
  { id: "6", pledge_no: "KDE-2026-00005", customer: "Nur Fatin binti Roslan", loan_amount: 4550, amount_redeemed: 4550, date: "2026-04-25" },
  { id: "7", pledge_no: "KDE-2026-00007", customer: "Tan Wei Ming", loan_amount: 5460, amount_redeemed: 5460, date: "2026-04-10" },
]

const PAGE_SIZE = 5

export default function StoreRedemptions() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  let filtered = MOCK_REDEMPTIONS

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(r =>
      r.pledge_no.toLowerCase().includes(q) ||
      r.customer.toLowerCase().includes(q)
    )
  }

  const total = filtered.length
  const maxPage = Math.ceil(total / PAGE_SIZE) - 1
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Redemptions</h1>
          <p className="text-muted-foreground">Track and manage pledge redemptions.</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-medium flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Redemption
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by pledge no or customer name…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-background"
          />
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Pledge No</th>
                <th className="text-left px-4 py-3 font-semibold">Customer</th>
                <th className="text-right px-4 py-3 font-semibold">Loan Amount</th>
                <th className="text-right px-4 py-3 font-semibold">Amount Redeemed</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(redemption => (
                <tr key={redemption.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{redemption.pledge_no}</td>
                  <td className="px-4 py-3">{redemption.customer}</td>
                  <td className="px-4 py-3 text-right">RM {redemption.loan_amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-600">RM {redemption.amount_redeemed.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs">{redemption.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-primary hover:underline text-xs font-medium">
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
        <span>Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} redemptions</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-1.5 hover:bg-accent disabled:opacity-50 rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>Page {page + 1} of {Math.max(1, maxPage + 1)}</span>
          <button
            onClick={() => setPage(Math.min(maxPage, page + 1))}
            disabled={page === maxPage}
            className="p-1.5 hover:bg-accent disabled:opacity-50 rounded-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
