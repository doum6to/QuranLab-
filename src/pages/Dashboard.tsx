import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { words } from '../data/words';

function StreakBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
      <svg
        className="w-5 h-5 text-amber-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      <span className="font-bold text-amber-700 text-sm">{count}</span>
    </div>
  );
}

function CircularProgress({
  percentage,
  size = 160,
  strokeWidth = 10,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-3xl font-bold text-gray-900">
          {percentage.toFixed(1)}%
        </span>
        <p className="text-xs text-gray-500 mt-0.5">du Coran</p>
      </div>
    </div>
  );
}

function SpeechBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
        Q
      </div>
      <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-gray-800 font-medium">
        {text}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { progress, calculateQuranCoverage } = useProgress();

  const coverage = useMemo(
    () => calculateQuranCoverage(words),
    [calculateQuranCoverage]
  );

  const nextLesson = useMemo(() => {
    const learnedIds = new Set(Object.keys(progress.wordProgress).map(Number));
    const nextWord = words.find((w) => !learnedIds.has(w.id));
    return nextWord;
  }, [progress.wordProgress]);

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
            Niveau 1
          </p>
          <h1 className="font-serif text-2xl font-bold text-gray-900">
            Vocabulaire du Coran
          </h1>
        </div>
        <StreakBadge count={progress.streak} />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 space-y-6">
        {/* Progress ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center py-6"
        >
          <CircularProgress percentage={coverage} />
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {progress.wordsLearned}
              </p>
              <p className="text-sm text-gray-500">mots appris</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {progress.totalXp}
              </p>
              <p className="text-sm text-gray-500">XP total</p>
            </div>
          </div>
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SpeechBubble
            text={
              progress.wordsLearned === 0
                ? 'Prêt à commencer ton apprentissage ?'
                : 'Continue ton apprentissage !'
            }
          />
        </motion.div>

        {/* Current lesson card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Prochaine leçon
              </p>
              <p className="font-semibold text-gray-900 mt-1">
                {nextLesson
                  ? `${nextLesson.meaningFr} - ${nextLesson.transliteration}`
                  : 'Tout est révisé !'}
              </p>
            </div>
            {nextLesson && (
              <span className="font-arabic text-3xl text-gray-700">
                {nextLesson.arabic}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(
                    (progress.wordsLearned / words.length) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {progress.wordsLearned}/{words.length}
            </span>
          </div>
          <button className="btn-primary">Continuer</button>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="card p-4 text-center">
            <p className="text-2xl mb-2">📖</p>
            <p className="font-semibold text-gray-900 text-sm">Apprendre</p>
            <p className="text-xs text-gray-500 mt-0.5">Nouveaux mots</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl mb-2">🧠</p>
            <p className="font-semibold text-gray-900 text-sm">Quiz</p>
            <p className="text-xs text-gray-500 mt-0.5">Teste-toi</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
