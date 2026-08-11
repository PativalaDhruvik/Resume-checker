import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, Sparkles, CheckCircle2, ArrowRight, Wand2 } from 'lucide-react';
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
      title: 'No quantitative metrics found in Work Experience section.',
      description: 'ATS algorithms score resumes 40% higher when quantifiable metrics (percentages, team sizes, revenue numbers) are present.',
      recommendation: 'Incorporate quantified results like "Reduced API load time by 35%" or "Managed $100k budget".',
      suggestedFix: 'Rephrased bullet point with metrics: "Architected high-concurrency Node.js REST APIs, reducing response times by 35% across 100k daily active users."',
    },
    {
      id: 'iss-2',
      severity: 'warning',
      title: 'Multi-column layout or complex tables detected.',
      description: 'Legacy ATS parsers (Taleo, Workday) may scramble side-by-side columns and misattribute work dates.',
      recommendation: 'Use a clean, single-column vertical layout with standard H2 section headings.',
      suggestedFix: 'Reformatted text into linear single-column structure with standard section headers.',
    },
    {
      id: 'iss-3',
      severity: 'warning',
      title: 'Missing Docker & Cloud Deployment keywords.',
      description: 'The job posting heavily emphasizes containerized microservices deployments.',
      recommendation: 'Add Docker, Kubernetes, or AWS deployment bullet points into your Technical Skills.',
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
    <Card className="flex flex-col justify-between h-full bg-slate-900/80">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold tracking-tight text-white">Actionable ATS Audits & Fixes</h3>
        </div>
        <Badge variant="critical" className="text-[10px]">
          {defaultIssues.length - fixedIssueIds.length} Issues Remaining
        </Badge>
      </div>

      {/* Vertical Issue List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[320px] pr-1">
        {defaultIssues.map((issue) => {
          const isFixed = fixedIssueIds.includes(issue.id);
          const isFixing = activeFixingId === issue.id;

          return (
            <div
              key={issue.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isFixed
                  ? 'bg-emerald-500/5 border-emerald-500/20 opacity-75'
                  : issue.severity === 'critical'
                  ? 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500/50'
                  : 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {issue.severity === 'critical' ? (
                    <Badge variant="critical" className="flex items-center gap-1 uppercase">
                      <AlertOctagon className="w-3 h-3" /> Critical
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="flex items-center gap-1 uppercase">
                      <AlertTriangle className="w-3 h-3" /> Warning
                    </Badge>
                  )}
                  <h4 className="text-xs font-bold text-white">{issue.title}</h4>
                </div>

                {isFixed ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Fixed with AI
                  </span>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    disabled={isFixing}
                    onClick={() => handleFixWithAI(issue.id)}
                    className="h-8 px-3 text-[11px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shrink-0 shadow-sm"
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

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">{issue.description}</p>

              {/* Recommendation Callout Block */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-300 font-semibold">Recommendation: </strong>
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
