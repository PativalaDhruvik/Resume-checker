import React from 'react';
import { Award, Info, Sparkles, CheckCircle, ShieldAlert } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { getScoreColor } from '../utils/formatters';

export const ScoreCard = ({ score = 84, statusBadge = 'Great ATS Compatibility', targetRole = 'Senior Full Stack Developer' }) => {
  // SVG Radial Gauge Calculation
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreColorClass = getScoreColor(score);

  return (
    <Card className="relative overflow-hidden glow-border flex flex-col justify-between h-full bg-slate-900/90 p-5">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold tracking-tight text-white">Overall ATS Compatibility</h3>
        </div>
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-slate-850 border border-slate-700 rounded-xl shadow-xl text-[11px] text-slate-300 z-30 leading-relaxed">
            Calculated across 4 ATS pillars: Formatting, Keyword Matching against {targetRole}, Quantitative Impact, and Structural Clarity.
          </div>
        </div>
      </div>

      {/* Radial Score Gauge Body - Vertical Stack for Perfect Alignment */}
      <div className="flex flex-col items-center justify-center text-center gap-4 py-1 grow">
        {/* SVG Circular Ring Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Animated Score Progress Arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-emerald-400 transition-all duration-1000 ease-out"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Centered Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-black tracking-tight ${scoreColorClass} drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]`}>
              {score}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">/ 100 PTS</span>
          </div>
        </div>

        {/* Status Breakdown & Pill */}
        <div className="flex flex-col items-center text-center gap-2 w-full px-1">
          <Badge variant="emerald" className="px-3 py-1 text-xs font-bold shadow-md shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            {statusBadge}
          </Badge>

          <p className="text-xs text-slate-300 leading-relaxed">
            Parsed with <strong className="text-emerald-400 font-bold">{score}% match</strong> for role <span className="text-indigo-300 font-medium">"{targetRole}"</span>.
          </p>

          <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-400 border-t border-slate-800/80 w-full mt-1">
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 14 Matched
            </span>
            <span className="flex items-center gap-1 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> 2 Audits
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

