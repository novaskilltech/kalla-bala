'use client';

import React, { useState } from 'react';
import { FlashCard } from '@/components/FlashCard';
import { kallaBalaData } from '@/kalla-bala.data';
import { useI18n } from '@/lib/i18n';
import { BookMarked, Sparkles } from 'lucide-react';

export default function MemorizePage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<'all' | 'كَلَّا' | 'بَلَى'>('all');

  const items = filter === 'all'
    ? kallaBalaData.items
    : kallaBalaData.items.filter((i) => i.word === filter);

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto">
          <BookMarked className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {lang === 'ar' ? 'المُفَكِّرَة التفاعلية (بطاقات التكرار والحفظ)' : 'Mode Mémorisation (Flashcards)'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {lang === 'ar'
            ? 'انظر إلى الآية القرآنية، خمن الحكم والتعليل في ذهنك، ثم اقلب البطاقة لتقييم مستواك وتثبيت القاعدة في ذاكرتك.'
            : 'Observez l’extrait coranique, déduisez mentalement l’arrêt ou la liaison, puis retournez la fiche pour vous auto-évaluer.'}
        </p>

        {/* Filter Pills */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          {[
            { id: 'all', label: lang === 'ar' ? 'جميع البطاقات (55)' : 'Toutes (55)' },
            { id: 'كَلَّا', label: lang === 'ar' ? 'كَلَّا (33)' : 'Kallā (33)' },
            { id: 'بَلَى', label: lang === 'ar' ? 'بَلَى (22)' : 'Balā (22)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* FlashCard Component */}
      <FlashCard items={items} />

    </div>
  );
}
