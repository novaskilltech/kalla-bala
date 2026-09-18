'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'ar' | 'fr';

const translations = {
  ar: {
    siteTitle: 'كَلَّا وَبَلَى',
    siteSubtitle: 'الوقف والابتداء خطوة بخطوة',
    siteCatchphrase: 'دليل عملي لفهم الوقف والابتداء في 55 موضعًا من القرآن الكريم',
    heroDescription: 'تعلّم متى تقف على «كَلَّا» و«بَلَى»، ومتى تصل، ولماذا، من خلال شرح مبسط، وأمثلة قرآنية، وبطاقات للحفظ، واختبارات تفاعلية.',
    startLearning: 'ابدأ التعلّم',
    testYourself: 'اختبر نفسك',
    
    // Stats
    statKalla: 'موضعًا لـ كَلَّا',
    statBala: 'موضعًا لـ بَلَى',
    statTotal: 'تطبيقًا قرآنيًا',

    // Main navigation
    navHome: 'الرئيسية',
    navKalla: 'كَلَّا',
    navBala: 'بَلَى',
    navPositions: 'المواضع الـ 55',
    navQuiz: 'الاختبارات',
    navMemorize: 'المُفَكِّرَة (الحفظ)',
    navCards: 'بطاقات المراجعة',
    navProgress: 'تقدّمي',
    navGlossary: 'المصطلحات',
    navDisagreements: 'مواضع الخلاف',
    navManzuma: 'المنظومة',
    navSources: 'المصادر والمراجع',
    navAuthor: 'عن الشيخ',

    // Badges & Categories
    badgeStop: 'الوقف',
    badgeConnect: 'الوصل',
    badgePreferConnect: 'الوجهان والوصل أولى',
    badgeDisagreement: 'موضع خلاف',
    
    // Filters & Search
    searchPlaceholder: 'ابحث برقم السورة، اسم السورة أو جزء من الآية...',
    filterAll: 'الكل',
    filterStop: 'الوقف',
    filterConnect: 'الوصل',
    filterDisagreement: 'الخلاف / الوجهان',
    filterDifficulty: 'مستوى الصعوبة',
    filterWord: 'الكلمة',
    
    // Position details
    secUnderstand10s: 'افهمها في 10 ثوانٍ',
    secWhy: 'لماذا؟',
    secDetailedExplanation: 'الشرح المفصل',
    secScholarChoice: 'اختيار الشيخ توفيق النحاس',
    secOtherOpinions: 'أقوال أخرى',
    secMemorizeFast: 'احفظها بسرعة',
    btnPrevious: 'الموضع السابق',
    btnNext: 'الموضع التالي',
    btnBackToList: 'العودة للمواضع',
    btnCopy: 'نسخ الآية والحكم',
    btnCopied: 'تم النسخ بنجاح!',
    btnShare: 'مشاركة',
    btnShareWhatsApp: 'واتساب',
    btnBookmark: 'إضافة للمراجعة',
    btnBookmarked: 'في المراجعة',

    // Quiz
    quizTitle: 'اختبارات الوقف على كَلَّا وبَلَى',
    quizSubtitle: 'اختبر إتقانك لأحكام الوقف والوصل مع مستويات تكيفية وتحليل أخطائك',
    quizLevel1: 'المستوى الأول: وقف أم وصل؟',
    quizLevel2: 'المستوى الثاني: الحكم مع التعليل',
    quizLevel3: 'المستوى الثالث: تحدي السياق',
    quizQuestionCount: 'عدد الأسئلة:',
    quizAllQuestions: 'جميع المواضع (55)',
    quizStart: 'ابدأ الاختبار الآن',
    quizScore: 'نتيجتك:',
    quizReviewErrorsOnly: 'راجع أخطاءك فقط',
    quizRetry: 'إعادة الاختبار',
    quizNextQuestion: 'السؤال التالي',
    quizFinish: 'إنهاء وعرض النتيجة',

    // Memorize Flashcards
    flashcardQuestion: 'وقف أم وصل؟',
    flashcardClickToReveal: 'اضغط لكشف الحكم والتعليل والقاعدة',
    btnKnown: 'أعرفه ✓',
    btnNeedReview: 'أحتاج مراجعة ↻',
    btnHard: 'صعب ⚠️',
    flashcardReset: 'إعادة تعيين البطاقات',

    // Print / PDF
    printTitle: 'طباعة وتصدير بطاقات المراجعة',
    btnPrint: 'طباعة البطاقات',
    btnDownloadPDF: 'تنزيل PDF جاهز للطباعة',
    printFilterAll: 'جميع البطاقات (55)',
    printFilterKalla: 'كَلَّا فقط (33)',
    printFilterBala: 'بَلَى فقط (22)',
    printFilterMistakes: 'الأخطاء المسجلة فقط',
    printFilterFavorites: 'المفضلة والمراجعة فقط',

    // Progress
    progTitle: 'سجل التعلّم والإتقان',
    progViewed: 'المواضع التي تم الاطلاع عليها',
    progMastered: 'مواضع تم إتقانها',
    progNeedsReview: 'مواضع تحتاج مراجعة',
    progHard: 'مواضع مصنفة كصعبة',
    progAvgScore: 'معدل درجات الاختبارات',
    progKallaProgress: 'نسبة إتقان كَلَّا',
    progBalaProgress: 'نسبة إتقان بَلَى',

    // Kalla & Bala guides
    kallaPageIntroHeadline: 'لا تسأل أولًا: هل أقف على «كَلَّا»؟',
    kallaPageIntroSub: 'بل اسأل: ما معنى «كَلَّا» في هذا الموضع؟ وبماذا تتعلق؟',
    balaPageExampleQuestion: 'أَلَمْ تَفْعَلْ؟',
    balaPageExampleAnswer: 'بَلَى (أي: فعلت)',
    balaMemorizeExceptionsTitle: 'احفظ الاستثناءات فقط',
    balaMemorizeExceptionsSubtitle: 'لا تحفظ 22 موضعًا مفردًا؛ احفظ 5 مواضع للوصل و 4 للخلاف، والباقي كله وقف!',
    bala5NoStop: '5 مواضع لا يقف عليها (وصل لازم)',
    bala4Both: '4 مواضع يجوز الوجهان والوصل أولى',
    bala13Stop: '13 موضعًا يحسن الوقف عليها',

    // Theme & Lang
    themeDark: 'الوضع الليلي',
    themeLight: 'الوضع النهاري',
    langSwitch: 'Français',
  },
  fr: {
    siteTitle: 'Kallā & Balā',
    siteSubtitle: 'Le waqf et l’ibtidāʾ pas à pas',
    siteCatchphrase: 'Guide pratique pour comprendre l’arrêt et la liaison sur 55 occurrences coraniques',
    heroDescription: 'Apprenez quand vous arrêter sur « Kallā » et « Balā », quand continuer, et pourquoi, grâce à des explications claires, des exemples coraniques, des fiches mnémotechniques et des quiz interactifs.',
    startLearning: 'Commencer l’apprentissage',
    testYourself: 'Tester mes connaissances',

    // Stats
    statKalla: 'occurrences de Kallā',
    statBala: 'occurrences de Balā',
    statTotal: 'applications coraniques',

    // Main navigation
    navHome: 'Accueil',
    navKalla: 'Kallā',
    navBala: 'Balā',
    navPositions: 'Les 55 positions',
    navQuiz: 'Quiz',
    navMemorize: 'Mémorisation',
    navCards: 'Cartes de révision',
    navProgress: 'Mon progrès',
    navGlossary: 'Glossaire',
    navDisagreements: 'Divergences',
    navManzuma: 'Le Poème (Manzūma)',
    navSources: 'Sources & Références',
    navAuthor: 'Le Cheikh',

    // Badges & Categories
    badgeStop: 'Arrêt (Waqf)',
    badgeConnect: 'Liaison (Wasl)',
    badgePreferConnect: 'Deux avis (Wasl préféré)',
    badgeDisagreement: 'Divergence savante',

    // Filters & Search
    searchPlaceholder: 'Rechercher par sourate, numéro ou extrait de verset...',
    filterAll: 'Tous',
    filterStop: 'Arrêt',
    filterConnect: 'Liaison',
    filterDisagreement: 'Divergence / 2 avis',
    filterDifficulty: 'Difficulté',
    filterWord: 'Particule',

    // Position details
    secUnderstand10s: 'Comprendre en 10 secondes',
    secWhy: 'Pourquoi ?',
    secDetailedExplanation: 'Explication détaillée',
    secScholarChoice: 'Choix du Cheikh Tawfiq Al-Nahhas',
    secOtherOpinions: 'Autres avis savants',
    secMemorizeFast: 'Mémoriser rapidement',
    btnPrevious: 'Position précédente',
    btnNext: 'Position suivante',
    btnBackToList: 'Retour à la liste',
    btnCopy: 'Copier le verset et la règle',
    btnCopied: 'Copié avec succès !',
    btnShare: 'Partager',
    btnShareWhatsApp: 'WhatsApp',
    btnBookmark: 'Ajouter aux révisions',
    btnBookmarked: 'En révision',

    // Quiz
    quizTitle: 'Quiz sur le Waqf de Kallā & Balā',
    quizSubtitle: 'Mesurez votre maîtrise des arrêts et liaisons avec plusieurs niveaux et analyse d’erreurs',
    quizLevel1: 'Niveau 1 : Arrêt ou Liaison ?',
    quizLevel2: 'Niveau 2 : Choix du statut & Justification',
    quizLevel3: 'Niveau 3 : Défi du contexte',
    quizQuestionCount: 'Nombre de questions :',
    quizAllQuestions: 'Toutes les positions (55)',
    quizStart: 'Démarrer le quiz',
    quizScore: 'Votre score :',
    quizReviewErrorsOnly: 'Réviser uniquement mes erreurs',
    quizRetry: 'Recommencer le quiz',
    quizNextQuestion: 'Question suivante',
    quizFinish: 'Terminer et voir le résultat',

    // Memorize Flashcards
    flashcardQuestion: 'Arrêt ou liaison ?',
    flashcardClickToReveal: 'Cliquer pour révéler le statut, la cause et la règle',
    btnKnown: 'Je sais ✓',
    btnNeedReview: 'À réviser ↻',
    btnHard: 'Difficile ⚠️',
    flashcardReset: 'Réinitialiser les cartes',

    // Print / PDF
    printTitle: 'Impression et export des fiches de révision',
    btnPrint: 'Imprimer les fiches',
    btnDownloadPDF: 'Télécharger le PDF prêt à l’impression',
    printFilterAll: 'Toutes les fiches (55)',
    printFilterKalla: 'Kallā uniquement (33)',
    printFilterBala: 'Balā uniquement (22)',
    printFilterMistakes: 'Mes erreurs enregistrées',
    printFilterFavorites: 'Favoris et fiches à réviser',

    // Progress
    progTitle: 'Tableau de bord et progression',
    progViewed: 'Positions consultées',
    progMastered: 'Positions maîtrisées',
    progNeedsReview: 'Positions à revoir',
    progHard: 'Positions difficiles',
    progAvgScore: 'Score moyen aux quiz',
    progKallaProgress: 'Progression sur Kallā',
    progBalaProgress: 'Progression sur Balā',

    // Kalla & Bala guides
    kallaPageIntroHeadline: 'Ne demandez pas d’abord : dois-je m’arrêter sur « Kallā » ?',
    kallaPageIntroSub: 'Demandez plutôt : quel est son sens ici, et à quoi se rattache-t-elle ?',
    balaPageExampleQuestion: 'Ne l’as-tu pas fait ?',
    balaPageExampleAnswer: 'Balā (Au contraire, je l’ai fait)',
    balaMemorizeExceptionsTitle: 'Mémorisez uniquement les exceptions',
    balaMemorizeExceptionsSubtitle: 'N’apprenez pas 22 positions isolées : retenez 5 liaisons et 4 divergences, le reste est arrêt !',
    bala5NoStop: '5 positions sans arrêt (liaison obligatoire)',
    bala4Both: '4 positions à deux avis (liaison privilégiée)',
    bala13Stop: '13 positions où l’arrêt est convenable',

    // Theme & Lang
    themeDark: 'Mode sombre',
    themeLight: 'Mode clair',
    langSwitch: 'العربية',
  },
};

export type TranslationKey = keyof typeof translations.ar;

interface I18nContextType {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ar',
  dir: 'rtl',
  setLang: () => {},
  t: (k) => translations.ar[k] || k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('kalla_bala_lang') as Lang | null;
    if (saved === 'ar' || saved === 'fr') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kalla_bala_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.ar[key] || key;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
