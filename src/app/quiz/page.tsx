'use client';

import React from 'react';
import { QuizEngine } from '@/components/QuizEngine';
import { kallaBalaData } from '@/kalla-bala.data';

export default function QuizPage() {
  return (
    <div className="py-6">
      <QuizEngine items={kallaBalaData.items} />
    </div>
  );
}
