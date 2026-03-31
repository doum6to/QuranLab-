import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, WordProgress, Lesson, ExerciseType } from '../types';

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
  completedLessons: [],
  completedExercises: [],
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

const exerciseOrder: ExerciseType[] = ['discover', 'quiz', 'match', 'write', 'master'];

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
        nextReview: now + 24 * 60 * 60 * 1000,
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

      const intervals = [0, 1, 3, 7, 14, 30];
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

  const markLessonComplete = useCallback((lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, []);

  const markExerciseComplete = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  }, []);

  const isExerciseUnlocked = useCallback(
    (lessonId: number, exerciseType: ExerciseType): boolean => {
      const typeIndex = exerciseOrder.indexOf(exerciseType);
      if (typeIndex === 0) return true; // discover is always unlocked
      const prevType = exerciseOrder[typeIndex - 1];
      const prevExerciseId = `${lessonId}-${prevType}`;
      return progress.completedExercises.includes(prevExerciseId);
    },
    [progress.completedExercises]
  );

  const isExerciseCompleted = useCallback(
    (exerciseId: string): boolean => {
      return progress.completedExercises.includes(exerciseId);
    },
    [progress.completedExercises]
  );

  const getExerciseStatus = useCallback(
    (lessonId: number, exerciseType: ExerciseType): 'completed' | 'active' | 'locked' => {
      const exerciseId = `${lessonId}-${exerciseType}`;
      if (progress.completedExercises.includes(exerciseId)) return 'completed';
      if (isExerciseUnlocked(lessonId, exerciseType)) return 'active';
      return 'locked';
    },
    [progress.completedExercises, isExerciseUnlocked]
  );

  const isLessonComplete = useCallback(
    (lesson: Lesson): boolean => {
      return lesson.words.every((w) => progress.wordProgress[w.id] !== undefined);
    },
    [progress.wordProgress]
  );

  const getLessonProgress = useCallback(
    (lesson: Lesson): number => {
      if (lesson.words.length === 0) return 0;
      const learned = lesson.words.filter(
        (w) => progress.wordProgress[w.id] !== undefined
      ).length;
      return Math.round((learned / lesson.words.length) * 100);
    },
    [progress.wordProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    setProgress,
    markWordLearned,
    updateWordProgress,
    addXp,
    updateStreak,
    markLessonComplete,
    markExerciseComplete,
    isExerciseUnlocked,
    isExerciseCompleted,
    getExerciseStatus,
    isLessonComplete,
    getLessonProgress,
    resetProgress,
  };
}
