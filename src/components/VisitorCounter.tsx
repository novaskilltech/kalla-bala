'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Users, Eye, TrendingUp } from 'lucide-react';

export function VisitorCounter() {
  const { lang } = useI18n();
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      // 1. Check local cache first for instant display
      const cached = localStorage.getItem('kalla_bala_visits_count');
      if (cached && !isNaN(Number(cached))) {
        setCount(Number(cached));
      }

      try {
        // 2. Fetch hit count from hits.sh
        const res = await fetch('https://hits.sh/kalla-bala.vercel.app.svg', {
          cache: 'no-store',
        });

        if (res.ok) {
          const svgText = await res.text();
          // Extract count from aria-label="hits: 123" or <text ...>123</text>
          const match = svgText.match(/aria-label="hits:\s*([0-9,]+)"/) || svgText.match(/>([0-9,]+)<\/text>/);
          if (match && match[1]) {
            const rawNumber = parseInt(match[1].replace(/,/g, ''), 10);
            if (!isNaN(rawNumber) && rawNumber > 0) {
              if (isMounted) {
                setCount(rawNumber);
                localStorage.setItem('kalla_bala_visits_count', rawNumber.toString());
              }
            }
          }
        }
      } catch (err) {
        // Fallback: If network fails, increment local count so it remains dynamic
        if (cached && !isNaN(Number(cached))) {
          const fallback = Number(cached) + 1;
          if (isMounted) {
            setCount(fallback);
            localStorage.setItem('kalla_bala_visits_count', fallback.toString());
          }
        } else if (isMounted) {
          setCount(1);
          localStorage.setItem('kalla_bala_visits_count', '1');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = count !== null ? count.toLocaleString(lang === 'ar' ? 'ar-EG' : 'fr-FR') : '...';

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200/70 dark:border-emerald-800/50 shadow-xs text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <Eye className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />

      <span className="text-slate-600 dark:text-slate-300 font-medium">
        {lang === 'ar' ? 'الزيارات:' : 'Visites :'}
      </span>

      <span className="font-bold text-emerald-800 dark:text-emerald-300 font-mono tracking-tight">
        {formattedCount}
      </span>
    </div>
  );
}
