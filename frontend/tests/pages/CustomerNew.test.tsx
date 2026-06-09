import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import StoreCustomersNew from '@/pages/store/customers/new';
import api from '@/lib/api';

// Mock the API
vi.mock('@/lib/api');

// Mock the hooks
vi.mock('@/hooks/useLookupData', () => ({
  useLookupData: (tableName: string) => {
    const mockData: Record<string, Array<{ id: string; name: string }>> = {
      customer_titles: [
        { id: '1', name: 'Encik' },
        { id: '2', name: 'Puan' },
      ],
      religions: [
        { id: '1', name: 'Islam' },
        { id: '2', name: 'Hindu' },
      ],
      nationalities: [
        { id: '1', name: 'Malaysia' },
        { id: '2', name: 'Others' },
      ],
      races: [
        { id: '1', name: 'Melayu' },
        { id: '2', name: 'Cina' },
      ],
      source_of_gold_types: [
        { id: '1', name: 'Buy' },
        { id: '2', name: 'Gift' },
      ],
    };
    return { data: mockData[tableName] || [], loading: false, error: null };
  },
}));

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

describe('StoreCustomersNew - Customer Creation Form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the customer creation form', () => {
    renderWithRouter(<StoreCustomersNew />);

    expect(screen.getByRole('heading', { name: 'New Customer' })).toBeInTheDocument();
    expect(screen.getByText('Create a new customer profile. This will be shared across all branches.')).toBeInTheDocument();
  });

  it('displays all form sections', () => {
    renderWithRouter(<StoreCustomersNew />);

    expect(screen.getByText('Personal Profile')).toBeInTheDocument();
    expect(screen.getByText('Identity Verification')).toBeInTheDocument();
    expect(screen.getByText('Contact Details')).toBeInTheDocument();
    expect(screen.getByText('Demographics & Compliance')).toBeInTheDocument();
  });

  it('displays all required form fields', () => {
    renderWithRouter(<StoreCustomersNew />);

    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
  });

  it('populates lookup data in dropdowns', () => {
    renderWithRouter(<StoreCustomersNew />);

    const titleSelect = screen.getByName('title_id') as HTMLSelectElement;
    expect(titleSelect.querySelector('option[value="1"]')?.textContent).toBe('Encik');

    const religionSelect = screen.getByName('religion_id') as HTMLSelectElement;
    expect(religionSelect.querySelector('option[value="1"]')?.textContent).toBe('Islam');

    const nationalitySelect = screen.getByName('nationality_id') as HTMLSelectElement;
    expect(nationalitySelect.querySelector('option[value="1"]')?.textContent).toBe('Malaysia');
  });

  it('submits form with valid data', async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        data: { id: '123', full_name: 'John Doe' },
      },
    });
    (api.post as any) = mockPost;

    renderWithRouter(<StoreCustomersNew />);

    const fullNameInput = screen.getByDisplayValue('John Doe');
    await userEvent.clear(fullNameInput);
    await userEvent.type(fullNameInput, 'Ahmad bin Ali');

    const idNumberInput = screen.getByPlaceholderText('e.g., 900101-10-5432');
    await userEvent.type(idNumberInput, '900101-01-1234');

    const emailInput = screen.getByPlaceholderText('customer@email.com');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'ahmad@email.com');

    const genderSelect = screen.getByName('gender');
    await userEvent.selectOptions(genderSelect, 'M');

    const submitButton = screen.getByRole('button', { name: /Save Customer/ });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/customers', expect.objectContaining({
        full_name: 'Ahmad bin Ali',
        id_number: '900101-01-1234',
        email: 'ahmad@email.com',
        gender: 'M',
      }));
      expect(mockNavigate).toHaveBeenCalledWith('/store/customers', { replace: true });
    });
  });

  it('displays error message on failed submission', async () => {
    const mockPost = vi.fn().mockRejectedValue({
      response: {
        data: {
          message: 'ID number already exists',
        },
      },
    });
    (api.post as any) = mockPost;

    renderWithRouter(<StoreCustomersNew />);

    const fullNameInput = screen.getByDisplayValue('John Doe');
    await userEvent.clear(fullNameInput);
    await userEvent.type(fullNameInput, 'Ahmad bin Ali');

    const idNumberInput = screen.getByPlaceholderText('e.g., 900101-10-5432');
    await userEvent.type(idNumberInput, '900101-01-1234');

    const emailInput = screen.getByPlaceholderText('customer@email.com');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'ahmad@email.com');

    const genderSelect = screen.getByName('gender');
    await userEvent.selectOptions(genderSelect, 'M');

    const submitButton = screen.getByRole('button', { name: /Save Customer/ });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('ID number already exists')).toBeInTheDocument();
    });
  });

  it('navigates back to customer list on cancel', async () => {
    renderWithRouter(<StoreCustomersNew />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/store/customers');
  });

  it('converts empty strings to null for optional fields', async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        data: { id: '123', full_name: 'John Doe' },
      },
    });
    (api.post as any) = mockPost;

    renderWithRouter(<StoreCustomersNew />);

    const fullNameInput = screen.getByDisplayValue('John Doe');
    await userEvent.clear(fullNameInput);
    await userEvent.type(fullNameInput, 'Ahmad bin Ali');

    const idNumberInput = screen.getByPlaceholderText('e.g., 900101-10-5432');
    await userEvent.type(idNumberInput, '900101-01-1234');

    const emailInput = screen.getByPlaceholderText('customer@email.com');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'ahmad@email.com');

    const genderSelect = screen.getByName('gender');
    await userEvent.selectOptions(genderSelect, 'M');

    // Leave optional fields empty and submit
    const submitButton = screen.getByRole('button', { name: /Save Customer/ });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/customers', expect.objectContaining({
        title_id: null,
        race_id: null,
        religion_id: null,
        nationality_id: null,
        phone: null,
        address: null,
      }));
    });
  });
});
