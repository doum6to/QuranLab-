import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { parties } from '../data/lessons';
import LessonNode from '../components/LessonNode';
import type { Lesson } from '../types';

function StreakBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      <span className="font-bold text-amber-700 text-sm">{count}</span>
    </div>
  );
}

function XpBadge({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="font-bold text-emerald-700 text-sm">{xp}</span>
    </div>
  );
}

function CircularLessonProgress({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
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
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold text-gray-900">{completed}</span>
        <span className="text-sm text-gray-400">/{total}</span>
      </div>
    </div>
  );
}

function LockSmallIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.76-2.24-5-5-5zm3 8H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3zm-3 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
    </svg>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { progress, isLessonComplete, getLessonProgress } = useProgress();

  const activePartie = parties[0];

  const completedLessonIds = useMemo(() => {
    const ids = new Set<number>();
    for (const lesson of activePartie.lessons) {
      if (isLessonComplete(lesson)) {
        ids.add(lesson.id);
      }
    }
    return ids;
  }, [activePartie.lessons, isLessonComplete]);

  const completedCount = completedLessonIds.size;
  const totalLessons = activePartie.lessons.length;

  const firstInProgressIndex = useMemo(() => {
    return activePartie.lessons.findIndex((l) => !completedLessonIds.has(l.id));
  }, [activePartie.lessons, completedLessonIds]);

  function getLessonStatus(lesson: Lesson, index: number): 'locked' | 'available' | 'in-progress' | 'completed' {
    if (completedLessonIds.has(lesson.id)) return 'completed';
    if (index === firstInProgressIndex) return 'in-progress';
    return 'available';
  }

  const progressMessage = useMemo(() => {
    if (completedCount === 0) {
      return 'Bismillah ! Commence ta premiere lecon pour decouvrir le vocabulaire du Coran.';
    }
    if (completedCount === totalLessons) {
      return 'Machallah ! Tu as termine toutes les lecons de la Partie 1 !';
    }
    return `Tu as termine ${completedCount} lecon${completedCount > 1 ? 's' : ''} sur ${totalLessons}. Continue comme ca !`;
  }, [completedCount, totalLessons]);

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-gray-900">QuranLab</h1>
        <div className="flex items-center gap-2">
          <StreakBadge count={progress.streak} />
          <XpBadge xp={progress.totalXp} />
        </div>
      </div>

      {/* Partie tabs */}
      <div className="px-6 pb-4">
        <div className="flex gap-3 overflow-x-auto">
          {parties.map((partie) => (
            <motion.div
              key={partie.id}
              whileTap={!partie.locked ? { scale: 0.97 } : undefined}
              className={`
                shrink-0 rounded-xl px-4 py-3 min-w-[140px] transition-colors
                ${!partie.locked
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
                }
              `}
            >
              <p className={`text-xs font-bold uppercase tracking-wider ${!partie.locked ? 'text-emerald-100' : 'text-gray-400'}`}>
                Partie {partie.id}
              </p>
              <p className={`text-sm font-semibold mt-0.5 ${!partie.locked ? 'text-white' : 'text-gray-500'}`}>
                {partie.title}
              </p>
              {partie.locked && (
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.76-2.24-5-5-5zm3 8H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3z" />
                  </svg>
                  <span className="text-xs text-gray-400">Verrouille</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 space-y-6">
        {/* Progress overview with mascot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-4"
        >
          {/* Mascot "Q" */}
          <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0 mt-1">
            Q
          </div>

          <div className="flex-1">
            {/* Speech bubble */}
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 font-medium leading-relaxed"
              style={{ backgroundColor: '#FEF9C3', border: '1px solid #FDE047' }}
            >
              {progressMessage}
            </div>
          </div>

          {/* Circular progress */}
          <div className="shrink-0">
            <CircularLessonProgress completed={completedCount} total={totalLessons} />
          </div>
        </motion.div>

        {/* Learning path */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">
            Partie 1 : {activePartie.title}
          </h2>

          <div className="space-y-0">
            {activePartie.lessons.map((lesson, index) => (
              <LessonNode
                key={lesson.id}
                lesson={lesson}
                status={getLessonStatus(lesson, index)}
                progress={getLessonProgress(lesson)}
                isLast={index === activePartie.lessons.length - 1}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        </motion.div>

        {/* Locked parties */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 pb-4"
        >
          {parties.filter((p) => p.locked).map((partie) => (
            <div
              key={partie.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <LockSmallIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-500 text-sm">
                  Partie {partie.id} : {partie.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{partie.description}</p>
                <span className="inline-block mt-1.5 text-xs font-medium text-gray-400 bg-gray-200 rounded-full px-2.5 py-0.5">
                  Bientot disponible
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
