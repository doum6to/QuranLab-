import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { getLessonById, getAllWords } from '../data/lessons';
import type { Word } from '../types';

const XP_PER_QUESTION = 15;

interface Question {
  word: Word;
  options: string[];
  correctIndex: number;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuiz(lessonWords: Word[], allWords: Word[]): Question[] {
  const pool = lessonWords.length >= 4 ? lessonWords : allWords.slice(0, Math.max(4, lessonWords.length));

  return lessonWords.map((word) => {
    const wrongCandidates = pool
      .filter((w) => w.id !== word.id && w.meaningFr !== word.meaningFr);
    const shuffledWrong = shuffleArray(wrongCandidates).slice(0, 3);

    let wrongOptions = shuffledWrong.map((w) => w.meaningFr);

    if (wrongOptions.length < 3) {
      const fallback = allWords
        .filter((w) => w.id !== word.id && w.meaningFr !== word.meaningFr && !wrongOptions.includes(w.meaningFr));
      const extra = shuffleArray(fallback)
        .slice(0, 3 - wrongOptions.length)
        .map((w) => w.meaningFr);
      wrongOptions = [...wrongOptions, ...extra];
    }

    const options = shuffleArray([...wrongOptions, word.meaningFr]);
    const correctIndex = options.indexOf(word.meaningFr);

    return { word, options, correctIndex };
  });
}

function ProgressDots({
  total,
  current,
  results,
}: {
  total: number;
  current: number;
  results: (boolean | null)[];
}) {
  return (
    <div className="flex items-center gap-2 justify-center flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            results[i] === true
              ? 'bg-emerald-500'
              : results[i] === false
                ? 'bg-red-400'
                : i === current
                  ? 'bg-emerald-500 ring-2 ring-emerald-200'
                  : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default function Quiz() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXp, updateStreak, updateWordProgress, markLessonComplete } = useProgress();

  const lesson = useMemo(() => getLessonById(Number(lessonId)), [lessonId]);
  const allWords = useMemo(() => getAllWords(), []);

  const questions = useMemo(() => {
    if (!lesson) return [];
    return generateQuiz(lesson.words, allWords);
  }, [lesson, allWords]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>(
    () => Array(questions.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question?.correctIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (isAnswered || !question) return;
      setSelectedAnswer(index);

      const correct = index === question.correctIndex;
      setResults((prev) => {
        const next = [...prev];
        next[currentIndex] = correct;
        return next;
      });

      if (correct) {
        addXp(XP_PER_QUESTION);
        updateStreak();
      }

      updateWordProgress(question.word.id, correct);
    },
    [isAnswered, question, currentIndex, addXp, updateStreak, updateWordProgress]
  );

  const handleContinue = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      if (lesson) {
        markLessonComplete(lesson.id);
      }
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
    }
  }, [currentIndex, questions.length, lesson, markLessonComplete]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (!lesson) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-gray-500 text-lg mb-4">Lecon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  if (isComplete) {
    const correctCount = results.filter((r) => r === true).length;
    const totalXp = correctCount * XP_PER_QUESTION;

    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="text-7xl mb-6"
          >
            {correctCount === questions.length ? '🏆' : '💪'}
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            Quiz termine !
          </h1>

          <div className="flex items-start gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
              Q
            </div>
            <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-gray-800 font-medium">
              {correctCount === questions.length
                ? 'Parfait, sans faute !'
                : `${correctCount}/${questions.length} bonnes reponses. Continue !`}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 w-full max-w-xs"
          >
            <p className="text-4xl font-bold text-emerald-600 mb-1">
              +{totalXp} XP
            </p>
            <p className="text-gray-500">gagnes dans ce quiz</p>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">
                  {correctCount}
                </p>
                <p className="text-xs text-gray-500">Correctes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-400">
                  {questions.length - correctCount}
                </p>
                <p className="text-xs text-gray-500">Incorrectes</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => navigate(`/lesson/${lesson.id}`)}
            className="btn-primary"
          >
            Continuer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIndex} total={questions.length} />
        </div>
      </div>

      {/* Progress dots */}
      <div className="px-6 py-3">
        <ProgressDots
          total={questions.length}
          current={currentIndex}
          results={results}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <p className="text-gray-500 font-medium mb-2">
              Que signifie ce mot ?
            </p>

            {/* Arabic word */}
            <div className="py-8 text-center">
              <p className="font-arabic text-5xl text-gray-900 leading-relaxed">
                {question.word.arabic}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {question.word.transliteration}
              </p>
            </div>

            {/* Answer options - 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isOptionCorrect = idx === question.correctIndex;

                let className =
                  'card p-4 text-center cursor-pointer font-medium text-gray-900 transition-all duration-200';

                if (isAnswered) {
                  if (isOptionCorrect) {
                    className =
                      'card p-4 text-center font-medium border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-400';
                  } else if (isSelected && !isOptionCorrect) {
                    className =
                      'card p-4 text-center font-medium border-red-400 bg-red-50 text-red-800 ring-1 ring-red-400';
                  } else {
                    className =
                      'card p-4 text-center font-medium text-gray-400 opacity-60';
                  }
                } else {
                  className += ' hover:border-gray-300 active:scale-[0.98]';
                }

                return (
                  <motion.button
                    key={idx}
                    whileTap={!isAnswered ? { scale: 0.97 } : undefined}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={className}
                  >
                    <span>{option}</span>
                    {isAnswered && isOptionCorrect && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block ml-2"
                      >
                        <svg
                          className="w-5 h-5 inline text-emerald-600"
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
                      </motion.span>
                    )}
                    {isAnswered && isSelected && !isOptionCorrect && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block ml-2"
                      >
                        <svg
                          className="w-5 h-5 inline text-red-600"
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
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom feedback + continue */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`px-6 pb-8 pt-4 ${
              isCorrect ? 'bg-emerald-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              {isCorrect ? (
                <>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                  <span className="font-bold text-emerald-700 text-lg">
                    Correct ! +{XP_PER_QUESTION} XP
                  </span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                  <div>
                    <span className="font-bold text-red-700 text-lg">
                      Incorrect
                    </span>
                    <p className="text-sm text-red-600">
                      La bonne reponse est :{' '}
                      <strong>
                        {question.options[question.correctIndex]}
                      </strong>
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleContinue}
              className={
                isCorrect
                  ? 'btn-primary'
                  : 'w-full py-4 bg-red-400 text-white font-semibold text-lg rounded-full transition-all duration-200 hover:bg-red-500 active:scale-[0.98]'
              }
            >
              Continuer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
