import React, { useState } from 'react';

export default function StoreCustomersNew() {
  const [formData, setFormData] = useState({
    title_id: '',
    full_name: '',
    id_type: 'IC', // default fallback
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to your Laravel backend goes here
      console.log('Submitting payload directly matching your Laravel fillable keys:', formData);
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Customer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new customer profile. This will be shared across all branches.
        </p>
      </div>

      <hr className="border-border" />

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
                <option value="mr-uuid">Mr.</option>
                <option value="mrs-uuid">Mrs.</option>
                <option value="ms-uuid">Ms.</option>
                <option value="dr-uuid">Dr.</option>
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
                placeholder="John Doe"
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
              <select
                name="id_type"
                required
                value={formData.id_type}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="IC">Identity Card (IC)</option>
                <option value="Passport">Passport</option>
                <option value="Military">Military ID</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Number <span className="text-destructive text-red-500">*</span></label>
              <input
                type="text"
                name="id_number"
                required
                value={formData.id_number}
                onChange={handleChange}
                placeholder="e.g., 900101-10-5432"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
                placeholder="customer@email.com"
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
                {/* Dynamically populated options from backend table */}
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
                {/* Maps to your source_of_gold_types relationship table */}
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
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary text-primary-foreground bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Save Customer'}
          </button>
        </div>

      </form>
    </div>
  );
}