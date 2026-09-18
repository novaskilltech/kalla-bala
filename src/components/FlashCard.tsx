'use client';

import React, { useState } from 'react';
import { KallaBalaItem } from '@/types';
import { CategoryBadge, WordBadge, DisagreementBadge } from './Badge';
import { useI18n } from '@/lib/i18n';
import { updateCardStatus } from '@/lib/storage';
import { RotateCw, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface FlashCardProps {
  items: readonly KallaBalaItem[];
}

export function FlashCard({ items }: FlashCardProps) {
  const { t, lang, dir } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">
          {lang === 'ar' ? 'لا توجد بطاقات متاحة في هذا التصنيف.' : 'Aucune fiche disponible dans cette catégorie.'}
        </p>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (status: 'known' | 'review' | 'hard') => {
    updateCardStatus(currentItem.id, status);
    setCompletedCount((prev) => prev + 1);
    setIsFlipped(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Progress header */}
      <div className="flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <span>{lang === 'ar' ? 'البطاقة:' : 'Fiche :'}</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <div>
          <span>{lang === 'ar' ? `المُراجَع: ${completedCount}` : `Révisées : ${completedCount}`}</span>
        </div>
      </div>

      {/* Interactive Card */}
      <div
        onClick={handleFlip}
        className="cursor-pointer min-h-[360px] sm:min-h-[400px] flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all shadow-xl hover:shadow-2xl relative select-none"
      >
        
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              سورة {currentItem.sura} ({currentItem.ayah})
            </span>
            <WordBadge word={currentItem.word} />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? (lang === 'ar' ? 'الوجه الخلفي' : 'Verso') : (lang === 'ar' ? 'الوجه الأمامي' : 'Recto')}</span>
          </div>
        </div>

        {/* Center Content */}
        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="my-auto text-center space-y-6 py-6">
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-100 dark:border-slate-700/60">
              <p className="font-quran text-3xl sm:text-4xl text-slate-900 dark:text-amber-100 leading-loose">
                ﴿{currentItem.excerpt}﴾
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-base border border-emerald-200 dark:border-emerald-800">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>{t('flashcardQuestion')}</span>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t('flashcardClickToReveal')}
            </p>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="my-auto text-center space-y-5 py-4 animate-fadeIn">
            <div className="flex justify-center">
              <CategoryBadge category={currentItem.category} size="lg" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 text-right ltr:text-left space-y-2 border border-slate-100 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {currentItem.simpleExplanation}
              </p>
              {currentItem.hasDisagreement && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <DisagreementBadge />
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                    {currentItem.disagreementNote}
                  </p>
                </div>
              )}
            </div>

            {currentItem.memoryRule && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                💡 {currentItem.memoryRule}
              </div>
            )}
          </div>
        )}

        {/* Card Footer prompt */}
        <div className="text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-3">
          {lang === 'ar' ? 'انقر على البطاقة لقلبها' : 'Cliquez sur la carte pour la retourner'}
        </div>

      </div>

      {/* Action Buttons (Rate when flipped, or Flip/Next) */}
      {isFlipped ? (
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleRate('hard')}
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-sm hover:bg-rose-100 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t('btnHard')}</span>
          </button>

          <button
            onClick={() => handleRate('review')}
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-sm hover:bg-amber-100 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            <span>{t('btnNeedReview')}</span>
          </button>

          <button
            onClick={() => handleRate('known')}
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('btnKnown')}</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold"
          >
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('btnPrevious')}</span>
          </button>

          <button
            onClick={handleFlip}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md"
          >
            <span>{lang === 'ar' ? 'كشف الإجابة والقاعدة' : 'Afficher la réponse'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold"
          >
            <span>{t('btnNext')}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      )}

    </div>
  );
}
