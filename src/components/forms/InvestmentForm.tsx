import React from 'react';
import { Coins, TrendingUp, Clock, CircleDollarSign } from 'lucide-react';
import { SimulationParams } from '../../types/investment';

interface InvestmentFormProps {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ params, setParams }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 先頭の0を削除（全部0なら '0' に）
    const cleanedValue = value.replace(/^0+/, '') || '0';
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(cleanedValue) || 0
    }));
  };
  // 新規追加
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const cleanedValue = value.replace(/^0+/, '') || '0';

  setParams(prev => ({
    ...prev,
    [name]: parseFloat(cleanedValue) || 0
  }));
};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">投資シミュレーション</h2>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            運用利回り（年）
          </label>
          <div className="relative">
            <input
              type="number"
              name="expectedReturn"
              value={params.expectedReturn}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              max="30"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Coins className="h-4 w-4 text-blue-600" />
            初期投資額
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            <input
              type="number"
              name="initialInvestment"
              value={params.initialInvestment}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              step="10000"
            />
          </div>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <CircleDollarSign className="h-4 w-4 text-blue-600" />
            毎月の積立金額
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            <input
              type="number"
              name="monthlyContribution"
              value={params.monthlyContribution}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              step="1000"
            />
          </div>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            積立期間（年）
          </label>
          <input
            type="range"
            name="years"
            value={params.years}
            onChange={handleInputChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            min="1"
            max="30"
            step="1"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1年</span>
            <span>{params.years}年</span>
            <span>30年</span>
          </div>
        </div>
      </div>
    </div>
  );
};