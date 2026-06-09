import { useState } from "react"
import { Plus, AlertCircle } from "lucide-react"
import { useGoldRates } from "@/hooks/useGoldRates"
import { useGoldRateForm } from "@/hooks/useGoldRateForm"
import { GoldRateTable } from "@/components/GoldRateTable"
import { GoldRateModal } from "@/components/GoldRateModal"
import { ComplianceTypeSelector } from "@/components/ComplianceTypeSelector"

/**
 * Gold Rates Admin Page
 * 
 * Displays and manages gold rates for different compliance types (arrahnu, conventional).
 * Allows admins to view, add, and delete rates for each gold quality.
 */
export default function GoldRatesPage() {
  const [complianceType, setComplianceType] = useState<string>("arrahnu")
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Fetch rates and qualities
  const { qualities, rates, loading, error: fetchError, setError: _setFetchError, refreshRates, deleteRate } = useGoldRates(complianceType)

  // Form state and submission
  const { formData, error: formError, submitting, handleInputChange, submitForm, resetForm, setError: _setFormError } = useGoldRateForm(complianceType)

  /**
   * Handle form submission and modal close.
   */
  const handleSubmit = async () => {
    const success = await submitForm()
    if (success) {
      setShowModal(false)
      await refreshRates()
      setSuccessMessage("Gold rate added successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  /**
   * Handle rate deletion.
   */
  const handleDeleteRate = async (rateId: string) => {
    const success = await deleteRate(rateId)
    if (success) {
      await refreshRates()
      setSuccessMessage("Gold rate deleted successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  /**
   * Handle modal close and form reset.
   */
  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const usedQualities = rates.map((r) => r.quality_name)

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header with Title and Add Button */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gold Rates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage gold rates by compliance type
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Rate
        </button>
      </div>

      {/* Compliance Type Selector */}
      <ComplianceTypeSelector value={complianceType} onChange={setComplianceType} />

      {/* Error Message */}
      {fetchError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {fetchError}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Rates Table */}
      <GoldRateTable rates={rates} onDelete={handleDeleteRate} />

      {/* Add Rate Modal */}
      <GoldRateModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleInputChange}
        qualities={qualities}
        error={formError}
        submitting={submitting}
        usedQualities={usedQualities}
      />
    </div>
  )
}
