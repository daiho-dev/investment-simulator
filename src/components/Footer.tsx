import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} 資産運用シミュレーター. このツールはシミュレーション用です。
            将来の運用成果を保証するものではありません。
          </p>
        </div>
      </div>
    </footer>
  );
};