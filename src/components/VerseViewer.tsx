'use client';

import React, { useState, useRef } from 'react';
import { KallaBalaItem } from '@/types';
import { useI18n } from '@/lib/i18n';
import { CategoryBadge } from './Badge';
import { Volume2, VolumeX, Eye, BookOpen, Layers, Pause, Play, Sparkles } from 'lucide-react';

interface VerseViewerProps {
  item: KallaBalaItem;
  fullVerseText: string;
}

export function VerseViewer({ item, fullVerseText }: VerseViewerProps) {
  const { lang } = useI18n();
  const [viewMode, setViewMode] = useState<'full' | 'excerpt'>('full');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio URL from EveryAyah CDN
  const suraPad = String(item.suraNumber).padStart(3, '0');
  const ayahPad = String(item.ayah).padStart(3, '0');
  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${suraPad}${ayahPad}.mp3`;

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Extract what comes before and after the word if possible
  const textToAnalyze = fullVerseText || item.excerpt;
  const isKalla = item.word === 'كَلَّا';
  
  // Search for the word occurrence in the verse text
  // Handle various diacritic forms: كَلَّا / كَلَّآ / بَلَىٰ / بَلَى
  const regex = isKalla
    ? /(كَلَّ[آٰ]|كَلَّا)/
    : /(بَلَ[ىٰٓ]|بَلَىٰ|بَلَى)/;

  const parts = textToAnalyze.split(regex);
  const beforeText = parts.length > 1 ? parts[0].trim() : '';
  const matchedWord = parts.length > 1 ? parts[1].trim() : item.word;
  const afterText = parts.length > 2 ? parts.slice(2).join('').trim() : '';

  return (
    <div className="space-y-6">
      
      {/* Quranic Main Display Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-50/60 via-amber-50/20 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-800/90 border-2 border-amber-200/80 dark:border-amber-900/40 p-6 sm:p-10 shadow-xl transition-all">
        
        {/* Top Controls: Mode Toggle & Audio Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/50 dark:border-slate-700/80 pb-4 mb-6">
          
          {/* Mode toggle (Full verse vs Excerpt) */}
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'full'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الآية الكريمة كاملة' : 'Verset complet'}</span>
            </button>
            <button
              onClick={() => setViewMode('excerpt')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'excerpt'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'موضع الحكم فقط' : 'Extrait ciblé'}</span>
            </button>
          </div>

          {/* Audio Recitation & Sura Ref */}
          <div className="flex items-center gap-2">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              preload="none"
            />
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isPlaying
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
              }`}
              title={lang === 'ar' ? 'استمع لتلاوة الآية (الشيخ مشاري العفاسي)' : 'Écouter la récitation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{isPlaying ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'استمع للتلاوة' : 'Écouter')}</span>
            </button>

            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              [سورة {item.sura} : {item.ayah}]
            </span>
          </div>

        </div>

        {/* Verse Text Area */}
        <div className="py-4 text-center">
          {viewMode === 'full' ? (
            <p className="font-quran text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-amber-100 leading-[2.6] sm:leading-[2.8] tracking-wide select-text">
              <span className="text-amber-700 dark:text-amber-400 opacity-70 font-arabic text-xl sm:text-2xl mr-2">﴿</span>
              
              {beforeText && <span>{beforeText} </span>}
              
              {/* Highlight the word with distinctive badge-like frame */}
              <span className="inline-block mx-1.5 px-3 py-0.5 rounded-2xl bg-amber-200/70 dark:bg-amber-950/80 border border-amber-400/80 dark:border-amber-600 text-emerald-950 dark:text-amber-100 font-extrabold shadow-xs transition-transform hover:scale-105">
                {matchedWord || item.word}
              </span>
              
              {afterText && <span> {afterText}</span>}
              
              <span className="text-amber-700 dark:text-amber-400 opacity-70 font-arabic text-xl sm:text-2xl ml-2">﴾</span>
            </p>
          ) : (
            <p className="font-quran text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-amber-100 leading-loose tracking-wide">
              ﴿{item.excerpt}﴾
            </p>
          )}
        </div>

        {/* Bottom Badge Bar */}
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-amber-200/50 dark:border-slate-700/60 flex-wrap">
          <CategoryBadge category={item.category} size="lg" />
        </div>

      </div>

      {/* Structural Breakdown: Before -> Word -> After */}
      {afterText && (
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-md space-y-4">
          
          <div className="flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-base sm:text-lg">
              {lang === 'ar' ? 'بنية السياق وأثر ما بعدها في حكم الوقف والابتداء' : 'Décomposition du contexte (Avant / Mot / Après)'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            {/* 1. Before */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[11px]">
                {lang === 'ar' ? '1. ما قبل الكلمة (السياق السابق)' : '1. Contexte précédent'}
              </span>
              <p className="font-quran text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                {beforeText ? `« ${beforeText} »` : (lang === 'ar' ? 'بداية الآية أو استئناف ما قبله' : 'Début du verset')}
              </p>
            </div>

            {/* 2. Target Word & Choice */}
            <div className={`p-4 rounded-2xl border space-y-2 ${
              item.category === 'stop'
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                : item.category === 'connect'
                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
            }`}>
              <span className="font-bold block uppercase tracking-wider text-[11px]">
                {lang === 'ar' ? '2. موضع الكلمة والحكم' : '2. La particule & son statut'}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-quran text-xl font-bold">{item.word}</span>
                <span className="font-bold text-xs">({item.scholarChoice})</span>
              </div>
            </div>

            {/* 3. After (Continuation / Ibtida') */}
            <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-900/70 border border-emerald-200/60 dark:border-slate-700 space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider text-[11px]">
                {lang === 'ar' ? '3. ما بعدها (تتمة الآية والابتداء)' : '3. Suite du verset & reprise'}
              </span>
              <p className="font-quran text-base text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                « {afterText} »
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.category === 'stop'
                  ? (lang === 'ar' ? 'يُبتدأ بما بعدها استئنافًا لكلام جديد تام المعنى.' : 'On reprend la lecture ici par une phrase nouvelle.')
                  : item.category === 'connect'
                  ? (lang === 'ar' ? 'يتصل بما بعدها في المعنى والتركيب دون انقطاع.' : 'Lié étroitement à la suite sans coupure.')
                  : (lang === 'ar' ? 'يجوز الوصل لاتصال المعنى، والوقف تام.' : 'Les deux liaisons sont admissibles.')}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
