import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { getLessonById } from '../data/lessons';
import type { Word } from '../types';

const XP_PER_PAIR = 10;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Match() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXp, updateStreak, markExerciseComplete } = useProgress();

  const lesson = useMemo(() => getLessonById(Number(lessonId)), [lessonId]);

  const words = useMemo(() => {
    if (!lesson) return [];
    return shuffleArray(lesson.words).slice(0, 6);
  }, [lesson]);

  const shuffledArabic = useMemo(() => shuffleArray(words), [words]);
  const shuffledFrench = useMemo(() => shuffleArray(words), [words]);

  const [selectedArabic, setSelectedArabic] = useState<number | null>(null);
  const [selectedFrench, setSelectedFrench] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ arabic: number; french: number } | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);

  const isComplete = matchedIds.size === words.length && words.length > 0;

  const tryMatch = useCallback(
    (arabicId: number, frenchId: number) => {
      if (arabicId === frenchId) {
        // Correct match
        setMatchedIds((prev) => new Set([...prev, arabicId]));
        addXp(XP_PER_PAIR);
        updateStreak();
        setEarnedXp((prev) => prev + XP_PER_PAIR);
        setSelectedArabic(null);
        setSelectedFrench(null);
      } else {
        // Wrong match
        setWrongPair({ arabic: arabicId, french: frenchId });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedArabic(null);
          setSelectedFrench(null);
        }, 600);
      }
    },
    [addXp, updateStreak]
  );

  const handleArabicTap = useCallback(
    (word: Word) => {
      if (matchedIds.has(word.id) || wrongPair) return;
      setSelectedArabic(word.id);
      if (selectedFrench !== null) {
        tryMatch(word.id, selectedFrench);
      }
    },
    [matchedIds, wrongPair, selectedFrench, tryMatch]
  );

  const handleFrenchTap = useCallback(
    (word: Word) => {
      if (matchedIds.has(word.id) || wrongPair) return;
      setSelectedFrench(word.id);
      if (selectedArabic !== null) {
        tryMatch(selectedArabic, word.id);
      }
    },
    [matchedIds, wrongPair, selectedArabic, tryMatch]
  );

  const handleFinish = useCallback(() => {
    if (lesson) {
      markExerciseComplete(`${lesson.id}-match`);
    }
    navigate(`/lesson/${lessonId}`);
  }, [lesson, lessonId, navigate, markExerciseComplete]);

  if (!lesson) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-gray-500 text-lg mb-4">Lecon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="text-7xl mb-6"
          >
            🎯
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            Associations terminees !
          </h1>
          <div className="flex items-start gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
              Q
            </div>
            <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-gray-800 font-medium">
              Toutes les paires sont reliees !
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 w-full max-w-xs"
          >
            <p className="text-4xl font-bold text-emerald-600 mb-1">+{earnedXp} XP</p>
            <p className="text-gray-500">gagnes dans cet exercice</p>
          </motion.div>
        </div>
        <div className="px-6 pb-8">
          <button onClick={handleFinish} className="btn-primary">
            Continuer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              animate={{ width: `${(matchedIds.size / words.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-3">
        <p className="text-gray-500 font-medium">Relie les paires arabe ↔ francais</p>
      </div>

      {/* Two columns */}
      <div className="flex-1 px-6 flex gap-3">
        {/* Arabic column */}
        <div className="flex-1 space-y-2">
          {shuffledArabic.map((word) => {
            const isMatched = matchedIds.has(word.id);
            const isSelected = selectedArabic === word.id;
            const isWrong = wrongPair?.arabic === word.id;

            return (
              <motion.button
                key={`ar-${word.id}`}
                onClick={() => handleArabicTap(word)}
                animate={isWrong ? { x: [0, -6, 6, -6, 0] } : {}}
                transition={{ duration: 0.3 }}
                className={`w-full p-3 rounded-xl text-center font-arabic text-xl transition-all duration-200 ${
                  isMatched
                    ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-700 opacity-60'
                    : isWrong
                      ? 'bg-red-50 border-2 border-red-300 text-red-700'
                      : isSelected
                        ? 'bg-emerald-50 border-2 border-emerald-400 text-gray-900'
                        : 'bg-white border-2 border-gray-200 text-gray-900 active:scale-[0.97]'
                }`}
                disabled={isMatched}
              >
                {word.arabic}
              </motion.button>
            );
          })}
        </div>

        {/* French column */}
        <div className="flex-1 space-y-2">
          {shuffledFrench.map((word) => {
            const isMatched = matchedIds.has(word.id);
            const isSelected = selectedFrench === word.id;
            const isWrong = wrongPair?.french === word.id;

            return (
              <motion.button
                key={`fr-${word.id}`}
                onClick={() => handleFrenchTap(word)}
                animate={isWrong ? { x: [0, -6, 6, -6, 0] } : {}}
                transition={{ duration: 0.3 }}
                className={`w-full p-3 rounded-xl text-center text-sm font-medium transition-all duration-200 ${
                  isMatched
                    ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-700 opacity-60'
                    : isWrong
                      ? 'bg-red-50 border-2 border-red-300 text-red-700'
                      : isSelected
                        ? 'bg-emerald-50 border-2 border-emerald-400 text-gray-900'
                        : 'bg-white border-2 border-gray-200 text-gray-900 active:scale-[0.97]'
                }`}
                disabled={isMatched}
              >
                {word.meaningFr}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
