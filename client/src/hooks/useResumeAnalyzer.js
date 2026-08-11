import { useAnalysis } from '../context/AnalysisContext';

export const useResumeAnalyzer = () => {
  const {
    currentAnalysis,
    history,
    isLoading,
    loadingStep,
    error,
    runAnalysis,
    removeHistoryItem,
    setCurrentAnalysis,
  } = useAnalysis();

  return {
    currentAnalysis,
    history,
    isLoading,
    loadingStep,
    error,
    runAnalysis,
    removeHistoryItem,
    selectAnalysisFromHistory: (item) => setCurrentAnalysis(item),
  };
};
