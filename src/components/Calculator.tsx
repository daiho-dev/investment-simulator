import React, { useState, useEffect } from 'react';
import { ChartContainer } from './charts/ChartContainer';
import { InvestmentForm } from './forms/InvestmentForm';
import { ResultsSummary } from './results/ResultsSummary';
import { Results, SimulationParams } from '../types/investment';
import { calculateInvestmentGrowth } from '../utils/calculations';

export const Calculator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    initialInvestment: 1000000,
    monthlyContribution: 50000,
    years: 20,
    expectedReturn: 5,
  });

  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const data = calculateInvestmentGrowth(params);
    setResults(data);
  }, [params]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <InvestmentForm params={params} setParams={setParams} />
      </div>
      <div className="lg:col-span-2 space-y-6">
        {results && (
          <>
            <ChartContainer results={results} />
            <ResultsSummary results={results} params={params} />
          </>
        )}
      </div>
    </div>
  );
};