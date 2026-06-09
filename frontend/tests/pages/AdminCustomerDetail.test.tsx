import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminCustomerDetail from '@/pages/admin/customers/[id]';
import * as api from '@/lib/api';

vi.mock('@/lib/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn(),
  };
});

vi.mock('@/hooks/useLookupData', () => ({
  useLookupData: () => ({
    titles: [{ id: '1', name: 'Mr' }],
    races: [{ id: '1', name: 'Malay' }],
    religions: [{ id: '1', name: 'Islam' }],
    nationalities: [{ id: '1', name: 'Malaysian' }],
    sourceOfGold: [{ id: '1', name: 'Mining' }],
  }),
}));

const mockCustomer = {
  id: '123',
  customer_no: 'C001',
  full_name: 'Ahmad bin Ali',
  id_type: 'IC',
  id_number: '900101-01-1234',
  gender: 'M',
  date_of_birth: '1990-01-01',
  phone: '0123456789',
  email: 'ahmad@example.com',
  address: '123 Main St',
  title_id: '1',
  race_id: '1',
  religion_id: '1',
  nationality_id: '1',
  source_of_gold_id: '1',
  occupation_type: 'Engineer',
  occupation_field: 'Technology',
  purpose_of_transaction: 'Investment',
  is_blacklisted: false,
  blacklisted_reason: null,
  created_at: '2024-01-01',
  branch: { id: '1', name: 'KL Branch' },
};

describe('Admin Customer Detail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays customer information', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });
  });

  it('allows editing all customer fields', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });

    const nameInput = screen.getByDisplayValue('Ahmad bin Ali');
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Name');

    expect(nameInput).toHaveValue('Updated Name');
  });

  it('saves updated customer information', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });
    vi.mocked(api.default.put).mockResolvedValueOnce({
      data: { data: { ...mockCustomer, full_name: 'Updated Name' } },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(api.default.put).toHaveBeenCalledWith(
        '/customers/123',
        expect.any(Object)
      );
    });
  });

  it('shows blacklist button when customer is not blacklisted', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /blacklist/i })).toBeInTheDocument();
    });
  });

  it('opens blacklist dialog on button click', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /blacklist/i })).toBeInTheDocument();
    });

    const blacklistButton = screen.getByRole('button', { name: /blacklist/i });
    await user.click(blacklistButton);

    expect(screen.getByPlaceholderText(/reason for blacklist/i)).toBeInTheDocument();
  });

  it('blacklists customer with reason', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });
    vi.mocked(api.default.put).mockResolvedValueOnce({
      data: {
        data: {
          ...mockCustomer,
          is_blacklisted: true,
          blacklisted_reason: 'Admin action',
        },
      },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /blacklist/i })).toBeInTheDocument();
    });

    const blacklistButton = screen.getByRole('button', { name: /blacklist/i });
    await user.click(blacklistButton);

    const reasonInput = screen.getByPlaceholderText(/reason for blacklist/i);
    await user.type(reasonInput, 'High-risk activity');

    const confirmButton = screen.getByRole('button', { name: /confirm|blacklist/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(api.default.put).toHaveBeenCalledWith(
        '/customers/123',
        expect.objectContaining({
          is_blacklisted: true,
          blacklisted_reason: 'High-risk activity',
        })
      );
    });
  });

  it('hides blacklist button when customer is already blacklisted', async () => {
    const blacklistedCustomer = {
      ...mockCustomer,
      is_blacklisted: true,
      blacklisted_reason: 'Already blacklisted',
    };
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: blacklistedCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /blacklist/i })).not.toBeInTheDocument();
    });
  });

  it('does not have delete button', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('does not display is_active field', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });

    expect(screen.queryByLabelText(/active|is_active/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/active/i)).not.toBeInTheDocument();
  });

  it('cancels changes and navigates back', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(cancelButton).toBeInTheDocument();
  });

  it('displays all form sections', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomer },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/personal profile/i)).toBeInTheDocument();
      expect(screen.getByText(/identity verification/i)).toBeInTheDocument();
      expect(screen.getByText(/contact details/i)).toBeInTheDocument();
      expect(screen.getByText(/demographics|compliance/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', async () => {
    let resolveGet: any;
    const promise = new Promise((resolve) => {
      resolveGet = resolve;
    });
    vi.mocked(api.default.get).mockReturnValue(promise as any);

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    // Should show loading before data arrives
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    resolveGet({ data: { data: mockCustomer } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ahmad bin Ali')).toBeInTheDocument();
    });
  });

  it('shows error message if fetch fails', async () => {
    vi.mocked(api.default.get).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });
});
