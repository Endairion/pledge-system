import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Pledge {
  pledge_no: string
  customer: string
  ic: string
  branch: string
  item_value: number
  loan_amount: number
  status: "active" | "renewed" | "redeemed" | "auctioned" | "forfeited"
  pledged_date: string
  expiry_date: string
}

const MOCK_PLEDGES: Pledge[] = [
  { pledge_no: "KDE-2026-00001", customer: "Ahmad bin Ali", ic: "900101-01-1234", branch: "Kuala Lumpur", item_value: 5000, loan_amount: 3500, status: "active", pledged_date: "2026-05-01", expiry_date: "2026-08-01" },
  { pledge_no: "KDE-2026-00002", customer: "Siti binti Hassan", ic: "850515-05-5678", branch: "Penang", item_value: 8000, loan_amount: 5600, status: "renewed", pledged_date: "2026-04-15", expiry_date: "2026-07-15" },
  { pledge_no: "KDE-2026-00003", customer: "Lim Ah Kow", ic: "780220-12-3456", branch: "Johor Bahru", item_value: 3000, loan_amount: 2100, status: "redeemed", pledged_date: "2026-03-01", expiry_date: "2026-06-01" },
  { pledge_no: "KDE-2026-00004", customer: "Rajkumar a/l Subramaniam", ic: "920810-14-7890", branch: "Kuala Lumpur", item_value: 12000, loan_amount: 8400, status: "active", pledged_date: "2026-05-15", expiry_date: "2026-08-15" },
  { pledge_no: "KDE-2026-00005", customer: "Nur Fatin binti Roslan", ic: "950301-03-2345", branch: "Penang", item_value: 6500, loan_amount: 4550, status: "auctioned", pledged_date: "2026-01-01", expiry_date: "2026-04-01" },
  { pledge_no: "KDE-2026-00006", customer: "Muhammad Iqbal", ic: "880724-08-9012", branch: "Kuala Lumpur", item_value: 4200, loan_amount: 2940, status: "active", pledged_date: "2026-05-20", expiry_date: "2026-08-20" },
  { pledge_no: "KDE-2026-00007", customer: "Tan Wei Ming", ic: "910315-10-3456", branch: "Johor Bahru", item_value: 7800, loan_amount: 5460, status: "forfeited", pledged_date: "2025-12-01", expiry_date: "2026-03-01" },
  { pledge_no: "PNG-2026-00001", customer: "Wong Mei Ling", ic: "940525-11-2468", branch: "Penang", item_value: 9500, loan_amount: 6650, status: "active", pledged_date: "2026-05-10", expiry_date: "2026-08-10" },
  { pledge_no: "JHR-2026-00001", customer: "Aziz bin Ahmad", ic: "870815-06-1357", branch: "Johor Bahru", item_value: 5500, loan_amount: 3850, status: "renewed", pledged_date: "2026-04-20", expiry_date: "2026-07-20" },
  { pledge_no: "KDE-2026-00008", customer: "Chong Yee Leng", ic: "930405-14-9876", branch: "Kuala Lumpur", item_value: 7200, loan_amount: 5040, status: "active", pledged_date: "2026-05-25", expiry_date: "2026-08-25" },
]

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  renewed: "Renewed",
  redeemed: "Redeemed",
  auctioned: "Auctioned",
  forfeited: "Forfeited",
}

const STATUS_CLASS: Record<string, string> = {
  active: "bg-emerald-700 text-white dark:bg-emerald-600 dark:text-white",
  renewed: "bg-blue-700 text-white dark:bg-blue-600 dark:text-white",
  redeemed: "bg-slate-700 text-white dark:bg-slate-600 dark:text-white",
  auctioned: "bg-amber-700 text-white dark:bg-amber-600 dark:text-white",
  forfeited: "bg-red-700 text-white dark:bg-red-600 dark:text-white",
}

const PAGE_SIZE = 10

export default function AdminPledges() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)

  const filtered = MOCK_PLEDGES.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (!search) return true
    const s = search.toLowerCase()
    return (
      p.pledge_no.toLowerCase().includes(s) ||
      p.customer.toLowerCase().includes(s) ||
      p.ic.includes(s) ||
      p.branch.toLowerCase().includes(s)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Pledges</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pledges across all branches
        </p>
      </div>

      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by pledge number, customer, IC, or branch..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(0)
          }}
          className="h-10 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="renewed">Renewed</option>
          <option value="redeemed">Redeemed</option>
          <option value="auctioned">Auctioned</option>
          <option value="forfeited">Forfeited</option>
        </select>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Pledge No</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">IC</th>
                <th className="px-4 py-3 text-left font-medium">Branch</th>
                <th className="px-4 py-3 text-right font-medium">Item Value</th>
                <th className="px-4 py-3 text-right font-medium">Loan</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Pledged</th>
                <th className="px-4 py-3 text-left font-medium">Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    No pledges found
                  </td>
                </tr>
              ) : (
                paginated.map((pledge) => (
                  <tr key={pledge.pledge_no} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono text-xs font-medium">{pledge.pledge_no}</td>
                    <td className="px-4 py-3">{pledge.customer}</td>
                    <td className="px-4 py-3 font-mono text-xs">{pledge.ic}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {pledge.branch}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">RM {pledge.item_value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-medium">RM {pledge.loan_amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block w-20 rounded-md px-2 py-1 text-center text-xs font-medium ${STATUS_CLASS[pledge.status]}`}>
                        {STATUS_LABEL[pledge.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{pledge.pledged_date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pledge.expiry_date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
