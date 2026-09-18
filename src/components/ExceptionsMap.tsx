'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { CategoryBadge } from './Badge';
import { Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { kallaBalaData } from '@/kalla-bala.data';

export function ExceptionsMap() {
  const { lang, dir } = useI18n();

  const connectItems = kallaBalaData.items.filter(
    (i) => i.word === 'بَلَى' && i.category === 'connect'
  );
  const preferItems = kallaBalaData.items.filter(
    (i) => i.word === 'بَلَى' && i.category === 'prefer_connect'
  );

  return (
    <div className="rounded-3xl bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-950/20 dark:via-slate-800/90 dark:to-slate-800/90 p-6 sm:p-10 border border-amber-300/40 dark:border-amber-700/40 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ar' ? 'خريطة الاستثناءات في «بَلَى» (قاعدة 5 + 4)' : 'Carte des exceptions de « Balā » (Règle 5 + 4)'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? 'احفظ فقط 9 مواضع (5 وصل لازم + 4 خلاف والوصل أرجح)، وما عداها الـ 13 فكله وقف حسن!'
              : 'Retenez seulement 9 positions (5 liaisons obligatoires + 4 divergences avec liaison privilégiée). Les 13 autres sont toutes des arrêts !'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Box 1: 5 Connect */}
        <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-bold text-sm">
              {lang === 'ar' ? '5 مواضع: لا يقف عليها (وصل لازم)' : '5 positions : Liaison obligatoire'}
            </span>
            <CategoryBadge category="connect" size="sm" />
          </div>
          <p className="text-xs text-blue-900 dark:text-blue-300 mb-4 font-medium">
            {lang === 'ar'
              ? 'العلة: شدة التعلق بما بعدها؛ إما لكون ما بعدها شرطًا أو جواب قسم أو جملة لا يستقيم المعنى دونها.'
              : 'Cause : Dépendance syntaxique directe (condition, serment, serment en réponse).'}
          </p>

          <div className="space-y-3">
            {connectItems.map((item, idx) => (
              <Link
                key={item.id}
                href={`/positions/${item.id}`}
                className="block p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-blue-100 dark:border-blue-900/50 hover:border-blue-500 transition-all hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  <span>{idx + 1}. سورة {item.sura} — آية {item.ayah}</span>
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {dir === 'rtl' ? '←' : '→'}
                  </span>
                </div>
                <div className="font-quran text-base text-slate-900 dark:text-blue-100">
                  ﴿{item.excerpt}﴾
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 font-semibold mt-1">
                  💡 {item.memoryRule}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Box 2: 4 Prefer Connect / Wajhan */}
        <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-sm">
              {lang === 'ar' ? '4 مواضع: يجوز الوجهان والوصل أولى' : '4 positions : 2 avis (Wasl préféré)'}
            </span>
            <CategoryBadge category="prefer_connect" size="sm" />
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-300 mb-4 font-medium">
            {lang === 'ar'
              ? 'العلة: تم الجواب بـ«بلى»، لكن استدراك «ولكن» أو تعلق السياق يجعل وصلها أرجح عند الشيخ توفيق النحاس.'
              : 'Cause : La réponse est formellement complète, mais la conjonction restrictive rend la liaison plus harmonieuse.'}
          </p>

          <div className="space-y-3">
            {preferItems.map((item, idx) => (
              <Link
                key={item.id}
                href={`/positions/${item.id}`}
                className="block p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-amber-100 dark:border-amber-900/50 hover:border-amber-500 transition-all hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  <span>{idx + 1}. سورة {item.sura} — آية {item.ayah}</span>
                  <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {dir === 'rtl' ? '←' : '→'}
                  </span>
                </div>
                <div className="font-quran text-base text-slate-900 dark:text-amber-100">
                  ﴿{item.excerpt}﴾
                </div>
                <div className="text-xs text-amber-800 dark:text-amber-300 font-semibold mt-1">
                  ⚖️ {item.disagreementNote}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Rule summary */}
      <div className="mt-8 p-4 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🟢</span>
          <div>
            <h5 className="font-bold text-emerald-900 dark:text-emerald-200">
              {lang === 'ar' ? 'وما عدا ذلك (13 موضعًا)؟' : 'Et pour toutes les autres (13 positions) ?'}
            </h5>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              {lang === 'ar'
                ? 'حكمها الوقف الحسن المستحب لتمام جواب النفي واستقلال ما بعدها.'
                : 'La règle est l’arrêt convenable (waqf hasan) car la réponse affirmative est achevée.'}
            </p>
          </div>
        </div>

        <Link
          href="/positions?word=بَلَى&category=stop"
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
        >
          <span>{lang === 'ar' ? 'استعرض مواضع الوقف الـ 13' : 'Voir les 13 arrêts'}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </Link>
      </div>

    </div>
  );
}
