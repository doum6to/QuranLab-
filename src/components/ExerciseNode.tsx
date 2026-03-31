import { motion } from 'framer-motion';
import type { ExerciseType } from '../types';

interface ExerciseNodeProps {
  type: ExerciseType;
  title: string;
  status: 'completed' | 'active' | 'locked';
  index: number;
  onTap: () => void;
}

const exerciseEmoji: Record<ExerciseType, string> = {
  discover: '📖',
  quiz: '🧠',
  match: '🔗',
  write: '✍️',
  master: '🏆',
};

export default function ExerciseNode({ type, title, status, index, onTap }: ExerciseNodeProps) {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  // Zigzag: alternate left/center/right
  const positions = [0, 1, 2, 1, 0];
  const posIndex = positions[index % positions.length];
  // posIndex: 0 = left, 1 = center, 2 = right
  const translateX = posIndex === 0 ? '-35%' : posIndex === 2 ? '35%' : '0%';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center"
      style={{ transform: `translateX(${translateX})` }}
    >
      <button
        onClick={onTap}
        disabled={isLocked}
        className="relative flex flex-col items-center gap-2 group"
      >
        {/* Active pulsing glow behind */}
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1 w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
            }}
          />
        )}

        {/* 3D Coin / Medallion */}
        <div className="relative w-[80px] h-[88px] sm:w-[88px] sm:h-[96px]">
          {/* Shadow/base (3D depth) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
            style={{
              width: '80%',
              height: '16px',
              background: isCompleted
                ? 'radial-gradient(ellipse, rgba(180,140,40,0.5) 0%, transparent 70%)'
                : isActive
                  ? 'radial-gradient(ellipse, rgba(16,185,129,0.4) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
            }}
          />

          {/* Outer ring - the 3D rim */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full"
            style={{
              background: isCompleted
                ? 'linear-gradient(180deg, #D4AF37 0%, #B8960C 50%, #8B6914 100%)'
                : isActive
                  ? 'linear-gradient(180deg, #34D399 0%, #10B981 50%, #059669 100%)'
                  : 'linear-gradient(180deg, #6B7280 0%, #4B5563 50%, #374151 100%)',
              boxShadow: isCompleted
                ? '0 4px 8px rgba(180,140,40,0.4), inset 0 1px 2px rgba(255,223,100,0.3)'
                : isActive
                  ? '0 4px 12px rgba(16,185,129,0.5), inset 0 1px 2px rgba(110,231,183,0.3)'
                  : '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(156,163,175,0.2)',
            }}
          >
            {/* Middle ring */}
            <div
              className="absolute inset-[5px] sm:inset-[6px] rounded-full"
              style={{
                background: isCompleted
                  ? 'linear-gradient(180deg, #F5D060 0%, #D4AF37 100%)'
                  : isActive
                    ? 'linear-gradient(180deg, #6EE7B7 0%, #34D399 100%)'
                    : 'linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)',
              }}
            >
              {/* Inner face of the coin */}
              <div
                className="absolute inset-[4px] sm:inset-[5px] rounded-full flex items-center justify-center"
                style={{
                  background: isCompleted
                    ? 'linear-gradient(180deg, #FFE082 0%, #F5D060 50%, #D4AF37 100%)'
                    : isActive
                      ? 'linear-gradient(180deg, #A7F3D0 0%, #6EE7B7 50%, #34D399 100%)'
                      : 'linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 50%, #6B7280 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {isCompleted ? (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : isActive ? (
                  <span className="text-xl sm:text-2xl drop-shadow-sm">{exerciseEmoji[type]}</span>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Active badge floating on top */}
          {isActive && (
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
              className="absolute -top-1 -right-1 sm:-top-1 sm:right-0 w-7 h-7 sm:w-8 sm:h-8"
            >
              <div
                className="w-full h-full rounded-lg flex items-center justify-center rotate-12"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 2px 6px rgba(16,185,129,0.5)',
                }}
              >
                <svg className="w-4 h-4 text-white -rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          )}
        </div>

        {/* Label */}
        <span
          className={`text-sm sm:text-base font-semibold text-center leading-tight max-w-[120px] sm:max-w-[140px] ${
            isCompleted
              ? 'text-amber-300/70'
              : isActive
                ? 'text-white'
                : 'text-gray-500'
          }`}
        >
          {title}
        </span>
      </button>
    </motion.div>
  );
}
