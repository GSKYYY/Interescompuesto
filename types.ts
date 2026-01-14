export interface CalculationResult {
  year: number;
  balance: number;
  totalPrincipal: number;
  interest: number;
}

export interface SummaryData {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface InputState {
  initialPrincipal: number;
  monthlyContribution: number;
  interestRate: number;
  years: number;
  inflationRate: number;
}