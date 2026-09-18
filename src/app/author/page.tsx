'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { authorData, AuthorWork } from '@/data/author';
import { useI18n } from '@/lib/i18n';
import { 
  Award, 
  BookOpen, 
  Scroll, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  BookCheck,
  Bookmark,
  Check,
  Library,
  Feather
} from 'lucide-react';

export default function AuthorPage() {
  const { lang, dir } = useI18n();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'qiraat' | 'tajweed' | 'waqf' | 'tahrirat' | 'manzuma'>('all');

  const filterOptions = [
    { id: 'all', labelAr: 'الكل (13)', labelFr: 'Tous (13)' },
    { id: 'waqf', labelAr: 'الوقف والابتداء', labelFr: 'Waqf & Ibtidāʾ' },
    { id: 'qiraat', labelAr: 'القراءات', labelFr: 'Qirāʾāt' },
    { id: 'tajweed', labelAr: 'التجويد', labelFr: 'Tajwīd' },
    { id: 'tahrirat', labelAr: 'التحريرات', labelFr: 'Taḥrīrāt' },
    { id: 'manzuma', labelAr: 'المنظومات', labelFr: 'Manẓūmāt' },
  ];

  const filteredWorks = useMemo(() => {
    if (selectedFilter === 'all') return authorData.works;
    return authorData.works.filter((w) => w.filterCategory === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      
      {/* 1. Hero Section */}
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? authorData.birthNoteAr : authorData.birthNoteFr}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-arabic tracking-tight leading-snug">
            {lang === 'ar' ? authorData.nameAr : authorData.nameFr}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400">
            {lang === 'ar' ? authorData.subtitleAr : authorData.subtitleFr}
          </p>
        </div>

        {/* Death date notice */}
        <div className="inline-block px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
          {lang === 'ar' ? authorData.deathDateAr : authorData.deathDateFr}
        </div>
      </section>

      {/* 2. Introduction Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
          <Feather className="w-4 h-4" />
          <span>{lang === 'ar' ? 'نبذة تعريفية' : 'Introduction biographique'}</span>
        </div>
        <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed sm:text-base text-sm">
          {(lang === 'ar' ? authorData.introParagraphsAr : authorData.introParagraphsFr).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* 3. Teachers Section (من شيوخه) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'ar' ? 'من شيوخه' : 'Ses maîtres'}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {authorData.teachers.map((teacher, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-white to-white dark:from-emerald-950/30 dark:via-slate-800/90 dark:to-slate-800/90 border border-emerald-500/30 dark:border-emerald-700/50 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? teacher.nameAr : teacher.nameFr}
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {lang === 'ar' ? 'شيخ عموم المقارئ المصرية الأسبق' : 'Maître éminent des lectures'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'ar' ? teacher.roleAr : teacher.roleFr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Focus Block: رسالة كَلَّا وبَلَى */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold">
            <BookCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الصلب العلمي لهذا الموقع' : 'Le socle scientifique du site'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">
            {lang === 'ar' ? authorData.risalaFocus.titleAr : authorData.risalaFocus.titleFr}
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            {lang === 'ar' ? authorData.risalaFocus.textAr : authorData.risalaFocus.textFr}
          </p>

          {/* 3 Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black">{authorData.risalaFocus.stats.kallaCount}</span>
              <span className="text-[11px] sm:text-xs text-emerald-100 font-medium">
                {lang === 'ar' ? 'موضعًا لـ كَلَّا' : 'occurrences Kallā'}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black">{authorData.risalaFocus.stats.balaCount}</span>
              <span className="text-[11px] sm:text-xs text-emerald-100 font-medium">
                {lang === 'ar' ? 'موضعًا لـ بَلَى' : 'occurrences Balā'}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black">{authorData.risalaFocus.stats.totalCount}</span>
              <span className="text-[11px] sm:text-xs text-emerald-100 font-medium">
                {lang === 'ar' ? 'موضعًا مدروسًا' : 'positions au total'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/positions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all hover:scale-105"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تعلّم كَلَّا وبَلَى' : 'Étudier les 55 positions'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href="/manzuma"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-900/50 hover:bg-emerald-900/70 text-emerald-100 font-semibold text-sm transition-all border border-emerald-400/30"
            >
              <Scroll className="w-4 h-4" />
              <span>{lang === 'ar' ? 'قراءة المنظومة التعليمية' : 'Consulter la Manẓūma'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Works Section (مؤلفاته وآثاره العلمية) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <Library className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'من مؤلفاته وآثاره العلمية' : 'Ses écrits et œuvres scientifiques'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {lang === 'ar'
              ? 'مؤلفات ومنظومات محققة وموثقة في التجويد، القراءات، والوقف والابتداء'
              : 'Ouvrages didactiques et poèmes méthodiques vérifiés dans les lectures coraniques et le tajwīd'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === opt.id
                  ? 'bg-emerald-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'ar' ? opt.labelAr : opt.labelFr}
            </button>
          ))}
        </div>

        {/* Works Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorks.map((work) => {
            const isHighlighted = work.isPrimary;
            return (
              <div
                key={work.id}
                className={`p-6 rounded-3xl transition-all flex flex-col justify-between space-y-4 ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 dark:from-amber-950/30 dark:via-slate-800 dark:to-emerald-950/30 border-2 border-amber-500/60 dark:border-amber-600/70 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {lang === 'ar' ? work.categoryAr : work.categoryFr}
                    </span>

                    {isHighlighted && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500 text-white shadow-xs">
                        <Bookmark className="w-3 h-3" />
                        {lang === 'ar' ? 'المصدر الأساسي لهذا الموقع' : 'Source principale'}
                      </span>
                    )}

                    {!isHighlighted && work.type === 'manzuma' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                        <Scroll className="w-3 h-3" />
                        {lang === 'ar' ? 'منظومة' : 'Poème'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug font-arabic">
                      {work.titleAr}
                    </h3>
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      {work.titleFr}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar' ? work.descriptionAr : work.descriptionFr}
                  </p>
                </div>

                {isHighlighted && (
                  <div className="pt-2 border-t border-amber-200 dark:border-amber-800/40">
                    <Link
                      href="/positions"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
                    >
                      <span>{lang === 'ar' ? 'تصفح مواضع الوقف الـ 55 في هذه الرسالة' : 'Consulter les 55 positions de cette épître'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Recueil de ses منظومات */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'ar' ? 'مجموع منظوماته' : 'Recueil de ses manẓūmāt'}
          </h2>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400">
            {lang === 'ar' ? authorData.manzumaCollection.titleAr : authorData.manzumaCollection.titleFr}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'ar' ? authorData.manzumaCollection.descriptionAr : authorData.manzumaCollection.descriptionFr}
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400 italic bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            {lang === 'ar' ? authorData.manzumaCollection.bibliographicNoteAr : authorData.manzumaCollection.bibliographicNoteFr}
          </p>
        </div>
      </section>

      {/* 7. Death Section (وفاته) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
          <Calendar className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'ar' ? authorData.deathSection.titleAr : authorData.deathSection.titleFr}
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {lang === 'ar' ? authorData.deathSection.textAr : authorData.deathSection.textFr}
        </p>

        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/60 text-center">
          {lang === 'ar' ? authorData.deathSection.prayerAr : authorData.deathSection.prayerFr}
        </p>
      </section>

      {/* 8. Sources & Rigorous Attribution Disclaimer */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'ar' ? 'المصادر والتوثيق المعتمد' : 'Sources & Rigueur bibliographique'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {authorData.sources.map((s, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 space-y-1.5"
            >
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                {lang === 'ar' ? s.titleAr : s.titleFr}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'ar' ? s.descriptionAr : s.descriptionFr}
              </p>
            </div>
          ))}
        </div>

        {/* Scholarly attribution disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <span className="font-bold block mb-1">
            {lang === 'ar' ? 'ضابط الأمانة العلمية في النسبة:' : 'Règle de rigueur éditoriale :'}
          </span>
          <span>
            {lang === 'ar' ? authorData.attributionDisclaimerAr : authorData.attributionDisclaimerFr}
          </span>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700 text-sm">
        <Link
          href="/sources"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors"
        >
          {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'المصادر والمراجع' : 'Sources & Références'}</span>
        </Link>

        <Link
          href="/manzuma"
          className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
        >
          <span>{lang === 'ar' ? 'منظومة كَلَّا وبَلَى' : 'La Manẓūma'}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>

    </div>
  );
}
