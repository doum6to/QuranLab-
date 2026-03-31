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

// ── Isometric coin SVG (based on Brilliant.org source) ──────────────────
// viewBox="0 0 186 195", the coin is an isometric 3D disc

function LockedCoin() {
  return (
    <svg viewBox="0 0 186 195" width="120" height="126" className="block">
      {/* Outer shadow/border */}
      <path d="M131.025 149.242C109.966 161.892 75.822 161.891 54.763 149.242C33.704 136.592 33.704 116.083 54.763 103.434C75.822 90.784 109.966 90.784 131.025 103.434C152.084 116.084 152.084 136.592 131.025 149.242ZM140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#1a1a1a" />
      {/* Rim */}
      <path d="M140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#555" />
      {/* Face base */}
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="#666" />
      {/* Face highlight */}
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="white" fillOpacity="0.08" />
      {/* Inner ring */}
      <path d="M61.977 108.64C79.052 98.866 106.736 98.866 123.811 108.64C140.886 118.414 140.886 134.262 123.811 144.037C106.736 153.811 79.052 153.811 61.977 144.037C44.902 134.262 44.902 118.414 61.977 108.64Z" fill="#777" />
      {/* Inner face */}
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="#888" />
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="white" fillOpacity="0.06" />
      {/* Center small ellipse */}
      <ellipse cx="92.9" cy="126.4" rx="18" ry="10.5" fill="#666" />
      <ellipse cx="92.9" cy="126.4" rx="10" ry="5.8" fill="#555" />
    </svg>
  );
}

function CompletedCoin() {
  return (
    <svg viewBox="0 0 186 195" width="120" height="126" className="block">
      {/* Outer shadow/border */}
      <path d="M131.025 149.242C109.966 161.892 75.822 161.891 54.763 149.242C33.704 136.592 33.704 116.083 54.763 103.434C75.822 90.784 109.966 90.784 131.025 103.434C152.084 116.084 152.084 136.592 131.025 149.242ZM140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#5C4813" />
      {/* Rim */}
      <path d="M140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#9A7B2C" />
      {/* Face base */}
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="#C4A032" />
      {/* Face highlight */}
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="white" fillOpacity="0.15" />
      {/* Outer ring on face */}
      <path d="M61.977 108.64C79.052 98.866 106.736 98.866 123.811 108.64C140.886 118.414 140.886 134.262 123.811 144.037C106.736 153.811 79.052 153.811 61.977 144.037C44.902 134.262 44.902 118.414 61.977 108.64Z" fill="#D4AF37" />
      {/* Inner golden face */}
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="#E8C84A" />
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="white" fillOpacity="0.18" />
      {/* White center circle */}
      <ellipse cx="92.9" cy="126.4" rx="18" ry="10.5" fill="white" />
      {/* Checkmark */}
      <g transform="translate(92.9, 126.4) scale(0.55, 0.32)">
        <path d="M-10 0 L-3 7 L10 -6" fill="none" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function ActiveCoin() {
  const id = `active-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg viewBox="0 0 186 220" width="120" height="142" className="block overflow-visible">
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#F5D060" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-bloom`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
      </defs>

      {/* Glow behind coin */}
      <ellipse cx="93" cy="135" rx="80" ry="50" fill={`url(#${id}-glow)`} filter={`url(#${id}-bloom)`} />

      {/* Outer shadow/border */}
      <path d="M131.025 149.242C109.966 161.892 75.822 161.891 54.763 149.242C33.704 136.592 33.704 116.083 54.763 103.434C75.822 90.784 109.966 90.784 131.025 103.434C152.084 116.084 152.084 136.592 131.025 149.242ZM140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#5C4813" />
      {/* Rim with glow */}
      <path d="M140.3 163.281C114.119 178.805 71.67 178.805 45.488 163.281C19.307 147.757 19.307 122.587 45.488 107.063C71.67 91.538 114.119 91.538 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z" fill="#B8960C" />
      {/* Face */}
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="#D4AF37" />
      <path d="M54.763 149.242C75.822 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.822 90.785 54.763 103.435C33.704 116.084 33.704 136.593 54.763 149.242Z" fill="white" fillOpacity="0.2" />
      {/* Outer ring */}
      <path d="M61.977 108.64C79.052 98.866 106.736 98.866 123.811 108.64C140.886 118.414 140.886 134.262 123.811 144.037C106.736 153.811 79.052 153.811 61.977 144.037C44.902 134.262 44.902 118.414 61.977 108.64Z" fill="#E8C84A" />
      {/* Inner face */}
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="#F5D060" />
      <path d="M68.864 112.833C82.038 105.359 103.396 105.359 116.57 112.833C129.743 120.308 129.743 132.427 116.57 139.901C103.396 147.376 82.038 147.376 68.864 139.901C55.691 132.427 55.691 120.308 68.864 112.833Z" fill="white" fillOpacity="0.35" />
      {/* Bright white center */}
      <ellipse cx="92.9" cy="126.4" rx="18" ry="10.5" fill="white" />
      <ellipse cx="92.9" cy="126.4" rx="18" ry="10.5" fill="white" opacity="0.8" filter={`url(#${id}-bloom)`} />

      {/* Light beam going up */}
      <rect x="83" y="50" width="20" height="70" rx="10" fill="url(#beam-grad)" opacity="0.2" />
      <defs>
        <linearGradient id="beam-grad" x1="93" y1="50" x2="93" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floating green diamond */}
      <g transform="translate(93, 38)">
        <rect x="-14" y="-14" width="28" height="28" rx="5" fill="url(#diamond-grad)" transform="rotate(45)" />
        <defs>
          <linearGradient id="diamond-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Inner white square */}
        <rect x="-5" y="-5" width="10" height="10" rx="2" fill="white" />
        <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#065F46" />
      </g>

      {/* Sparkles */}
      <rect x="62" y="30" width="4" height="4" fill="white" opacity="0.7" transform="rotate(45 64 32)" />
      <rect x="120" y="42" width="3" height="3" fill="white" opacity="0.5" transform="rotate(45 121.5 43.5)" />
      <rect x="55" y="55" width="2.5" height="2.5" fill="white" opacity="0.4" transform="rotate(45 56.25 56.25)" />
      <rect x="128" y="62" width="3" height="3" fill="white" opacity="0.6" transform="rotate(45 129.5 63.5)" />
    </svg>
  );
}

export default function ExerciseNode({ title, status, onTap, labelSide, delay = 0 }: ExerciseNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="flex items-center gap-3"
      style={{
        flexDirection: labelSide === 'right' ? 'row' : 'row-reverse',
      }}
    >
      {/* Coin button */}
      <button
        onClick={onTap}
        disabled={status === 'locked'}
        className="relative shrink-0"
      >
        {/* Active: animated glow pulse behind */}
        {status === 'active' && (
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 60%, rgba(245,208,96,0.25) 0%, transparent 60%)',
              filter: 'blur(4px)',
            }}
          />
        )}

        {status === 'locked' && <LockedCoin />}
        {status === 'completed' && <CompletedCoin />}
        {status === 'active' && (
          <div className="relative">
            <ActiveCoin />
            {/* Sparkle animations */}
            <motion.div
              animate={{ y: [-2, 2, -2], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-2 left-3 w-1 h-1 bg-white rotate-45"
            />
            <motion.div
              animate={{ y: [2, -2, 2], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-5 right-2 w-1.5 h-1.5 bg-white rotate-45"
            />
          </div>
        )}
      </button>

      {/* Label */}
      <span
        className={`text-sm sm:text-[15px] font-semibold leading-snug max-w-[150px] sm:max-w-[170px] ${
          labelSide === 'left' ? 'text-right' : 'text-left'
        }`}
        style={{
          color: status === 'completed'
            ? 'rgba(180,160,100,0.55)'
            : status === 'active'
              ? '#ffffff'
              : 'rgba(100,100,100,0.45)',
        }}
      >
        {title}
      </span>
    </motion.div>
  );
}
