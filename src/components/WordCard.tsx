import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  showMeaning?: boolean;
  onFlip?: () => void;
}

export default function WordCard({
  word,
  showMeaning: controlledShow,
  onFlip,
}: WordCardProps) {
  const [internalShow, setInternalShow] = useState(false);
  const showMeaning = controlledShow ?? internalShow;

  const handleFlip = () => {
    if (controlledShow === undefined) {
      setInternalShow((prev) => !prev);
    }
    onFlip?.();
  };

  return (
    <div className="perspective-[800px] w-full max-w-sm mx-auto">
      <motion.div
        className="relative w-full cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: showMeaning ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className="w-full rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col items-center gap-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p
            className="font-arabic text-5xl leading-relaxed text-gray-900 mt-2"
            dir="rtl"
          >
            {word.arabic}
          </p>
          <p className="text-base text-gray-400 tracking-wide">
            {word.transliteration}
          </p>
          <p className="text-xs text-gray-300 mt-2">Appuie pour révéler</p>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 w-full rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="font-arabic text-3xl text-gray-400" dir="rtl">
            {word.arabic}
          </p>
          <div className="w-12 h-px bg-gray-200 my-1" />
          <p className="text-xl font-semibold text-gray-800">
            {word.meaningFr}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
