import React from 'react';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Pricing } from './pages/Pricing';
import { BulletOptimizerStudio } from './components/BulletOptimizerStudio';

const AppContent = () => {
  const { activeTab } = useAnalysis();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'bullet-optimizer' && <BulletOptimizerStudio />}
        {activeTab === 'history' && <History />}
        {activeTab === 'login' && <Login />}
        {activeTab === 'signup' && <Signup />}
        {activeTab === 'pricing' && <Pricing />}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ResumAI v2.5</span>
            <span>• Powered by Gemini Engine & MongoDB</span>
          </div>
          <span>Built for High-Converting Career Applications & ATS Optimization</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <AppContent />
      </AnalysisProvider>
    </AuthProvider>
  );
}
