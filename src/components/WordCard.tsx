import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  showMeaning?: boolean;
  onFlip?: () => void;
}

const categoryColors: Record<string, string> = {
  noun: 'bg-blue-100 text-blue-700',
  verb: 'bg-emerald-100 text-emerald-700',
  particle: 'bg-amber-100 text-amber-700',
  preposition: 'bg-purple-100 text-purple-700',
  pronoun: 'bg-pink-100 text-pink-700',
  adjective: 'bg-orange-100 text-orange-700',
};

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
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              categoryColors[word.category] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {word.category}
          </span>
          <p
            className="font-arabic text-5xl leading-relaxed text-gray-900 mt-2"
            dir="rtl"
          >
            {word.arabic}
          </p>
          <p className="text-base text-gray-400 tracking-wide">
            {word.transliteration}
          </p>
          {word.rootLetters && (
            <p className="text-xs text-gray-400">
              Root: <span className="font-arabic text-sm">{word.rootLetters}</span>
            </p>
          )}
          <p className="text-xs text-gray-300 mt-2">Tap to reveal</p>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 w-full rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p
            className="font-arabic text-3xl text-gray-400"
            dir="rtl"
          >
            {word.arabic}
          </p>
          <div className="w-12 h-px bg-gray-200 my-1" />
          <p className="text-xl font-semibold text-gray-800">
            {word.meaningFr}
          </p>
          <p className="text-base text-gray-500">{word.meaningEn}</p>
          {word.exampleAyah && (
            <div className="mt-4 px-4 py-3 bg-emerald-50 rounded-xl w-full text-center">
              <p className="font-arabic text-lg text-emerald-800" dir="rtl">
                {word.exampleAyah}
              </p>
              {word.exampleAyahRef && (
                <p className="text-xs text-emerald-600 mt-1">
                  {word.exampleAyahRef}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
