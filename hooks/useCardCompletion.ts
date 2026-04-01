'use client';

import { useState, useCallback } from 'react';

interface UseCardCompletionReturn {
  isComplete: boolean;
  markComplete: () => void;
  selectedAnswer: string | null;
  setSelectedAnswer: (id: string) => void;
  isCorrect: boolean | null;
  setIsCorrect: (correct: boolean) => void;
}

export default function useCardCompletion(
  onComplete: () => void
): UseCardCompletionReturn {
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const markComplete = useCallback(() => {
    if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [isComplete, onComplete]);

  return {
    isComplete,
    markComplete,
    selectedAnswer,
    setSelectedAnswer,
    isCorrect,
    setIsCorrect,
  };
}
