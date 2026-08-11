import React, { useState } from 'react';
import { Zap, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const BulletOptimizerStudio = () => {
  const [inputBullet, setInputBullet] = useState(
    'Responsible for writing backend APIs and maintaining database tables for internal application.'
  );
  const [targetRole, setTargetRole] = useState('Senior Backend Engineer');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleOptimize = (e) => {
    e.preventDefault();
    setIsOptimizing(true);

    setTimeout(() => {
      setResult({
        original: inputBullet,
        aiImproved: `Architected high-throughput REST APIs using Node.js & Express, optimizing MongoDB queries to reduce database response times by 42% for 150k+ daily users.`,
        impactIncrease: '+42% Impact',
        metricsAdded: ['Added 42% latency reduction metric', 'Quantified scale (150k+ daily users)', 'Replaced passive phrasing with action verb "Architected"'],
      });
      setIsOptimizing(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.aiImproved);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap className="w-6 h-6 text-white fill-current" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI Bullet Point Rewrite Studio</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Transform weak resume bullets into quantifiable, high-impact achievements scanned favorably by top ATS algorithms.
        </p>
      </div>

      <Card className="glass-card p-6 glow-border bg-slate-900/90 space-y-6">
        <form onSubmit={handleOptimize} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Target Job Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-700 bg-slate-950 px-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Paste Resume Bullet Point To Transform
            </label>
            <textarea
              rows={3}
              required
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Worked on database and updated backend services..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isOptimizing}
            className="w-full h-11 bg-gradient-to-r from-amber-500 via-indigo-600 to-violet-600 text-white font-bold"
          >
            {isOptimizing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Rewriting with Gemini 2.5...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Optimize Bullet Point
              </span>
            )}
          </Button>
        </form>

        {result && (
          <div className="pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" /> AI Quantified Bullet
                </span>
                <Badge variant="emerald" className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {result.impactIncrease}
                </Badge>
              </div>

              <p className="text-sm font-medium text-white leading-relaxed">
                "{result.aiImproved}"
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {result.metricsAdded.map((m, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
                    ✓ {m}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <Button size="sm" onClick={handleCopy} className="bg-indigo-600 hover:bg-indigo-500">
                  {copied ? <Check className="w-4 h-4 mr-1 text-emerald-300" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Rewritten Bullet'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
