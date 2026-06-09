import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "@/hooks/useAuth"
import { ProtectedRoute } from "@/routes/ProtectedRoute"

import GuestLayout from "@/layouts/GuestLayout"
import AdminLayout from "@/layouts/AdminLayout"
import StoreLayout from "@/layouts/StoreLayout"
import AnalyticsLayout from "@/layouts/AnalyticsLayout"

import LoginPage from "@/pages/auth/Login"

// Admin pages
import AdminDashboard from "@/pages/admin"
import AdminUsers from "@/pages/admin/users"
import AdminBranches from "@/pages/admin/branches"
import AdminBranchForm from "@/pages/admin/branches/form"
import AdminCustomers from "@/pages/admin/customers"
import AdminCustomerDetail from "@/pages/admin/customers/[id]"
import AdminPledges from "@/pages/admin/pledges"
import AdminProducts from "@/pages/admin/products"
import AdminCategories from "@/pages/admin/categories"
import AdminGoldRates from "@/pages/admin/gold-rates"
import AdminReports from "@/pages/admin/reports"
import AdminSettings from "@/pages/admin/settings"
import AdminPledgeConfiguration from "@/pages/admin/pledge-configuration"
import AdminCustomerTitles from "@/pages/admin/customer-titles"
import AdminRaces from "@/pages/admin/races"
import AdminReligions from "@/pages/admin/religions"
import AdminNationalities from "@/pages/admin/nationalities"
import AdminSourceOfGoldTypes from "@/pages/admin/source-of-gold-types"
import AdminGoldQualities from "@/pages/admin/gold-qualities"
import AdminFeeTypes from "@/pages/admin/fee-types"

// Store pages
import StoreDashboard from "@/pages/store"
import StoreCustomers from "@/pages/store/customers"
import StoreCustomersNew from "@/pages/store/customers/new"
import StoreCustomerDetail from "@/pages/store/customers/[id]"
import StoreCustomerEdit from "@/pages/store/customers/edit"
import StorePledges from "@/pages/store/pledges"
import StorePledgesNew from "@/pages/store/pledges/new"
import StorePledgesCreate from "@/pages/store/pledges/create"
import StoreRenewals from "@/pages/store/renewals"
import StoreRedemptions from "@/pages/store/redemptions"
import StoreAuctions from "@/pages/store/auctions"
import StoreReminders from "@/pages/store/reminders"
import StoreCash from "@/pages/store/cash"
import StoreReports from "@/pages/store/reports"

import AnalyticsDashboard from "@/pages/analytics"
import UnauthorizedPage from "@/pages/Unauthorized"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Admin Portal */}
          <Route element={<ProtectedRoute portal="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
              <Route path="/admin/pledges" element={<AdminPledges />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/branches" element={<AdminBranches />} />
              <Route path="/admin/branches/create" element={<AdminBranchForm />} />
              <Route path="/admin/branches/:id/edit" element={<AdminBranchForm />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/gold-rates" element={<AdminGoldRates />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/pledge-configuration" element={<AdminPledgeConfiguration />} />
              
              {/* Lookup Tables */}
              <Route path="/admin/customer-titles" element={<AdminCustomerTitles />} />
              <Route path="/admin/races" element={<AdminRaces />} />
              <Route path="/admin/religions" element={<AdminReligions />} />
              <Route path="/admin/nationalities" element={<AdminNationalities />} />
              <Route path="/admin/source-of-gold-types" element={<AdminSourceOfGoldTypes />} />
              <Route path="/admin/gold-qualities" element={<AdminGoldQualities />} />
              <Route path="/admin/fee-types" element={<AdminFeeTypes />} />
            </Route>
          </Route>

          {/* Store Portal */}
          <Route element={<ProtectedRoute portal="store" />}>
            <Route element={<StoreLayout />}>
              <Route path="/store" element={<StoreDashboard />} />
              <Route path="/store/pledges" element={<StorePledges />} />
              <Route path="/store/pledges/new" element={<StorePledgesNew />} />
              <Route path="/store/pledges/create" element={<StorePledgesCreate />} />
              <Route path="/store/customers" element={<StoreCustomers />} />
              <Route path="/store/customers/new" element={<StoreCustomersNew />} />
              <Route path="/store/customers/:id" element={<StoreCustomerDetail />} />
              <Route path="/store/customers/:id/edit" element={<StoreCustomerEdit />} />
              <Route path="/store/renewals" element={<StoreRenewals />} />
              <Route path="/store/redemptions" element={<StoreRedemptions />} />
              <Route path="/store/auctions" element={<StoreAuctions />} />
              <Route path="/store/reminders" element={<StoreReminders />} />
              <Route path="/store/cash" element={<StoreCash />} />
              <Route path="/store/reports" element={<StoreReports />} />
            </Route>
          </Route>

          {/* Analytics */}
          <Route element={<ProtectedRoute portal="analytics" />}>
            <Route element={<AnalyticsLayout />}>
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
