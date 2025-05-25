import React from 'react';
import { Results, SimulationParams } from '../../types/investment';

interface ResultsSummaryProps {
  results: Results;
  params: SimulationParams;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tenYearData = results.yearlyData.find(data => data.year === 10);
  const twentyYearData = results.yearlyData.find(data => data.year === 20);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">運用結果</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">10年後の資産</h3>
          <p className="text-2xl font-bold text-blue-700">
            {tenYearData ? formatCurrency(tenYearData.balance) : '---'}
          </p>
          {tenYearData && (
            <p className="text-sm text-blue-600 mt-2">
              運用益: {formatCurrency(tenYearData.totalGrowth)}
            </p>
          )}
        </div>

        <div className="bg-emerald-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-emerald-900 mb-2">20年後の資産</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {twentyYearData ? formatCurrency(twentyYearData.balance) : '---'}
          </p>
          {twentyYearData && (
            <p className="text-sm text-emerald-600 mt-2">
              運用益: {formatCurrency(twentyYearData.totalGrowth)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};