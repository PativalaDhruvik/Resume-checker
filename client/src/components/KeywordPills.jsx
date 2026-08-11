import React, { useState } from 'react';
import { Tag, Check, Plus, Copy, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const KeywordPills = ({ matchedKeywords = [], missingKeywords = [] }) => {
  const [activeTab, setActiveTab] = useState('matched'); // 'matched' | 'missing'
  const [copiedKey, setCopiedKey] = useState('');
  const [addedSkills, setAddedSkills] = useState([]);

  const defaultMatched = matchedKeywords.length > 0 ? matchedKeywords : [
    { keyword: 'REACT.JS', category: 'Frontend' },
    { keyword: 'NODE.JS', category: 'Backend' },
    { keyword: 'MONGODB', category: 'Database' },
    { keyword: 'REST APIS', category: 'Architecture' },
    { keyword: 'TYPESCRIPT', category: 'Language' },
    { keyword: 'TAILWIND CSS', category: 'Styling' },
    { keyword: 'GIT', category: 'Tools' },
    { keyword: 'EXPRESS.JS', category: 'Framework' },
  ];

  const defaultMissing = missingKeywords.length > 0 ? missingKeywords : [
    { keyword: 'DOCKER', importance: 'High', recommendation: 'Add containerization in Skills section.' },
    { keyword: 'CI/CD PIPELINES', importance: 'High', recommendation: 'Include deployment workflow details.' },
    { keyword: 'AWS (S3/EC2)', importance: 'Medium', recommendation: 'Mention cloud hosting platform.' },
    { keyword: 'MICROSERVICES', importance: 'Medium', recommendation: 'Highlight distributed system design.' },
    { keyword: 'REDIS CACHING', importance: 'Low', recommendation: 'Optional in performance section.' },
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
    <Card className="flex flex-col justify-between h-full bg-slate-900/80">
      {/* Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold tracking-tight text-white">ATS Keyword Analysis</h3>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('matched')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'matched'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Matched ({defaultMatched.length})
          </button>
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'missing'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing ({defaultMissing.length})
          </button>
        </div>
      </div>

      {/* Keyword Pills Display */}
      <div className="min-h-[120px]">
        {activeTab === 'matched' ? (
          <div className="flex flex-wrap gap-2">
            {defaultMatched.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyKeyword(item.keyword)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm"
                title="Click to copy keyword"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item.keyword}</span>
                {copiedKey === item.keyword ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />
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
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isAdded
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-rose-500/10 border-rose-500/25 text-rose-300 hover:bg-rose-500/20'
                  }`}
                >
                  <span>{item.keyword}</span>
                  {item.importance === 'High' && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-rose-500/30 text-rose-200 uppercase">
                      High
                    </span>
                  )}
                  <button
                    onClick={() => handleAddSkill(item.keyword)}
                    className="p-1 rounded-md bg-slate-900/60 hover:bg-indigo-600 hover:text-white transition-colors ml-1"
                    title={isAdded ? 'Skill added' : 'Add keyword to resume notes'}
                  >
                    {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Tip: Hover or click any pill to copy keyword to clipboard.</span>
        {addedSkills.length > 0 && (
          <span className="text-indigo-400 font-semibold">{addedSkills.length} keywords added</span>
        )}
      </div>
    </Card>
  );
};
