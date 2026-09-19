'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Heart, BookOpen, ShieldCheck } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Scientific basis */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              ك
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">
              {t('siteTitle')}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            {lang === 'ar'
              ? 'مشروع تعليمي تطبيقي يهدف لتقريب أحكام الوقف والابتداء على كلمتي «كَلَّا» و«بَلَى» في 55 موضعًا قرآنيًا، اعتمادًا على تحرير واختيار الشيخ علي بن محمد توفيق النحاس رحمه الله.'
              : 'Projet éducatif moderne dédié à la compréhension des règles d’arrêt (waqf) et de liaison (wasl) sur « Kallā » et « Balā » à travers 55 occurrences coraniques, fondé sur l’épître du Cheikh Tawfiq Al-Nahhas.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'تنبيه منهجي: الأحكام المعروضة تمثل اختيار الشيخ توفيق النحاس، مع بيان أوجه الخلاف العلمي المعتبر دون ادعاء الإجماع.'
                : 'Avertissement : Les règles présentées reflètent les choix du Cheikh Tawfiq Al-Nahhas tout en exposant les divergences savantes reconnues.'}
            </span>
          </div>
        </div>

        {/* Col 2: Navigation rapide */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ar' ? 'أقسام الموقع' : 'Navigation'}
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/kalla" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navKalla')}</Link></li>
            <li><Link href="/bala" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navBala')}</Link></li>
            <li><Link href="/positions" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navPositions')}</Link></li>
            <li><Link href="/disagreements" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navDisagreements')}</Link></li>
            <li><Link href="/cards" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navCards')}</Link></li>
          </ul>
        </div>

        {/* Col 3: Pédagogie & Outils */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ar' ? 'الأدوات والمراجع' : 'Outils & Savoir'}
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/quiz" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navQuiz')}</Link></li>
            <li><Link href="/memorize" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navMemorize')}</Link></li>
            <li><Link href="/glossary" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navGlossary')}</Link></li>
            <li><Link href="/manzuma" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navManzuma')}</Link></li>
            <li><Link href="/sources" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('navSources')}</Link></li>
            <li><Link href="/author" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-emerald-700 dark:text-emerald-400">{t('navAuthor')}</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright, Signature, and Dynamic Visitor Counter */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
        
        {/* Purpose & Copyright */}
        <div className="space-y-1 text-center md:text-start">
          <p>
            {lang === 'ar' 
              ? 'موقع كَلَّا وبَلَى — متاح لوجه الله تعالى وقفًا ونفعًا عامًا.' 
              : 'Kallā & Balā — Ressource éducative libre et gratuite.'}
          </p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'ar'
              ? 'حقوق النشر © 2026 novaskilltech. جميع الحقوق محفوظة.'
              : 'Copyright © 2026 novaskilltech. Tous droits réservés.'}
          </p>
        </div>

        {/* Developer Signature */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium text-center">
          <span>{lang === 'ar' ? 'تطوير:' : 'Développé par :'}</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            Salah Eddine Ahmed Abousoulaymane
          </span>
        </div>

        {/* Dynamic Visitor Counter */}
        <div className="flex items-center">
          <VisitorCounter />
        </div>

      </div>
    </footer>
  );
}
