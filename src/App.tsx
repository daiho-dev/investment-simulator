import React from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;