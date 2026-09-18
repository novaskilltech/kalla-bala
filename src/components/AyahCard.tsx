'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KallaBalaItem } from '@/types';
import { CategoryBadge, WordBadge, DifficultyBadge, DisagreementBadge } from './Badge';
import { useI18n } from '@/lib/i18n';
import { toggleFavorite, getProgress } from '@/lib/storage';
import { Bookmark, Copy, Check, ArrowLeft, ArrowRight, ExternalLink, Lightbulb } from 'lucide-react';

interface AyahCardProps {
  item: KallaBalaItem;
  viewMode?: 'card' | 'row';
}

export function AyahCard({ item, viewMode = 'card' }: AyahCardProps) {
  const { lang, dir } = useI18n();
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(() => {
    if (typeof window !== 'undefined') {
      return getProgress().favorites.includes(item.id);
    }
    return false;
  });

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const textToCopy = `﴿${item.excerpt}﴾ [سورة ${item.sura}: الآية ${item.ayah}]\nالحكم: ${item.scholarChoice}\nالشرح: ${item.simpleExplanation}\nالقاعدة: ${item.memoryRule}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleFavorite(item.id);
    setIsFav(res.isFavorite);
  };

  if (viewMode === 'row') {
    return (
      <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all hover:shadow-md gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-300">
            {item.suraNumber}:{item.ayah}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">سورة {item.sura}</span>
              <WordBadge word={item.word} />
              {item.hasDisagreement && <DisagreementBadge />}
            </div>
            <p className="font-quran text-lg text-slate-900 dark:text-white mt-1">
              ﴿{item.excerpt}﴾
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <CategoryBadge category={item.category} size="sm" />
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleFav}
              className={`p-2 rounded-xl border transition-colors ${
                isFav
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
              }`}
              title="حفظ في المفضلة"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <Link
              href={`/positions/${item.id}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <span>{lang === 'ar' ? 'التفاصيل' : 'Détails'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all hover:shadow-xl hover:-translate-y-0.5">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-300">
              سورة {item.sura} — آية {item.ayah}
            </span>
            <WordBadge word={item.word} />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleFav}
              className={`p-1.5 rounded-xl transition-colors ${
                isFav
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="إضافة للمراجعة"
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="نسخ النص والحكم"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Status Badge & Disagreement */}
        <div className="flex items-center justify-between gap-2 my-4 flex-wrap">
          <CategoryBadge category={item.category} size="md" />
          <DifficultyBadge difficulty={item.difficulty} />
        </div>

        {item.hasDisagreement && (
          <div className="mb-3">
            <DisagreementBadge />
          </div>
        )}

        {/* Quranic Excerpt */}
        <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/50 border border-amber-100/60 dark:border-slate-700/50 text-center my-3">
          <p className="font-quran text-2xl sm:text-3xl text-slate-900 dark:text-amber-100/90 leading-loose">
            ﴿{item.excerpt}﴾
          </p>
        </div>

        {/* Simple explanation */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
          {item.simpleExplanation}
        </p>

        {/* Memory Rule Box */}
        {item.memoryRule && (
          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300">
            <Lightbulb className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <span className="font-semibold">{item.memoryRule}</span>
          </div>
        )}
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
        <Link
          href={`/positions/${item.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors shadow-sm group-hover:shadow"
        >
          <span>{lang === 'ar' ? 'عرض الشرح والقاعدة الكاملة' : 'Voir l’explication complète'}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>

    </div>
  );
}
