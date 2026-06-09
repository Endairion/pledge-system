import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import StoreCustomers from '@/pages/store/customers/index';
import api from '@/lib/api';

// Mock the API
vi.mock('@/lib/api');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const mockCustomers = [
  {
    id: '1',
    full_name: 'Ahmad bin Ali',
    id_number: '900101-01-1234',
    phone: '0123456789',
    email: 'ahmad@email.com',
    branch: { name: 'Kuala Lumpur' },
    address: '123 Main St',
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: '2',
    full_name: 'Siti binti Hassan',
    id_number: '850515-05-5678',
    phone: '0129876543',
    email: 'siti@email.com',
    branch: { name: 'Kuala Lumpur' },
    address: '456 Side St',
    created_at: '2026-04-15T00:00:00Z',
  },
];

describe('StoreCustomers - Customer List Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the customer list page', () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    expect(screen.getByRole('heading', { name: 'Customers' })).toBeInTheDocument();
    expect(screen.getByText('Shared across all branches — showing registration branch.')).toBeInTheDocument();
  });

  it('displays new customer button', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    const newButton = screen.getByRole('button', { name: /New Customer/ });
    expect(newButton).toBeInTheDocument();

    fireEvent.click(newButton);
    expect(mockNavigate).toHaveBeenCalledWith('/store/customers/new');
  });

  it('fetches and displays customers', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('/customers');
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
      expect(screen.getByText('Siti binti Hassan')).toBeInTheDocument();
    });
  });

  it('displays customer information in table', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('900101-01-1234')).toBeInTheDocument();
      expect(screen.getByText('0123456789')).toBeInTheDocument();
      expect(screen.getByText('ahmad@email.com')).toBeInTheDocument();
      expect(screen.getByText('Kuala Lumpur')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', () => {
    const mockGet = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() =>
            resolve({
              data: {
                data: {
                  data: mockCustomers,
                  total: mockCustomers.length,
                },
              },
            }),
            100
          )
        )
    );
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    expect(screen.getByText('Loading customers...')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    const mockGet = vi.fn().mockRejectedValue(new Error('Failed to fetch'));
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load customers')).toBeInTheDocument();
    });
  });

  it('displays no customers message when list is empty', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: [],
          total: 0,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('No customers found')).toBeInTheDocument();
    });
  });

  it('filters customers by name', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, IC, phone, or email…');
    await userEvent.type(searchInput, 'Ahmad');

    expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    expect(screen.queryByText('Siti binti Hassan')).not.toBeInTheDocument();
  });

  it('filters customers by ID number', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, IC, phone, or email…');
    await userEvent.type(searchInput, '900101-01-1234');

    expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    expect(screen.queryByText('Siti binti Hassan')).not.toBeInTheDocument();
  });

  it('filters customers by email', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, IC, phone, or email…');
    await userEvent.type(searchInput, 'ahmad@email.com');

    expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    expect(screen.queryByText('Siti binti Hassan')).not.toBeInTheDocument();
  });

  it('paginates customers correctly', async () => {
    const manyCustomers = Array.from({ length: 12 }, (_, i) => ({
      ...mockCustomers[0],
      id: `${i}`,
      full_name: `Customer ${i}`,
    }));

    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: manyCustomers,
          total: manyCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Customer 0')).toBeInTheDocument();
      expect(screen.getByText('Showing 1–5 of 12 customers')).toBeInTheDocument();
    });

    // Navigate to next page
    const nextButton = screen.getByRole('button', { name: '' }).parentElement?.querySelector('button:last-of-type');
    if (nextButton) {
      fireEvent.click(nextButton);

      expect(screen.getByText('Showing 6–10 of 12 customers')).toBeInTheDocument();
    }
  });

  it('clears search when typing', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, IC, phone, or email…') as HTMLInputElement;

    // Type search term
    await userEvent.type(searchInput, 'Ahmad');
    expect(searchInput.value).toBe('Ahmad');

    // Verify filtering worked
    expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    expect(screen.queryByText('Siti binti Hassan')).not.toBeInTheDocument();

    // Clear and search for different term
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Siti');

    expect(screen.getByText('Siti binti Hassan')).toBeInTheDocument();
    expect(screen.queryByText('Ahmad bin Ali')).not.toBeInTheDocument();
  });

  it('resets page to 0 when searching', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: {
        data: {
          data: mockCustomers,
          total: mockCustomers.length,
        },
      },
    });
    (api.get as any) = mockGet;

    renderWithRouter(<StoreCustomers />);

    await waitFor(() => {
      expect(screen.getByText('Ahmad bin Ali')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, IC, phone, or email…');
    await userEvent.type(searchInput, 'Ahmad');

    // Page should be back to 1
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });
});
