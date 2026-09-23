import React from 'react';
import { Lightbulb, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';

export const ATSQuickTips = () => {
  const { user, activeCredits } = useAuth();
  const { setActiveTab } = useAnalysis();

  const creditsLeft = activeCredits;
  const isOutOfCredits = creditsLeft <= 0;

  const tips = [
    {
      title: 'Quantify Achievements',
      desc: 'Resumes with percentages (%), team sizes, or speed gains score 35%+ higher on ATS algorithms.',
    },
    {
      title: 'Single-Column Layout',
      desc: 'Avoid multi-column tables or text boxes which legacy parsers (Taleo, Workday) may scramble.',
    },
    {
      title: 'Keyword Frequency',
      desc: 'Include core target skills 2-3 times across your Summary and Work Experience sections.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Widget 1: Quick ATS Pro Tips */}
      <Card className="glass-card p-5 glow-border bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">ATS Optimization Pro-Tips</h3>
          </div>
          <Badge variant="emerald" className="text-[10px]">
            Best Practices
          </Badge>
        </div>

        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-2.5"
            >
              <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">{tip.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Widget 2: AI Scanner Status & Credits Card */}
      <Card className={`glass-card p-5 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-indigo-950/40 border ${isOutOfCredits ? 'border-rose-500/50' : 'border-indigo-500/30'} space-y-3 relative overflow-hidden`}>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">
              {user ? `${user.plan} Active` : 'Login Required'}
            </span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isOutOfCredits
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
          }`}>
            {user ? `${creditsLeft} Credits Left` : '0 Credits'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isOutOfCredits
            ? 'You are out of credits! Upgrade your plan to continue scanning resumes.'
            : user
            ? 'Each account gets 5 free resume scans. Scans update in real-time.'
            : 'Login is compulsory to run resume scans and save history.'}
        </p>

        <div className="flex items-center gap-2 pt-1">
          {isOutOfCredits || !user ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => setActiveTab(user ? 'pricing' : 'login')}
              className="w-full h-9 text-xs bg-gradient-to-r from-amber-500 to-orange-500 font-bold"
            >
              <Zap className="w-3.5 h-3.5 mr-1" />
              {user ? 'Upgrade Plan Now' : 'Sign In Required'}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('pricing')}
              className="w-full h-9 text-xs border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-300 fill-amber-300" />
              View Upgrade Plans
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
