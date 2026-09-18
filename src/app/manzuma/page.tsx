'use client';

import React from 'react';
import Link from 'next/link';
import { manzumaIntro, manzumaVerses } from '@/data/manzuma';
import { useI18n } from '@/lib/i18n';
import { CategoryBadge } from '@/components/Badge';
import { Scroll, Sparkles, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ManzumaPage() {
  const { t, lang, dir } = useI18n();

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto shadow-sm">
          <Scroll className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-arabic">
          {manzumaIntro.titleAr}
        </h1>
        <div className="flex items-center justify-center">
          <Link
            href="/author"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all border border-emerald-200/60 dark:border-emerald-800/60"
          >
            <span>{manzumaIntro.authorAr}</span>
            <span className="text-[11px] opacity-75 underline">{lang === 'ar' ? '(ترجمة الشيخ ومؤلفاته)' : '(Biographie & Œuvres)'}</span>
          </Link>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {lang === 'ar' ? manzumaIntro.descriptionAr : manzumaIntro.descriptionFr}
        </p>
      </div>

      {/* Verses Container */}
      <div className="space-y-6">
        {manzumaVerses.map((verse) => (
          <div
            key={verse.number}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5"
          >
            {/* Number & Badge */}
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                {verse.number}
              </span>

              {verse.relatedCategory && (
                <CategoryBadge category={verse.relatedCategory} size="sm" />
              )}
            </div>

            {/* Poetic Distich (Bayt: Sadr & Ajuz) */}
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-200/60 dark:border-slate-700 text-center space-y-3">
              <p className="font-quran text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 tracking-wide">
                {verse.sadr}
              </p>
              <div className="w-12 h-0.5 bg-amber-300 dark:bg-slate-700 mx-auto" />
              <p className="font-quran text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 tracking-wide">
                {verse.ajuz}
              </p>
            </div>

            {/* Commentary */}
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 ml-2">
                {lang === 'ar' ? 'المعنى التعليمي للبيت:' : 'Sens pédagogique :'}
              </span>
              <span>{lang === 'ar' ? verse.explanationAr : verse.explanationFr}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
