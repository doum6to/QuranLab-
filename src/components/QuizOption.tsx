import { motion } from 'framer-motion';

interface QuizOptionProps {
  text: string;
  selected?: boolean;
  correct?: boolean;
  wrong?: boolean;
  onClick?: () => void;
}

export default function QuizOption({
  text,
  selected = false,
  correct = false,
  wrong = false,
  onClick,
}: QuizOptionProps) {
  const getStyles = () => {
    if (correct) {
      return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    }
    if (wrong) {
      return 'bg-red-50 border-red-400 text-red-800';
    }
    if (selected) {
      return 'bg-gray-50 border-gray-400 text-gray-800';
    }
    return 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50';
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={!correct && !wrong ? { scale: 1.01 } : undefined}
      whileTap={!correct && !wrong ? { scale: 0.98 } : undefined}
      className={`
        w-full px-5 py-4 rounded-xl border-2 text-left
        font-medium text-base cursor-pointer
        transition-colors duration-150
        flex items-center justify-between gap-3
        ${getStyles()}
      `}
    >
      <span>{text}</span>
      {correct && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
      {wrong && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400 flex items-center justify-center"
        >
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
