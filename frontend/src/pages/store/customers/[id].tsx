import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { useLookupData } from '@/hooks/useLookupData';

interface Customer {
  id: string;
  customer_no: string;
  full_name: string;
  id_type: string;
  id_number: string;
  gender: string;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  occupation_type: string | null;
  occupation_field: string | null;
  purpose_of_transaction: string | null;
  is_blacklisted: boolean;
  blacklisted_reason: string | null;
  branch: {
    id: string;
    name: string;
  };
  title_id: string | null;
  race_id: string | null;
  religion_id: string | null;
  nationality_id: string | null;
  source_of_gold_id: string | null;
  created_at: string;
  updated_at: string;
}

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [blacklisting, setBlacklisting] = useState(false);
  const [blacklistDialogOpen, setBlacklistDialogOpen] = useState(false);
  const [blacklistReason, setBlacklistReason] = useState('');
  const [formData, setFormData] = useState({
    title_id: '',
    full_name: '',
    id_type: 'IC',
    id_number: '',
    date_of_birth: '',
    gender: '',
    race_id: '',
    religion_id: '',
    nationality_id: '',
    phone: '',
    email: '',
    address: '',
    occupation_type: '',
    occupation_field: '',
    purpose_of_transaction: '',
    source_of_gold_id: '',
  });

  const { data: titles } = useLookupData('customer_titles');
  const { data: religions } = useLookupData('religions');
  const { data: nationalities } = useLookupData('nationalities');
  const { data: races } = useLookupData('races');
  const { data: sourceOfGold } = useLookupData('source_of_gold_types');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/customers/${id}`);
        const cust = response.data.data;
        setCustomer(cust);
        setFormData({
          title_id: cust.title_id || '',
          full_name: cust.full_name,
          id_type: cust.id_type,
          id_number: cust.id_number,
          date_of_birth: cust.date_of_birth || '',
          gender: cust.gender,
          race_id: cust.race_id || '',
          religion_id: cust.religion_id || '',
          nationality_id: cust.nationality_id || '',
          phone: cust.phone || '',
          email: cust.email,
          address: cust.address || '',
          occupation_type: cust.occupation_type || '',
          occupation_field: cust.occupation_field || '',
          purpose_of_transaction: cust.purpose_of_transaction || '',
          source_of_gold_id: cust.source_of_gold_id || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Prepare payload - convert empty strings to null for nullable fields
      const payload = {
        full_name: formData.full_name,
        gender: formData.gender,
        email: formData.email,
        title_id: formData.title_id || null,
        date_of_birth: formData.date_of_birth || null,
        phone: formData.phone || null,
        address: formData.address || null,
        race_id: formData.race_id || null,
        religion_id: formData.religion_id || null,
        nationality_id: formData.nationality_id || null,
        occupation_type: formData.occupation_type || null,
        occupation_field: formData.occupation_field || null,
        purpose_of_transaction: formData.purpose_of_transaction || null,
        source_of_gold_id: formData.source_of_gold_id || null,
      };

      await api.put(`/customers/${id}`, payload);
      navigate('/store/customers', { replace: true });
    } catch (err: any) {
      console.error('Error updating customer:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          err.message || 
                          'Failed to update customer';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/store/customers');
  };

  const handleBlacklist = async () => {
    if (!blacklistReason.trim()) {
      setError('Please provide a reason for blacklisting');
      return;
    }

    try {
      setBlacklisting(true);
      setError(null);
      await api.put(`/customers/${id}`, {
        is_blacklisted: true,
        blacklisted_reason: blacklistReason,
      });
      setCustomer({ ...customer, is_blacklisted: true, blacklisted_reason: blacklistReason });
      setBlacklistDialogOpen(false);
      setBlacklistReason('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to blacklist customer');
    } finally {
      setBlacklisting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading customer...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md">
          <p className="text-sm font-medium">{error || 'Customer not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate('/store/customers')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Customers
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Customer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {customer.full_name} ({customer.customer_no})
          </p>
        </div>
        {!customer.is_blacklisted && (
          <button
            onClick={() => setBlacklistDialogOpen(true)}
            className="flex items-center gap-2 rounded-md bg-orange-600 text-white px-4 py-2 text-sm font-medium hover:bg-orange-700"
          >
            <AlertCircle size={18} />
            Blacklist
          </button>
        )}
      </div>

      <hr className="border-border" />

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {customer.is_blacklisted && (
        <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded-md">
          <p className="text-sm font-medium">⚠️ Customer Blacklisted</p>
          {customer.blacklisted_reason && <p className="text-sm mt-1">{customer.blacklisted_reason}</p>}
        </div>
      )}

      {blacklistDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 max-w-sm space-y-4">
            <h2 className="text-lg font-semibold">Blacklist Customer</h2>
            <p className="text-sm text-muted-foreground">Are you sure you want to blacklist this customer?</p>
            <textarea
              value={blacklistReason}
              onChange={(e) => setBlacklistReason(e.target.value)}
              placeholder="Reason for blacklisting..."
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setBlacklistDialogOpen(false)}
                className="flex-1 px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleBlacklist}
                disabled={blacklisting}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
              >
                {blacklisting ? 'Blacklisting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Personal Profile */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Personal Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <select
                name="title_id"
                value={formData.title_id}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Title</option>
                {titles?.map((title) => (
                  <option key={title.id} value={title.id}>
                    {title.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Full Name <span className="text-destructive text-red-500">*</span></label>
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender <span className="text-destructive text-red-500">*</span></label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Identity Verification */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Identity Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Type <span className="text-destructive text-red-500">*</span></label>
              <input
                type="text"
                value={formData.id_type === 'IC' ? 'Identity Card (IC)' : formData.id_type}
                disabled
                className="w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Number <span className="text-destructive text-red-500">*</span></label>
              <input
                type="text"
                value={formData.id_number}
                disabled
                className="w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Contact Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+60123456789"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address <span className="text-destructive text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Residential Address</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, City, Postcode, State"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Demographics & AML/KYC */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Demographics & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Race</label>
              <select
                name="race_id"
                value={formData.race_id}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Race</option>
                {races?.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <select
                name="religion_id"
                value={formData.religion_id}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Religion</option>
                {religions?.map((religion) => (
                  <option key={religion.id} value={religion.id}>
                    {religion.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nationality</label>
              <select
                name="nationality_id"
                value={formData.nationality_id}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Nationality</option>
                {nationalities?.map((nationality) => (
                  <option key={nationality.id} value={nationality.id}>
                    {nationality.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Occupation Type</label>
              <input
                type="text"
                name="occupation_type"
                value={formData.occupation_type}
                onChange={handleChange}
                placeholder="e.g., Salaried, Self-Employed"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Occupation Field</label>
              <input
                type="text"
                name="occupation_field"
                value={formData.occupation_field}
                onChange={handleChange}
                placeholder="e.g., Finance, Retail"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Source of Gold</label>
              <select
                name="source_of_gold_id"
                value={formData.source_of_gold_id}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Source</option>
                {sourceOfGold?.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Purpose of Transaction</label>
              <input
                type="text"
                name="purpose_of_transaction"
                value={formData.purpose_of_transaction}
                onChange={handleChange}
                placeholder="e.g., Short-term personal financing"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary text-primary-foreground bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Customer'}
          </button>
        </div>

      </form>
    </div>
  );
}
