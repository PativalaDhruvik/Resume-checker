import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        clsx(
          'flex h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
