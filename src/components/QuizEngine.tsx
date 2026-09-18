'use client';

import React, { useState } from 'react';
import { KallaBalaItem, CategoryType } from '@/types';
import { useI18n } from '@/lib/i18n';
import { recordQuizResult } from '@/lib/storage';
import { CategoryBadge, WordBadge } from './Badge';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, Lightbulb, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizEngineProps {
  items: readonly KallaBalaItem[];
}

type QuizLevel = 1 | 2 | 3;

interface QuestionState {
  item: KallaBalaItem;
  options: { label: string; isCorrect: boolean; category?: CategoryType; explanation?: string }[];
  userAnswerIndex: number | null;
  isAnswered: boolean;
}

export function QuizEngine({ items }: QuizEngineProps) {
  const { t, lang, dir } = useI18n();

  // Settings
  const [level, setLevel] = useState<QuizLevel>(1);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [filterWord, setFilterWord] = useState<'all' | 'كَلَّا' | 'بَلَى'>('all');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Active quiz session
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate question options based on level
  const buildOptions = (item: KallaBalaItem, lvl: QuizLevel) => {
    if (lvl === 1) {
      // Level 1: Stop vs Connect (and Prefer Connect if applicable)
      const isPrefer = item.category === 'prefer_connect';
      const opts = [
        {
          label: lang === 'ar' ? 'الوقف (يحسن الوقف عليها)' : 'Arrêt (Waqf)',
          isCorrect: item.category === 'stop',
          category: 'stop' as CategoryType,
        },
        {
          label: lang === 'ar' ? 'الوصل (لا يقف عليها)' : 'Liaison (Wasl)',
          isCorrect: item.category === 'connect',
          category: 'connect' as CategoryType,
        },
      ];

      if (isPrefer || item.word === 'بَلَى') {
        opts.push({
          label: lang === 'ar' ? 'الوجهان جائزان والوصل أولى' : 'Deux avis (Wasl préféré)',
          isCorrect: item.category === 'prefer_connect',
          category: 'prefer_connect' as CategoryType,
        });
      }
      return opts;
    }

    if (lvl === 2) {
      // Level 2: Judgment + Reason
      const correctReason = item.simpleExplanation;
      const fakeReason1 = item.category === 'stop'
        ? (lang === 'ar' ? 'لأنها استئنافية بمعنى «حقًا»' : 'Car elle est introductive au sens de « certes »')
        : (lang === 'ar' ? 'لأنها تفيد الردع التام لما قبلها' : 'Car elle réfute la phrase précédente');
      const fakeReason2 = lang === 'ar' ? 'لأنها متعلقة بما بعدها تعلقًا لفظيًا يمنع الوقف' : 'Car elle est liée grammaticalement';

      return [
        {
          label: `${item.scholarChoice} — ${correctReason}`,
          isCorrect: true,
          category: item.category,
        },
        {
          label: `${item.category === 'stop' ? 'الوصل' : 'الوقف'} — ${fakeReason1}`,
          isCorrect: false,
          category: (item.category === 'stop' ? 'connect' : 'stop') as CategoryType,
        },
        {
          label: `${item.category === 'prefer_connect' ? 'الوقف التام' : 'الوجهان'} — ${fakeReason2}`,
          isCorrect: false,
          category: 'prefer_connect' as CategoryType,
        },
      ].sort(() => Math.random() - 0.5);
    }

    // Level 3: Context challenge
    return [
      {
        label: lang === 'ar' ? `الوقف: لردع الدعوى السابقة والابتداء بما بعدها` : 'Arrêt : rejet du contexte précédent',
        isCorrect: item.category === 'stop',
        category: 'stop' as CategoryType,
      },
      {
        label: lang === 'ar' ? `الوصل: لوجود تعلق تركيبي قوي مع الجملة اللاحقة` : 'Liaison : dépendance étroite avec la suite',
        isCorrect: item.category === 'connect',
        category: 'connect' as CategoryType,
      },
      {
        label: lang === 'ar' ? `الوجهان: جواز الوقف لتمام المعنى والوصل أرجح` : 'Deux avis : liaison privilégiée',
        isCorrect: item.category === 'prefer_connect',
        category: 'prefer_connect' as CategoryType,
      },
    ];
  };

  const startQuiz = (customItems?: KallaBalaItem[]) => {
    let pool = customItems || [...items];

    if (!customItems && filterWord !== 'all') {
      pool = pool.filter((i) => i.word === filterWord);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const count = Math.min(questionCount, shuffled.length);
    const selected = shuffled.slice(0, count);

    const qStates: QuestionState[] = selected.map((item) => ({
      item,
      options: buildOptions(item, level),
      userAnswerIndex: null,
      isAnswered: false,
    }));

    setQuestions(qStates);
    setCurrentIndex(0);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (questions[currentIndex].isAnswered) return;

    const updated = [...questions];
    updated[currentIndex].userAnswerIndex = idx;
    updated[currentIndex].isAnswered = true;
    setQuestions(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finish quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    let correct = 0;
    const mistakesByCat: Record<CategoryType, number> = { stop: 0, connect: 0, prefer_connect: 0 };

    questions.forEach((q) => {
      const isCorrect = q.userAnswerIndex !== null && q.options[q.userAnswerIndex]?.isCorrect;
      if (isCorrect) {
        correct++;
      } else {
        mistakesByCat[q.item.category] = (mistakesByCat[q.item.category] || 0) + 1;
      }
    });

    recordQuizResult(correct, questions.length, mistakesByCat);
  };

  const reviewErrorsOnly = () => {
    const errorItems = questions
      .filter((q) => q.userAnswerIndex === null || !q.options[q.userAnswerIndex]?.isCorrect)
      .map((q) => q.item);

    if (errorItems.length > 0) {
      startQuiz(errorItems);
    }
  };

  // 1. SETUP SCREEN
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-800 p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl font-bold">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('quizTitle')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t('quizSubtitle')}
          </p>
        </div>

        {/* Level selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {lang === 'ar' ? 'اختر مستوى الاختبار:' : 'Choisissez le niveau :'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 1, label: t('quizLevel1'), desc: lang === 'ar' ? 'وقف أم وصل مباشر' : 'Arrêt ou liaison' },
              { id: 2, label: t('quizLevel2'), desc: lang === 'ar' ? 'الحكم مع الشرح' : 'Statut et cause' },
              { id: 3, label: t('quizLevel3'), desc: lang === 'ar' ? 'تحدي السياق القرآني' : 'Défi contextuel' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setLevel(lvl.id as QuizLevel)}
                className={`p-4 rounded-2xl text-right ltr:text-left border transition-all ${
                  level === lvl.id
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm">{lvl.label}</div>
                <div className="text-xs opacity-70 mt-1">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Word filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {lang === 'ar' ? 'نطاق الأسئلة:' : 'Périmètre :'}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'all', label: lang === 'ar' ? 'الكلمتان معًا (55)' : 'Les deux (55)' },
              { id: 'كَلَّا', label: lang === 'ar' ? 'كَلَّا فقط (33)' : 'Kallā seul (33)' },
              { id: 'بَلَى', label: lang === 'ar' ? 'بَلَى فقط (22)' : 'Balā seul (22)' },
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => setFilterWord(w.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                  filterWord === w.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {t('quizQuestionCount')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 55].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setQuestionCount(cnt)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  questionCount === cnt
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cnt === 55 ? t('quizAllQuestions') : `${cnt} ${lang === 'ar' ? 'أسئلة' : 'questions'}`}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => startQuiz()}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-colors shadow-lg hover:shadow-xl"
        >
          {t('quizStart')}
        </button>
      </div>
    );
  }

  // 2. RESULT SCREEN
  if (quizFinished) {
    const total = questions.length;
    const correctCount = questions.filter(
      (q) => q.userAnswerIndex !== null && q.options[q.userAnswerIndex]?.isCorrect
    ).length;
    const percentage = Math.round((correctCount / total) * 100);
    const errorCount = total - correctCount;

    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-800 p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl space-y-8 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto text-3xl font-bold">
          <Award className="w-9 h-9" />
        </div>

        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {percentage >= 80 ? (lang === 'ar' ? 'ممتاز ومتقن! 🌟' : 'Excellent ! 🌟') : (lang === 'ar' ? 'أحسنت محاولة جيدة! 💪' : 'Bien joué ! 💪')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? 'إليك تفاصيل نتيجتك في هذا الاختبار:' : 'Voici les détails de votre session :'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-around">
          <div>
            <div className="text-4xl font-black text-emerald-600">{correctCount}</div>
            <div className="text-xs text-slate-500 mt-1">{lang === 'ar' ? 'صحيحة' : 'Correctes'}</div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-4xl font-black text-rose-500">{errorCount}</div>
            <div className="text-xs text-slate-500 mt-1">{lang === 'ar' ? 'أخطاء' : 'Erreurs'}</div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-4xl font-black text-purple-600">{percentage}%</div>
            <div className="text-xs text-slate-500 mt-1">{lang === 'ar' ? 'النسبة' : 'Taux'}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {errorCount > 0 && (
            <button
              onClick={reviewErrorsOnly}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors shadow-md"
            >
              {t('quizReviewErrorsOnly')} ({errorCount})
            </button>
          )}

          <button
            onClick={() => setQuizStarted(false)}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-sm transition-colors"
          >
            {t('quizRetry')}
          </button>
        </div>
      </div>
    );
  }

  // 3. IN-QUIZ ACTIVE QUESTION
  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-800 p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
      
      {/* Top Header: Progress & Info */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>{lang === 'ar' ? 'السؤال:' : 'Question :'}</span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700">
            سورة {currentQ.item.sura} — الآية {currentQ.item.ayah}
          </span>
          <WordBadge word={currentQ.item.word} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Quran Excerpt Prompt */}
      <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-100 dark:border-slate-700/60 text-center my-4">
        <p className="font-quran text-3xl sm:text-4xl text-slate-900 dark:text-amber-100 leading-loose">
          ﴿{currentQ.item.excerpt}﴾
        </p>
      </div>

      {/* Question instructions */}
      <div className="text-center font-bold text-sm text-slate-700 dark:text-slate-200">
        {level === 1 && (lang === 'ar' ? 'ما الحكم التجويدي الصحيح على هذه الكلمة؟' : 'Quel est le statut correct sur ce mot ?')}
        {level === 2 && (lang === 'ar' ? 'اختر الحكم مع التعليل العلمي الصحيح:' : 'Choisissez le statut et sa justification :')}
        {level === 3 && (lang === 'ar' ? 'بالنظر إلى السياق والمعنى؛ كيف تقرأ هذا الموضع؟' : 'Selon le contexte, comment lisez-vous ce passage ?')}
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          const isSelected = currentQ.userAnswerIndex === idx;
          let btnClass = 'border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-white dark:bg-slate-800';

          if (currentQ.isAnswered) {
            if (opt.isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
            } else if (isSelected) {
              btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold';
            } else {
              btnClass = 'opacity-50 border-slate-200 dark:border-slate-700';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={currentQ.isAnswered}
              className={`w-full p-4 rounded-2xl border text-right ltr:text-left transition-all flex items-center justify-between gap-3 text-sm ${btnClass}`}
            >
              <span>{opt.label}</span>
              {currentQ.isAnswered && (
                <span>
                  {opt.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Reveal after answer */}
      {currentQ.isAnswered && (
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2 animate-fadeIn text-xs">
          <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span>{currentQ.item.scholarChoice}</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentQ.item.simpleExplanation}
          </p>
          {currentQ.item.memoryRule && (
            <div className="pt-2 font-bold text-emerald-800 dark:text-emerald-300">
              💡 {currentQ.item.memoryRule}
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {currentQ.isAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <span>{currentIndex < questions.length - 1 ? t('quizNextQuestion') : t('quizFinish')}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      )}

    </div>
  );
}
