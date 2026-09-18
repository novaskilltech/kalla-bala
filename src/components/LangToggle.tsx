'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Languages } from 'lucide-react';

export function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
      title={lang === 'ar' ? 'Passer en Français' : 'التحويل إلى العربية'}
    >
      <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span>{lang === 'ar' ? 'FR' : 'العربية'}</span>
    </button>
  );
}
