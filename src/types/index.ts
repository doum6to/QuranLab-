export interface Word {
  id: number;
  arabic: string;
  transliteration: string;
  meaningFr: string;
}

export interface Lesson {
  id: number;
  title: string;
  partieId: number;
  icon: string;
  words: Word[];
}

export interface Partie {
  id: number;
  title: string;
  description: string;
  coverage: number;
  locked: boolean;
  lessons: Lesson[];
}

export interface WordProgress {
  wordId: number;
  level: number;
  nextReview: number;
  correctCount: number;
  incorrectCount: number;
  lastReviewed: number;
}

export interface UserProgress {
  wordsLearned: number;
  totalXp: number;
  streak: number;
  lastStudyDate: string;
  onboardingComplete: boolean;
  studyGoal: string;
  studyTime: string;
  wordProgress: Record<number, WordProgress>;
  completedLessons: number[];
}

export type QuizType = 'ar-to-fr' | 'fr-to-ar' | 'transliteration';
