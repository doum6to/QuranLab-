import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { words } from '../data/words';
import type { Word } from '../types';

const XP_PER_WORD = 15;
const DECK_SIZE = 5;

type CardState = 'front' | 'back';

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function XpBanner({ xp }: { xp: number }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg z-50"
    >
      Correct ! +{xp} XP
    </motion.div>
  );
}

export default function Learn() {
  const { progress, markWordLearned, addXp, updateStreak } = useProgress();
  const { getWordsForReview } = useSpacedRepetition();

  // Build the deck: review words first, then new words
  const deck: Word[] = useMemo(() => {
    const reviewWords = getWordsForReview(progress.wordProgress, words);
    const learnedIds = new Set(Object.keys(progress.wordProgress).map(Number));
    const newWords = words.filter((w) => !learnedIds.has(w.id));
    const combined = [...reviewWords, ...newWords];
    return combined.slice(0, DECK_SIZE);
  }, []); // Only compute once on mount

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>('front');
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpBanner, setShowXpBanner] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentWord = deck[currentIndex] ?? null;

  const handleReveal = useCallback(() => {
    if (cardState === 'front') {
      setCardState('back');
    }
  }, [cardState]);

  const handleResponse = useCallback(
    (known: boolean) => {
      if (!currentWord) return;

      if (known) {
        markWordLearned(currentWord.id);
        addXp(XP_PER_WORD);
        updateStreak();
        setEarnedXp((prev) => prev + XP_PER_WORD);
        setShowXpBanner(true);
        setTimeout(() => setShowXpBanner(false), 1500);
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex >= deck.length) {
        setIsComplete(true);
      } else {
        setCurrentIndex(nextIndex);
        setCardState('front');
      }
    },
    [currentWord, currentIndex, deck.length, markWordLearned, addXp, updateStreak]
  );

  // Complete screen
  if (isComplete || deck.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            Leçon terminée !
          </h1>

          <div className="flex items-start gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
              Q
            </div>
            <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-gray-800 font-medium">
              Bravo, continue comme ça !
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 w-full max-w-xs"
          >
            <p className="text-4xl font-bold text-emerald-600 mb-1">
              +{earnedXp} XP
            </p>
            <p className="text-gray-500">gagnés dans cette leçon</p>
          </motion.div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
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
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIndex} total={deck.length} />
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {currentIndex + 1}/{deck.length}
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm"
          >
            <motion.button
              onClick={handleReveal}
              whileTap={cardState === 'front' ? { scale: 0.98 } : undefined}
              className="w-full card p-8 text-center cursor-pointer min-h-[280px] flex flex-col items-center justify-center"
            >
              {/* Arabic word - always visible */}
              <p className="font-arabic text-5xl text-gray-900 mb-4 leading-relaxed">
                {currentWord.arabic}
              </p>

              {cardState === 'front' ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 text-sm font-medium"
                >
                  Appuie pour révéler
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-lg text-gray-500">
                    {currentWord.transliteration}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {currentWord.meaningFr}
                  </p>
                  {currentWord.rootLetters && (
                    <p className="text-sm text-gray-400">
                      Racine : {currentWord.rootLetters}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-8 pt-4">
        {cardState === 'back' ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleResponse(false)}
              className="btn-secondary flex-1"
            >
              À revoir
            </button>
            <button
              onClick={() => handleResponse(true)}
              className="btn-primary flex-1"
            >
              Je connais
            </button>
          </div>
        ) : (
          <button onClick={handleReveal} className="btn-primary">
            Révéler
          </button>
        )}
      </div>

      {/* XP Banner */}
      <AnimatePresence>{showXpBanner && <XpBanner xp={XP_PER_WORD} />}</AnimatePresence>
    </div>
  );
}
