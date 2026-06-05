import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Customer {
  name: string
  ic: string
  phone: string
  email: string
  branch: string
  city: string
  created_date: string
}

const MOCK_CUSTOMERS: Customer[] = [
  { name: "Ahmad bin Ali", ic: "900101-01-1234", phone: "012-345-6789", email: "ahmad@example.com", branch: "Kuala Lumpur", city: "Kuala Lumpur", created_date: "2026-05-01" },
  { name: "Siti binti Hassan", ic: "850515-05-5678", phone: "013-456-7890", email: "siti@example.com", branch: "Penang", city: "Penang", created_date: "2026-04-15" },
  { name: "Lim Ah Kow", ic: "780220-12-3456", phone: "014-567-8901", email: "lim@example.com", branch: "Johor Bahru", city: "Johor Bahru", created_date: "2026-03-01" },
  { name: "Rajkumar a/l Subramaniam", ic: "920810-14-7890", phone: "015-678-9012", email: "raj@example.com", branch: "Kuala Lumpur", city: "Selangor", created_date: "2026-05-15" },
  { name: "Nur Fatin binti Roslan", ic: "950301-03-2345", phone: "016-789-0123", email: "fatin@example.com", branch: "Penang", city: "Penang", created_date: "2026-01-01" },
  { name: "Muhammad Iqbal", ic: "880724-08-9012", phone: "017-890-1234", email: "iqbal@example.com", branch: "Kuala Lumpur", city: "Kuala Lumpur", created_date: "2026-05-20" },
  { name: "Tan Wei Ming", ic: "910315-10-3456", phone: "018-901-2345", email: "tan@example.com", branch: "Johor Bahru", city: "Johor Bahru", created_date: "2025-12-01" },
  { name: "Wong Mei Ling", ic: "940525-11-2468", phone: "019-012-3456", email: "wong@example.com", branch: "Penang", city: "Penang", created_date: "2026-02-10" },
  { name: "Aziz bin Ahmad", ic: "870815-06-1357", phone: "012-123-4567", email: "aziz@example.com", branch: "Kuala Lumpur", city: "Selangor", created_date: "2026-03-20" },
  { name: "Chong Yee Leng", ic: "930405-14-9876", phone: "013-234-5678", email: "chong@example.com", branch: "Johor Bahru", city: "Johor Bahru", created_date: "2026-04-05" },
]

const PAGE_SIZE = 10

export default function AdminCustomers() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  const filtered = MOCK_CUSTOMERS.filter((c) => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(s) ||
      c.ic.includes(s) ||
      c.phone.includes(s) ||
      c.email.toLowerCase().includes(s) ||
      c.branch.toLowerCase().includes(s) ||
      c.city.toLowerCase().includes(s)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All customers (shared across branches) — showing registration branch
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, IC, phone, email, branch, or city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">IC</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Registered At</th>
                <th className="px-4 py-3 text-left font-medium">City</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No customers found
                  </td>
                </tr>
              ) : (
                paginated.map((customer) => (
                  <tr key={customer.ic} className="hover:bg-muted/50">
                    <td className="px-4 py-3">{customer.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{customer.ic}</td>
                    <td className="px-4 py-3">{customer.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {customer.branch}
                      </span>
                    </td>
                    <td className="px-4 py-3">{customer.city}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.created_date}</td>
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
