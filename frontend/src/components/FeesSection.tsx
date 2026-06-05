interface FeesSectionProps {
  pledgeChargeFee: number
  pledgeInterestRate: number
  monthlyStgFee: number
  duration: number
  onViewBreakdown: () => void
}

/**
 * Section for displaying fees and interest for a pledge.
 */
export function FeesSection({
  pledgeChargeFee,
  pledgeInterestRate,
  monthlyStgFee,
  duration,
  onViewBreakdown,
}: FeesSectionProps) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Fees & Interest</h2>
        <button
          type="button"
          onClick={onViewBreakdown}
          className="text-sm text-primary hover:underline"
        >
          View Breakdown
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Pledge Charge Fee:</span>
          <span className="font-medium">RM {pledgeChargeFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Interest Rate ({duration} months):</span>
          <span className="font-medium">{pledgeInterestRate.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly Storage Fee:</span>
          <span className="font-medium">RM {monthlyStgFee.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
