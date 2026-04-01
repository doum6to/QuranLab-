'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ExplanationSheetProps {
  isOpen: boolean;
  isCorrect: boolean;
  xpEarned?: number;
  explanationFr?: string;
  correctAnswerText?: string;
  onContinue: () => void;
}

export default function ExplanationSheet({
  isOpen,
  isCorrect,
  xpEarned = 15,
  explanationFr,
  correctAnswerText,
  onContinue,
}: ExplanationSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed inset-x-0 bottom-0 z-50 rounded-t-xl px-6 py-6 ${
            isCorrect ? 'bg-correct-bg' : 'bg-surface-warm'
          }`}
        >
          {isCorrect ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <span className="text-xl font-bold text-correct-text">
                  Correct !
                </span>
                <span className="ml-auto text-lg font-semibold text-correct-text">
                  +{xpEarned} XP
                </span>
              </div>
              {explanationFr && (
                <p className="text-sm text-correct-text/80">{explanationFr}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold text-foreground">
                Pas tout a fait...
              </p>
              {correctAnswerText && (
                <p className="text-sm text-text-secondary">
                  Bonne reponse :{' '}
                  <span className="font-semibold text-primary">
                    {correctAnswerText}
                  </span>
                </p>
              )}
              {explanationFr && (
                <p className="text-sm text-text-secondary">{explanationFr}</p>
              )}
            </div>
          )}

          <button
            onClick={onContinue}
            className="mt-4 w-full rounded-lg bg-primary py-3 text-lg font-semibold text-white active:bg-primary-dark"
          >
            Continuer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
