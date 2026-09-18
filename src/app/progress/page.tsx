'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { getProgress, saveProgress } from '@/lib/storage';
import { UserProgress } from '@/types';
import { kallaBalaData } from '@/kalla-bala.data';
import { AyahCard } from '@/components/AyahCard';
import { TrendingUp, CheckCircle2, RotateCw, AlertTriangle, Award, Bookmark, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

export default function ProgressPage() {
  const { t, lang, dir } = useI18n();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  const totalPositions = 55;
  const viewedCount = progress.viewed.length;
  const viewedPercent = Math.round((viewedCount / totalPositions) * 100);

  const masteredCount = progress.mastered.length;
  const reviewCount = progress.review.length;
  const hardCount = progress.hard.length;

  // Kalla progress
  const kallaIds = new Set<string>(kallaBalaData.items.filter((i) => i.word === 'كَلَّا').map((i) => i.id));
  const kallaMastered = progress.mastered.filter((id) => kallaIds.has(id)).length;
  const kallaPercent = Math.round((kallaMastered / 33) * 100);

  // Bala progress
  const balaIds = new Set<string>(kallaBalaData.items.filter((i) => i.word === 'بَلَى').map((i) => i.id));
  const balaMastered = progress.mastered.filter((id) => balaIds.has(id)).length;
  const balaPercent = Math.round((balaMastered / 22) * 100);

  // Quiz Stats
  const { quizStats } = progress;
  const avgScore = quizStats.totalQuestionsAnswered > 0
    ? Math.round((quizStats.correctAnswers / quizStats.totalQuestionsAnswered) * 100)
    : 0;

  // Favorites items
  const favoriteItems = kallaBalaData.items.filter((i) => progress.favorites.includes(i.id));
  // Hard items
  const hardItems = kallaBalaData.items.filter((i) => progress.hard.includes(i.id));

  const handleResetProgress = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من رغبتك في إعادة تعيين كل سجل التقدم؟' : 'Voulez-vous vraiment réinitialiser vos données ?')) {
      const empty: UserProgress = {
        viewed: [],
        mastered: [],
        review: [],
        hard: [],
        favorites: [],
        quizStats: {
          totalQuizzesTaken: 0,
          totalQuestionsAnswered: 0,
          correctAnswers: 0,
          lastScore: 0,
          lastTotal: 0,
          weakCategories: {},
        },
      };
      saveProgress(empty);
      setProgress(empty);
    }
  };

  return (
    <div className="space-y-10 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'ar' ? 'لوحة التحكم الفردية' : 'Tableau de bord personnel'}
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {t('progTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'متابعة حية لمستوى الحفظ والإتقان المخزن محليًا في متصفحك' : 'Suivi de mémorisation et de maîtrise stocké localement'}
          </p>
        </div>

        <button
          onClick={handleResetProgress}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إعادة تعيين التقدم' : 'Réinitialiser'}</span>
        </button>
      </div>

      {/* 4 Key Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">{t('progViewed')}</span>
            <span className="text-lg">👀</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {viewedCount} <span className="text-xs font-bold text-slate-400">/ 55</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-slate-500" style={{ width: `${viewedPercent}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-bold">{t('progMastered')}</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {masteredCount} <span className="text-xs font-bold text-slate-400">/ 55</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${Math.round((masteredCount / 55) * 100)}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-bold">{t('progNeedsReview')}</span>
            <RotateCw className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-amber-600">
            {reviewCount}
          </div>
          <div className="text-xs text-slate-400">
            {lang === 'ar' ? 'تحتاج إلى تثبيت' : 'À consolider'}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
            <span className="text-xs font-bold">{t('progHard')}</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-rose-600">
            {hardCount}
          </div>
          <div className="text-xs text-slate-400">
            {lang === 'ar' ? 'تحتاج تدريب مكثف' : 'Exige un entraînement'}
          </div>
        </div>

      </div>

      {/* Progress Bars: Kalla vs Bala vs Quiz Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kalla */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{t('progKallaProgress')}</span>
            <span className="text-sm font-black text-purple-600">{kallaPercent}%</span>
          </div>
          <div className="w-full h-3 bg-purple-50 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${kallaPercent}%` }} />
          </div>
          <div className="text-xs text-slate-400">
            {kallaMastered} {lang === 'ar' ? 'موضعًا متقنًا من أصل 33' : 'positions maîtrisées sur 33'}
          </div>
        </div>

        {/* Bala */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{t('progBalaProgress')}</span>
            <span className="text-sm font-black text-teal-600">{balaPercent}%</span>
          </div>
          <div className="w-full h-3 bg-teal-50 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-teal-600 rounded-full" style={{ width: `${balaPercent}%` }} />
          </div>
          <div className="text-xs text-slate-400">
            {balaMastered} {lang === 'ar' ? 'موضعًا متقنًا من أصل 22' : 'positions maîtrisées sur 22'}
          </div>
        </div>

        {/* Quiz Avg */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{t('progAvgScore')}</span>
            <span className="text-sm font-black text-emerald-600">{avgScore}%</span>
          </div>
          <div className="w-full h-3 bg-emerald-50 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${avgScore}%` }} />
          </div>
          <div className="text-xs text-slate-400">
            {quizStats.totalQuestionsAnswered} {lang === 'ar' ? 'سؤالًا تم الإجابة عليه في' : 'questions répondues sur'} {quizStats.totalQuizzesTaken} {lang === 'ar' ? 'اختبارات' : 'quiz'}
          </div>
        </div>

      </div>

      {/* Bookmarked / Favorites Section */}
      {favoriteItems.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Bookmark className="w-5 h-5 fill-current" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? `المواضع المحفوظة في المراجعة (${favoriteItems.length})` : `Positions enregistrées (${favoriteItems.length})`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <AyahCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Hard Items Section */}
      {hardItems.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? `مواضع صنفتها كصعبة (${hardItems.length})` : `Positions classées difficiles (${hardItems.length})`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardItems.map((item) => (
              <AyahCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
