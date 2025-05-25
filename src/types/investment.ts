export enum InvestmentType {
  STOCKS = 'stocks',
  BONDS = 'bonds',
  REAL_ESTATE = 'real_estate',
  MIXED = 'mixed',
}

export interface SimulationParams {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  expectedReturn: number;
}

export interface YearlyData {
  year: number;
  balance: number;
  contributions: number;
  totalContributions: number;
  growth: number;
  totalGrowth: number;
}

export interface Results {
  finalBalance: number;
  totalInvested: number;
  totalGrowth: number;
  yearlyData: YearlyData[];
}