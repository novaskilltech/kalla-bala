'use client';

import React from 'react';
import Link from 'next/link';
import { sourceReferences } from '@/data/sources';
import { useI18n } from '@/lib/i18n';
import { Award, BookCheck, ShieldCheck, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SourcesPage() {
  const { t, lang, dir } = useI18n();

  const primarySource = sourceReferences.find((s) => s.isPrimary);
  const classicalSources = sourceReferences.filter((s) => !s.isPrimary);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
          <Award className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {lang === 'ar' ? 'المصادر والتوثيق العلمي' : 'Sources & Bibliographie scientifique'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {lang === 'ar'
            ? 'المراجع العلمية المعتمدة في تحرير مواضع الوقف والابتداء على كَلَّا وبَلَى في هذا المشروع'
            : 'Références savantes fondamentales ayant guidé l’élaboration et l’arbitrage de ce projet'}
        </p>
      </div>

      {/* Primary Reference Highlight */}
      {primarySource && (
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-white dark:from-emerald-950/40 dark:via-slate-800 dark:to-slate-800 border-2 border-emerald-500/50 dark:border-emerald-700/60 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
            <BookCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'المرجع التعليمي الأساسي للمشروع' : 'Référence pédagogique centrale'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'ar' ? primarySource.titleAr : primarySource.titleFr}
          </h2>

          <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
            {lang === 'ar' ? primarySource.authorAr : primarySource.authorFr}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {lang === 'ar' ? primarySource.roleAr : primarySource.roleFr}
          </p>

          <div className="pt-2">
            <Link
              href="/author"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'ar' ? 'ترجمة الشيخ علي توفيق النحاس وسيرته ومؤلفاته' : 'Biographie et œuvres complètes du Cheikh'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>
      )}

      {/* Classical Complementary References */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'ar' ? 'أمهات كتب الوقف والتجويد المعتمدة' : 'Ouvrages classiques de référence'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classicalSources.map((source, idx) => (
            <div
              key={source.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
                  <span>#{idx + 1}</span>
                  {source.deathYearH && <span>{source.deathYearH}</span>}
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? source.titleAr : source.titleFr}
                </h4>

                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {lang === 'ar' ? source.authorAr : source.authorFr}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {lang === 'ar' ? source.roleAr : source.roleFr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
