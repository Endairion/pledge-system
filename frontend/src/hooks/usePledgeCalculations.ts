/**
 * Custom hook for pledge financial calculations.
 * 
 * Computes all fees and interest based on item value, loan amount, and duration.
 * Provides breakdown of pledge charge fee, monthly storage fee, interest calculations,
 * and total cumulative fees for the pledge term.\n * \n * @param totalItemValue - Sum of all pledge item assessed values\n * @param totalLoan - Total loan amount (bank + cash)\n * @param duration - Pledge duration in months (1-6)\n * @returns Object containing calculated fees and interest details\n * @returns {number} pledgeChargeFee - Fixed RM 50 fee (if loan > 0)\n * @returns {number} pledgeInterestRate - Interest rate percentage for the duration\n * @returns {number} monthlyStgFee - Monthly storage fee amount\n * @returns {number} monthlyInterestFee - Monthly interest fee amount\n * @returns {number} totalInterestFee - Cumulative interest for entire duration\n * @returns {number} totalStorageFee - Cumulative storage fee for entire duration\n * @returns {Array} interestRates - All available interest rate tiers\n */
export function usePledgeCalculations(_totalItemValue: number, totalLoan: number, duration: number) {
  const MONTHLY_INTEREST_RATES = [
    { month: 1, rate: 2.5 },
    { month: 2, rate: 5.0 },
    { month: 3, rate: 7.5 },
    { month: 4, rate: 10.0 },
    { month: 5, rate: 12.5 },
    { month: 6, rate: 15.0 },
  ]

  const pledgeChargeFee = totalLoan > 0 ? 50 : 0
  const pledgeInterestRate = MONTHLY_INTEREST_RATES.find((r) => r.month === duration)?.rate || 0
  const monthlyStgFee = totalLoan * 0.025
  const monthlyInterestFee = totalLoan * (pledgeInterestRate / 100)
  const totalInterestFee = monthlyInterestFee * duration
  const totalStorageFee = monthlyStgFee * duration

  return {
    pledgeChargeFee,
    pledgeInterestRate,
    monthlyStgFee,
    monthlyInterestFee,
    totalInterestFee,
    totalStorageFee,
    interestRates: MONTHLY_INTEREST_RATES,
  }
}
