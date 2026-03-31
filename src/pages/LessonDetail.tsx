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
      <div className="min-h-dvh flex flex-col items-center justify-center bg-gray-900 px-6">
        <p className="text-xl text-gray-400 mb-6">Leçon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Retour
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

  const selectedStatus = selectedExercise
    ? getExerciseStatus(lesson.id, selectedExercise.type)
    : null;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#1a1a2e' }}>
      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between relative z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-2xl">{lesson.icon}</div>

        {progress.streak > 0 && (
          <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-amber-400 text-sm">⚡</span>
            <span className="text-sm font-bold text-amber-300">{progress.streak}</span>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Level card */}
        <div className="px-4 sm:px-6 pt-4 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 sm:p-5 text-center max-w-sm mx-auto"
            style={{
              border: '2px solid rgba(212,175,55,0.5)',
              background: 'rgba(212,175,55,0.08)',
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
              style={{ color: '#D4AF37' }}
            >
              Niveau {lesson.id}
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-white">
              {lesson.title}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden max-w-[180px]" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, #F5D060)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / lesson.exercises.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs font-medium text-gray-400">
                {completedCount}/{lesson.exercises.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Exercise path - zigzag layout */}
        <div className="px-4 sm:px-6 pt-8 pb-12">
          <div className="max-w-sm mx-auto relative">
            {/* Connecting line SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
              preserveAspectRatio="none"
            >
              {lesson.exercises.map((_, index) => {
                if (index === lesson.exercises.length - 1) return null;

                const positions = [0, 1, 2, 1, 0];
                const currentPos = positions[index % positions.length];
                const nextPos = positions[(index + 1) % positions.length];

                // Calculate approximate x positions (percentage based)
                const xMap = [25, 50, 75];
                const x1 = xMap[currentPos];
                const x2 = xMap[nextPos];

                const ySpacing = 140;
                const yOffset = 56;
                const y1 = yOffset + index * ySpacing + 44;
                const y2 = yOffset + (index + 1) * ySpacing;

                const exerciseStatus = getExerciseStatus(lesson.id, lesson.exercises[index].type);
                const nextStatus = getExerciseStatus(lesson.id, lesson.exercises[index + 1].type);
                const isPathActive = exerciseStatus === 'completed' || nextStatus === 'active';

                return (
                  <line
                    key={index}
                    x1={`${x1}%`}
                    y1={y1}
                    x2={`${x2}%`}
                    y2={y2}
                    stroke={isPathActive ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.07)'}
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                );
              })}
            </svg>

            {/* Exercise nodes */}
            <div className="relative" style={{ zIndex: 1 }}>
              {lesson.exercises.map((exercise, index) => {
                const status = getExerciseStatus(lesson.id, exercise.type);
                return (
                  <div
                    key={exercise.id}
                    style={{ height: '140px' }}
                    className="flex items-center justify-center"
                  >
                    <ExerciseNode
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
                  </div>
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
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 pb-8"
            >
              <div
                className="rounded-3xl p-6 max-w-md mx-auto"
                style={{
                  background: '#252540',
                  boxShadow: '0 -8px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-5" />

                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-1.5">
                    {selectedExercise.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedExercise.description}
                  </p>
                </div>

                <button
                  onClick={() => handleStartExercise(selectedExercise)}
                  className="w-full py-4 font-semibold text-lg rounded-2xl transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: selectedStatus === 'completed'
                      ? 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)'
                      : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: 'white',
                    boxShadow: selectedStatus === 'completed'
                      ? '0 4px 16px rgba(212,175,55,0.4)'
                      : '0 4px 16px rgba(16,185,129,0.4)',
                  }}
                >
                  {selectedStatus === 'completed' ? 'Pratiquer' : 'Commencer'}
                </button>

                <button
                  onClick={() => setSelectedExercise(null)}
                  className="w-full mt-3 py-3 text-gray-500 font-medium text-sm hover:text-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
