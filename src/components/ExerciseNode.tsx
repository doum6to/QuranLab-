import { motion } from 'framer-motion';
import type { ExerciseType } from '../types';

const exerciseIcons: Record<ExerciseType, string> = {
  discover: '📖',
  quiz: '🧠',
  match: '🔗',
  write: '✍️',
  master: '🏆',
};

interface ExerciseNodeProps {
  type: ExerciseType;
  title: string;
  status: 'completed' | 'active' | 'locked';
  index: number;
  onTap: () => void;
}

export default function ExerciseNode({ type, title, status, index, onTap }: ExerciseNodeProps) {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      onClick={onTap}
      disabled={isLocked}
      className={`flex items-center gap-5 w-full text-left ${isLocked ? 'opacity-50' : ''}`}
    >
      {/* Concentric ring node */}
      <div className="relative w-[72px] h-[72px] shrink-0">
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full ${
            isCompleted
              ? 'bg-emerald-100'
              : isActive
                ? 'bg-emerald-50 ring-2 ring-emerald-200'
                : 'bg-gray-100'
          }`}
        />
        {/* Middle ring */}
        <div
          className={`absolute inset-2 rounded-full ${
            isCompleted
              ? 'bg-emerald-200'
              : isActive
                ? 'bg-emerald-100'
                : 'bg-gray-150'
          }`}
          style={!isCompleted && !isActive ? { backgroundColor: '#e8e8e8' } : undefined}
        />
        {/* Inner ring */}
        <div
          className={`absolute inset-4 rounded-full flex items-center justify-center ${
            isCompleted
              ? 'bg-emerald-500'
              : isActive
                ? 'bg-emerald-400'
                : 'bg-gray-200'
          }`}
        >
          {isCompleted ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-lg">{exerciseIcons[type]}</span>
          )}
        </div>

        {/* Active glow */}
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-emerald-300"
            style={{ zIndex: -1 }}
          />
        )}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-base ${
            isCompleted
              ? 'text-emerald-700'
              : isActive
                ? 'text-gray-900'
                : 'text-gray-400'
          }`}
        >
          {title}
        </p>
        {isCompleted && (
          <p className="text-xs text-emerald-500 font-medium mt-0.5">Terminé</p>
        )}
        {isActive && (
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Prêt</p>
        )}
        {isLocked && (
          <div className="flex items-center gap-1 mt-0.5">
            <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-gray-300">Verrouillé</p>
          </div>
        )}
      </div>

      {/* Chevron for active/completed */}
      {!isLocked && (
        <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </motion.button>
  );
}
