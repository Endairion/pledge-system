export interface User {
  id: string
  name: string
  email: string
  roles: Role[]
  branch_id: string | null
  branch?: Branch
  is_active?: boolean
  created_at?: string
  updated_at?: string
  // Resolved portal access flags returned by the API
  can_access_store: boolean
  can_access_admin: boolean
  can_access_analytics: boolean
}

export interface Role {
  id: string
  name: RoleName
  display_name: string
  can_access_store: boolean
  can_access_admin: boolean
  can_access_analytics: boolean
  default_redirect: string
  priority: number
}

export type RoleName =
  | "super_admin"
  | "branch_admin"
  | "branch_staff"
  | "viewer"
  | string // allow custom roles

export interface Branch {
  id: number
  name: string
  code: string
}

export interface GoldQuality {
  id: string
  name: string
  purity_percent: number
  created_at?: string
  updated_at?: string
}

export interface GoldRate {
  id: string
  product_id: string
  quality_id: string
  min_rate: number
  max_rate: number
  created_at: string
  updated_at?: string
  quality?: GoldQuality
}

export interface Product {
  id: string
  name: string
  pledge_percent: number
  purity: number
  goldRates?: GoldRate[]
}

export interface Customer {
  id: number
  customer_no: string
  full_name: string
  id_type: "nric" | "passport" | "other"
  id_number: string
  phone: string
  email?: string
  is_blacklisted: boolean
}

export interface Pledge {
  id: number
  pledge_no: string
  branch_id: number
  customer_id: number
  loan_amount: number
  item_value: number
  status: PledgeStatus
  pledged_at: string
  expires_at: string
  redeemed_at?: string
  auctioned_at?: string
  customer?: Customer
  branch?: Branch
}

export type PledgeStatus =
  | "active"
  | "renewed"
  | "redeemed"
  | "auctioned"
  | "forfeited"

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
