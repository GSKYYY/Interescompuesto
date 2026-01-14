import { CalculationResult, SummaryData } from '../types';

export const calculateCompoundInterest = (
  principal: number,
  monthly: number,
  rate: number,
  years: number,
  inflationRate: number = 0
): { data: CalculationResult[]; summary: SummaryData } => {
  const data: CalculationResult[] = [];
  const monthlyRate = rate / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const totalMonths = years * 12;

  let currentBalance = principal;
  let totalContributed = principal;

  // Initial data point
  data.push({
    year: 0,
    balance: principal,
    totalPrincipal: principal,
    interest: 0,
  });

  for (let month = 1; month <= totalMonths; month++) {
    // Add interest (Nominal Growth)
    currentBalance = currentBalance * (1 + monthlyRate);
    // Add contribution (Nominal)
    currentBalance += monthly;
    totalContributed += monthly;

    // Push data point at the end of each year
    if (month % 12 === 0) {
      const year = month / 12;
      
      // Calculate Real Value (Inflation Adjusted)
      // We discount the nominal balance back to present value terms
      const discountFactor = 1 / Math.pow(1 + monthlyInflation, month);
      const realBalance = currentBalance * discountFactor;

      data.push({
        year,
        balance: Math.round(realBalance),
        totalPrincipal: Math.round(totalContributed),
        interest: Math.round(realBalance - totalContributed),
      });
    }
  }

  // Summary based on the final calculated (real) values
  const lastPoint = data[data.length - 1];
  
  const summary: SummaryData = {
    finalBalance: lastPoint.balance,
    totalContributions: lastPoint.totalPrincipal,
    totalInterest: lastPoint.interest,
  };

  return { data, summary };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};