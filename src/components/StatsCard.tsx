'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Sparkles, Layers, ArrowLeft, ArrowRight } from 'lucide-react';

export function StatsCard() {
  const { t, lang, dir } = useI18n();

  return (
    <div className="space-y-8">
      {/* 3 Main Stat Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1: Kalla */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-950/40 dark:via-slate-800 dark:to-slate-800 p-8 border border-purple-200/60 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-5xl font-black text-purple-700 dark:text-purple-300 font-arabic">
              33
            </span>
            <span className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-xl">
              ك
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
            {t('statKalla')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? '15 وقفًا 🛑 + 18 وصلًا ➡️' : '15 arrêts 🛑 + 18 liaisons ➡️'}
          </p>
          <div className="mt-6">
            <Link
              href="/kalla"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
            >
              <span>{lang === 'ar' ? 'استكشف قواعد كَلَّا' : 'Explorer les règles de Kallā'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>

        {/* Stat 2: Bala */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent dark:from-teal-950/40 dark:via-slate-800 dark:to-slate-800 p-8 border border-teal-200/60 dark:border-teal-800/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-5xl font-black text-teal-700 dark:text-teal-300 font-arabic">
              22
            </span>
            <span className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold text-xl">
              ب
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
            {t('statBala')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? '13 وقفًا + 5 وصل + 4 خلاف والوصل أرجح' : '13 arrêts + 5 liaisons + 4 à deux avis'}
          </p>
          <div className="mt-6">
            <Link
              href="/bala"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-100"
            >
              <span>{lang === 'ar' ? 'استكشف استثناءات بَلَى' : 'Explorer les exceptions de Balā'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>

        {/* Stat 3: Total 55 */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-slate-800 dark:to-slate-800 p-8 border border-emerald-200/60 dark:border-emerald-800/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-5xl font-black text-emerald-700 dark:text-emerald-300 font-arabic">
              55
            </span>
            <span className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-300 font-bold text-xl">
              📖
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
            {t('statTotal')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? 'محررة ومفصلة بقواعد حفظ سريعة' : 'Analysées et pourvues de moyens mnémotechniques'}
          </p>
          <div className="mt-6">
            <Link
              href="/positions"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100"
            >
              <span>{lang === 'ar' ? 'استعراض كل المواضع' : 'Parcourir toutes les positions'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>

      </div>

      {/* 2 Big Feature Cards: Kalla & Bala */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Kalla Big Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                {lang === 'ar' ? 'الباب الأول' : 'Partie I'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                كَلَّا
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              33 موضعًا
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'تأتي «كَلَّا» للردع والزجر وإبطال كلام باطل قبلها فيحسن الوقف، أو تأتي استئنافًا بمعنى حقًا فيتعين الوصل.'
              : '« Kallā » exprime le rejet catégorique d’une parole fausse (Waqf) ou introduit solennellement une affirmation nouvelle (Wasl).'}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">15</span>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                🟢 {lang === 'ar' ? 'موضعًا للوقف' : 'Positions d’arrêt'}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                {lang === 'ar' ? 'ردع وزجر لما قبلها' : 'Réfutation de la parole précédente'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60">
              <span className="text-2xl font-black text-blue-700 dark:text-blue-300">18</span>
              <p className="text-xs font-bold text-blue-900 dark:text-blue-200 mt-1">
                🔵 {lang === 'ar' ? 'موضعًا للوصل' : 'Positions de liaison'}
              </p>
              <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">
                {lang === 'ar' ? 'استئناف بمعنى «حقًا»' : 'Inchoation (« en vérité »)'}
              </p>
            </div>
          </div>

          <Link
            href="/kalla"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-colors shadow-sm"
          >
            <span>{lang === 'ar' ? 'تعلّم كَلَّا' : 'Apprendre Kallā'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Bala Big Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {lang === 'ar' ? 'الباب الثاني' : 'Partie II'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                بَلَى
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
              22 موضعًا
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'حرف جواب لإبطال النفي السابق؛ الأصل فيها الوقف لتمام الجواب، ما عدا 5 مواضع وصل و 4 مواضع خلاف معتبر.'
              : 'Particule affirmative invalidant une négation antérieure. La règle de base est l’arrêt (13), avec 5 liaisons et 4 à deux avis.'}
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300">13</span>
              <p className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                🟢 {lang === 'ar' ? 'وقف' : 'Arrêt'}
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300">5</span>
              <p className="text-[11px] font-bold text-blue-900 dark:text-blue-200 mt-1">
                🔵 {lang === 'ar' ? 'وصل' : 'Liaison'}
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300">4</span>
              <p className="text-[11px] font-bold text-amber-900 dark:text-amber-200 mt-1">
                🟠 {lang === 'ar' ? 'وجهان' : '2 avis'}
              </p>
            </div>
          </div>

          <Link
            href="/bala"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-sm"
          >
            <span>{lang === 'ar' ? 'تعلّم بَلَى' : 'Apprendre Balā'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
