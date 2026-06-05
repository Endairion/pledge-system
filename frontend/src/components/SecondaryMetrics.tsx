interface SecondaryMetricsProps {
  expiringCount: number
  totalLoanValue: number
  avgPledgeValue: number
}

/**
 * Secondary metrics cards for dashboard.
 */
export function SecondaryMetrics({
  expiringCount,
  totalLoanValue,
  avgPledgeValue,
}: SecondaryMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-lg border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Expiring Soon</p>
        <p className="text-2xl font-bold">{expiringCount}</p>
        <p className="text-xs text-amber-600">Next 14 days</p>
      </div>
      <div className="bg-card rounded-lg border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Total Loan Value</p>
        <p className="text-2xl font-bold">RM {totalLoanValue.toLocaleString()}</p>
        <p className="text-xs text-slate-500">In circulation</p>
      </div>
      <div className="bg-card rounded-lg border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Avg Pledge Value</p>
        <p className="text-2xl font-bold">RM {avgPledgeValue.toLocaleString()}</p>
        <p className="text-xs text-slate-500">Per pledge</p>
      </div>
    </div>
  )
}
