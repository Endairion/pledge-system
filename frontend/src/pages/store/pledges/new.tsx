import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCheck, AlertTriangle, UserX, ArrowLeft } from "lucide-react"

interface Customer {
  id: string
  name: string
  ic: string
  email?: string
  phone?: string
  isBlacklisted?: boolean
}

const MOCK_DB: Record<string, Customer> = {
  "9001011234": { id: "cust-1", name: "Ahmad bin Ali", ic: "900101-01-1234", email: "ahmad@example.com", phone: "012-345-6789" },
  "8505155678": { id: "cust-2", name: "Siti binti Hassan", ic: "850515-05-5678", email: "siti@example.com", phone: "013-456-7890" },
  "7802203456": { id: "cust-3", name: "Lim Ah Kow", ic: "780220-12-3456", isBlacklisted: true },
  "9208107890": { id: "cust-4", name: "Rajkumar a/l Subramaniam", ic: "920810-14-7890", email: "raj@example.com" },
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))

    const normalized = normalise(ic)
    const found = MOCK_DB[normalized]

    setLoading(false)

    if (!found) {
      setError("not-found")
      return
    }

    if (found.isBlacklisted) {
      setError("blacklisted")
      return
    }

    setCustomer(found)
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
              <span className="font-medium">{customer.name}</span>
              <span className="text-muted-foreground">IC:</span>
              <span className="font-medium">{customer.ic}</span>
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
