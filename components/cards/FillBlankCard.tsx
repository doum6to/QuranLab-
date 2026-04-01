'use client';

import { useState } from 'react';
import type { FillBlankCard as FillBlankCardType } from '@/lib/types';
import ArabicText from '@/components/ui/ArabicText';

interface FillBlankCardProps {
  card: FillBlankCardType;
  onComplete: () => void;
  onShowExplanation: (isCorrect: boolean, explanationFr: string, correctAnswerText?: string) => void;
}

export default function FillBlankCard({
  card,
  onComplete,
  onShowExplanation,
}: FillBlankCardProps) {
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (isSubmitted || !userInput.trim()) return;

    setIsSubmitted(true);
    const correct =
      userInput.trim().toLowerCase() === card.blankAnswer.toLowerCase();
    setIsCorrect(correct);

    onShowExplanation(
      correct,
      correct ? '' : card.explanationFr,
      correct ? undefined : card.blankAnswer
    );
    onComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // Split sentence at ___
  const parts = card.sentenceFr.split('___');

  return (
    <div className="flex flex-col gap-6">
      {/* Arabic context */}
      <div className="rounded-lg bg-surface-warm p-4 flex justify-center">
        <ArabicText text={card.arabicContext} size="lg" />
      </div>

      {/* Sentence with blank */}
      <div className="text-lg leading-relaxed text-foreground flex flex-wrap items-center gap-1">
        <span>{parts[0]}</span>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitted}
          placeholder="..."
          className={`inline-block w-32 rounded-lg border-2 bg-surface-card px-3 py-1 text-center text-base outline-none ${
            isSubmitted
              ? isCorrect
                ? 'border-correct text-correct-text'
                : 'border-incorrect text-incorrect-text'
              : 'border-border focus:border-primary'
          }`}
        />
        {parts[1] && <span>{parts[1]}</span>}
      </div>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!userInput.trim()}
          className={`w-full rounded-lg py-3 text-base font-semibold transition-colors ${
            userInput.trim()
              ? 'bg-primary text-white active:bg-primary-dark'
              : 'bg-disabled text-disabled-text cursor-not-allowed'
          }`}
        >
          Verifier
        </button>
      )}
    </div>
  );
}
