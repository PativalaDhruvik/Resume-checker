import React from 'react';
import { Layout, Key, BarChart3, CheckSquare, HelpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

export const CategoryBreakdown = ({ metrics = {} }) => {
  const categories = [
    {
      id: 'formatting',
      label: 'Formatting & Structure',
      score: metrics.formatting || 90,
      icon: Layout,
      color: 'bg-indigo-500',
      description: 'Single-column parsing, font consistency, standard headings.',
    },
    {
      id: 'keywordMatch',
      label: 'Keyword Density & Match',
      score: metrics.keywordMatch || 78,
      icon: Key,
      color: 'bg-emerald-500',
      description: 'Overlap with target Job Description required skills & tools.',
    },
    {
      id: 'impactMetrics',
      label: 'Impact & Metrics',
      score: metrics.impactMetrics || 85,
      icon: BarChart3,
      color: 'bg-violet-500',
      description: 'Presence of percentages, revenue numbers, and scaled results.',
    },
    {
      id: 'clarity',
      label: 'Clarity & Brevity',
      score: metrics.clarity || 82,
      icon: CheckSquare,
      color: 'bg-amber-500',
      description: 'Sentence length, action-verb density, concise phrasing.',
    },
  ];

  return (
    <Card className="flex flex-col justify-between h-full bg-slate-900/80 p-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          4-Pillar Score Breakdown
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">Target ATS: 80%+</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 grow">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div key={cat.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-indigo-400 shrink-0">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 truncate">{cat.label}</span>
                  </div>
                  <span className="text-xs font-bold text-white shrink-0 ml-1">{cat.score}%</span>
                </div>
                <Progress value={cat.score} color={cat.color} />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 leading-tight">{cat.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
