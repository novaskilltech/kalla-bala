'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { StatsCard } from '@/components/StatsCard';
import { AyahCard } from '@/components/AyahCard';
import { kallaBalaData } from '@/kalla-bala.data';
import { Sparkles, HelpCircle, ArrowLeft, ArrowRight, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { t, lang, dir } = useI18n();

  // Curated 3 featured items to showcase on the home page
  const featured = [
    kallaBalaData.items.find((i) => i.id === 'kalla-26-62')!, // Shuara
    kallaBalaData.items.find((i) => i.id === 'bala-7-172')!,  // Araf: Alastu bi-rabbikum
    kallaBalaData.items.find((i) => i.id === 'bala-67-9')!,   // Mulk: Bala qad ja'ana nadhir (wajhan)
  ].filter(Boolean);

  return (
    <div className="space-y-16 py-4">
      
      {/* HERO SECTION */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-6 pb-4">
        
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'ar' ? 'علم الوقف والابتداء محررًا بدقة علمية' : 'Science du Waqf & Ibtidāʾ vulgarisée et structurée'}</span>
        </div>

        {/* Main Title & Catchphrase */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('siteTitle')}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
            {t('siteSubtitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
            {t('heroDescription')}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/positions"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>{t('startLearning')}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </Link>

          <Link
            href="/quiz"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('testYourself')}</span>
          </Link>
        </div>

      </section>

      {/* STATS & 2 BIG CARDS SECTION */}
      <section>
        <StatsCard />
      </section>

      {/* FEATURED EXAMPLES SECTION */}
      <section className="space-y-8 pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {lang === 'ar' ? 'نماذج تطبيقية' : 'Exemples représentatifs'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {lang === 'ar' ? 'من أشهر مواضع الوقف والوصل' : 'Parmi les occurrences les plus célèbres'}
            </h3>
          </div>

          <Link
            href="/positions"
            className="text-sm font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'عرض الـ 55 موضعًا كلها' : 'Voir les 55 positions'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <AyahCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SCIENTIFIC METHODOLOGY BANNER */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الأمانة العلمية والتجرد' : 'Rigueur scientifique'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {lang === 'ar'
              ? 'اختيار الشيخ علي بن محمد توفيق النحاس'
              : 'Le choix raisonné du Cheikh Tawfiq Al-Nahhas'}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'صيغت أحكام هذا الموقع وفق الرسالة العلمية المحررة للشيخ توفيق النحاس، مع الالتزام التام بإبراز مواضع الخلاف المعتبر بين علماء الوقف دون جزم بما ليس فيه إجماع.'
              : 'Ce site présente fidèlement l’analyse scientifique du Cheikh Tawfiq Al-Nahhas, tout en exposant clairement les divergences reconnues sans prétendre à un consensus indu.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/sources"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              {lang === 'ar' ? 'الاطلاع على المصادر والتوثيق' : 'Consulter les sources'}
            </Link>
            <Link
              href="/disagreements"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
            >
              {lang === 'ar' ? 'استعراض مواضع الخلاف' : 'Voir les divergences'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
