interface ComplianceTypeSelectorProps {
  value: string
  onChange: (type: string) => void
}

const COMPLIANCE_TYPES = ["arrahnu", "conventional"]

/**
 * Component for selecting compliance type (arrahnu or conventional).
 * 
 * Displays a dropdown selector for filtering gold rates by compliance type.
 */
export function ComplianceTypeSelector({ value, onChange }: ComplianceTypeSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="compliance-type" className="block text-sm font-medium mb-2">
        Compliance Type
      </label>
      <select
        id="compliance-type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-48 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {COMPLIANCE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
