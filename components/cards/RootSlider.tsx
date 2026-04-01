'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { RootSliderCard as RootSliderCardType } from '@/lib/types';

interface RootSliderProps {
  card: RootSliderCardType;
  onComplete: () => void;
}

export default function RootSlider({ card, onComplete }: RootSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const form = card.forms[currentIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIndex(Number(e.target.value));
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-text-muted mb-1">Racine</p>
        <p className="font-arabic text-3xl text-gold" dir="rtl">
          {card.rootLetters}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          {card.rootMeaningFr}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl bg-surface-warm p-6 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary/20 px-3 py-1 text-sm font-bold text-primary">
              Forme {form.formLabel}
            </span>
          </div>

          <p className="font-arabic text-4xl leading-[2] text-primary" dir="rtl">
            {form.pattern}
          </p>

          <p className="font-arabic text-5xl leading-[2] text-foreground" dir="rtl">
            {form.arabic}
          </p>

          <p className="text-sm text-text-muted italic">
            {form.transliteration}
          </p>

          <p className="text-base font-medium text-foreground">
            {form.meaningFr}
          </p>

          {form.addedLetters && (
            <p className="text-xs text-text-muted">
              Lettres ajoutees : {form.addedLetters}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-2 px-2">
        <input
          type="range"
          min={0}
          max={card.forms.length - 1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-text-muted">
          <span>Forme {card.forms[0].formLabel}</span>
          <span>Forme {card.forms[card.forms.length - 1].formLabel}</span>
        </div>
      </div>
    </div>
  );
}
