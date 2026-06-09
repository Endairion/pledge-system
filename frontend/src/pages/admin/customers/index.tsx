import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "@/lib/api"

interface Customer {
  id: string
  full_name: string
  id_number: string
  phone: string
  email: string
  branch: { name: string; id: string }
  address: string
  created_at: string
  is_active: boolean
}

const PAGE_SIZE = 10

export default function AdminCustomers() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/customers')
      
      if (response.data?.data?.data) {
        setCustomers(response.data.data.data)
        setTotalCount(response.data.data.total || response.data.data.data.length)
      } else if (response.data?.data) {
        const data = response.data.data
        setCustomers(Array.isArray(data) ? data : [])
        setTotalCount(Array.isArray(data) ? data.length : 0)
      }
    } catch (err: any) {
      console.error('Error fetching customers:', err)
      setError('Failed to load customers')
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  let filtered = customers

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(c =>
      c.full_name.toLowerCase().includes(q) ||
      c.id_number.includes(q) ||
      (c.phone && c.phone.includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.branch?.name?.toLowerCase().includes(q)
    )
  }

  const total = filtered.length
  const maxPage = Math.ceil(total / PAGE_SIZE) - 1
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Customers</h1>
          <p className="text-muted-foreground">All customers across all branches</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, IC, phone, email, or branch…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-background"
          />
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-card border rounded-lg overflow-hidden p-8 text-center">
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      ) : (
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">ID Number</th>
                <th className="text-left px-4 py-3 font-semibold">Phone</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Branch</th>
                <th className="text-left px-4 py-3 font-semibold">Address</th>
                <th className="text-left px-4 py-3 font-semibold">Joined</th>
                <th className="text-center px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map(customer => (
                  <tr key={customer.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{customer.full_name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{customer.id_number}</td>
                    <td className="px-4 py-3 text-sm">{customer.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm">{customer.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {customer.branch?.name || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-xs">{customer.address || '-'}</td>
                    <td className="px-4 py-3 text-xs">{new Date(customer.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => navigate(`/admin/customers/${customer.id}`)}
                        className="text-primary hover:underline text-xs font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {!loading && (
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
      )}
    </div>
  )
}
