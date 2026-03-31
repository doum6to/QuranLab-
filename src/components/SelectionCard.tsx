import { motion } from 'framer-motion';

interface SelectionCardProps {
  icon: string;
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SelectionCard({
  icon,
  label,
  description,
  selected = false,
  onClick,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left
        transition-colors duration-150 cursor-pointer
        ${
          selected
            ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm'
            : 'bg-[#F9FAFB] border-2 border-gray-200 hover:border-gray-300'
        }
      `}
    >
      <span className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={`text-base font-semibold leading-tight ${
            selected ? 'text-emerald-800' : 'text-gray-800'
          }`}
        >
          {label}
        </p>
        {description && (
          <p
            className={`text-sm mt-0.5 leading-snug ${
              selected ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {selected && (
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
    </motion.button>
  );
}
