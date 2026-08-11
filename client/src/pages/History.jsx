import React from 'react';
import { History as HistoryIcon, Trash2, ExternalLink, Calendar, FileText } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { formatDate, getScoreColor } from '../utils/formatters';

export const History = () => {
  const { history, setCurrentAnalysis, removeHistoryItem, setActiveTab } = useAnalysis();

  const handleSelectRecord = (item) => {
    setCurrentAnalysis(item);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <HistoryIcon className="w-8 h-8 text-indigo-400" />
            Resume Audit History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access past ATS scores, missing keyword records, and AI bullet point revisions saved in MongoDB.
          </p>
        </div>
        <Badge variant="slate" className="px-3 py-1 text-xs">
          {history.length} Saved Analysis Reports
        </Badge>
      </div>

      {history.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Saved History Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Analyze your first resume on the Dashboard to start tracking ATS score improvements over time.
          </p>
          <Button onClick={() => setActiveTab('dashboard')}>Go to Dashboard</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((record) => {
            const scoreColor = getScoreColor(record.atsScore);
            return (
              <Card
                key={record._id}
                className="flex flex-col justify-between hover:border-indigo-500/50 transition-all cursor-pointer group"
                onClick={() => handleSelectRecord(record)}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {formatDate(record.createdAt)}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                        {record.targetRole}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className={`text-2xl font-black ${scoreColor}`}>
                        {record.atsScore}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold">/ 100 PTS</span>
                    </div>
                  </div>

                  <div className="space-y-2 py-3 border-t border-b border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">File scanned:</span>
                      <span className="font-semibold text-white truncate max-w-[160px]">
                        {record.fileName || 'Resume.pdf'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Matched Keywords:</span>
                      <span className="font-semibold text-emerald-400">
                        {record.matchedKeywords?.length || 0} matched
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Missing Keywords:</span>
                      <span className="font-semibold text-rose-400">
                        {record.missingKeywords?.length || 0} missing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-indigo-400 hover:text-indigo-300 p-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    Load Full Report
                  </Button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistoryItem(record._id);
                    }}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete record from MongoDB"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
