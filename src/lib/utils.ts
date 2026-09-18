import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CategoryType, DifficultyType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryBadge(category: CategoryType, lang: 'ar' | 'fr' = 'ar') {
  switch (category) {
    case 'stop':
      return {
        label: lang === 'ar' ? 'الوقف' : 'Arrêt (Waqf)',
        icon: '🛑',
        bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        dotBg: 'bg-emerald-500',
        border: 'border-emerald-500',
      };
    case 'connect':
      return {
        label: lang === 'ar' ? 'الوصل' : 'Liaison (Wasl)',
        icon: '➡️',
        bg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
        dotBg: 'bg-blue-500',
        border: 'border-blue-500',
      };
    case 'prefer_connect':
      return {
        label: lang === 'ar' ? 'الوجهان والوصل أولى' : 'Deux avis (Wasl préféré)',
        icon: '⚖️',
        bg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        dotBg: 'bg-amber-500',
        border: 'border-amber-500',
      };
  }
}

export function getDifficultyBadge(diff: DifficultyType, lang: 'ar' | 'fr' = 'ar') {
  switch (diff) {
    case 1:
      return {
        label: lang === 'ar' ? 'المستوى الأول (أساسي)' : 'Niveau 1 (Fondamental)',
        stars: '★☆☆',
        color: 'text-emerald-600 dark:text-emerald-400',
      };
    case 2:
      return {
        label: lang === 'ar' ? 'المستوى الثاني (متوسط)' : 'Niveau 2 (Intermédiaire)',
        stars: '★★☆',
        color: 'text-amber-600 dark:text-amber-400',
      };
    case 3:
      return {
        label: lang === 'ar' ? 'المستوى الثالث (دقيق)' : 'Niveau 3 (Avancé)',
        stars: '★★★',
        color: 'text-rose-600 dark:text-rose-400',
      };
  }
}
