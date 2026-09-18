'use client';

import React, { useState, useEffect } from 'react';
import { KallaBalaItem } from '@/types';
import { useI18n } from '@/lib/i18n';
import { toggleFavorite, getProgress, markPositionViewed } from '@/lib/storage';
import { Bookmark, Copy, Check, Share2, MessageCircle } from 'lucide-react';

export function PositionDetailActions({ item }: { item: KallaBalaItem }) {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    markPositionViewed(item.id);
    const p = getProgress();
    setIsFav(p.favorites.includes(item.id));
  }, [item.id]);

  const handleCopy = () => {
    const textToCopy = `﴿${item.excerpt}﴾ [سورة ${item.sura}: ${item.ayah}]\nالحكم: ${item.scholarChoice}\nالشرح: ${item.simpleExplanation}\nالقاعدة: ${item.memoryRule}\nالمصدر: كَلَّا وَبَلَى — الوقف والابتداء خطوة بخطوة`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = () => {
    const res = toggleFavorite(item.id);
    setIsFav(res.isFavorite);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `الوقف على ${item.word} في سورة ${item.sura}`,
        text: `﴿${item.excerpt}﴾ — الحكم: ${item.scholarChoice}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `﴿${item.excerpt}﴾ [سورة ${item.sura}: ${item.ayah}]\nالحكم: ${item.scholarChoice}\nالشرح: ${item.simpleExplanation}\n${typeof window !== 'undefined' ? window.location.href : ''}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggleFav}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
          isFav
            ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500'
        }`}
        title="إضافة للمراجعة"
      >
        <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isFav ? t('btnBookmarked') : t('btnBookmark')}</span>
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 text-xs font-bold transition-colors"
        title="نسخ"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? t('btnCopied') : t('btnCopy')}</span>
      </button>

      <button
        onClick={handleWhatsApp}
        className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
        title="مشاركة عبر واتساب"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      <button
        onClick={handleShare}
        className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
        title="مشاركة الرابط"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
