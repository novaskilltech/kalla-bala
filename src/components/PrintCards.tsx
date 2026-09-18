'use client';

import React, { useState, useEffect } from 'react';
import { KallaBalaItem } from '@/types';
import { useI18n } from '@/lib/i18n';
import { getProgress } from '@/lib/storage';
import { CategoryBadge, WordBadge } from './Badge';
import { Printer, Download, Filter, FileText } from 'lucide-react';

interface PrintCardsProps {
  items: readonly KallaBalaItem[];
}

export function PrintCards({ items }: PrintCardsProps) {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<'all' | 'kalla' | 'bala' | 'favorites' | 'mistakes'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);

  useEffect(() => {
    const p = getProgress();
    setFavorites(p.favorites);
    setMistakes([...p.hard, ...p.review]);
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === 'kalla') return item.word === 'كَلَّا';
    if (filter === 'bala') return item.word === 'بَلَى';
    if (filter === 'favorites') return favorites.includes(item.id);
    if (filter === 'mistakes') return mistakes.includes(item.id);
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Control bar (hidden during print) */}
      <div className="no-print bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: t('printFilterAll') },
            { id: 'kalla', label: t('printFilterKalla') },
            { id: 'bala', label: t('printFilterBala') },
            { id: 'favorites', label: t('printFilterFavorites') },
            { id: 'mistakes', label: t('printFilterMistakes') },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filter === f.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Print & PDF Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{t('btnPrint')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-sm shadow-md transition-colors"
            title="حفظ كملف PDF عبر أمر الطباعة"
          >
            <Download className="w-4 h-4" />
            <span>{t('btnDownloadPDF')}</span>
          </button>
        </div>

      </div>

      {/* Printable Cards Header (shows on paper) */}
      <div className="hidden print:block text-center mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-2xl font-bold">بطاقات مراجعة الوقف على كَلَّا وبَلَى</h1>
        <p className="text-xs text-slate-600 mt-1">
          وفق اختيار الشيخ علي بن محمد توفيق النحاس — عدد البطاقات: {filteredItems.length}
        </p>
      </div>

      {/* Grid of Printable Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500">
            {lang === 'ar' ? 'لا توجد بطاقات مطابقة لهذا الخيار.' : 'Aucune carte ne correspond à ce filtre.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="print-break-inside-avoid print-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border-2 border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-400">#{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      سورة {item.sura} ({item.ayah})
                    </span>
                  </div>
                  <WordBadge word={item.word} />
                </div>

                {/* Excerpt */}
                <div className="py-3 text-center">
                  <p className="font-quran text-xl text-slate-900 dark:text-amber-100 leading-relaxed">
                    ﴿{item.excerpt}﴾
                  </p>
                </div>

                {/* Choice badge */}
                <div className="flex justify-center my-1">
                  <CategoryBadge category={item.category} size="sm" />
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal mt-2">
                  {item.simpleExplanation}
                </p>
              </div>

              {/* Memory rule footer */}
              {item.memoryRule && (
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  💡 {item.memoryRule}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
