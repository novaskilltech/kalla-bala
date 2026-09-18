'use client';

import React from 'react';
import { CategoryType, DifficultyType, WordType } from '@/types';
import { getCategoryBadge, getDifficultyBadge } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface CategoryBadgeProps {
  category: CategoryType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function CategoryBadge({ category, size = 'md', showIcon = true }: CategoryBadgeProps) {
  const { lang } = useI18n();
  const info = getCategoryBadge(category, lang);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2 font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border shadow-xs transition-all ${info.bg} ${sizeClasses}`}
    >
      <span className={`w-2 h-2 rounded-full ${info.dotBg} animate-pulse`} />
      {showIcon && <span>{info.icon}</span>}
      <span>{info.label}</span>
    </span>
  );
}

export function WordBadge({ word }: { word: WordType }) {
  const isKalla = word === 'كَلَّا';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold ${
        isKalla
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
          : 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
      }`}
    >
      {word}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: DifficultyType }) {
  const { lang } = useI18n();
  const info = getDifficultyBadge(difficulty, lang);

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
      <span className={info.color}>{info.stars}</span>
      <span>{info.label}</span>
    </span>
  );
}

export function DisagreementBadge() {
  const { lang } = useI18n();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
      <span>⚠️</span>
      <span>{lang === 'ar' ? 'موضع خلاف معتبر' : 'Divergence savante'}</span>
    </span>
  );
}
