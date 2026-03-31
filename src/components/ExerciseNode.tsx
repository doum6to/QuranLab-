import { motion } from 'framer-motion';
import type { ExerciseType } from '../types';

interface ExerciseNodeProps {
  type: ExerciseType;
  title: string;
  status: 'completed' | 'active' | 'locked';
  onTap: () => void;
  labelSide: 'left' | 'right';
  delay?: number;
}

const exerciseEmoji: Record<ExerciseType, string> = {
  discover: '📖',
  quiz: '🧠',
  match: '🔗',
  write: '✍️',
  master: '🏆',
};

// Color palettes per status
const palettes = {
  completed: {
    rim: '#6B5010',
    outerBorder: '#B8960C',
    outerBg: '#D4AF37',
    innerBg: 'linear-gradient(180deg, #FFE082 0%, #F5D060 60%, #D4AF37 100%)',
    ringBorder: '#B8960C',
    shadow: 'rgba(180,140,40,0.5)',
    glow: 'none',
  },
  active: {
    rim: '#065F46',
    outerBorder: '#059669',
    outerBg: '#10B981',
    innerBg: 'linear-gradient(180deg, #A7F3D0 0%, #6EE7B7 60%, #34D399 100%)',
    ringBorder: '#059669',
    shadow: 'rgba(16,185,129,0.4)',
    glow: '0 0 30px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.2)',
  },
  locked: {
    rim: '#374151',
    outerBorder: '#4B5563',
    outerBg: '#6B7280',
    innerBg: 'linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 60%, #6B7280 100%)',
    ringBorder: '#4B5563',
    shadow: 'rgba(0,0,0,0.4)',
    glow: 'none',
  },
};

export default function ExerciseNode({ type, title, status, onTap, labelSide, delay = 0 }: ExerciseNodeProps) {
  const p = palettes[status];

  // Coin dimensions
  const coinSize = 80; // px, the face diameter
  const rimHeight = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="relative flex items-center gap-4"
      style={{
        flexDirection: labelSide === 'right' ? 'row' : 'row-reverse',
      }}
    >
      {/* The 3D coin button */}
      <button
        onClick={onTap}
        disabled={status === 'locked'}
        className="relative shrink-0"
        style={{
          width: coinSize,
          height: coinSize + rimHeight + 12, // face + rim + shadow space
        }}
      >
        {/* Active glow pulse */}
        {status === 'active' && (
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full"
            style={{
              width: coinSize + 20,
              height: coinSize + 20,
              left: -10,
              top: -6,
              background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Perspective container */}
        <div
          style={{
            perspective: '600px',
            width: coinSize,
            height: coinSize + rimHeight,
          }}
        >
          <div
            style={{
              transform: 'rotateX(18deg)',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Elliptical shadow on the ground */}
            <div
              style={{
                position: 'absolute',
                bottom: -6,
                left: '10%',
                width: '80%',
                height: '14px',
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${p.shadow} 0%, transparent 70%)`,
              }}
            />

            {/* Rim / thickness of the disc */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: rimHeight + coinSize / 2,
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                background: `linear-gradient(180deg, transparent 0%, transparent 50%, ${p.rim} 50%, ${p.rim} 100%)`,
                clipPath: `inset(${coinSize / 2 - 2}px 0 0 0)`,
              }}
            />

            {/* Coin face — the main circular disc */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: coinSize,
                height: coinSize,
                borderRadius: '50%',
                border: `4px solid ${p.outerBorder}`,
                background: p.outerBg,
                boxShadow: status === 'active' ? p.glow : `inset 0 2px 4px rgba(255,255,255,0.15)`,
              }}
            >
              {/* Inner ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '50%',
                  border: `3px solid ${p.ringBorder}`,
                  background: p.innerBg,
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {status === 'completed' ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B5010" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === 'active' ? (
                  <span className="text-xl select-none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                    {exerciseEmoji[type]}
                  </span>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="#4B5563">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active: floating green diamond badge */}
        {status === 'active' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300 }}
            style={{
              position: 'absolute',
              top: -8,
              left: coinSize / 2 + 6,
              width: 28,
              height: 28,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '6px',
                transform: 'rotate(45deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 8px rgba(16,185,129,0.5)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                style={{ transform: 'rotate(-45deg)' }}
              >
                <path d="M13 3v6h6l-8 12v-6H5l8-12z" />
              </svg>
            </div>
          </motion.div>
        )}
      </button>

      {/* Label text */}
      <span
        className={`text-sm sm:text-base font-semibold leading-snug max-w-[140px] sm:max-w-[160px] ${
          labelSide === 'left' ? 'text-right' : 'text-left'
        }`}
        style={{
          color: status === 'completed'
            ? 'rgba(212,175,55,0.7)'
            : status === 'active'
              ? '#ffffff'
              : 'rgba(107,114,128,0.6)',
        }}
      >
        {title}
      </span>
    </motion.div>
  );
}
