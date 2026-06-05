interface Stat {
  label: string
  value: string
  color: string
}

interface StatsGridProps {
  stats: Stat[]
}

/**
 * Grid of stat cards showing today's pledge activity.
 */
export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-lg border p-4 space-y-2">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
