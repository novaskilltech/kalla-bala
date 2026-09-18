'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { useI18n } from '@/lib/i18n';
import { BookOpen, Search, ArrowLeft, ArrowRight } from 'lucide-react';

export default function GlossaryPage() {
  const { t, lang, dir } = useI18n();
  const [search, setSearch] = useState('');

  const filtered = glossaryTerms.filter((term) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      term.termAr.includes(q) ||
      term.termFr.toLowerCase().includes(q) ||
      term.definitionAr.includes(q) ||
      term.definitionFr.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {lang === 'ar' ? 'معجم مصطلحات الوقف والابتداء' : 'Glossaire des termes fondamentaux'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {lang === 'ar'
            ? 'المفاهيم النحوية والتجويدية الأساسية لفهم علل الوقف والوصل على كَلَّا وبَلَى، مشفوعة بأمثلة وشواهد من مواضع المشروع.'
            : 'Définitions concises des notions syntaxiques et de récitation pour comprendre les causes des arrêts et liaisons.'}
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="absolute right-3.5 ltr:right-auto ltr:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث في المصطلحات والتعريفات...' : 'Rechercher un terme...'}
            className="w-full pr-10 pl-4 ltr:pr-4 ltr:pl-10 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {item.termAr}
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {item.termFr}
              </span>
            </div>

            {/* Definitions */}
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {lang === 'ar' ? item.definitionAr : item.definitionFr}
            </p>

            {/* Example Box */}
            {item.exampleExcerpt && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-200/60 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-400 ml-2">
                    {lang === 'ar' ? 'شاهد من القرآن:' : 'Exemple :'}
                  </span>
                  <span className="font-quran text-lg text-slate-900 dark:text-amber-100">
                    ﴿{item.exampleExcerpt}﴾
                  </span>
                  {item.exampleSura && (
                    <span className="text-xs text-slate-400 mr-2">
                      ({item.exampleSura} : {item.exampleAyah})
                    </span>
                  )}
                </div>

                {item.relatedItemId && (
                  <Link
                    href={`/positions/${item.relatedItemId}`}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>{lang === 'ar' ? 'دراسة هذا الموضع' : 'Étudier la position'}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
