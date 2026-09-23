import React, { useState } from 'react';
import { Sparkles, Search, Briefcase, FileText, RefreshCw, AlertCircle, Wand2, ShieldCheck, CheckCircle2, Zap, ArrowRight, Layers, BarChart3, HelpCircle } from 'lucide-react';
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
      deductCredit(res.userCreditsRemaining);
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
    <div className="relative min-h-screen bg-dot-pattern">
      {/* Top Ambient Glow Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/15 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative z-10">
        {/* Resumly-style Centered Hero Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Free AI ATS Resume & CV Checker
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Free ATS Checker for Your <span className="text-indigo-600 dark:text-indigo-400">Resume or CV</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Is your resume costing you interviews? Upload your file to calculate your deterministic ATS score, detect formatting & keyword blockers, and unlock line-by-line AI optimizations.
          </p>

          {/* Key Topics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['ATS score', 'Resume parsing', 'Keyword gaps', 'Formatting audits', 'Section order', 'Workday & Taleo Ready'].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-bold rounded-full bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Upload Dropzone & Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleSubmitAnalysis} className="glass-card p-6 space-y-6 glow-border bg-white dark:bg-[#0F1626]/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3.5">
                <h2 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  Resume Intake & Target Role
                </h2>
                <span className="text-xs font-semibold text-slate-400">Step 1 of 2</span>
              </div>

              {/* Drag & Drop Upload Component */}
              <FileUploader
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                resumeText={resumeText}
                setResumeText={setResumeText}
              />

              {/* Target Role Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
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
                    className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:border-indigo-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {quickRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                        targetRole === role
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Description Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  3. Job Description (Optional for Keyword Gap Audit)
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste target job requirements details here to run semantic keyword comparison..."
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-sm"
                />
              </div>

              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 transform active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running Gemini 2.5 Audit...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    Check ATS Score with Gemini ✨
                  </span>
                )}
              </Button>
            </form>

            <ATSQuickTips />
          </div>

          {/* Right Column: Audit Results Bento Grid */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <div className="glass-card p-10 space-y-6 text-center flex flex-col items-center justify-center min-h-[500px] bg-white dark:bg-[#0F1626]/95">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-400 p-1 animate-spin shadow-xl shadow-indigo-500/20">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <Wand2 className="w-8 h-8 text-indigo-400 animate-bounce" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Gemini 2.5 AI Audit in Progress</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 font-bold animate-pulse">{loadingStep}</p>
                </div>

                <div className="w-full max-w-md space-y-3 pt-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 animate-pulse mx-auto" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2 animate-pulse mx-auto" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Row 1: Score Box & 4-Pillar Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 min-h-[280px]">
                    <ScoreCard
                      score={data.atsScore}
                      statusBadge={data.statusBadge}
                      targetRole={targetRole}
                    />
                  </div>
                  <div className="md:col-span-7 min-h-[280px]">
                    <CategoryBreakdown metrics={data.categoryMetrics} />
                  </div>
                </div>

                {/* Row 2: Keyword Audit */}
                <div>
                  <KeywordPills
                    matchedKeywords={data.matchedKeywords}
                    missingKeywords={data.missingKeywords}
                  />
                </div>

                {/* Row 3: Actionable Audits */}
                <div>
                  <IssueFeed issues={data.actionableIssues} />
                </div>

                {/* Row 4: Bullet Diff Optimizer */}
                <div>
                  <BulletDiff bulletDiffs={data.bulletDiffs} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resumly "What You'll Get" Feature Grid */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Comprehensive Report</span>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">What You'll Get from Your ATS Report</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Every angle of your resume analyzed by Gemini AI to beat applicant tracking bots and land interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'ATS Compatibility Score', desc: 'Deterministic 0–100 score measuring how well your resume performs against top ATS software.' },
              { num: '2', title: 'Keyword Gap Analysis', desc: 'Identifies missing hard skills and industry terms with an injection strategy for placement.' },
              { num: '3', title: 'Recruiter 7-Second Audit', desc: 'Real recruiter perspective explaining how your bullet points read to hiring managers.' },
              { num: '4', title: 'Prioritized Fix List', desc: 'Ranked list of critical formatting blockers and content fixes to tackle first.' },
              { num: '5', title: 'Formatting Compliance', desc: 'Detects tables, text boxes, non-standard headers, and graphics causing parser failures.' },
              { num: '6', title: 'Line-by-Line AI Rewrites', desc: 'Free sample rewrites quantifying achievements with metrics before you decide.' },
            ].map((feature) => (
              <div key={feature.num} className="glass-card p-6 space-y-3 bg-white dark:bg-[#0F1626]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-display font-black flex items-center justify-center text-sm">
                  {feature.num}
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
