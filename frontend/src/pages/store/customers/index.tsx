import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Customer {
  id: string
  name: string
  ic: string
  phone: string
  email: string
  branch: string
  city: string
  created_date: string
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", name: "Ahmad bin Ali", ic: "900101-01-1234", phone: "0123456789", email: "ahmad@email.com", branch: "Kuala Lumpur", city: "Kuala Lumpur", created_date: "2026-05-01" },
  { id: "2", name: "Siti binti Hassan", ic: "850515-05-5678", phone: "0129876543", email: "siti@email.com", branch: "Kuala Lumpur", city: "Shah Alam", created_date: "2026-04-15" },
  { id: "3", name: "Lim Ah Kow", ic: "780220-12-3456", phone: "0117654321", email: "lim@email.com", branch: "Penang", city: "Petaling Jaya", created_date: "2026-03-01" },
  { id: "4", name: "Rajkumar a/l Subramaniam", ic: "920810-14-7890", phone: "0165432109", email: "raj@email.com", branch: "Kuala Lumpur", city: "Subang Jaya", created_date: "2026-05-15" },
  { id: "5", name: "Nur Fatin binti Roslan", ic: "950301-03-2345", phone: "0112345678", email: "fatin@email.com", branch: "Johor Bahru", city: "Klang", created_date: "2026-01-01" },
  { id: "6", name: "Muhammad Iqbal", ic: "880724-08-9012", phone: "0134567890", email: "iqbal@email.com", branch: "Kuala Lumpur", city: "Damansara", created_date: "2026-05-20" },
  { id: "7", name: "Tan Wei Ming", ic: "910315-10-3456", phone: "0156789012", email: "tan@email.com", branch: "Penang", city: "Cyberjaya", created_date: "2025-12-01" },
]

const PAGE_SIZE = 5

export default function StoreCustomers() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  let filtered = MOCK_CUSTOMERS

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.ic.includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q)
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
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Shared across all branches — showing registration branch.</p>
        </div>
        <button 
          onClick={() => navigate("/store/customers/new")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-medium flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Customer
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, IC, phone, or email…"
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
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">IC Number</th>
                <th className="text-left px-4 py-3 font-semibold">Phone</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Registered At</th>
                <th className="text-left px-4 py-3 font-semibold">City</th>
                <th className="text-left px-4 py-3 font-semibold">Joined</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(customer => (
                <tr key={customer.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{customer.ic}</td>
                  <td className="px-4 py-3 text-sm">{customer.phone}</td>
                  <td className="px-4 py-3 text-sm">{customer.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {customer.branch}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{customer.city}</td>
                  <td className="px-4 py-3 text-xs">{customer.created_date}</td>
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
        <span>Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} customers</span>
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
