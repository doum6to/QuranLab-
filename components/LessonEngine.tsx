'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { InteractiveCard } from '@/lib/types';
import ProgressBar from '@/components/ui/ProgressBar';
import ContinueButton from '@/components/ui/ContinueButton';
import CardRenderer from '@/components/cards/CardRenderer';
import ExplanationSheet from '@/components/ExplanationSheet';

interface LessonEngineProps {
  cards: InteractiveCard[];
  lessonTitle: string;
  nodeId: string;
}

interface ExplanationData {
  isCorrect: boolean;
  explanationFr: string;
  correctAnswerText?: string;
}

export default function LessonEngine({
  cards,
  lessonTitle,
  nodeId,
}: LessonEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationData, setExplanationData] =
    useState<ExplanationData | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const handleCardComplete = useCallback(() => {
    setIsCardComplete(true);
  }, []);

  const handleShowExplanation = useCallback(
    (isCorrect: boolean, explanationFr: string, correctAnswerText?: string) => {
      setExplanationData({ isCorrect, explanationFr, correctAnswerText });
      setShowExplanation(true);
      if (isCorrect) {
        setXpEarned((prev) => prev + 15);
      }
    },
    []
  );

  const handleContinue = () => {
    setShowExplanation(false);
    setExplanationData(null);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      setIsLessonComplete(true);
    } else {
      setCurrentIndex(nextIndex);
      setIsCardComplete(false);
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  if (isLessonComplete) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold text-foreground">
          Lecon terminee !
        </h1>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-text-muted uppercase tracking-wider">
            XP Total
          </p>
          <motion.p
            className="text-5xl font-bold text-primary"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            {xpEarned}
          </motion.p>
        </div>
        <ContinueButton onClick={handleClose} disabled={false} />
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const needsExplanationSheet =
    currentCard.type === 'contextual_qcm' || currentCard.type === 'fill_blank';

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 border-b border-border-light">
        <button
          onClick={handleClose}
          className="text-text-muted hover:text-foreground text-xl leading-none"
          aria-label="Fermer"
        >
          ✕
        </button>
        <ProgressBar current={currentIndex} total={cards.length} />
        <div className="flex items-center gap-1 text-sm font-semibold text-primary">
          <span>⚡</span>
          <motion.span
            key={xpEarned}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.3 }}
          >
            {xpEarned}
          </motion.span>
        </div>
      </header>

      {/* Card area */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CardRenderer
              card={currentCard}
              onComplete={handleCardComplete}
              onShowExplanation={handleShowExplanation}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer — only show Continue button for cards without explanation sheet */}
      {!needsExplanationSheet && (
        <footer className="px-5 pb-6 pt-2">
          <ContinueButton
            onClick={handleContinue}
            disabled={!isCardComplete}
          />
        </footer>
      )}

      {/* Explanation Sheet overlay */}
      <ExplanationSheet
        isOpen={showExplanation}
        isCorrect={explanationData?.isCorrect ?? true}
        xpEarned={15}
        explanationFr={explanationData?.explanationFr}
        correctAnswerText={explanationData?.correctAnswerText}
        onContinue={handleContinue}
      />
    </div>
  );
}
