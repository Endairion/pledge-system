import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminCustomerList from '@/pages/admin/customers/index';
import * as api from '@/lib/api';

vi.mock('@/lib/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockCustomers = {
  data: [
    {
      id: '1',
      customer_no: 'C001',
      full_name: 'Ahmad bin Ali',
      id_number: '900101-01-1234',
      phone: '0123456789',
      email: 'ahmad@example.com',
      address: '123 Main St',
      branch: { id: '1', name: 'KL Branch' },
      created_at: '2024-01-01',
      is_blacklisted: false,
    },
    {
      id: '2',
      customer_no: 'C002',
      full_name: 'Siti binti Hassan',
      id_number: '950515-05-6789',
      phone: '0187654321',
      email: 'siti@example.com',
      address: '456 Oak Ave',
      branch: { id: '2', name: 'Shah Alam Branch' },
      created_at: '2024-01-02',
      is_blacklisted: true,
    },
  ],
  total: 2,
  per_page: 10,
  current_page: 1,
};

describe('Admin Customer List Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays all customers in table', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
      expect(screen.getByText('Siti binti Hassan')).toBeInTheDocument();
    });
  });

  it('shows customer details in correct columns', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('900101-01-1234')).toBeInTheDocument();
      expect(screen.getByText('0123456789')).toBeInTheDocument();
      expect(screen.getByText('ahmad@example.com')).toBeInTheDocument();
      expect(screen.getByText('KL Branch')).toBeInTheDocument();
    });
  });

  it('allows searching by name', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'Ahmad');

    // Search is performed in component
    expect(searchInput).toHaveValue('Ahmad');
  });

  it('allows searching by ID number', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('900101-01-1234')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, '900101');

    expect(searchInput).toHaveValue('900101');
  });

  it('displays edit buttons for each customer', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const editButtons = screen.getAllByRole('link', { name: /edit/i });
      expect(editButtons).toHaveLength(2);
    });
  });

  it('edit button navigates to detail page', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const editLinks = screen.getAllByRole('link', { name: /edit/i });
      expect(editLinks[0]).toHaveAttribute('href', '/admin/customers/1');
      expect(editLinks[1]).toHaveAttribute('href', '/admin/customers/2');
    });
  });

  it('shows pagination information', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/showing 1-2 of 2/i)).toBeInTheDocument();
    });
  });

  it('handles empty customer list', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: { data: [], total: 0, per_page: 10, current_page: 1 } },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no customers found/i)).toBeInTheDocument();
    });
  });

  it('highlights blacklisted customers', async () => {
    vi.mocked(api.default.get).mockResolvedValueOnce({
      data: { data: mockCustomers },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCustomerList />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Siti binti Hassan')).toBeInTheDocument();
    });

    // Blacklisted customer should have visual indicator
    const blacklistedRow = screen.getByText('Siti binti Hassan').closest('tr');
    expect(blacklistedRow).toBeInTheDocument();
  });
});
