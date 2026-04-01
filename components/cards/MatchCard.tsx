'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MatchCard as MatchCardType } from '@/lib/types';
import ArabicText from '@/components/ui/ArabicText';

interface MatchCardProps {
  card: MatchCardType;
  onComplete: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchCard({ card, onComplete }: MatchCardProps) {
  const [selectedArabic, setSelectedArabic] = useState<string | null>(null);
  const [selectedFrench, setSelectedFrench] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState(false);

  const shuffledFrench = useMemo(
    () => shuffle(card.pairs),
    [card.pairs]
  );

  useEffect(() => {
    if (selectedArabic && selectedFrench) {
      if (selectedArabic === selectedFrench) {
        // Correct match
        setMatchedIds((prev) => new Set([...prev, selectedArabic]));
        setSelectedArabic(null);
        setSelectedFrench(null);

        if (matchedIds.size + 1 === card.pairs.length) {
          onComplete();
        }
      } else {
        // Wrong match
        setWrongPair(true);
        setTimeout(() => {
          setSelectedArabic(null);
          setSelectedFrench(null);
          setWrongPair(false);
        }, 500);
      }
    }
  }, [selectedArabic, selectedFrench]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-foreground text-center">
        Relie les paires
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Arabic column */}
        <div className="flex flex-col gap-2">
          {card.pairs.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedArabic === pair.id;
            const isWrong = wrongPair && isSelected;

            return (
              <motion.button
                key={`ar-${pair.id}`}
                onClick={() => !isMatched && setSelectedArabic(pair.id)}
                animate={
                  isMatched
                    ? { opacity: 0.4, scale: 0.95 }
                    : { opacity: 1, scale: 1 }
                }
                className={`rounded-xl border-2 px-3 py-3 text-center transition-colors ${
                  isMatched
                    ? 'border-correct bg-correct-bg'
                    : isWrong
                      ? 'border-incorrect bg-incorrect-bg'
                      : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-surface-card'
                }`}
                disabled={isMatched}
              >
                <ArabicText text={pair.arabic} size="md" />
              </motion.button>
            );
          })}
        </div>

        {/* French column */}
        <div className="flex flex-col gap-2">
          {shuffledFrench.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedFrench === pair.id;
            const isWrong = wrongPair && isSelected;

            return (
              <motion.button
                key={`fr-${pair.id}`}
                onClick={() => !isMatched && setSelectedFrench(pair.id)}
                animate={
                  isMatched
                    ? { opacity: 0.4, scale: 0.95 }
                    : { opacity: 1, scale: 1 }
                }
                className={`rounded-xl border-2 px-3 py-3 text-center text-sm transition-colors ${
                  isMatched
                    ? 'border-correct bg-correct-bg'
                    : isWrong
                      ? 'border-incorrect bg-incorrect-bg'
                      : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-surface-card'
                }`}
                disabled={isMatched}
              >
                <span className="text-foreground">{pair.meaningFr}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
