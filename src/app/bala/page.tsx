'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { kallaBalaData } from '@/kalla-bala.data';
import { AyahCard } from '@/components/AyahCard';
import { FilterBar } from '@/components/FilterBar';
import { ExceptionsMap } from '@/components/ExceptionsMap';
import { CategoryType, DifficultyType } from '@/types';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BalaPage() {
  const { t, lang } = useI18n();

  // All 22 Bala items
  const balaItems = useMemo(
    () => kallaBalaData.items.filter((i) => i.word === 'بَلَى'),
    []
  );

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyType>('all');
  const [onlyDisagreements, setOnlyDisagreements] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'row'>('card');

  // Filtered list
  const filteredItems = useMemo(() => {
    return balaItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) return false;
      if (onlyDisagreements && !item.hasDisagreement) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesSura = item.sura.toLowerCase().includes(q);
        const matchesAyah = item.ayah.toString() === q;
        const matchesSuraNumber = item.suraNumber.toString() === q;
        const matchesExcerpt = item.excerpt.toLowerCase().includes(q);
        const matchesExplanation = item.simpleExplanation.toLowerCase().includes(q);
        if (!matchesSura && !matchesAyah && !matchesSuraNumber && !matchesExcerpt && !matchesExplanation) {
          return false;
        }
      }

      return true;
    });
  }, [balaItems, selectedCategory, selectedDifficulty, onlyDisagreements, search]);

  return (
    <div className="space-y-12 py-4">
      
      {/* Header & Pedagogical Hook */}
      <div className="rounded-3xl bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-white dark:from-teal-950/30 dark:via-slate-800 dark:to-slate-800 p-8 sm:p-12 border border-teal-200/70 dark:border-teal-800/60 shadow-md">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>{lang === 'ar' ? '22 موضعًا في كتاب الله عز وجل' : '22 occurrences dans le Saint Coran'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {lang === 'ar' ? 'أحكام الوقف والوصل في «بَلَى»' : 'Règles de l’arrêt et de la liaison sur « Balā »'}
          </h1>

          {/* Dialog Example */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Colloquial example */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-800/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {lang === 'ar' ? 'المعنى اللغوي المبسط' : 'Exemple linguistique intuitif'}
              </span>
              <div className="space-y-1">
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  ❓ {t('balaPageExampleQuestion')}
                </p>
                <p className="text-base font-black text-teal-700 dark:text-teal-300">
                  ✨ {t('balaPageExampleAnswer')}
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'تأتي «بلى» لإبطال النفي وتحويله إلى إثبات مؤكد.' : '« Balā » annule une négation et affirme ce qui a été nié.'}
              </p>
            </div>

            {/* Quranic foundational verse */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs space-y-2 text-center flex flex-col justify-center">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {lang === 'ar' ? 'المثال القرآني الأشهر' : 'Exemple coranique fondamental'}
              </span>
              <p className="font-quran text-2xl sm:text-3xl text-slate-900 dark:text-emerald-100">
                ﴿أَلَسْتُ بِرَبِّكُمْ قَالُوا بَلَىٰ﴾
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                [سورة الأعراف: 172] — وقف حسن
              </p>
            </div>

          </div>

          {/* Quick Metrics Pillars */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-300 font-arabic">5</span>
              <p className="text-xs font-bold text-blue-900 dark:text-blue-200 mt-1">
                🔵 {t('bala5NoStop')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-300 font-arabic">4</span>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200 mt-1">
                🟠 {t('bala4Both')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-300 font-arabic">13</span>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                🟢 {t('bala13Stop')}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION: احفظ الاستثناءات فقط (VISUAL EXCEPTIONS MAP) */}
      <section>
        <ExceptionsMap />
      </section>

      {/* Filter and Search Bar for all Bala occurrences */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {lang === 'ar' ? 'جميع مواضع «بَلَى» الـ 22' : 'Toutes les 22 positions de « Balā »'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? 'استعرض المواضع وراجع الأحكام والشواهد' : 'Consultez le détail de chaque verset'}
          </p>
        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedWord="بَلَى"
          setSelectedWord={() => {}}
          hideWordFilter={true}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          onlyDisagreements={onlyDisagreements}
          setOnlyDisagreements={setOnlyDisagreements}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredItems.length}
        />

        {/* Results Grid / List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500">
              {lang === 'ar' ? 'لم يتم العثور على أي موضع يطابق معايير البحث.' : 'Aucun résultat ne correspond à votre recherche.'}
            </p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <AyahCard key={item.id} item={item} viewMode="card" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <AyahCard key={item.id} item={item} viewMode="row" />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
