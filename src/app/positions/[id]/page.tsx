import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { kallaBalaData } from '@/kalla-bala.data';
import { fullVerses } from '@/data/fullVerses';
import { CategoryBadge, WordBadge, DifficultyBadge, DisagreementBadge } from '@/components/Badge';
import { PositionDetailActions } from '@/components/PositionDetailActions';
import { VerseViewer } from '@/components/VerseViewer';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Layers
} from 'lucide-react';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return kallaBalaData.items.map((item) => ({
    id: item.id,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = kallaBalaData.items.find((i) => i.id === params.id);
  if (!item) return { title: 'الموضع غير موجود' };

  const title = `الوقف على ${item.word} في سورة ${item.sura} الآية ${item.ayah} — ${item.scholarChoice}`;
  return {
    title,
    description: item.simpleExplanation,
    openGraph: {
      title,
      description: item.simpleExplanation,
    },
  };
}

export default function PositionDetailPage({ params }: Props) {
  const currentIndex = kallaBalaData.items.findIndex((i) => i.id === params.id);
  if (currentIndex === -1) {
    notFound();
  }

  const item = kallaBalaData.items[currentIndex];
  const fullVerseText = fullVerses[item.id] || item.excerpt;
  const prevItem = currentIndex > 0 ? kallaBalaData.items[currentIndex - 1] : null;
  const nextItem = currentIndex < kallaBalaData.items.length - 1 ? kallaBalaData.items[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/positions"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
        >
          <span>← العودة إلى قائمة المواضع</span>
        </Link>

        {/* Action Buttons Client Component */}
        <PositionDetailActions item={item} />
      </div>

      {/* Main Study Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-12 shadow-xl space-y-10">
        
        {/* Sura & Ayah Header */}
        <div className="text-center space-y-3 border-b border-slate-100 dark:border-slate-700/80 pb-6">
          <div className="inline-flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
              سورة {item.sura} — الآية {item.ayah}
            </span>
            <WordBadge word={item.word} />
            <DifficultyBadge difficulty={item.difficulty} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            سورة {item.sura} — الآية {item.ayah}
          </h1>
        </div>

        {/* Complete Quranic Verse Display & Structural Breakdown */}
        <VerseViewer item={item} fullVerseText={fullVerseText} />

        {/* 1. افهمها في 10 ثوانٍ */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <span className="text-xl">⏱️</span>
            <h2 className="text-xl font-extrabold">افهمها في 10 ثوانٍ</h2>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/60 text-slate-800 dark:text-slate-100 text-base leading-relaxed font-semibold">
            {item.simpleExplanation}
          </div>
        </section>

        {/* 2. لماذا؟ (العلة والبيان) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl font-extrabold">لماذا؟</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
            {item.detailedExplanation}
          </p>
        </section>

        {/* 3. الشرح المفصل واختيار الشيخ توفيق النحاس */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-extrabold">اختيار الشيخ توفيق النحاس</h2>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الحكم المعتمد في هذا الموضع: {item.scholarChoice}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              رجح الشيخ رحمه الله هذا الوجه بناءً على دلالة السياق والتركيب الإعرابي للآية الكريمة كما هو محرر في رسالته المباركة.
            </p>
          </div>
        </section>

        {/* 4. أقوال أخرى (عند وجود خلاف) */}
        {item.hasDisagreement && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-5 h-5" />
              <h2 className="text-xl font-extrabold">أقوال أخرى ومذاهب أهل الوقف</h2>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <DisagreementBadge />
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mt-2">
                {item.disagreementNote}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300/80 leading-relaxed">
                تنبيه: لا ينبغي الإنكار على من قرأ بالوجه الآخر المعتبر عند أئمة الوقف المعتمدين كالداني وابن الأنباري.
              </p>
            </div>
          </section>
        )}

        {/* 5. احفظها بسرعة (قاعدة ميمونيك) */}
        {item.memoryRule && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-xl font-extrabold">احفظها بسرعة</h2>
            </div>
            <div className="p-6 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border-2 border-dashed border-purple-300 dark:border-purple-700 text-center">
              <p className="text-xl sm:text-2xl font-black text-purple-900 dark:text-purple-100 font-arabic tracking-wide">
                💡 {item.memoryRule}
              </p>
            </div>
          </section>
        )}

      </div>

      {/* Previous & Next Navigation */}
      <div className="grid grid-cols-2 gap-4">
        {prevItem ? (
          <Link
            href={`/positions/${prevItem.id}`}
            className="flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-right group shadow-xs"
          >
            <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
              ← الموضع السابق
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
              سورة {prevItem.sura} ({prevItem.ayah})
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link
            href={`/positions/${nextItem.id}`}
            className="flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-left ltr:text-right group shadow-xs"
          >
            <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
              الموضع التالي →
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
              سورة {nextItem.sura} ({nextItem.ayah})
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

    </div>
  );
}
