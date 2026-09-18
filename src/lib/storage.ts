import { UserProgress, FlashcardStatus, CategoryType } from '@/types';

const STORAGE_KEY = 'kalla_bala_user_progress_v1';

const defaultProgress: UserProgress = {
  viewed: [],
  mastered: [],
  review: [],
  hard: [],
  favorites: [],
  quizStats: {
    totalQuizzesTaken: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    lastScore: 0,
    lastTotal: 0,
    weakCategories: {},
  },
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function markPositionViewed(id: string): UserProgress {
  const p = getProgress();
  if (!p.viewed.includes(id)) {
    p.viewed.push(id);
    saveProgress(p);
  }
  return p;
}

export function updateCardStatus(id: string, status: FlashcardStatus): UserProgress {
  const p = getProgress();
  // Remove from all 3 lists first
  p.mastered = p.mastered.filter(i => i !== id);
  p.review = p.review.filter(i => i !== id);
  p.hard = p.hard.filter(i => i !== id);

  if (status === 'known') p.mastered.push(id);
  else if (status === 'review') p.review.push(id);
  else if (status === 'hard') p.hard.push(id);

  saveProgress(p);
  return p;
}

export function toggleFavorite(id: string): { isFavorite: boolean; progress: UserProgress } {
  const p = getProgress();
  const index = p.favorites.indexOf(id);
  let isFav = false;
  if (index > -1) {
    p.favorites.splice(index, 1);
  } else {
    p.favorites.push(id);
    isFav = true;
  }
  saveProgress(p);
  return { isFavorite: isFav, progress: p };
}

export function recordQuizResult(score: number, total: number, mistakesByCat: Record<CategoryType, number>): UserProgress {
  const p = getProgress();
  p.quizStats.totalQuizzesTaken += 1;
  p.quizStats.totalQuestionsAnswered += total;
  p.quizStats.correctAnswers += score;
  p.quizStats.lastScore = score;
  p.quizStats.lastTotal = total;

  for (const [cat, count] of Object.entries(mistakesByCat)) {
    const c = cat as CategoryType;
    if (!p.quizStats.weakCategories[c]) {
      p.quizStats.weakCategories[c] = { wrong: 0, total: 0 };
    }
    p.quizStats.weakCategories[c]!.wrong += count;
  }

  saveProgress(p);
  return p;
}
