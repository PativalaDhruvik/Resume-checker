import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ className, children, ...props }) => (
  <div
    className={twMerge(
      clsx(
        'glass-card p-6 transition-all duration-300 hover:border-slate-700/80',
        className
      )
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={twMerge(clsx('flex flex-col gap-1 mb-4', className))} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={twMerge(clsx('text-lg font-bold tracking-tight text-white flex items-center gap-2', className))} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={twMerge(clsx('text-xs text-slate-400', className))} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={twMerge(clsx('', className))} {...props}>
    {children}
  </div>
);
