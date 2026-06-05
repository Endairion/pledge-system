interface Activity {
  id: string
  customer: string
  action: "created" | "renewed" | "redeemed"
  pledgeNo: string
  amount: number
  time: string
}

interface RecentActivityTableProps {
  activities: Activity[]
  getActionColor: (action: string) => string
  getActionLabel: (action: string) => string
}

/**
 * Table showing recent pledge activities.
 */
export function RecentActivityTable({
  activities,
  getActionColor,
  getActionLabel,
}: RecentActivityTableProps) {
  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Recent Activity</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
              <th className="px-4 py-3 text-left font-medium">Pledge No</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b hover:bg-muted/30">
                <td className="px-4 py-3">{activity.customer}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-20 text-center px-2 py-1 rounded text-xs font-medium ${getActionColor(
                      activity.action
                    )}`}
                  >
                    {getActionLabel(activity.action)}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{activity.pledgeNo}</td>
                <td className="px-4 py-3 text-right font-medium">
                  RM {activity.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
