import { Results, SimulationParams, YearlyData } from '../types/investment';

export const calculateInvestmentGrowth = (params: SimulationParams): Results => {
  const {
    initialInvestment,
    monthlyContribution,
    years,
    expectedReturn,
  } = params;

  // Monthly values
  const monthlyReturn = expectedReturn / 100 / 12;
  const totalMonths = years * 12;

  const yearlyData: YearlyData[] = [];
  let currentBalance = initialInvestment;
  let totalContributions = initialInvestment;
  let totalGrowth = 0;

  // Calculate values for each year
  for (let year = 1; year <= years; year++) {
    let yearContributions = 0;
    let yearGrowth = 0;

    // Calculate monthly compounding for this year
    for (let month = 1; month <= 12; month++) {
      // Apply growth
      const monthGrowth = currentBalance * monthlyReturn;
      yearGrowth += monthGrowth;

      // Update balance
      currentBalance = currentBalance + monthGrowth;

      // Add monthly contribution (except for the first month of the first year)
      if (!(year === 1 && month === 1)) {
        currentBalance += monthlyContribution;
        yearContributions += monthlyContribution;
        totalContributions += monthlyContribution;
      }
    }

    totalGrowth += yearGrowth;

    // Record data for this year
    yearlyData.push({
      year,
      balance: currentBalance,
      contributions: yearContributions,
      totalContributions,
      growth: yearGrowth,
      totalGrowth,
    });
  }

  return {
    finalBalance: currentBalance,
    totalInvested: totalContributions,
    totalGrowth,
    yearlyData,
  };
};