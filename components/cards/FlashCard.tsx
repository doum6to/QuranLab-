'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FlashcardCard } from '@/lib/types';
import ArabicText from '@/components/ui/ArabicText';

interface FlashCardProps {
  card: FlashcardCard;
  onComplete: () => void;
}

export default function FlashCard({ card, onComplete }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onComplete();
    } else {
      setIsFlipped(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-text-muted">Touche pour retourner</p>

      <div
        onClick={handleFlip}
        className="w-full cursor-pointer"
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full min-h-[240px]"
        >
          {/* Front — Arabic */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-surface-warm p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <ArabicText text={card.arabic} size="xl" />
          </div>

          {/* Back — French */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-surface-card p-6"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-sm text-text-muted italic">
              {card.transliteration}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {card.meaningFr}
            </p>
            {card.exampleAyah && (
              <div className="mt-3 rounded-lg bg-surface-warm p-3 text-center">
                <ArabicText
                  text={card.exampleAyah}
                  size="md"
                  className="text-text-secondary"
                />
                {card.exampleAyahRef && (
                  <p className="mt-1 text-xs text-text-muted">
                    {card.exampleAyahRef}
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
