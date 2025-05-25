import React, { useState } from 'react';
import { BarChart, LineChart } from 'lucide-react';
import { GrowthChart } from './GrowthChart';
import { BreakdownChart } from './BreakdownChart';
import { Results } from '../../types/investment';

interface ChartContainerProps {
  results: Results;
}

type ChartType = 'growth' | 'breakdown';

export const ChartContainer: React.FC<ChartContainerProps> = ({ results }) => {
  const [chartType, setChartType] = useState<ChartType>('growth');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">資産推移グラフ</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('growth')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'growth' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="推移グラフ"
          >
            <LineChart className="h-5 w-5" />
          </button>
          <button
            onClick={() => setChartType('breakdown')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'breakdown' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="資産構成"
          >
            <BarChart className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="h-80">
        {chartType === 'growth' ? (
          <GrowthChart data={results.yearlyData} />
        ) : (
          <BreakdownChart 
            principal={results.totalInvested} 
            interest={results.totalGrowth} 
          />
        )}
      </div>
    </div>
  );
};