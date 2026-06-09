import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import api from "@/lib/api"
import { useItemForm } from "@/hooks/useItemForm"
import { usePledgeCalculations } from "@/hooks/usePledgeCalculations"
import { ItemsList } from "@/components/ItemsList"
import { LoanDetailsSection } from "@/components/LoanDetailsSection"
import { FeesSection } from "@/components/FeesSection"
import { ItemFormModal } from "@/components/ItemFormModal"
import { InterestBreakdownModal } from "@/components/InterestBreakdownModal"

interface Customer {
  id: string
  customer_no: string
  full_name: string
  id_number: string
  authorized_loan_limit: number
}

interface PledgeConfig {
  duration: number
  monthly_rates: Record<string, string>
  compliance_type: string
}

/**
 * Create Pledge Page
 * 
 * Multi-step form for creating a new pledge with items, loan details, and fees.
 */
export default function StorePledgesCreate() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const customer_id = searchParams.get("customer_id")
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [customerLoading, setCustomerLoading] = useState(!!customer_id)
  const [pledgeConfig, setPledgeConfig] = useState<PledgeConfig | null>(null)

  useEffect(() => {
    if (customer_id) {
      const fetchCustomerAndConfig = async () => {
        try {
          // Fetch complete configuration for customer
          const configResponse = await api.get(`/pledges/config/${customer_id}`)
          const config = configResponse.data.data
          setPledgeConfig({
            duration: config.duration,
            monthly_rates: config.monthly_rates,
            compliance_type: config.compliance_type,
          })
          
          // Fetch customer details
          const customerResponse = await api.get(`/customers/${customer_id}`)
          setCustomer(customerResponse.data.data)
        } catch (err) {
          console.error("Failed to load customer or config:", err)
          // Use defaults on error
          setPledgeConfig({
            duration: 8,
            monthly_rates: {
              "1": "1.5",
              "2": "2",
              "3": "2",
              "4": "2",
              "5": "2",
              "6": "2",
              "7": "2",
              "8": "2",
            },
            compliance_type: "conventional",
          })
        } finally {
          setCustomerLoading(false)
        }
      }
      fetchCustomerAndConfig()
    } else {
      setCustomerLoading(false)
    }
  }, [customer_id])

  const itemForm = useItemForm()
  const [bankPayment, setBankPayment] = useState(0)
  const [cashPayment, setCashPayment] = useState(0)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [showItemModal, setShowItemModal] = useState(false)

  const totalLoan = bankPayment + cashPayment
  // Use fetched pledge configuration with monthly rates
  const pledgeDuration = pledgeConfig?.duration || 8
  const monthlyRates = pledgeConfig?.monthly_rates
  const calculations = usePledgeCalculations(itemForm.totalItemValue, totalLoan, pledgeDuration, monthlyRates)

  async function handleSubmit() {
    if (itemForm.items.length === 0) {
      alert("Add at least one pledge item")
      return
    }
    if (totalLoan === 0) {
      alert("Loan amount must be greater than 0")
      return
    }

    setSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))
    navigate("/store/pledges")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/store/pledges/new")}
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Create Pledge</h1>
      </div>

      {customerLoading && (
        <div className="bg-card border rounded-lg p-6">
          <p className="text-muted-foreground">Loading customer information...</p>
        </div>
      )}

      {!customerLoading && !customer && (
        <div className="bg-card border border-destructive rounded-lg p-6">
          <p className="text-destructive">No customer selected. Please select a customer first.</p>
        </div>
      )}

      {!customerLoading && customer && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-6"
        >
          {/* Customer Info */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Name</span>
                <span className="font-medium">{customer.full_name}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">IC</span>
                <span className="font-medium">{customer.id_number}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Loan Limit</span>
                <span className="font-medium">RM {customer.authorized_loan_limit?.toLocaleString()}</span>
              </div>
            </div>
          </div>

        {/* Pledge Items */}
        <ItemsList
          items={itemForm.items}
          totalValue={itemForm.totalItemValue}
          onAddClick={() => {
            itemForm.addItem()
            setShowItemModal(true)
          }}
          onEditClick={(key) => {
            itemForm.editItem(key)
            setShowItemModal(true)
          }}
          onDeleteClick={itemForm.removeItem}
        />

        {/* Loan Details */}
        <LoanDetailsSection
          bankPayment={bankPayment}
          cashPayment={cashPayment}
          onBankPaymentChange={setBankPayment}
          onCashPaymentChange={setCashPayment}
          totalLoan={totalLoan}
        />

        {/* Fees & Interest */}
        <FeesSection
          pledgeChargeFee={calculations.pledgeChargeFee}
          pledgeInterestRate={calculations.pledgeInterestRate}
          monthlyStgFee={calculations.monthlyStgFee}
          duration={pledgeDuration}
          onViewBreakdown={() => setShowInterestModal(true)}
        />

        {/* Remarks */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <label className="block text-sm font-medium">Remarks</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes..."
            className="w-full border rounded-md px-3 py-2 text-sm h-20"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? "Creating Pledge…" : "Create Pledge"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/store/pledges")}
            className="flex-1 border rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      </form>
      )}

      {/* Item Form Modal */}
      <ItemFormModal
        isOpen={showItemModal}
        item={itemForm.modalItem}
        isEditing={itemForm.editingKey !== null}
        onItemChange={itemForm.setModalItem}
        onSave={() => {
          itemForm.saveItem()
          setShowItemModal(false)
        }}
        onClose={() => setShowItemModal(false)}
      />

      {/* Interest Breakdown Modal */}
      <InterestBreakdownModal
        isOpen={showInterestModal}
        duration={pledgeDuration}
        totalLoan={totalLoan}
        monthlyRates={calculations.interestRates}
        onClose={() => setShowInterestModal(false)}
      />
    </div>
  )
}
