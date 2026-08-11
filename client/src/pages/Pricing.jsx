import React, { useState } from 'react';
import { Check, Zap, Shield, Crown, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const Pricing = ({ outOfCredits = false }) => {
  const { user, upgradePlan } = useAuth();
  const { setActiveTab } = useAnalysis();
  const [selectedBilling, setSelectedBilling] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9',
      credits: 15,
      description: 'Ideal for job seekers applying to a targeted set of roles.',
      icon: Shield,
      color: 'border-slate-700 hover:border-slate-500',
      badge: 'Starter',
      badgeVariant: 'slate',
      features: [
        '15 AI Resume Scans',
        '4-Pillar ATS Score Audit',
        'Matched & Missing Skill Tagging',
        'Standard Email Support',
      ],
      cta: 'Choose Basic',
      ctaVariant: 'outline',
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: '$19',
      credits: 50,
      description: 'Most popular choice for active job seekers & career changers.',
      icon: Zap,
      color: 'border-indigo-500 bg-indigo-950/20 shadow-xl shadow-indigo-500/10 glow-border',
      badge: 'Most Popular ✨',
      badgeVariant: 'emerald',
      features: [
        '50 AI Resume Scans',
        'Gemini 2.5 Flash Engine Deep Audit',
        'Live Bullet Point AI Optimizer',
        'Actionable Issue Auto-Fix Engine',
        'MongoDB Unlimited Audit History',
        'Priority AI Processing',
      ],
      cta: 'Upgrade to Standard',
      ctaVariant: 'default',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$39',
      credits: 999,
      description: 'Unlimited access for executives & career coaches.',
      icon: Crown,
      color: 'border-amber-500/60 bg-amber-950/10 hover:border-amber-500',
      badge: 'Unlimited VIP',
      badgeVariant: 'warning',
      features: [
        'Unlimited AI Resume Scans',
        'Dedicated Cover Letter Studio',
        '1-on-1 AI Executive Resume Audit',
        'Custom Job Description Matcher',
        'PDF Export & Download Studio',
        '24/7 Dedicated Priority Support',
      ],
      cta: 'Get Premium VIP',
      ctaVariant: 'secondary',
    },
  ];

  const handleSelectPlan = (plan) => {
    if (!user) {
      setActiveTab('login');
      return;
    }
    upgradePlan(plan.name, plan.credits);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      {outOfCredits && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-3 animate-bounce">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-white">You are out of credits!</h3>
            <p className="text-xs text-rose-300">
              You have used all 5 free resume scans. Upgrade to any plan below to continue scanning and optimizing your resume.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="default" className="px-3 py-1 text-xs">
          Flexible Pricing Plans
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Upgrade Your Career Copilot Plan
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Choose a plan tailored to your job hunt goals. Unlock high-converting ATS audits, keyword matchers, and instant AI rewrites.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mt-2">
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
              selectedBilling === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setSelectedBilling('annual')}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
              selectedBilling === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      {/* 3 Pricing Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const IconComp = plan.icon;
          return (
            <Card
              key={plan.id}
              className={`glass-card p-6 flex flex-col justify-between transition-all duration-300 ${plan.color} relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <Badge variant={plan.badgeVariant} className="text-xs font-bold px-2.5 py-0.5">
                    {plan.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-extrabold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed min-h-[36px]">{plan.description}</p>

                <div className="flex items-baseline gap-1 border-b border-slate-800 pb-4 mb-4">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.ctaVariant}
                onClick={() => handleSelectPlan(plan)}
                className={`w-full h-11 font-bold text-xs ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25'
                    : ''
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
