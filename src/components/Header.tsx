import React from 'react';
import { LineChart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">資産運用シミュレーター</h1>
          </div>
        </div>
      </div>
    </header>
  );
};