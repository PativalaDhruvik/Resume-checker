import React from 'react';
import { Sparkles, Moon, Sun, Zap, FileText, History, User, Crown, ChevronRight } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export const Navbar = () => {
  const { themeMode, toggleTheme, activeTab, setActiveTab } = useAnalysis();
  const { user, activeCredits, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Illuminated Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-tight text-white flex items-center gap-1">
                Resum<span className="text-indigo-400">AI</span>
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Gemini 2.5 Engine
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            ATS Dashboard
          </button>

          <button
            onClick={() => setActiveTab('bullet-optimizer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'bullet-optimizer'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Bullet Optimizer
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <History className="w-4 h-4" />
            Audit History
          </button>
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => setActiveTab('pricing')}
            className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 border border-amber-400/30 transition-all transform active:scale-95"
          >
            <Crown className="w-3.5 h-3.5 fill-current text-amber-200" />
            Upgrade Plan
          </Button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 shadow-sm"
            title="Toggle Dark/Light Mode"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Active Credits Badge */}
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hidden sm:inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            {activeCredits} {activeCredits === 1 ? 'Credit' : 'Credits'}
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
              <Button variant="outline" size="sm" onClick={() => setActiveTab('login')} className="border-slate-700/80 text-xs text-slate-200 hover:bg-slate-800">
                <User className="w-3.5 h-3.5" />
                Sign In
              </Button>
              <Button variant="default" size="sm" onClick={() => setActiveTab('signup')} className="bg-indigo-600 hover:bg-indigo-500 text-xs font-bold shadow-md shadow-indigo-500/25">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
