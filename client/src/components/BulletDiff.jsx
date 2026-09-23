import React, { useState } from 'react';
import { Zap, Copy, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const BulletDiff = ({ bulletDiffs = [] }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultDiffs = bulletDiffs.length > 0 ? bulletDiffs : [
    {
      id: 'diff-1',
      section: 'Work Experience',
      original: 'Developed Java backend REST APIs for internal client application.',
      aiImproved: 'Architected high-throughput REST APIs using Java Spring Boot, reducing API response times by 35% across 100k+ daily active users.',
      impactScoreIncrease: '+35% Impact Gain',
      improvementsMade: ['Added 35% latency reduction metric', 'Action verb "Architected"', 'Specified technology stack'],
    },
    {
      id: 'diff-2',
      section: 'Projects',
      original: 'Built user interface with React and updated state components.',
      aiImproved: 'Engineered dynamic React 18 dashboard components with Tailwind CSS glassmorphism, boosting user session duration by 28%.',
      impactScoreIncrease: '+28% Impact Gain',
      improvementsMade: ['Added 28% engagement metric', 'Specified React 18 & Glassmorphism stack'],
    },
  ];

  const currentDiff = defaultDiffs[activeIndex] || defaultDiffs[0];

  const handleCopySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="glass-card flex flex-col justify-between h-full p-6 bg-white dark:bg-[#0F1626]/90 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Zap className="w-4.5 h-4.5 fill-amber-500" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Sample Line Rewrites (Free AI Optimizations)</h3>
        </div>

        {/* Snippet Selector */}
        <div className="flex items-center gap-1.5">
          {defaultDiffs.map((diff, idx) => (
            <button
              key={diff.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeIndex === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bullet #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Resumly BEFORE vs AFTER Diff Layout */}
      <div className="space-y-4">
        {/* BEFORE Row */}
        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300 uppercase tracking-wider">
              BEFORE
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{currentDiff.section}</span>
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-300 line-through leading-relaxed">
            "{currentDiff.original}"
          </p>
        </div>

        {/* AFTER Row */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> AFTER (AI ATS ENHANCED)
            </span>
            <Badge variant="emerald" className="flex items-center gap-1 text-[10px] font-bold">
              <TrendingUp className="w-3 h-3" /> {currentDiff.impactScoreIncrease}
            </Badge>
          </div>

          <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
            "{currentDiff.aiImproved}"
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentDiff.improvementsMade?.map((imp, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                ✓ {imp}
              </span>
            ))}
          </div>

          <div className="pt-2 flex justify-end border-t border-emerald-500/20">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleCopySnippet(currentDiff.aiImproved, currentDiff.id)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 shadow-sm"
            >
              {copiedId === currentDiff.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Copied Snippet!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Rewritten Line
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
