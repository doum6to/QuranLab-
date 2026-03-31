import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, WordProgress } from '../types';

const STORAGE_KEY = 'quranlab-progress';

const defaultProgress: UserProgress = {
  wordsLearned: 0,
  totalXp: 0,
  streak: 0,
  lastStudyDate: '',
  onboardingComplete: false,
  studyGoal: '',
  studyTime: '',
  wordProgress: {},
};

function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // Corrupted data, reset
  }
  return { ...defaultProgress };
}

function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markWordLearned = useCallback((wordId: number) => {
    setProgress((prev) => {
      const existing = prev.wordProgress[wordId];
      if (existing) return prev;

      const now = Date.now();
      const newWordProgress: WordProgress = {
        wordId,
        level: 1,
        nextReview: now + 24 * 60 * 60 * 1000, // 1 day
        correctCount: 0,
        incorrectCount: 0,
        lastReviewed: now,
      };

      return {
        ...prev,
        wordsLearned: prev.wordsLearned + 1,
        wordProgress: {
          ...prev.wordProgress,
          [wordId]: newWordProgress,
        },
      };
    });
  }, []);

  const updateWordProgress = useCallback((wordId: number, correct: boolean) => {
    setProgress((prev) => {
      const existing = prev.wordProgress[wordId];
      if (!existing) return prev;

      const now = Date.now();
      const newLevel = correct
        ? Math.min(existing.level + 1, 5)
        : Math.max(existing.level - 1, 0);

      const intervals = [0, 1, 3, 7, 14, 30]; // days per level
      const nextReview = now + intervals[newLevel] * 24 * 60 * 60 * 1000;

      const updated: WordProgress = {
        ...existing,
        level: newLevel,
        nextReview,
        correctCount: existing.correctCount + (correct ? 1 : 0),
        incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
        lastReviewed: now,
      };

      return {
        ...prev,
        wordProgress: {
          ...prev.wordProgress,
          [wordId]: updated,
        },
      };
    });
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + amount,
    }));
  }, []);

  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.lastStudyDate === today) return prev;

      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0];
      const isConsecutive = prev.lastStudyDate === yesterday;

      return {
        ...prev,
        streak: isConsecutive ? prev.streak + 1 : 1,
        lastStudyDate: today,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Calculate Quran coverage: sum of frequency percentages for learned words
  const calculateQuranCoverage = useCallback(
    (allWords: { id: number; frequency: number }[]): number => {
      const learnedIds = new Set(
        Object.keys(progress.wordProgress).map(Number)
      );
      const totalFrequency = allWords.reduce((sum, w) => sum + w.frequency, 0);
      if (totalFrequency === 0) return 0;

      const learnedFrequency = allWords
        .filter((w) => learnedIds.has(w.id))
        .reduce((sum, w) => sum + w.frequency, 0);

      return Math.round((learnedFrequency / totalFrequency) * 100 * 10) / 10;
    },
    [progress.wordProgress]
  );

  return {
    progress,
    setProgress,
    markWordLearned,
    updateWordProgress,
    addXp,
    updateStreak,
    resetProgress,
    calculateQuranCoverage,
  };
}
