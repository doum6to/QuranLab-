import { motion } from 'framer-motion';
import type { Lesson } from '../types';

interface LessonNodeProps {
  lesson: Lesson;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  progress: number;
  isLast: boolean;
  onClick: () => void;
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.76-2.24-5-5-5zm3 8H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3zm-3 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
    </svg>
  );
}

export default function LessonNode({ lesson, status, progress, isLast, onClick }: LessonNodeProps) {
  const isClickable = status !== 'locked';
  const isHighlighted = status === 'in-progress';

  return (
    <div className="relative">
      <motion.button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        whileHover={isClickable ? { scale: 1.02 } : undefined}
        whileTap={isClickable ? { scale: 0.98 } : undefined}
        className={`
          relative z-10 flex items-center gap-4 w-full text-left rounded-2xl transition-colors
          ${isHighlighted ? 'bg-emerald-50 border border-emerald-200 p-4 -mx-1 shadow-sm' : 'p-3'}
          ${isClickable ? 'cursor-pointer' : 'cursor-default'}
        `}
      >
        {/* Circle indicator */}
        <div className="relative shrink-0">
          {status === 'in-progress' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 48, height: 48, margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          )}

          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-colors
              ${status === 'completed' ? 'bg-emerald-500 text-white' : ''}
              ${status === 'in-progress' ? 'border-2 border-emerald-500 bg-white text-emerald-600' : ''}
              ${status === 'available' ? 'border-2 border-gray-300 bg-white text-gray-500' : ''}
              ${status === 'locked' ? 'bg-gray-200 text-gray-400' : ''}
            `}
          >
            {status === 'completed' && <CheckIcon />}
            {status === 'locked' && <LockIcon />}
            {(status === 'in-progress' || status === 'available') && lesson.id}
          </div>
        </div>

        {/* Lesson info */}
        <div className="flex-1 min-w-0">
          <p
            className={`
              font-semibold text-sm leading-snug truncate
              ${status === 'locked' ? 'text-gray-400' : 'text-gray-900'}
            `}
          >
            {lesson.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`
                text-xs font-medium px-2 py-0.5 rounded-full
                ${status === 'completed' ? 'bg-emerald-100 text-emerald-700' : ''}
                ${status === 'in-progress' ? 'bg-emerald-100 text-emerald-700' : ''}
                ${status === 'available' ? 'bg-gray-100 text-gray-500' : ''}
                ${status === 'locked' ? 'bg-gray-100 text-gray-400' : ''}
              `}
            >
              {lesson.words.length} mots
            </span>
            {status === 'in-progress' && progress > 0 && (
              <span className="text-xs text-emerald-600 font-medium">{progress}%</span>
            )}
          </div>

          {/* Progress bar for in-progress */}
          {status === 'in-progress' && progress > 0 && (
            <div className="mt-2 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          )}
        </div>

        {/* Arrow for clickable items */}
        {isClickable && (
          <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </motion.button>

      {/* Vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-[calc(1.5rem)] top-[calc(3rem+0.75rem)] w-0.5 bg-gray-200"
          style={{ height: isHighlighted ? 'calc(100% - 2.25rem)' : 'calc(100% - 1.5rem)' }}
        />
      )}
    </div>
  );
}
