/**
 * Custom hook for pledge financial calculations.
 * 
 * Computes all fees and interest based on item value, loan amount, and duration.
 * Provides breakdown of pledge charge fee, monthly storage fee, interest calculations,
 * and total cumulative fees for the pledge term.
 * 
 * @param totalItemValue - Sum of all pledge item assessed values
 * @param totalLoan - Total loan amount (bank + cash)
 * @param duration - Pledge duration in months (1-8)
 * @param monthlyRates - Optional object with month keys and rate values {"1": "1.5", "2": "2", ...}
 * @returns Object containing calculated fees and interest details
 */
export function usePledgeCalculations(
  _totalItemValue: number, 
  totalLoan: number, 
  duration: number,
  monthlyRates?: Record<string, string>
) {
  // Use provided rates or fallback to defaults
  const DEFAULT_MONTHLY_RATES = {
    "1": "2.5",
    "2": "5.0",
    "3": "7.5",
    "4": "10.0",
    "5": "12.5",
    "6": "15.0",
    "7": "15.0",
    "8": "15.0",
  }

  const rates = monthlyRates || DEFAULT_MONTHLY_RATES
  
  const pledgeChargeFee = totalLoan > 0 ? 50 : 0
  const pledgeInterestRate = parseFloat(rates[duration.toString()] || "0")
  const monthlyStgFee = totalLoan * 0.025
  const monthlyInterestFee = totalLoan * (pledgeInterestRate / 100)
  const totalInterestFee = monthlyInterestFee * duration
  const totalStorageFee = monthlyStgFee * duration

  // Build interest rates array from provided rates
  const interestRates = Object.entries(rates).map(([month, rate]) => ({
    month: parseInt(month),
    rate: parseFloat(rate),
  }))

  return {
    pledgeChargeFee,
    pledgeInterestRate,
    monthlyStgFee,
    monthlyInterestFee,
    totalInterestFee,
    totalStorageFee,
    interestRates,
  }
}
