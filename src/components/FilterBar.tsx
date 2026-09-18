'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { CategoryType, DifficultyType, WordType } from '@/types';
import { Search, LayoutGrid, List, X, Filter } from 'lucide-react';

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  selectedWord: 'all' | WordType;
  setSelectedWord: (w: 'all' | WordType) => void;
  selectedCategory: 'all' | CategoryType;
  setSelectedCategory: (c: 'all' | CategoryType) => void;
  selectedDifficulty: 'all' | DifficultyType;
  setSelectedDifficulty: (d: 'all' | DifficultyType) => void;
  onlyDisagreements: boolean;
  setOnlyDisagreements: (b: boolean) => void;
  viewMode: 'card' | 'row';
  setViewMode: (v: 'card' | 'row') => void;
  totalResults: number;
  hideWordFilter?: boolean;
}

export function FilterBar({
  search,
  setSearch,
  selectedWord,
  setSelectedWord,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  onlyDisagreements,
  setOnlyDisagreements,
  viewMode,
  setViewMode,
  totalResults,
  hideWordFilter = false,
}: FilterBarProps) {
  const { t, lang } = useI18n();

  const resetFilters = () => {
    setSearch('');
    setSelectedWord('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setOnlyDisagreements(false);
  };

  const hasActiveFilters =
    search !== '' ||
    (!hideWordFilter && selectedWord !== 'all') ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    onlyDisagreements;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4 mb-8 transition-colors">
      
      {/* Top Search Bar & View Mode */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full sm:flex-1">
          <Search className="absolute right-3.5 ltr:right-auto ltr:left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pr-11 pl-10 ltr:pr-10 ltr:pl-11 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute left-3.5 ltr:left-auto ltr:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View mode toggle & Results count */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {lang === 'ar' ? `${totalResults} موضعًا` : `${totalResults} position(s)`}
          </span>

          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="عرض كبطاقات"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('row')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'row'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="عرض كقائمة"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
        
        {/* Word filter (if not hidden) */}
        {!hideWordFilter && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl">
            {(['all', 'كَلَّا', 'بَلَى'] as const).map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWord(w)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedWord === w
                    ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {w === 'all' ? t('filterAll') : w}
              </button>
            ))}
          </div>
        )}

        {/* Category filter */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {t('filterAll')}
          </button>
          <button
            onClick={() => setSelectedCategory('stop')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'stop'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400'
            }`}
          >
            🟢 {t('filterStop')}
          </button>
          <button
            onClick={() => setSelectedCategory('connect')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'connect'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-blue-600 dark:text-slate-400'
            }`}
          >
            🔵 {t('filterConnect')}
          </button>
          <button
            onClick={() => setSelectedCategory('prefer_connect')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'prefer_connect'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-amber-600 dark:text-slate-400'
            }`}
          >
            🟠 {lang === 'ar' ? 'الوجهان' : '2 avis'}
          </button>
        </div>

        {/* Disagreement toggle */}
        <button
          onClick={() => setOnlyDisagreements(!onlyDisagreements)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border ${
            onlyDisagreements
              ? 'bg-amber-500 text-white border-amber-500'
              : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400'
          }`}
        >
          <span>⚠️</span>
          <span>{lang === 'ar' ? 'مواضع الخلاف فقط' : 'Divergences uniquement'}</span>
        </button>

        {/* Difficulty select */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 px-2 py-1 rounded-xl text-xs">
          <span className="text-slate-400 font-medium">{t('filterDifficulty')}:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(
                e.target.value === 'all' ? 'all' : (Number(e.target.value) as DifficultyType)
              )
            }
            aria-label="Filtrer par niveau de difficulté"
            className="bg-transparent font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">{t('filterAll')}</option>
            <option value="1">★☆☆ {lang === 'ar' ? 'مبتدئ' : 'Niveau 1'}</option>
            <option value="2">★★☆ {lang === 'ar' ? 'متوسط' : 'Niveau 2'}</option>
            <option value="3">★★★ {lang === 'ar' ? 'متقدم' : 'Niveau 3'}</option>
          </select>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-500 hover:text-rose-700 px-2 py-1 rounded-lg transition-colors"
          >
            {lang === 'ar' ? 'إعادة ضبط' : 'Réinitialiser'}
          </button>
        )}

      </div>
    </div>
  );
}
