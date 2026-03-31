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

// Zigzag horizontal offsets for each node (% from left, subtle S-curve)
const NODE_OFFSETS = [
  { leftPct: 30, labelSide: 'right' as const },
  { leftPct: 22, labelSide: 'right' as const },
  { leftPct: 35, labelSide: 'right' as const },
  { leftPct: 50, labelSide: 'left' as const },
  { leftPct: 32, labelSide: 'right' as const },
];

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, getExerciseStatus } = useProgress();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const lesson = getLessonById(Number(lessonId));

  if (!lesson) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6" style={{ background: '#16161a' }}>
        <p className="text-xl text-gray-400 mb-6">Leçon introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">Retour</button>
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
    <div className="min-h-dvh flex flex-col" style={{ background: '#16161a' }}>
      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between relative z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-2xl">{lesson.icon}</div>

        {progress.streak > 0 ? (
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <span className="text-amber-400 text-sm">⚡</span>
            <span className="text-sm font-bold text-amber-300">{progress.streak}</span>
          </div>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Level card */}
        <div className="px-4 sm:px-6 pt-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 sm:p-5 text-center max-w-sm mx-auto"
            style={{
              border: '1.5px solid rgba(212,175,55,0.45)',
              background: 'rgba(212,175,55,0.06)',
            }}
          >
            <p
              className="text-[11px] font-bold uppercase mb-0.5"
              style={{ color: '#D4AF37', letterSpacing: '0.18em' }}
            >
              Niveau {lesson.id}
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
              {lesson.title}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden max-w-[160px]"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #B8960C, #D4AF37, #F5D060)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / lesson.exercises.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {completedCount}/{lesson.exercises.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Exercise nodes — vertical stack with subtle zigzag offsets */}
        <div className="px-4 sm:px-6">
          <div className="max-w-md mx-auto">
            {lesson.exercises.map((exercise, index) => {
              const layout = NODE_OFFSETS[index % NODE_OFFSETS.length];
              const status = getExerciseStatus(lesson.id, exercise.type);

              return (
                <div
                  key={exercise.id}
                  className="relative"
                  style={{
                    paddingLeft: `${layout.leftPct}%`,
                    marginBottom: index < lesson.exercises.length - 1 ? '32px' : '0',
                  }}
                >
                  <ExerciseNode
                    type={exercise.type}
                    title={exercise.title}
                    status={status}
                    labelSide={layout.labelSide}
                    delay={index * 0.1}
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

      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {selectedExercise && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.55)' }}
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
                  boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  className="w-10 h-1 rounded-full mx-auto mb-5"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                />

                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-1.5">
                    {selectedExercise.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {selectedExercise.description}
                  </p>
                </div>

                <button
                  onClick={() => handleStartExercise(selectedExercise)}
                  className="w-full py-4 font-semibold text-lg rounded-2xl transition-all duration-200 active:scale-[0.98] text-white"
                  style={{
                    background: selectedStatus === 'completed'
                      ? 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)'
                      : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: selectedStatus === 'completed'
                      ? '0 4px 20px rgba(212,175,55,0.35)'
                      : '0 4px 20px rgba(16,185,129,0.35)',
                  }}
                >
                  {selectedStatus === 'completed' ? 'Pratiquer' : 'Commencer'}
                </button>

                <button
                  onClick={() => setSelectedExercise(null)}
                  className="w-full mt-3 py-3 font-medium text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
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
