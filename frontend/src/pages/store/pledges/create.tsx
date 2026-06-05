import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useItemForm } from "@/hooks/useItemForm"
import { usePledgeCalculations } from "@/hooks/usePledgeCalculations"
import { ItemsList } from "@/components/ItemsList"
import { LoanDetailsSection } from "@/components/LoanDetailsSection"
import { FeesSection } from "@/components/FeesSection"
import { ItemFormModal } from "@/components/ItemFormModal"
import { InterestBreakdownModal } from "@/components/InterestBreakdownModal"

const DURATIONS = [
  { value: 1, label: "1 Month" },
  { value: 2, label: "2 Months" },
  { value: 3, label: "3 Months" },
  { value: 4, label: "4 Months" },
  { value: 5, label: "5 Months" },
  { value: 6, label: "6 Months" },
]

const MOCK_CUSTOMERS: Record<string, any> = {
  "cust-1": { id: "cust-1", name: "Ahmad bin Ali", ic: "900101-01-1234" },
}

/**
 * Create Pledge Page
 * 
 * Multi-step form for creating a new pledge with items, loan details, and fees.
 */
export default function StorePledgesCreate() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const customer_id = searchParams.get("customer_id") || "cust-1"
  const customer = MOCK_CUSTOMERS[customer_id]

  const itemForm = useItemForm()
  const [bankPayment, setBankPayment] = useState(0)
  const [cashPayment, setCashPayment] = useState(0)
  const [duration, setDuration] = useState(3)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [showItemModal, setShowItemModal] = useState(false)

  const totalLoan = bankPayment + cashPayment
  const calculations = usePledgeCalculations(itemForm.totalItemValue, totalLoan, duration)

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
              <span className="font-medium">{customer?.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">IC</span>
              <span className="font-medium">{customer?.ic}</span>
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

        {/* Duration */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Duration</h2>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
          >
            {DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fees & Interest */}
        <FeesSection
          pledgeChargeFee={calculations.pledgeChargeFee}
          pledgeInterestRate={calculations.pledgeInterestRate}
          monthlyStgFee={calculations.monthlyStgFee}
          duration={duration}
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
        duration={duration}
        totalLoan={totalLoan}
        monthlyRates={calculations.interestRates}
        onClose={() => setShowInterestModal(false)}
      />
    </div>
  )
}
