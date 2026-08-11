import React from 'react';
import { Sparkles, Moon, Sun, Zap, FileText, CheckSquare, History, User } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export const Navbar = () => {
  const { themeMode, toggleTheme, activeTab, setActiveTab } = useAnalysis();
  const { user, activeCredits, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Illuminated Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Resum<span className="text-indigo-400">AI</span>
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            v2.5 Gemini Engine
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('bullet-optimizer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === 'bullet-optimizer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            Bullet Optimizer
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => setActiveTab('pricing')}
            className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-amber-500/20"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Upgrade to Pro
          </Button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
            title="Toggle Dark/Light Mode"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Active Credits Badge (For Guests & Logged-in Users) */}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
            {activeCredits} {user ? 'Credits' : 'Free Credits'}
          </span>

          {/* Profile Avatar & Authentication Controls */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-0.5 shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full bg-slate-900" />
              </div>
              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-rose-400 font-semibold transition-colors hidden sm:block ml-1"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveTab('login')}>
                <User className="w-3.5 h-3.5" />
                Sign In
              </Button>
              <Button variant="default" size="sm" onClick={() => setActiveTab('signup')} className="bg-indigo-600 text-xs">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
