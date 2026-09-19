'use client';

import React from 'react';
import Link from 'next/link';
import { manzumaIntro, manzumaVerses } from '@/data/manzuma';
import { useI18n } from '@/lib/i18n';
import { CategoryBadge } from '@/components/Badge';
import { Scroll, Sparkles, BookOpen, ArrowLeft, ArrowRight, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function ManzumaPage() {
  const { t, lang, dir } = useI18n();

  const whatsappMessage = lang === 'ar'
    ? 'السلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن التسميع ونيل الإجازة بالسند المتصل في منظومة الوقف على كَلَّا وبَلَى.'
    : 'Assalamu alaykum wa rahmatullah, je souhaite des informations concernant la récitation et l\'obtention de l\'ijazah avec sanad dans la manzūma sur Kallā et Balā.';

  const whatsappUrl = `https://wa.me/212716014148?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto shadow-sm">
          <Scroll className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-arabic">
          {manzumaIntro.titleAr}
        </h1>
        <div className="flex items-center justify-center">
          <Link
            href="/author"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all border border-emerald-200/60 dark:border-emerald-800/60"
          >
            <span>{manzumaIntro.authorAr}</span>
            <span className="text-[11px] opacity-75 underline">{lang === 'ar' ? '(ترجمة الشيخ ومؤلفاته)' : '(Biographie & Œuvres)'}</span>
          </Link>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {lang === 'ar' ? manzumaIntro.descriptionAr : manzumaIntro.descriptionFr}
        </p>
      </div>

      {/* 🌟 Callout Card: Ijāzah in the Manẓūma via WhatsApp */}
      <section 
        id="ijaza"
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden space-y-6"
      >
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'طلب الإجازة بالسند المتصل' : 'Ijāzah avec chaîne de transmission (Sanad)'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'سند متصل إلى ناظمها رحمه الله' : 'Sanad ininterrompu vers l\'auteur'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black font-arabic text-white">
              {lang === 'ar' 
                ? 'نيل الإجازة بالسند في منظومة الوقف على كَلَّا وبَلَى'
                : 'Obtention de l\'Ijāzah dans la Manẓūma sur Kallā et Balā'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              {lang === 'ar'
                ? 'لكل من رغب في حفظ وضبط أبيات هذه المنظومة المباركة وعرضها لنيل الإجازة بالسند المتصل إلى ناظمها فضيلة الشيخ علي بن محمد توفيق النحاس رحمه الله، يمكنكم التواصل مباشرة عبر واتساب لترتيب موعد التسميع والاختبار.'
                : 'Pour toute personne souhaitant mémoriser, maîtriser et réciter cette منظومة afin d\'obtenir l\'Ijāzah avec chaîne de transmission (Sanad) reliée à son auteur le Cheikh Ali Tawfiq Al-Nahhas (qu\'Allah lui fasse miséricorde), contactez directement sur WhatsApp pour convenir d\'une séance d\'évaluation.'}
            </p>
          </div>

          {/* 3 Conditions / Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? '1. الحفظ والضبط' : '1. Mémorisation'}</span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                {lang === 'ar' ? 'إتقان حفظ الأبيات العشرة للمنظومة' : 'Maîtrise des 10 vers didactiques'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? '2. الفهم والدراية' : '2. Compréhension'}</span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                {lang === 'ar' ? 'استيعاب قواعد الوقف والوصل' : 'Compréhension des règles de waqf'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? '3. التسميع والإجازة' : '3. Récitation & Sanad'}</span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                {lang === 'ar' ? 'جلسة عرض ونيل الإجازة بالسند' : 'Évaluation directe et remise de l\'ijazah'}
              </p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>
                {lang === 'ar'
                  ? 'طلب الإجازة عبر واتساب (+212 716-014148)'
                  : 'Demander l\'Ijāzah sur WhatsApp (+212 716-014148)'}
              </span>
            </a>

            <span className="text-xs text-emerald-200/70 font-medium">
              {lang === 'ar'
                ? 'متاح للرجال والنساء — جلسات عن بُعد'
                : 'Disponible à distance — Frères & Sœurs'}
            </span>
          </div>

        </div>
      </section>

      {/* Verses Container */}
      <div className="space-y-6">
        {manzumaVerses.map((verse) => (
          <div
            key={verse.number}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-5"
          >
            {/* Number & Badge */}
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                {verse.number}
              </span>

              {verse.relatedCategory && (
                <CategoryBadge category={verse.relatedCategory} size="sm" />
              )}
            </div>

            {/* Poetic Distich (Bayt: Sadr & Ajuz) */}
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-200/60 dark:border-slate-700 text-center space-y-3">
              <p className="font-quran text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 tracking-wide">
                {verse.sadr}
              </p>
              <div className="w-12 h-0.5 bg-amber-300 dark:bg-slate-700 mx-auto" />
              <p className="font-quran text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 tracking-wide">
                {verse.ajuz}
              </p>
            </div>

            {/* Commentary */}
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 ml-2">
                {lang === 'ar' ? 'المعنى التعليمي للبيت:' : 'Sens pédagogique :'}
              </span>
              <span>{lang === 'ar' ? verse.explanationAr : verse.explanationFr}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Closing Action Banner */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'هل حفظت الأبيات وتريد التسميع؟' : 'Vous avez mémorisé les vers et souhaitez réciter ?'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'ar'
              ? 'تواصل مباشرة عبر واتساب مع الشيخ لترتيب مجلس التسميع ونيل الإجازة بالسند'
              : 'Contactez directement via WhatsApp pour planifier votre séance de récitation'}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span>{lang === 'ar' ? 'مراسلة واتساب (+212 716-014148)' : 'WhatsApp (+212 716-014148)'}</span>
        </a>
      </div>

    </div>
  );
}

