import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  // Disable credentials for development (easier CORS handling)
  withCredentials: import.meta.env.PROD ? true : false,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

let requestCounter = 0

// Attach Bearer token on every request if present
api.interceptors.request.use((config) => {
  requestCounter++
  const requestId = requestCounter
  const token = localStorage.getItem("token")
  const timestamp = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    fractionalSecondDigits: 3
  })
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Store timing info and request ID in config for response logging
  (config as any).metadata = { startTime: performance.now(), requestId, timestamp }
  
  // Log request details
  const method = config.method?.toUpperCase() || 'UNKNOWN'
  const url = config.url || 'unknown'
  console.log(`[API] #${requestId} 📤 ${method} ${url} - ${timestamp}`)
  if (config.data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    console.log(`      └─ 📋 Payload:`, config.data)
  }
  
  return config
})

// Enhanced response logging
api.interceptors.response.use(
  (response) => {
    const metadata = (response.config as any).metadata
    const duration = (performance.now() - metadata.startTime).toFixed(2)
    const method = response.config.method?.toUpperCase() || 'UNKNOWN'
    const url = response.config.url || 'unknown'
    const status = response.status
    
    console.log(`[API] #${metadata.requestId} ✅ ${method} ${url} - ${status} - ${duration}ms`)
    if (Object.keys(response.data).length < 50) {
      console.log(`      └─ 📊 Response:`, response.data)
    } else {
      console.log(`      └─ 📊 Response (truncated): ${JSON.stringify(response.data).substring(0, 200)}...`)
    }
    return response
  },
  (error) => {
    const metadata = (error.config as any)?.metadata
    const duration = metadata ? (performance.now() - metadata.startTime).toFixed(2) : '?'
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    const url = error.config?.url || 'unknown'
    const status = error.response?.status || 'NO_RESPONSE'
    
    console.error(`[API] #${metadata?.requestId || '?'} ❌ ${method} ${url} - ${status} - ${duration}ms`)
    console.error(`      └─ 🚨 Error: ${error.message}`)
    if (error.response?.data) {
      console.error(`      └─ 📋 Error Data:`, error.response.data)
    }
    
    if (error.response?.status === 401) {
      console.warn(`[API] 🔓 Unauthorized! Clearing token and redirecting to login...`)
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
