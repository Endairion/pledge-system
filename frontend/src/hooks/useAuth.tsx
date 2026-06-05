import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { User } from "@/types"
import api from "@/lib/api"

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [isLoading, setIsLoading] = useState(true)
  const tokenLoadedRef = useRef<string | null>(null)  // Use ref to avoid triggering re-renders

  useEffect(() => {
    // Only fetch if we have a token and haven't loaded this token yet
    if (token && token !== tokenLoadedRef.current) {
      tokenLoadedRef.current = token  // Mark as loading immediately
      setIsLoading(true)
      
      api.get<{ data: User }>("/auth/me")
        .then((res) => {
          setUser(res.data.data)
        })
        .catch(() => {
          setToken(null)
          setUser(null)
          tokenLoadedRef.current = null
          localStorage.removeItem("token")
        })
        .finally(() => setIsLoading(false))
    } else if (!token) {
      setUser(null)
      setIsLoading(false)
      tokenLoadedRef.current = null
    }
  }, [token])

  async function login(username: string, password: string): Promise<User> {
    const res = await api.post<{ data: { token: string; user: User } }>("/auth/login", {
      username,
      password,
    })
    const { token: newToken, user: newUser } = res.data.data
    
    // Store token and use window.location.href to fully reload the app
    // This ensures the AuthProvider re-initializes with the token from localStorage
    localStorage.setItem("token", newToken)
    window.location.href = newUser.roles.sort((a, b) => b.priority - a.priority)[0]?.default_redirect ?? "/store"
    
    // Return user even though we're about to reload (for TypeScript)
    return newUser
  }

  async function logout() {
    await api.post("/auth/logout").catch(() => {})
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

/**
 * Helper hook to check if user can access specific portal
 * 
 * Usage:
 *   const canAccessAdmin = useCanAccess('admin')
 *   if (canAccessAdmin) { return <AdminLayout /> }
 */
export function useCanAccess(portal: 'admin' | 'store' | 'analytics'): boolean {
  const { user } = useAuth()
  if (!user) return false

  switch (portal) {
    case 'admin':
      return user.can_access_admin
    case 'store':
      return user.can_access_store
    case 'analytics':
      return user.can_access_analytics
    default:
      return false
  }
}

/**
 * Helper hook to check if user is super admin
 */
export function useIsSuperAdmin(): boolean {
  const { user } = useAuth()
  if (!user) return false
  return user.roles.some((r) => r.name === 'super_admin')
}

/**
 * Helper hook to check if user has specific role
 * 
 * Usage:
 *   const isBranchAdmin = useHasRole('branch_admin')
 */
export function useHasRole(roleName: string): boolean {
  const { user } = useAuth()
  if (!user) return false
  return user.roles.some((r) => r.name === roleName)
}

/**
 * Helper hook to get user's branch
 * 
 * Usage:
 *   const branch = useUserBranch()
 *   if (branch?.compliance_type === 'arrahnu') { ... }
 */
export function useUserBranch() {
  const { user } = useAuth()
  return user?.branch || null
}
