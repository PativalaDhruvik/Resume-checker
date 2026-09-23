import React from 'react';
import { Award, Info, Sparkles, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { getScoreColor } from '../utils/formatters';

export const ScoreCard = ({ score = 84, statusBadge = 'Great ATS Compatibility', targetRole = 'Senior Full Stack Developer' }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const targetScore = Math.min(98, score + 28);
  const scoreColorClass = getScoreColor(score);

  return (
    <Card className="glass-card relative overflow-hidden glow-border flex flex-col justify-between h-full p-6 bg-white dark:bg-[#0F1626]/90 shadow-xl">
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Award className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Your ATS Score Audit</h3>
        </div>
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors" />
          <div className="absolute right-0 top-7 hidden group-hover:block w-64 p-3.5 bg-slate-900 text-white border border-slate-700 rounded-2xl shadow-2xl text-[11px] z-30 leading-relaxed">
            Deterministic ATS Score calculated across 4 pillars: Formatting, Keyword Matching for {targetRole}, Quantitative Impact, and Structural Clarity.
          </div>
        </div>
      </div>

      {/* Resumly-style Score Improvement Row */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 mb-4 flex items-center justify-between text-center shadow-inner">
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Score</span>
          <span className={`font-display text-2xl font-black ${scoreColorClass}`}>{score}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Today</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
            <ArrowRight className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold mt-0.5">+28 PTS Potential</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Potential Target</span>
          <span className="font-display text-2xl font-black text-emerald-500">{targetScore}</span>
          <span className="text-[10px] font-bold text-emerald-500 uppercase">After Optimization</span>
        </div>
      </div>

      {/* Radial Gauge Meter */}
      <div className="flex flex-col items-center justify-center text-center gap-3 py-1 grow">
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="60%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="9"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="url(#scoreGaugeGrad)"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`font-display text-3xl font-black ${scoreColorClass}`}>
              {score}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">/ 100 PTS</span>
          </div>
        </div>

        {/* Status Breakdown & Pill */}
        <div className="flex flex-col items-center text-center gap-2 w-full px-1">
          <Badge variant="emerald" className="px-3.5 py-1 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
            {statusBadge}
          </Badge>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Evaluated for role <span className="text-indigo-600 dark:text-indigo-300 font-bold">"{targetRole}"</span>.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 w-full">
            <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" /> High Shortlist Odds
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-500">
              <ShieldAlert className="w-3.5 h-3.5" /> 2 Recommendations
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
