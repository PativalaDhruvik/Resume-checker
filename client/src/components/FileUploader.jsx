import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          1. Upload Resume Document
        </label>
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveInputMode('upload')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeInputMode === 'upload' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveInputMode('text')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeInputMode === 'text' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
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
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
              : selectedFile
              ? 'border-emerald-500/60 bg-emerald-500/5'
              : 'border-slate-700/80 hover:border-indigo-500/60 bg-slate-800/30 hover:bg-slate-800/50'
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
            <div className="flex items-center gap-3 w-full p-2 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden grow">
                <span className="text-sm font-semibold text-white truncate">{selectedFile.name}</span>
                <span className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI scan</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/10">
                <UploadCloud className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                Drag & Drop PDF Resume here or <span className="text-indigo-400 underline decoration-indigo-400/50">Browse Files</span>
              </p>
              <p className="text-xs text-slate-400">Supports PDF, DOCX, or TXT up to 5MB</p>
            </>
          )}

          {fileError && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {fileError}
            </div>
          )}
        </div>
      ) : (
        <textarea
          rows={5}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your raw resume text here..."
          className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
        />
      )}
    </div>
  );
};
