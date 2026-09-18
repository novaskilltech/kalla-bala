export type CategoryType = 'stop' | 'connect' | 'prefer_connect';
export type WordType = 'كَلَّا' | 'بَلَى';
export type DifficultyType = 1 | 2 | 3;

export interface KallaBalaItem {
  id: string;
  word: WordType;
  sura: string;
  suraNumber: number;
  ayah: number;
  excerpt: string;
  fullVerse?: string;
  category: CategoryType;
  scholarChoice: string;
  simpleExplanation: string;
  detailedExplanation: string;
  memoryRule: string;
  hasDisagreement: boolean;
  disagreementNote: string;
  difficulty: DifficultyType;
  sourceKeys: readonly string[];
}

export type FlashcardStatus = 'known' | 'review' | 'hard';

export interface UserProgress {
  viewed: string[]; // item ids
  mastered: string[]; // item ids marked as known
  review: string[]; // item ids marked as needing review
  hard: string[]; // item ids marked as hard
  favorites: string[]; // bookmarked item ids
  quizStats: {
    totalQuizzesTaken: number;
    totalQuestionsAnswered: number;
    correctAnswers: number;
    lastScore: number;
    lastTotal: number;
    weakCategories: { [key in CategoryType]?: { wrong: number; total: number } };
  };
}

export interface GlossaryTerm {
  id: string;
  termAr: string;
  termFr: string;
  definitionAr: string;
  definitionFr: string;
  exampleExcerpt?: string;
  exampleSura?: string;
  exampleAyah?: number;
  relatedItemId?: string;
}

export interface ManzumaVerse {
  number: number;
  sadr: string; // صدر البيت
  ajuz: string; // عجز البيت
  explanationAr: string;
  explanationFr: string;
  relatedCategory?: CategoryType;
}

export interface SourceReference {
  id: string;
  authorAr: string;
  authorFr: string;
  titleAr: string;
  titleFr: string;
  deathYearH?: string;
  roleAr: string;
  roleFr: string;
  isPrimary?: boolean;
}
