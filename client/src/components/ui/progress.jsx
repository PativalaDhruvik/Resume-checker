import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Progress = ({ value = 0, color = 'bg-indigo-500', className, ...props }) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div
      className={twMerge(clsx('w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50', className))}
      {...props}
    >
      <div
        className={twMerge(clsx('h-full rounded-full transition-all duration-1000 ease-out shadow-sm', color))}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
