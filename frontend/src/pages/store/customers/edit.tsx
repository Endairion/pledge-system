import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
  title_id: string | null;
  race_id: string | null;
  religion_id: string | null;
  nationality_id: string | null;
  source_of_gold_id: string | null;
  branch: {
    id: string;
    name: string;
  };
}

export default function CustomerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title_id: '',
    full_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    email: '',
    address: '',
    race_id: '',
    religion_id: '',
    nationality_id: '',
    occupation_type: '',
    occupation_field: '',
    purpose_of_transaction: '',
    source_of_gold_id: '',
  });

  const { data: titles } = useLookupData('customer_titles');
  const { data: religions } = useLookupData('religions');
  const { data: nationalities } = useLookupData('nationalities');
  const { data: races } = useLookupData('races');
  const { data: sourceOfGolds } = useLookupData('source_of_gold_types');

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
          gender: cust.gender,
          date_of_birth: cust.date_of_birth || '',
          phone: cust.phone || '',
          email: cust.email,
          address: cust.address || '',
          race_id: cust.race_id || '',
          religion_id: cust.religion_id || '',
          nationality_id: cust.nationality_id || '',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);
      
      // Convert empty strings to null for optional fields
      const data = {
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

      await api.put(`/customers/${id}`, data);
      navigate(`/store/customers/${id}`, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update customer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
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
      <div className="mx-auto max-w-4xl px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
          <p className="text-red-600 dark:text-red-400">Customer not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Customer</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{customer.full_name} ({customer.customer_no})</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Profile Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Personal Profile</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <select
                name="title_id"
                value={formData.title_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Title</option>
                {titles?.map(title => (
                  <option key={title.id} value={title.id}>{title.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Contact Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Residential Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Demographics Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Demographics & Compliance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Race</label>
              <select
                name="race_id"
                value={formData.race_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Race</option>
                {races?.map(race => (
                  <option key={race.id} value={race.id}>{race.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Religion</label>
              <select
                name="religion_id"
                value={formData.religion_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Religion</option>
                {religions?.map(religion => (
                  <option key={religion.id} value={religion.id}>{religion.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</label>
              <select
                name="nationality_id"
                value={formData.nationality_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Nationality</option>
                {nationalities?.map(nationality => (
                  <option key={nationality.id} value={nationality.id}>{nationality.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source of Gold</label>
              <select
                name="source_of_gold_id"
                value={formData.source_of_gold_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Source</option>
                {sourceOfGolds?.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation Type</label>
              <input
                type="text"
                name="occupation_type"
                value={formData.occupation_type}
                onChange={handleChange}
                placeholder="e.g., Salaried, Self-Employed"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation Field</label>
              <input
                type="text"
                name="occupation_field"
                value={formData.occupation_field}
                onChange={handleChange}
                placeholder="e.g., Finance, Retail"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Purpose of Transaction</label>
              <textarea
                name="purpose_of_transaction"
                value={formData.purpose_of_transaction}
                onChange={handleChange}
                rows={2}
                placeholder="e.g., Short-term personal financing"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
