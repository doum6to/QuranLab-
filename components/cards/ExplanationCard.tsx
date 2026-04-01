'use client';

import { useEffect } from 'react';
import type { ExplanationCard as ExplanationCardType } from '@/lib/types';
import ArabicText from '@/components/ui/ArabicText';

interface ExplanationCardProps {
  card: ExplanationCardType;
  onComplete: () => void;
}

export default function ExplanationCard({
  card,
  onComplete,
}: ExplanationCardProps) {
  useEffect(() => {
    onComplete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-foreground">{card.titleFr}</h2>
      <p className="text-base leading-relaxed text-text-secondary">
        {card.bodyFr}
      </p>
      {card.arabicExample && (
        <div className="rounded-lg bg-surface-warm p-5 flex flex-col items-center gap-2">
          <ArabicText text={card.arabicExample} size="xl" />
          {card.arabicTransliteration && (
            <p className="text-sm text-text-muted italic">
              {card.arabicTransliteration}
            </p>
          )}
          {card.arabicMeaningFr && (
            <p className="text-sm text-text-secondary">
              {card.arabicMeaningFr}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
