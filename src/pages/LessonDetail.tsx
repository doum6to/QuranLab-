import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import ExerciseNode from '../components/ExerciseNode';
import type { Exercise } from '../types';

const exerciseRoutes: Record<string, string> = {
  discover: 'learn',
  quiz: 'quiz',
  match: 'match',
  write: 'write',
  master: 'master',
};

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, getExerciseStatus } = useProgress();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const lesson = getLessonById(Number(lessonId));

  if (!lesson) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-white px-6">
        <p className="text-xl text-gray-600 mb-6">Lecon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  const completedCount = lesson.exercises.filter(
    (ex) => progress.completedExercises.includes(ex.id)
  ).length;

  const handleStartExercise = (exercise: Exercise) => {
    const route = exerciseRoutes[exercise.type];
    navigate(`/${route}/${lesson.id}`);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        {progress.streak > 0 && (
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
            <span className="text-amber-500 text-sm">⚡</span>
            <span className="text-sm font-bold text-amber-600">{progress.streak}</span>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-4 pb-6 text-center"
        >
          <div className="text-5xl mb-3">{lesson.icon}</div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            {lesson.title}
          </h1>
          <p className="text-sm text-gray-400">
            {lesson.words.length} mots · {lesson.exercises.length} exercices
          </p>
        </motion.div>

        {/* Level card */}
        <div className="px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-emerald-200 rounded-2xl p-5 text-center"
          >
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">
              Niveau 1
            </p>
            <p className="font-semibold text-gray-900">{lesson.title}</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[180px]">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / lesson.exercises.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs font-medium text-gray-400">
                {completedCount}/{lesson.exercises.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Exercise path */}
        <div className="px-6">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[36px] top-4 bottom-4 w-0.5 bg-gray-100" />

            <div className="space-y-6 relative">
              {lesson.exercises.map((exercise, index) => {
                const status = getExerciseStatus(lesson.id, exercise.type);
                return (
                  <ExerciseNode
                    key={exercise.id}
                    type={exercise.type}
                    title={exercise.title}
                    status={status}
                    index={index}
                    onTap={() => {
                      if (status !== 'locked') {
                        setSelectedExercise(exercise);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {selectedExercise && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="fixed inset-0 bg-black/30 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 px-6 pt-6 pb-8"
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              <div className="text-center mb-6">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                  {selectedExercise.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedExercise.description}
                </p>
              </div>

              <button
                onClick={() => handleStartExercise(selectedExercise)}
                className="btn-primary"
              >
                {progress.completedExercises.includes(selectedExercise.id)
                  ? 'Pratiquer'
                  : 'Commencer'}
              </button>

              <button
                onClick={() => setSelectedExercise(null)}
                className="w-full mt-3 py-3 text-gray-400 font-medium text-sm"
              >
                Annuler
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
