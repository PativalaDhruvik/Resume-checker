import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export const FileUploader = ({ selectedFile, setSelectedFile, resumeText, setResumeText }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');
  const [activeInputMode, setActiveInputMode] = useState('upload'); // 'upload' | 'text'
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    setFileError('');
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds maximum 5MB limit.');
      return;
    }

    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.mimetype) && !file.name.match(/\.(pdf|txt|docx)$/i)) {
      setFileError('Invalid file type. Please upload a PDF, DOCX, or TXT document.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input Mode Selector */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          1. Upload Resume or Paste CV Text *
        </label>
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveInputMode('upload')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeInputMode === 'upload'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveInputMode('text')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeInputMode === 'text'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {activeInputMode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
              : selectedFile
              ? 'border-emerald-500 bg-emerald-500/5'
              : 'border-slate-300 dark:border-slate-800 hover:border-indigo-500/70 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex items-center gap-3 w-full p-3 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left overflow-hidden grow">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{selectedFile.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI ATS scan</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-indigo-500/10">
                <UploadCloud className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Drop your resume here, or <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-400/50">click to browse</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">PDF, DOCX or TXT · Analyzed in under 10 seconds</p>
            </>
          )}

          {fileError && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-500 font-semibold">
              <AlertCircle className="w-4 h-4" />
              {fileError}
            </div>
          )}
        </div>
      ) : (
        <textarea
          rows={6}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your raw resume text here to analyze ATS score..."
          className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-sm"
        />
      )}

      {/* Trust & Privacy Row (Resumly Style) */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800/80">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Your file stays private
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No credit card needed
        </span>
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> 5 Free scans included
        </span>
      </div>
    </div>
  );
};
