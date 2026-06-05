interface LoanDetailsSectionProps {
  bankPayment: number
  cashPayment: number
  onBankPaymentChange: (value: number) => void
  onCashPaymentChange: (value: number) => void
  totalLoan: number
}

/**
 * Section for loan payment details (bank and cash payments).
 */
export function LoanDetailsSection({
  bankPayment,
  cashPayment,
  onBankPaymentChange,
  onCashPaymentChange,
  totalLoan,
}: LoanDetailsSectionProps) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">Loan Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Bank Payment</label>
          <input
            type="number"
            value={bankPayment}
            onChange={(e) => onBankPaymentChange(parseFloat(e.target.value) || 0)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cash Payment</label>
          <input
            type="number"
            value={cashPayment}
            onChange={(e) => onCashPaymentChange(parseFloat(e.target.value) || 0)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="pt-2 border-t text-right">
        <span className="text-sm text-muted-foreground">Total Loan: </span>
        <span className="font-semibold">RM {totalLoan.toFixed(2)}</span>
      </div>
    </div>
  )
}
