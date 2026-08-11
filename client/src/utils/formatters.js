export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 65) return 'text-amber-400';
  return 'text-rose-400';
};

export const getScoreBgGradient = (score) => {
  if (score >= 80) return 'from-emerald-500 to-teal-600';
  if (score >= 65) return 'from-amber-500 to-yellow-600';
  return 'from-rose-500 to-red-600';
};
