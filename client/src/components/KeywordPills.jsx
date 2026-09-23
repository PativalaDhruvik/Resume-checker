import React, { useState } from 'react';
import { Tag, Check, Plus, Copy, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const KeywordPills = ({ matchedKeywords = [], missingKeywords = [] }) => {
  const [activeTab, setActiveTab] = useState('matched');
  const [copiedKey, setCopiedKey] = useState('');
  const [addedSkills, setAddedSkills] = useState([]);

  const defaultMatched = matchedKeywords.length > 0 ? matchedKeywords : [
    { keyword: 'REACT.JS', category: 'Frontend', marketDemand: '34%' },
    { keyword: 'NODE.JS', category: 'Backend', marketDemand: '31%' },
    { keyword: 'MONGODB', category: 'Database', marketDemand: '28%' },
    { keyword: 'REST APIS', category: 'Architecture', marketDemand: '42%' },
    { keyword: 'TYPESCRIPT', category: 'Language', marketDemand: '36%' },
    { keyword: 'TAILWIND CSS', category: 'Styling', marketDemand: '22%' },
    { keyword: 'GIT', category: 'Tools', marketDemand: '45%' },
    { keyword: 'EXPRESS.JS', category: 'Framework', marketDemand: '25%' },
  ];

  const defaultMissing = missingKeywords.length > 0 ? missingKeywords : [
    { keyword: 'DOCKER', importance: 'High', recommendation: 'Add containerization experience.', marketDemand: '29%' },
    { keyword: 'CI/CD PIPELINES', importance: 'High', recommendation: 'Include deployment workflow details.', marketDemand: '27%' },
    { keyword: 'AWS (S3/EC2)', importance: 'Medium', recommendation: 'Mention cloud hosting platform.', marketDemand: '26%' },
    { keyword: 'MICROSERVICES', importance: 'Medium', recommendation: 'Highlight distributed system design.', marketDemand: '24%' },
    { keyword: 'REDIS CACHING', importance: 'Low', recommendation: 'Optional in performance section.', marketDemand: '18%' },
  ];

  const handleCopyKeyword = (keyword) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKey(keyword);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleAddSkill = (keyword) => {
    if (!addedSkills.includes(keyword)) {
      setAddedSkills([...addedSkills, keyword]);
    }
  };

  return (
    <Card className="glass-card flex flex-col justify-between h-full p-6 bg-white dark:bg-[#0F1626]/90 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500">
            <Tag className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Market Skill & Keyword Audit</h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Matched vs Required Job Keywords</span>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('matched')}
            className={`px-3.5 py-1 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'matched'
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Matched ({defaultMatched.length})
          </button>
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-3.5 py-1 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'missing'
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Missing Gaps ({defaultMissing.length})
          </button>
        </div>
      </div>

      {/* Keyword Pills Grid */}
      <div className="min-h-[120px]">
        {activeTab === 'matched' ? (
          <div className="flex flex-wrap gap-2">
            {defaultMatched.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyKeyword(item.keyword)}
                className="group flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm"
                title="Click to copy keyword"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>{item.keyword}</span>
                {item.marketDemand && (
                  <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-semibold ml-1">
                    {item.marketDemand}
                  </span>
                )}
                {copiedKey === item.keyword ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-emerald-500/60 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {defaultMissing.map((item, idx) => {
              const isAdded = addedSkills.includes(item.keyword);
              return (
                <div
                  key={idx}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all ${
                    isAdded
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-700 dark:text-indigo-300'
                      : 'bg-rose-500/10 border-rose-500/25 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20'
                  }`}
                >
                  <span>{item.keyword}</span>
                  {item.marketDemand && (
                    <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                      in {item.marketDemand} of postings
                    </span>
                  )}
                  {item.importance === 'High' && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-rose-500/30 text-rose-800 dark:text-rose-200 uppercase">
                      High Impact
                    </span>
                  )}
                  <button
                    onClick={() => handleAddSkill(item.keyword)}
                    className="p-1 rounded-lg bg-slate-200 dark:bg-slate-900 hover:bg-indigo-600 hover:text-white transition-colors ml-1"
                    title={isAdded ? 'Skill added' : 'Add keyword to resume target list'}
                  >
                    {isAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
        <span>Click any skill pill to copy to clipboard for your resume.</span>
        {addedSkills.length > 0 && (
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{addedSkills.length} keywords targeted</span>
        )}
      </div>
    </Card>
  );
};
