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
  const tokenLoadedRef = useRef<string | null>(null)
  const callCountRef = useRef(0)

  useEffect(() => {
    callCountRef.current++
    const callId = callCountRef.current
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    })

    // Only fetch if we have a token and haven't loaded this token yet
    if (token && token !== tokenLoadedRef.current) {
      tokenLoadedRef.current = token  // Mark as loading immediately
      setIsLoading(true)
      
      console.group(`[AuthProvider] Call #${callId} - Fetching /auth/me`)
      console.log(`📡 Timestamp: ${timestamp}`)
      console.log(`🔑 Token (first 20 chars): ${token.substring(0, 20)}...`)
      console.log(`✓ State: Loading user data`)
      console.groupEnd()
      
      const startTime = performance.now()
      api.get<{ data: User }>("/auth/me")
        .then((res) => {
          const duration = (performance.now() - startTime).toFixed(2)
          console.group(`[AuthProvider] Call #${callId} - ✅ SUCCESS`)
          console.log(`⏱️  Duration: ${duration}ms`)
          console.log(`👤 User: ${res.data.data.name} (ID: ${res.data.data.id})`)
          console.log(`🏢 Branch: ${res.data.data.branch?.name || 'N/A'}`)
          console.log(`📋 Roles: ${res.data.data.roles.map(r => r.name).join(', ')}`)
          console.groupEnd()
          setUser(res.data.data)
        })
        .catch((err) => {
          const duration = (performance.now() - startTime).toFixed(2)
          console.group(`[AuthProvider] Call #${callId} - ❌ ERROR`)
          console.log(`⏱️  Duration: ${duration}ms`)
          console.error(`Error: ${err.message}`)
          console.error(`Status: ${err.response?.status}`)
          console.groupEnd()
          setToken(null)
          setUser(null)
          tokenLoadedRef.current = null
          localStorage.removeItem("token")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (!token) {
      console.log(`[AuthProvider] Call #${callId} - No token, skipping auth check`)
      setUser(null)
      setIsLoading(false)
      tokenLoadedRef.current = null
    } else {
      console.log(`[AuthProvider] Call #${callId} - Token already loaded, skipping duplicate fetch`)
    }
  }, [token])

  async function login(username: string, password: string): Promise<User> {
    console.group(`[AuthProvider] Login attempt`)
    console.log(`👤 Username: ${username}`)
    console.log(`🕐 Timestamp: ${new Date().toLocaleTimeString()}`)
    
    try {
      const res = await api.post<{ data: { token: string; user: User } }>("/auth/login", {
        username,
        password,
      })
      const { token: newToken, user: newUser } = res.data.data
      
      console.log(`✅ Login successful`)
      console.log(`🔑 Token received (first 20 chars): ${newToken.substring(0, 20)}...`)
      console.log(`👤 User: ${newUser.name}`)
      console.log(`📋 Roles: ${newUser.roles.map(r => r.name).join(', ')}`)
      console.log(`🔄 Storing token to localStorage and reloading...`)
      console.groupEnd()
      
      // Store token and use window.location.href to fully reload the app
      // This ensures the AuthProvider re-initializes with the token from localStorage
      localStorage.setItem("token", newToken)
      // Redirect to highest-priority portal user can access: admin > store > analytics
      const redirectPath = newUser.can_access_admin ? "/admin" : newUser.can_access_store ? "/store" : newUser.can_access_analytics ? "/analytics" : "/store"
      console.log(`🔀 Redirecting to: ${redirectPath}`)
      window.location.href = redirectPath
      
      // Return user even though we're about to reload (for TypeScript)
      return newUser
    } catch (err: any) {
      console.error(`❌ Login failed: ${err.message}`)
      console.error(`Status: ${err.response?.status}`)
      console.error(`Response:`, err.response?.data)
      console.groupEnd()
      throw err
    }
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
