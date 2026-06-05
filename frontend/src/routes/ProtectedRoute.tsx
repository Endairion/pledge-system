import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

type Portal = "store" | "admin" | "analytics"

interface Props {
  portal?: Portal
}

export function ProtectedRoute({ portal }: Props) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading…</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (portal === "store" && !user.can_access_store) return <Navigate to="/unauthorized" replace />
  if (portal === "admin" && !user.can_access_admin) return <Navigate to="/unauthorized" replace />
  if (portal === "analytics" && !user.can_access_analytics) return <Navigate to="/unauthorized" replace />

  return <Outlet />
}
