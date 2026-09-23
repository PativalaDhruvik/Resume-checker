import React from 'react';
import { Layout, Key, BarChart3, CheckSquare } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

export const CategoryBreakdown = ({ metrics = {} }) => {
  const categories = [
    {
      id: 'formatting',
      label: 'Formatting & Layout',
      score: metrics.formatting || 90,
      icon: Layout,
      color: 'bg-gradient-to-r from-indigo-500 to-violet-500',
      description: 'Single-column structure, standard section headers, font hierarchy.',
    },
    {
      id: 'keywordMatch',
      label: 'Keyword Match Rate',
      score: metrics.keywordMatch || 78,
      icon: Key,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      description: 'Skill density overlap against target role requirements.',
    },
    {
      id: 'impactMetrics',
      label: 'Impact & Quantification',
      score: metrics.impactMetrics || 85,
      icon: BarChart3,
      color: 'bg-gradient-to-r from-violet-500 to-purple-500',
      description: 'Presence of numerical metrics (%, $, scale, team size).',
    },
    {
      id: 'clarity',
      label: 'Clarity & Action Verbs',
      score: metrics.clarity || 82,
      icon: CheckSquare,
      color: 'bg-gradient-to-r from-amber-500 to-orange-400',
      description: 'Strong action verb density and concise sentence length.',
    },
  ];

  return (
    <Card className="glass-card flex flex-col justify-between h-full bg-[#0F1626]/90 p-6 glow-border">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-3.5">
        <h3 className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          4-Pillar Score Breakdown
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">Target ATS Threshold: 80%+</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 grow">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.id}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/90 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-200 truncate">{cat.label}</span>
                  </div>
                  <span className="text-xs font-black text-white shrink-0 ml-1.5 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                    {cat.score}%
                  </span>
                </div>
                <Progress value={cat.score} color={cat.color} />
              </div>
              <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">{cat.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
