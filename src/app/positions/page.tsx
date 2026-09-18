'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { kallaBalaData } from '@/kalla-bala.data';
import { AyahCard } from '@/components/AyahCard';
import { FilterBar } from '@/components/FilterBar';
import { CategoryType, DifficultyType, WordType } from '@/types';
import { Layers } from 'lucide-react';

export default function PositionsPage() {
  const { t, lang } = useI18n();

  // All 55 items
  const items = kallaBalaData.items;

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedWord, setSelectedWord] = useState<'all' | WordType>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyType>('all');
  const [onlyDisagreements, setOnlyDisagreements] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'row'>('card');

  // Filtered list
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedWord !== 'all' && item.word !== selectedWord) return false;
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
  }, [items, selectedWord, selectedCategory, selectedDifficulty, onlyDisagreements, search]);

  return (
    <div className="space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              {lang === 'ar' ? 'المواضع الـ 55 في القرآن الكريم' : 'Les 55 occurrences coraniques'}
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'دليل شامل لكل موضع وردت فيه «كَلَّا» و«بَلَى» مع الحكم والتعليل وقاعدة الحفظ'
              : 'Répertoire complet des positions avec statuts, justifications et règles mnémotechniques'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div>
        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
          hideWordFilter={false}
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
