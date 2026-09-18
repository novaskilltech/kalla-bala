'use client';

import React from 'react';
import Link from 'next/link';
import { kallaBalaData } from '@/kalla-bala.data';
import { useI18n } from '@/lib/i18n';
import { CategoryBadge, WordBadge, DisagreementBadge } from '@/components/Badge';
import { AlertCircle, Scale, ShieldCheck, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export default function DisagreementsPage() {
  const { t, lang, dir } = useI18n();

  // 10 items with scholarly disagreements
  const items = kallaBalaData.items.filter((i) => i.hasDisagreement);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="rounded-3xl bg-amber-500/10 dark:bg-amber-950/20 p-8 sm:p-10 border border-amber-300/60 dark:border-amber-700/60 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <Scale className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'الأمانة العلمية والتعدد الفقهي' : 'Rigueur scientifique & Diversité'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {lang === 'ar' ? 'مواضع الخلاف المعتبر بين علماء الوقف والابتداء' : 'Les 10 positions de divergence scientifique reconnues'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'لا يخفى على دارس علم التجويد أن باب الوقف والابتداء مبني على توجيه المعنى والإعراب؛ لذا وقع خلاف بين أئمة كبار (كالداني وابن الأنباري والنحاس والأشموني). هذا القسم يعرض تلك المواضع بكل تجرد وتوثيق دون إنكار على أي وجه صحيح.'
            : 'La science du waqf reposant sur l’interprétation grammaticale et sémantique, plusieurs savants éminents ont formulé des avis distincts mais valides.'}
        </p>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            {lang === 'ar'
              ? 'تنبيه: نميز في هذا الموقع بين ما رجحه الشيخ توفيق النحاس في رسالته، وبين ما ذهب إليه غيره من أهل العلم، ولا ندعي إجماعًا في موضع خلاف.'
              : 'Ce site expose le choix retenu par le Cheikh Tawfiq Al-Nahhas tout en respectant les avis légitimes des autres maîtres.'}
          </span>
        </div>
      </div>

      {/* Disagreement items list */}
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6"
          >
            {/* Header of item */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    سورة {item.sura} — الآية {item.ayah}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {item.word === 'كَلَّا' ? 'كَلَّا (ردع / استئناف)' : 'بَلَى (جواب النفي)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WordBadge word={item.word} />
                <CategoryBadge category={item.category} size="sm" />
              </div>
            </div>

            {/* Quran excerpt */}
            <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/60 border border-amber-100 dark:border-slate-700/60 text-center">
              <p className="font-quran text-2xl sm:text-3xl text-slate-900 dark:text-amber-100 leading-loose">
                ﴿{item.excerpt}﴾
              </p>
            </div>

            {/* 4 Pillars comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Sheikh Al-Nahhas choice */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <span>🟢</span>
                  <span>{lang === 'ar' ? 'اختيار الشيخ توفيق النحاس' : 'Choix du Cheikh Al-Nahhas'}</span>
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.scholarChoice}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.simpleExplanation}
                </p>
              </div>

              {/* Other opinion & cause */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <span>⚖️</span>
                  <span>{lang === 'ar' ? 'القول الآخر وسبب الخلاف' : 'Autre avis & Raison du désaccord'}</span>
                </span>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                  {item.disagreementNote}
                </p>
              </div>

            </div>

            {/* Summary & Link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                💡 {item.memoryRule}
              </div>

              <Link
                href={`/positions/${item.id}`}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>{lang === 'ar' ? 'فتح بطاقة الموضع الكاملة' : 'Consulter la fiche détaillée'}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
