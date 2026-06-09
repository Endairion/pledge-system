import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCheck, AlertTriangle, UserX, ArrowLeft } from "lucide-react"
import api from "@/lib/api"

interface Customer {
  id: string
  customer_no: string
  full_name: string
  id_number: string
  email?: string
  phone?: string
  is_blacklisted?: boolean
  blacklisted_reason?: string
  authorized_loan_limit?: number
}

function normalise(ic: string): string {
  return ic.replace(/[-\s]/g, "")
}

export default function StorePledgesNew() {
  const navigate = useNavigate()
  const [ic, setIc] = useState("")
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [error, setError] = useState<"not-found" | "blacklisted" | null>(null)

  async function handleSearch() {
    setLoading(true)
    setCustomer(null)
    setError(null)

    try {
      const response = await api.get(`/customers/lookup/ic/${ic}`)
      const found = response.data.data
      
      setLoading(false)
      setCustomer(found)
    } catch (err: any) {
      setLoading(false)
      
      // Check if response indicates blacklisted customer
      if (err.response?.status === 403 && err.response?.data?.is_blacklisted) {
        setError("blacklisted")
        return
      }
      
      // Customer not found
      if (err.response?.status === 404) {
        setError("not-found")
        return
      }
      
      // Other errors
      setError("not-found")
    }
  }

  function handleContinue() {
    if (customer) {
      navigate(`/store/pledges/create?customer_id=${customer.id}`)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <button
          onClick={() => navigate("/store/pledges")}
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Customer IC Lookup</h1>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-8">
        {/* Form Card */}
        <div className="bg-card rounded-lg border p-6 space-y-4 max-w-md w-full">
          <div>
            <label className="block text-sm font-medium mb-2">IC Number</label>
            <input
              type="text"
              value={ic}
              onChange={(e) => setIc(e.target.value)}
              placeholder="e.g., 900101-01-1234"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!ic || loading}
            className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* Customer Found Card */}
        {customer && !error && (
          <div className="bg-card rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4 max-w-md w-full mt-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <UserCheck className="h-5 w-5" />
              <span className="font-semibold">Customer Found</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{customer.full_name}</span>
              <span className="text-muted-foreground">IC:</span>
              <span className="font-medium">{customer.id_number}</span>
              {customer.phone && (
                <>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{customer.phone}</span>
                </>
              )}
              {customer.email && (
                <>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{customer.email}</span>
                </>
              )}
              {customer.authorized_loan_limit && (
                <>
                  <span className="text-muted-foreground">Loan Limit:</span>
                  <span className="font-medium">RM {customer.authorized_loan_limit?.toLocaleString()}</span>
                </>
              )}
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-emerald-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-emerald-700"
            >
              Continue to Pledge →
            </button>
          </div>
        )}

        {/* Blacklisted Card */}
        {error === "blacklisted" && (
          <div className="bg-card rounded-lg border border-red-200 dark:border-red-800 p-6 space-y-4 max-w-md w-full mt-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Customer Blacklisted</span>
            </div>
            <p className="text-sm text-muted-foreground">This customer has been blacklisted and cannot create pledges.</p>
          </div>
        )}

        {/* Not Found Card */}
        {error === "not-found" && (
          <div className="bg-card rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4 max-w-md w-full mt-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <UserX className="h-5 w-5" />
              <span className="font-semibold">Customer Not Found</span>
            </div>
            <p className="text-sm text-muted-foreground">No customer found with this IC. Register a new customer first.</p>
            <button className="w-full border rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-accent">
              Register Customer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
