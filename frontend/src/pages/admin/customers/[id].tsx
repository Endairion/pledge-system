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
  authorized_loan_limit: number;
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

export default function AdminCustomerDetail() {
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
    authorized_loan_limit: 200000,
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
          authorized_loan_limit: cust.authorized_loan_limit || 200000,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSubmitting(true);
      setError(null);
      await api.put(`/customers/${id}`, formData);
      navigate('/admin/customers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save customer');
      setSubmitting(false);
    }
  };

  const handleBlacklist = async () => {
    if (!blacklistReason.trim()) {
      setError('Please provide a reason for blacklisting');
      return;
    }

    if (!id) return;

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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading customer...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/admin/customers')} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <p className="text-muted-foreground">Customer not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/admin/customers')} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{customer.full_name}</h1>
            <p className="text-sm text-muted-foreground">Customer #{customer.customer_no}</p>
          </div>
        </div>
        {!customer.is_blacklisted && (
          <button
            onClick={() => setBlacklistDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 text-white px-4 py-2 font-medium hover:bg-orange-700"
          >
            <AlertCircle className="h-4 w-4" />
            Blacklist
          </button>
        )}
      </div>

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

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Profile Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Personal Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <select
                name="title_id"
                value={formData.title_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Title</option>
                {titles?.map(title => (
                  <option key={title.id} value={title.id}>{title.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Race</label>
              <select
                name="race_id"
                value={formData.race_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Race</option>
                {races?.map(race => (
                  <option key={race.id} value={race.id}>{race.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Religion</label>
              <select
                name="religion_id"
                value={formData.religion_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Religion</option>
                {religions?.map(religion => (
                  <option key={religion.id} value={religion.id}>{religion.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Identity Verification Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Identity Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ID Type</label>
              <select
                name="id_type"
                value={formData.id_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="IC">IC (NRIC)</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ID Number</label>
              <input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nationality</label>
              <select
                name="nationality_id"
                value={formData.nationality_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Nationality</option>
                {nationalities?.map(nationality => (
                  <option key={nationality.id} value={nationality.id}>{nationality.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Admin Controls Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Admin Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Authorized Loan Limit (RM)</label>
              <input
                type="number"
                name="authorized_loan_limit"
                value={formData.authorized_loan_limit}
                onChange={handleChange}
                min="0"
                step="1000"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1">Default: RM 200,000</p>
            </div>
          </div>
        </div>

        {/* Demographics & Compliance Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Demographics & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Occupation Type</label>
              <input
                type="text"
                name="occupation_type"
                value={formData.occupation_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Occupation Field</label>
              <input
                type="text"
                name="occupation_field"
                value={formData.occupation_field}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Purpose of Transaction</label>
              <input
                type="text"
                name="purpose_of_transaction"
                value={formData.purpose_of_transaction}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-2">Source of Gold</label>
              <select
                name="source_of_gold_id"
                value={formData.source_of_gold_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Source</option>
                {sourceOfGold?.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 rounded-lg px-6 py-2 font-medium"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/customers')}
            className="bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg px-6 py-2 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
