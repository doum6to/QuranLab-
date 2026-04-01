'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContextualQCMCard } from '@/lib/types';
import ArabicText from '@/components/ui/ArabicText';

interface ContextualQCMProps {
  card: ContextualQCMCard;
  onComplete: () => void;
  onShowExplanation: (isCorrect: boolean, explanationFr: string, correctAnswerText?: string) => void;
}

export default function ContextualQCM({
  card,
  onComplete,
  onShowExplanation,
}: ContextualQCMProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;

    setSelectedId(optionId);
    setIsAnswered(true);

    const selected = card.options.find((o) => o.id === optionId);
    const correct = card.options.find((o) => o.isCorrect);
    if (!selected || !correct) return;

    const isCorrect = selected.isCorrect;
    onShowExplanation(
      isCorrect,
      selected.explanationFr,
      isCorrect ? undefined : correct.text
    );
    onComplete();
  };

  const getOptionStyle = (optionId: string) => {
    if (!isAnswered || selectedId !== optionId) {
      if (selectedId === optionId) {
        return 'border-blue-500 bg-blue-500/10';
      }
      return 'border-border bg-surface-card hover:border-text-muted';
    }

    const option = card.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      return 'border-correct bg-correct-bg';
    }
    return 'border-incorrect bg-incorrect-bg';
  };

  const showCorrectAfterWrong = (optionId: string) => {
    if (!isAnswered) return false;
    const selected = card.options.find((o) => o.id === selectedId);
    if (selected?.isCorrect) return false;
    const option = card.options.find((o) => o.id === optionId);
    return option?.isCorrect ?? false;
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-foreground">
        {card.questionFr}
      </h2>

      {card.arabicContext && (
        <div className="rounded-lg bg-surface-warm p-4 flex justify-center">
          <ArabicText text={card.arabicContext} size="lg" />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {card.options.map((option) => (
          <motion.button
            key={option.id}
            whileTap={!isAnswered ? { scale: 0.97 } : undefined}
            onClick={() => handleSelect(option.id)}
            disabled={isAnswered}
            className={`w-full rounded-xl border-2 px-4 py-3 text-left text-base transition-colors ${getOptionStyle(option.id)} ${
              isAnswered ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  showCorrectAfterWrong(option.id)
                    ? 'text-correct-text font-medium'
                    : 'text-foreground'
                }
              >
                {option.text}
              </span>
              {isAnswered && selectedId === option.id && option.isCorrect && (
                <span className="text-correct text-lg">✓</span>
              )}
              {isAnswered && selectedId === option.id && !option.isCorrect && (
                <span className="text-incorrect text-lg">✗</span>
              )}
              {showCorrectAfterWrong(option.id) && (
                <span className="text-correct text-lg">✓</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
