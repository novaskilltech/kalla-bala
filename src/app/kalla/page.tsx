'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { kallaBalaData } from '@/kalla-bala.data';
import { AyahCard } from '@/components/AyahCard';
import { FilterBar } from '@/components/FilterBar';
import { CategoryType, DifficultyType } from '@/types';
import { Sparkles, HelpCircle, BookOpen } from 'lucide-react';

export default function KallaPage() {
  const { t, lang } = useI18n();

  // All 33 Kalla items
  const kallaItems = useMemo(
    () => kallaBalaData.items.filter((i) => i.word === 'كَلَّا'),
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
    return kallaItems.filter((item) => {
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
  }, [kallaItems, selectedCategory, selectedDifficulty, onlyDisagreements, search]);

  return (
    <div className="space-y-10 py-4">
      
      {/* Header & Pedagogical Hook */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white dark:from-purple-950/30 dark:via-slate-800 dark:to-slate-800 p-8 sm:p-12 border border-purple-200/70 dark:border-purple-800/60 shadow-md">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>{lang === 'ar' ? '33 موضعًا في النصف الأخير من القرآن' : '33 occurrences dans la seconde moitié du Coran'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {lang === 'ar' ? 'أحكام الوقف والوصل في «كَلَّا»' : 'Règles de l’arrêt et de la liaison sur « Kallā »'}
          </h1>

          {/* Golden Pedagogical Advice Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border-r-4 rtl:border-r-4 ltr:border-l-4 border-purple-600 dark:border-purple-400 shadow-sm space-y-2">
            <p className="text-xl sm:text-2xl font-black text-purple-900 dark:text-purple-200">
              {t('kallaPageIntroHeadline')}
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
              {t('kallaPageIntroSub')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
              {lang === 'ar'
                ? 'فإن كانت ردعًا وزجرًا لكلام قيل قبلها: قف عليها. وإن كانت استئنافًا لكلام حق بمعنى «حقًا» أو «ألا» الاستفتاحية: صل بما بعدها وابتدئ بها.'
                : 'Si elle réfute une prétention antérieure mensongère, marquez l’arrêt. Si elle initie une affirmation solennelle (« en vérité »), poursuivez la récitation.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-emerald-700 dark:text-emerald-300 font-arabic">15</span>
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mt-0.5">
                  🟢 {lang === 'ar' ? 'موضعًا للوقف' : 'Positions d’arrêt'}
                </p>
              </div>
              <span className="text-2xl">🛑</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-blue-700 dark:text-blue-300 font-arabic">18</span>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mt-0.5">
                  🔵 {lang === 'ar' ? 'موضعًا للوصل' : 'Positions de liaison'}
                </p>
              </div>
              <span className="text-2xl">➡️</span>
            </div>
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div>
        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedWord="كَلَّا"
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
      </div>

    </div>
  );
}
