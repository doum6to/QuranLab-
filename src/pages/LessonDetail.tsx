import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

const encouragements: Record<number, string> = {
  1: 'Ces mots forment la base du Coran. Tu vas les croiser partout !',
  2: 'Apprends les formes d\'affirmation et de négation, essentielles en arabe.',
  3: 'Les pronoms connectés reviennent dans presque chaque verset !',
  4: 'Maîtriser les pronoms déconnectés, c\'est comprendre qui parle.',
  5: 'Les mots de lieu te guideront dans la compréhension des versets.',
  6: 'Questions et affirmations : le cœur du dialogue coranique.',
  7: 'Ces mots décrivent les qualités et les liens entre les choses.',
  8: 'Le temps et les conjonctions structurent le sens des versets.',
  9: 'Les prépositions relient les mots entre eux. Indispensables !',
  10: 'Les préfixes verbaux précisent le temps et l\'intention.',
};

function getEncouragement(lessonId: number): string {
  return encouragements[lessonId] ?? 'Prêt à apprendre de nouveaux mots ? Allons-y !';
}

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, getLessonProgress } = useProgress();

  const lesson = getLessonById(Number(lessonId));

  if (!lesson) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-white px-6">
        <p className="text-xl text-gray-600 mb-6">Leçon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  const progressPct = getLessonProgress(lesson);
  const learnedCount = lesson.words.filter(
    (w) => progress.wordProgress[w.id] !== undefined
  ).length;
  const hasLearnedWords = learnedCount > 0;

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shrink-0"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900 truncate">
          {lesson.title}
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-6 pb-4 text-center"
        >
          <div className="text-6xl mb-4">{lesson.icon}</div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
            {lesson.title}
          </h2>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {lesson.words.length} mots
            {hasLearnedWords && (
              <span className="text-emerald-500 ml-1">
                ({learnedCount} appris)
              </span>
            )}
          </div>
          {progressPct > 0 && (
            <div className="mt-3 w-full max-w-xs mx-auto">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-6 pb-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
              Q
            </div>
            <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-gray-800 font-medium text-sm leading-relaxed">
              {getEncouragement(lesson.id)}
            </div>
          </div>
        </motion.div>

        {/* Word preview list */}
        <div className="px-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Aperçu des mots
          </h3>
          <div className="space-y-2">
            {lesson.words.map((word, index) => {
              const isLearned = progress.wordProgress[word.id] !== undefined;
              return (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.25 }}
                  className="card px-4 py-3 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-arabic text-2xl text-gray-900 leading-relaxed">
                      {word.arabic}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {word.transliteration}
                    </p>
                    <p className="text-sm text-gray-700 mt-0.5 truncate">
                      {word.meaningFr}
                    </p>
                  </div>
                  {isLearned && (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-8">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={() => navigate(`/learn/${lesson.id}`)}
            className="btn-primary flex-1"
          >
            Apprendre
          </button>
          {hasLearnedWords && (
            <button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="btn-secondary flex-1"
            >
              Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
