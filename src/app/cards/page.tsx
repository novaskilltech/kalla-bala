'use client';

import React from 'react';
import { PrintCards } from '@/components/PrintCards';
import { kallaBalaData } from '@/kalla-bala.data';
import { useI18n } from '@/lib/i18n';
import { Printer } from 'lucide-react';

export default function CardsPage() {
  const { t, lang } = useI18n();

  return (
    <div className="space-y-8 py-6">
      
      {/* Header (hidden in print) */}
      <div className="no-print space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Printer className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'المذاكرة الورقية والتصدير' : 'Révision papier & Export'}
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t('printTitle')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          {lang === 'ar'
            ? 'بطاقات مراجعة منسقة وجاهزة للطباعة المنزلية أو الحفظ كملف PDF عالي الجودة للطلاب وحلقات القرآن.'
            : 'Fiches de révision calibrées pour l’impression ou l’exportation PDF, idéales pour les cercles d’apprentissage.'}
        </p>
      </div>

      {/* Print Engine */}
      <PrintCards items={kallaBalaData.items} />

    </div>
  );
}
