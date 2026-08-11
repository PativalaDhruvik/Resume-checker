import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeResumeAPI, getHistoryAPI, deleteHistoryAPI } from '../services/api';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);
  const [themeMode, setThemeMode] = useState('dark');
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const loadHistory = async () => {
    try {
      const res = await getHistoryAPI();
      if (res.success && Array.isArray(res.data)) {
        setHistory(res.data);
      }
    } catch (err) {
      console.warn('Could not load history:', err.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const runAnalysis = async ({ file, targetRole, jobDescription, resumeText }) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('1. Extracting Resume Text & Structure...');

    const timer1 = setTimeout(() => {
      setLoadingStep('2. Gemini 2.5 Engine Scanning ATS Keywords & Formatting...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setLoadingStep('3. Scoring 4-Pillars & Generating Bullet Optimizations...');
    }, 2400);

    try {
      const result = await analyzeResumeAPI({ file, targetRole, jobDescription, resumeText });
      clearTimeout(timer1);
      clearTimeout(timer2);

      if (result.success && result.data) {
        setCurrentAnalysis(result.data);
        setHistory((prev) => [result.data, ...prev]);
        setIsLoading(false);
        setLoadingStep('');
        return result.data;
      } else {
        throw new Error(result.message || 'Analysis failed');
      }
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setLoadingStep('');
      setError(err.response?.data?.message || err.message || 'Error executing resume analysis');
      return null;
    }
  };

  const removeHistoryItem = async (id) => {
    try {
      await deleteHistoryAPI(id);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (currentAnalysis?._id === id) {
        setCurrentAnalysis(null);
      }
    } catch (err) {
      console.error('Failed to delete history item:', err);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        setCurrentAnalysis,
        history,
        isLoading,
        loadingStep,
        error,
        setError,
        themeMode,
        toggleTheme,
        activeTab,
        setActiveTab,
        runAnalysis,
        loadHistory,
        removeHistoryItem,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
