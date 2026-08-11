import React, { useState } from 'react';
import { Zap, Copy, Check, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
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
      aiImproved: 'Architected high-throughput REST APIs using Java Spring Boot, reducing API response times by 35% for 100k+ daily users.',
      impactScoreIncrease: '+35% Impact',
      improvementsMade: ['Added 35% latency reduction metric', 'Used strong action verb "Architected"', 'Specified tech stack (Spring Boot)'],
    },
    {
      id: 'diff-2',
      section: 'Projects',
      original: 'Built user interface with React and updated state components.',
      aiImproved: 'Engineered dynamic React 18 dashboard components with Tailwind CSS glassmorphism, boosting user session time by 28%.',
      impactScoreIncrease: '+28% Impact',
      improvementsMade: ['Added engagement metric', 'Specified React 18 & glassmorphism stack'],
    },
  ];

  const currentDiff = defaultDiffs[activeIndex] || defaultDiffs[0];

  const handleCopySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="flex flex-col justify-between h-full bg-slate-900/90 glow-border">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <h3 className="text-sm font-bold tracking-tight text-white">Live Bullet Point AI Optimizer</h3>
        </div>

        {/* Diff Tabs Selector */}
        <div className="flex items-center gap-1.5">
          {defaultDiffs.map((diff, idx) => (
            <button
              key={diff.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                activeIndex === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Snippet #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Diff Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Original Bullet */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Original Bullet ({currentDiff.section})
              </span>
              <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Low ATS Score
              </span>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{currentDiff.original}"
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-500">
            Lacks metric quantification & high-impact verbs.
          </div>
        </div>

        {/* Right: AI Improved Bullet */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 flex flex-col justify-between shadow-lg shadow-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  AI Enhanced Version
                </span>
              </div>
              <Badge variant="emerald" className="flex items-center gap-1 text-[10px]">
                <TrendingUp className="w-3 h-3" /> {currentDiff.impactScoreIncrease}
              </Badge>
            </div>

            <p className="text-xs font-medium text-white leading-relaxed">
              "{currentDiff.aiImproved}"
            </p>

            {/* Enhancements Made */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {currentDiff.improvementsMade?.map((imp, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
                  ✓ {imp}
                </span>
              ))}
            </div>
          </div>

          {/* 1-Click Copy Snippet */}
          <div className="mt-4 pt-3 border-t border-indigo-500/20 flex items-center justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleCopySnippet(currentDiff.aiImproved, currentDiff.id)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs gap-1.5"
            >
              {copiedId === currentDiff.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  Copied Snippet!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Snippet
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
