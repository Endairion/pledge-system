import { useNavigate } from "react-router-dom"

export default function UnauthorizedPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground">You do not have permission to view this page.</p>
      <button
        onClick={() => navigate(-1)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go back
      </button>
    </div>
  )
}
