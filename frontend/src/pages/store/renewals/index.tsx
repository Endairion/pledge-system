import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface Renewal {
  id: string
  pledge_no: string
  customer: string
  item_value: number
  current_loan: number
  renewal_amount: number
  date: string
}

const MOCK_RENEWALS: Renewal[] = [
  { id: "1", pledge_no: "KDE-2026-00002", customer: "Siti binti Hassan", item_value: 8000, current_loan: 5600, renewal_amount: 5600, date: "2026-05-20" },
  { id: "2", pledge_no: "KDE-2026-00001", customer: "Ahmad bin Ali", item_value: 5000, current_loan: 3500, renewal_amount: 3500, date: "2026-05-18" },
  { id: "3", pledge_no: "KDE-2026-00004", customer: "Rajkumar a/l Subramaniam", item_value: 12000, current_loan: 8400, renewal_amount: 8400, date: "2026-05-15" },
  { id: "4", pledge_no: "KDE-2026-00006", customer: "Muhammad Iqbal", item_value: 4200, current_loan: 2940, renewal_amount: 2940, date: "2026-05-10" },
  { id: "5", pledge_no: "KDE-2026-00003", customer: "Lim Ah Kow", item_value: 3000, current_loan: 2100, renewal_amount: 2100, date: "2026-05-05" },
  { id: "6", pledge_no: "KDE-2026-00005", customer: "Nur Fatin binti Roslan", item_value: 6500, current_loan: 4550, renewal_amount: 4550, date: "2026-04-28" },
  { id: "7", pledge_no: "KDE-2026-00007", customer: "Tan Wei Ming", item_value: 7800, current_loan: 5460, renewal_amount: 5460, date: "2026-04-15" },
]

const PAGE_SIZE = 5

export default function StoreRenewals() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  let filtered = MOCK_RENEWALS

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
          <h1 className="text-2xl font-bold">Renewals</h1>
          <p className="text-muted-foreground">Manage and process pledge renewals.</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-medium flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Renewal
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
                <th className="text-right px-4 py-3 font-semibold">Item Value</th>
                <th className="text-right px-4 py-3 font-semibold">Current Loan</th>
                <th className="text-right px-4 py-3 font-semibold">Renewal Amount</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(renewal => (
                <tr key={renewal.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{renewal.pledge_no}</td>
                  <td className="px-4 py-3">{renewal.customer}</td>
                  <td className="px-4 py-3 text-right">RM {renewal.item_value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">RM {renewal.current_loan.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">RM {renewal.renewal_amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs">{renewal.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-primary hover:underline text-xs font-medium">
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} renewals</span>
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
