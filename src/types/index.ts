export interface Word {
  id: number;
  arabic: string;
  transliteration: string;
  meaningFr: string;
  meaningEn: string;
  frequency: number;
  category: 'noun' | 'verb' | 'particle' | 'preposition' | 'pronoun' | 'adjective';
  rootLetters?: string;
  exampleAyah?: string;
  exampleAyahRef?: string;
}

export interface WordProgress {
  wordId: number;
  level: number; // 0-5 (SRS levels)
  nextReview: number; // timestamp
  correctCount: number;
  incorrectCount: number;
  lastReviewed: number; // timestamp
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
}

export type QuizType = 'ar-to-fr' | 'fr-to-ar' | 'transliteration';
