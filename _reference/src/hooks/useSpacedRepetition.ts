import { useMemo, useCallback } from 'react';
import type { Word, WordProgress } from '../types';

// SM-2 inspired intervals in days per level
const INTERVALS: Record<number, number> = {
  0: 0,    // immediate
  1: 1,    // 1 day
  2: 3,    // 3 days
  3: 7,    // 7 days
  4: 14,   // 14 days
  5: 30,   // 30 days
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function useSpacedRepetition() {
  const calculateNextReview = useCallback(
    (
      currentLevel: number,
      correct: boolean
    ): { newLevel: number; nextReviewTimestamp: number } => {
      const newLevel = correct
        ? Math.min(currentLevel + 1, 5)
        : Math.max(currentLevel - 1, 0);

      const intervalDays = INTERVALS[newLevel] ?? 0;
      const nextReviewTimestamp = Date.now() + intervalDays * DAY_MS;

      return { newLevel, nextReviewTimestamp };
    },
    []
  );

  const getWordsForReview = useCallback(
    (
      wordProgress: Record<number, WordProgress>,
      allWords: Word[]
    ): Word[] => {
      const now = Date.now();
      const wordMap = new Map(allWords.map((w) => [w.id, w]));

      const dueWords: { word: Word; priority: number }[] = [];

      for (const [idStr, wp] of Object.entries(wordProgress)) {
        const id = Number(idStr);
        const word = wordMap.get(id);
        if (!word) continue;

        if (wp.nextReview <= now) {
          // Lower level = higher priority (more urgent review)
          // Older overdue = higher priority
          const overdueDays = (now - wp.nextReview) / DAY_MS;
          const priority = (5 - wp.level) * 10 + overdueDays;
          dueWords.push({ word, priority });
        }
      }

      // Sort by priority descending (most urgent first)
      dueWords.sort((a, b) => b.priority - a.priority);

      return dueWords.map((d) => d.word);
    },
    []
  );

  return useMemo(
    () => ({
      getWordsForReview,
      calculateNextReview,
    }),
    [getWordsForReview, calculateNextReview]
  );
}
