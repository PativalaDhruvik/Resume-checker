import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, Sparkles, CheckCircle2, ArrowRight, Wand2, MessageSquareQuote } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const IssueFeed = ({ issues = [] }) => {
  const [fixedIssueIds, setFixedIssueIds] = useState([]);
  const [activeFixingId, setActiveFixingId] = useState(null);

  const defaultIssues = issues.length > 0 ? issues : [
    {
      id: 'iss-1',
      severity: 'critical',
      title: 'Not one of your bullets shows a measurable result',
      description: '0% of bullets contain a number or percentage metric (recommended target: 50–75%).',
      recommendation: 'Recruiters scan in 7 seconds — numbers are what stops the scan. Duty descriptions without outcomes read as junior.',
      suggestedFix: 'Rephrased bullet point with metrics: "Architected high-concurrency Node.js REST APIs, reducing response times by 35% across 100k daily active users."',
    },
    {
      id: 'iss-2',
      severity: 'warning',
      title: 'Multi-column layout or complex tables detected',
      description: 'Legacy ATS parsers (Taleo, Workday, Greenhouse) misread side-by-side columns.',
      recommendation: 'Use a clean, single-column vertical layout with standard section headings (Work Experience, Skills, Education).',
      suggestedFix: 'Reformatted text into linear single-column structure with standard section headers.',
    },
    {
      id: 'iss-3',
      severity: 'warning',
      title: 'Missing Docker & Cloud Deployment keywords',
      description: 'The job posting heavily emphasizes containerized microservices deployments.',
      recommendation: 'Add Docker, Kubernetes, or AWS deployment bullet points into your Technical Skills & Experience.',
      suggestedFix: 'Added "Docker containerization & CI/CD pipeline automation" to Tech Stack section.',
    },
  ];

  const handleFixWithAI = (id) => {
    setActiveFixingId(id);
    setTimeout(() => {
      setFixedIssueIds((prev) => [...prev, id]);
      setActiveFixingId(null);
    }, 1000);
  };

  return (
    <Card className="glass-card flex flex-col justify-between h-full p-6 bg-white dark:bg-[#0F1626]/90 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-rose-500/10 text-rose-500">
            <AlertOctagon className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Evidence-Based ATS Audits</h3>
        </div>
        <Badge variant="critical" className="text-[11px] px-3 py-1 font-bold">
          {defaultIssues.length - fixedIssueIds.length} Issues To Fix
        </Badge>
      </div>

      {/* Resumly 7-Second Recruiter Impression Quote Box */}
      <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 mb-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
          <MessageSquareQuote className="w-4 h-4" />
          What a recruiter thinks in 7 seconds:
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
          "Solid candidate claim, but bullet points lack quantitative metrics. Experience section needs clearer metrics to read senior-level."
        </p>
      </div>

      {/* Vertical Issue List */}
      <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[340px] pr-1">
        {defaultIssues.map((issue) => {
          const isFixed = fixedIssueIds.includes(issue.id);
          const isFixing = activeFixingId === issue.id;

          return (
            <div
              key={issue.id}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                isFixed
                  ? 'bg-emerald-500/5 border-emerald-500/30 opacity-80'
                  : issue.severity === 'critical'
                  ? 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500/50'
                  : 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {issue.severity === 'critical' ? (
                    <Badge variant="critical" className="flex items-center gap-1 uppercase text-[10px] font-bold">
                      <AlertOctagon className="w-3 h-3" /> Critical
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="flex items-center gap-1 uppercase text-[10px] font-bold">
                      <AlertTriangle className="w-3 h-3" /> Warning
                    </Badge>
                  )}
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{issue.title}</h4>
                </div>

                {isFixed ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Fixed with AI
                  </span>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    disabled={isFixing}
                    onClick={() => handleFixWithAI(issue.id)}
                    className="h-8 px-3 text-[11px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shrink-0 shadow-sm"
                  >
                    {isFixing ? (
                      <span className="flex items-center gap-1">
                        <Wand2 className="w-3 h-3 animate-spin" /> Optimizing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" /> Fix with AI
                      </span>
                    )}
                  </Button>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">{issue.description}</p>

              {/* Why This Matters Callout Block */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Why it matters: </strong>
                  {isFixed ? issue.suggestedFix : issue.recommendation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
