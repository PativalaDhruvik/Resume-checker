import React, { useState } from 'react';
import { Sparkles, Search, Briefcase, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { FileUploader } from '../components/FileUploader';
import { ScoreCard } from '../components/ScoreCard';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { KeywordPills } from '../components/KeywordPills';
import { IssueFeed } from '../components/IssueFeed';
import { BulletDiff } from '../components/BulletDiff';
import { ATSQuickTips } from '../components/ATSQuickTips';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const Dashboard = () => {
  const { currentAnalysis, runAnalysis, isLoading, loadingStep, error, setError, setActiveTab } = useAnalysis();
  const { user, activeCredits, deductCredit } = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Developer');
  const [jobDescription, setJobDescription] = useState('');

  const quickRoles = ['Senior Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'Data Scientist', 'Product Manager'];

  const handleSubmitAnalysis = async (e) => {
    e.preventDefault();

    // Guard: Check if user or guest is out of credits (5 free scans max)
    if (activeCredits <= 0) {
      if (!user) {
        setError('You have used all 5 free guest credits! Please sign in or create an account to get 5 more credits.');
        setActiveTab('login');
      } else {
        setError('You are out of credits! Please upgrade your plan to continue scanning.');
        setActiveTab('pricing');
      }
      return;
    }

    const res = await runAnalysis({
      file: selectedFile,
      targetRole,
      jobDescription,
      resumeText,
    });

    if (res) {
      deductCredit();
    }
  };

  const data = currentAnalysis || {
    atsScore: 84,
    statusBadge: 'Great ATS Compatibility',
    categoryMetrics: { formatting: 90, keywordMatch: 78, impactMetrics: 85, clarity: 82 },
    matchedKeywords: [],
    missingKeywords: [],
    actionableIssues: [],
    bulletDiffs: [],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            AI Resume & ATS Checker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Get real-time feedback, keyword match scoring against target job descriptions, and targeted high-impact bullet point rewrites.
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout (40% Left Workspace / 60% Right Bento Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Interactive Input Workspace - 40% Width -> 5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmitAnalysis} className="glass-card p-6 space-y-6 glow-border bg-slate-900/90">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              Target Position & Resume Input
            </h2>

            {/* Drag & Drop File Upload Component */}
            <FileUploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              resumeText={resumeText}
              setResumeText={setResumeText}
            />

            {/* Target Job Role Control */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                2. Target Job Role *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="pl-10"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>

              {/* Quick Role Suggestions */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quickRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setTargetRole(role)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                      targetRole === role
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                3. Paste Job Description (Optional for Exact Keyword Matching)
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job posting details here to run deep semantic keyword gap analysis..."
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 p-3.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Action CTA Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 transform active:scale-[0.99]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Gemini 2.5 Audit...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Analyze Resume with Gemini ✨
                </span>
              )}
            </Button>
          </form>

          {/* Fill empty space on left column with ATSQuickTips & Scan Status Card */}
          <ATSQuickTips />
        </div>

        {/* Right Column (Dashboard Output / Results - 60% Width -> 7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading ? (
            /* Skeleton Loading State with Pulse Animation */
            <div className="glass-card p-8 space-y-6 text-center flex flex-col items-center justify-center min-h-[480px]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-1 animate-spin">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-indigo-400 animate-bounce" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Gemini 2.5 AI Audit in Progress</h3>
                <p className="text-xs text-indigo-300 font-semibold animate-pulse">{loadingStep}</p>
              </div>

              {/* Progress Pulse Skeleton Bars */}
              <div className="w-full max-w-md space-y-3 pt-4">
                <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse mx-auto" />
                <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse mx-auto" />
              </div>
            </div>
          ) : (
            /* Bento Grid Output Cards */
            <div className="space-y-6">
              {/* Row 1: Bento Box 1 (Score Gauge) & Bento Box 2 (Category Breakdown) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 min-h-[260px]">
                  <ScoreCard
                    score={data.atsScore}
                    statusBadge={data.statusBadge}
                    targetRole={targetRole}
                  />
                </div>
                <div className="md:col-span-7 min-h-[260px]">
                  <CategoryBreakdown metrics={data.categoryMetrics} />
                </div>
              </div>

              {/* Row 2: Bento Box 3 (Keyword Analysis Pills) */}
              <div>
                <KeywordPills
                  matchedKeywords={data.matchedKeywords}
                  missingKeywords={data.missingKeywords}
                />
              </div>

              {/* Row 3: Bento Box 4 (Actionable Issue Feed) */}
              <div>
                <IssueFeed issues={data.actionableIssues} />
              </div>

              {/* Row 4: Bento Box 5 (Live Bullet Point Optimizer) */}
              <div>
                <BulletDiff bulletDiffs={data.bulletDiffs} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
