import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { parties, getAllLessons } from '../data/lessons';
import type { Lesson } from '../types';

// ── Helper: find current active lesson ──
function useCurrentLesson() {
  const { progress } = useProgress();
  const allLessons = getAllLessons();

  return useMemo(() => {
    // Find first lesson that doesn't have all 5 exercises completed
    for (const lesson of allLessons) {
      const allDone = lesson.exercises.every((ex) =>
        progress.completedExercises.includes(ex.id)
      );
      if (!allDone) return lesson;
    }
    return allLessons[0]; // fallback
  }, [allLessons, progress.completedExercises]);
}

function useCurrentExercise(lesson: Lesson) {
  const { progress } = useProgress();

  return useMemo(() => {
    for (const ex of lesson.exercises) {
      if (!progress.completedExercises.includes(ex.id)) {
        return ex;
      }
    }
    return lesson.exercises[0];
  }, [lesson, progress.completedExercises]);
}

// ── Streak Day Circles ──
function StreakDays({ streak }: { streak: number }) {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay(); // 0=Sun
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to 0=Mon

  return (
    <div className="flex items-center gap-2.5">
      {days.map((day, i) => {
        const isActive = i <= todayIndex && streak > 0;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: isActive
                  ? 'linear-gradient(180deg, #D8E82E 0%, #BBCC00 100%)'
                  : 'transparent',
                border: isActive ? 'none' : '2px solid #E5E5E5',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isActive ? '#5C6300' : '#CCCCCC'}
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: isActive ? '#000' : '#B3B3B3' }}
            >
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Isometric Coin (small, for exercise row) ──
function SmallCoin({ completed }: { completed: boolean }) {
  const fill = completed ? '#999' : '#CCC';
  return (
    <svg viewBox="0 0 186 195" width="40" height="42" className="block shrink-0">
      <path
        d="M131 149.2C110 161.9 75.8 161.9 54.8 149.2C33.7 136.6 33.7 116.1 54.8 103.4C75.8 90.8 110 90.8 131 103.4C152.1 116.1 152.1 136.6 131 149.2ZM140.3 163.3C114.1 178.8 71.7 178.8 45.5 163.3C19.3 147.8 19.3 122.6 45.5 107.1C71.7 91.5 114.1 91.5 140.3 107.1C166.5 122.6 166.5 147.8 140.3 163.3Z"
        fill={completed ? '#1a1a1a' : '#E5E5E5'}
      />
      <path
        d="M140.3 163.3C114.1 178.8 71.7 178.8 45.5 163.3C19.3 147.8 19.3 122.6 45.5 107.1C71.7 91.5 114.1 91.5 140.3 107.1C166.5 122.6 166.5 147.8 140.3 163.3Z"
        fill={fill}
      />
      <path
        d="M54.8 149.2C75.8 161.9 110 161.9 131 149.2C152.1 136.6 152.1 116.1 131 103.4C110 90.8 75.8 90.8 54.8 103.4C33.7 116.1 33.7 136.6 54.8 149.2Z"
        fill={fill}
      />
      <path
        d="M54.8 149.2C75.8 161.9 110 161.9 131 149.2C152.1 136.6 152.1 116.1 131 103.4C110 90.8 75.8 90.8 54.8 103.4C33.7 116.1 33.7 136.6 54.8 149.2Z"
        fill="white"
        fillOpacity="0.3"
      />
      {completed && (
        <g transform="translate(93, 126) scale(0.7, 0.4)">
          <circle cx="0" cy="0" r="18" fill="white" />
          <path
            d="M-8 0 L-3 5 L8 -4"
            fill="none"
            stroke="#666"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

// ── Green check badge ──
function GreenCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#29CC57" opacity="0.15" />
      <circle cx="12" cy="12" r="8" fill="#29CC57" />
      <path
        d="M8 12l3 3 5-5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Lesson Thumbnail (for carousel) ──
function LessonThumb({
  lesson,
  isCurrent,
  isCompleted,
  onClick,
}: {
  lesson: Lesson;
  isCurrent: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 flex flex-col items-center justify-center relative transition-transform active:scale-95"
      style={{
        width: 72,
        height: 72,
        borderRadius: 16,
        border: isCurrent ? '2px solid #D4AF37' : '2px solid #E5E5E5',
        background: isCurrent ? '#FFFCF4' : '#F8F8F8',
      }}
    >
      <span className="text-2xl">{lesson.icon}</span>
      {isCompleted && (
        <div className="absolute -top-1 -right-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#29CC57" />
            <path
              d="M8 12l3 3 5-5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

// ── Main Dashboard ──
export default function Dashboard() {
  const navigate = useNavigate();
  const { progress, isLessonComplete } = useProgress();

  const currentLesson = useCurrentLesson();
  const currentExercise = useCurrentExercise(currentLesson);
  const allLessons = getAllLessons();

  const completedExercisesForLesson = currentLesson.exercises.filter((ex) =>
    progress.completedExercises.includes(ex.id)
  ).length;

  const progressMessage = useMemo(() => {
    if (progress.totalXp === 0) return 'Bismillah, c\'est parti !';
    if (completedExercisesForLesson > 0) return 'Continue comme ça !';
    return 'Prêt pour la suite ?';
  }, [progress.totalXp, completedExercisesForLesson]);

  const exerciseRoutes: Record<string, string> = {
    discover: 'learn',
    quiz: 'quiz',
    match: 'match',
    write: 'write',
    master: 'master',
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* ── Top Navigation Bar ── */}
      <nav
        className="w-full shrink-0"
        style={{ borderBottom: '1px solid #E5E5E5', height: 64 }}
      >
        <div className="h-full max-w-[1216px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Left: tabs */}
          <div className="flex items-center gap-6">
            {/* Mobile icons */}
            <button
              className="lg:hidden flex flex-col items-center gap-0.5"
              style={{ borderBottom: '2px solid #000', paddingBottom: 2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
            <button
              className="lg:hidden"
              onClick={() => navigate('/words')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </button>

            {/* Desktop text */}
            <span className="hidden lg:block font-serif text-xl font-bold">QuranLab</span>
            <button
              className="hidden lg:block text-sm font-semibold pb-0.5"
              style={{ borderBottom: '2px solid #000' }}
            >
              Accueil
            </button>
            <button
              className="hidden lg:block text-sm font-medium"
              style={{ color: '#999' }}
              onClick={() => navigate('/words')}
            >
              Leçons
            </button>
          </div>

          {/* Right: streak + XP */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="font-bold text-base">{progress.streak || 0}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F7C325">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-base">{progress.totalXp}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div className="flex-1 w-full max-w-[1216px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[52px] lg:px-28 py-6 lg:py-0">
          {/* ── Left Sidebar (desktop only) ── */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-[105px] h-fit pt-10 shrink-0" style={{ width: 338 }}>
            {/* Streak Card */}
            <div
              className="p-5"
              style={{
                borderRadius: 20,
                border: '2px solid #E5E5E5',
                background: '#fff',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-4xl font-bold">{progress.streak || 0}</span>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#F7C325">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </div>
              <StreakDays streak={progress.streak} />
            </div>

            {/* XP Progress Card */}
            <div
              className="p-5 flex items-center gap-4"
              style={{
                borderRadius: 20,
                border: '2px solid #E5E5E5',
                background: '#fff',
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#F2F2F2' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#999">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#000' }}>
                  Progression
                </p>
                <p className="text-sm" style={{ color: '#999' }}>
                  {progress.totalXp} XP
                </p>
              </div>
            </div>
          </aside>

          {/* ── Right: Course Card + Carousel ── */}
          <main className="flex-1 flex flex-col items-center lg:pt-10 pb-20">
            {/* Course Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
              style={{ maxWidth: 600 }}
            >
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: 20,
                  border: '2px solid #E5E5E5',
                  boxShadow: '0px 2px 0px 0px #CCC',
                  background: '#fff',
                }}
              >
                {/* Top section: title + illustration */}
                <div
                  className="text-center px-6 pt-8 pb-6"
                  style={{
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFCF4 100%)',
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h2 className="font-serif text-2xl font-bold text-black mb-1">
                    {currentLesson.title}
                  </h2>
                  <p
                    className="text-sm font-bold uppercase tracking-wider mb-8"
                    style={{ color: '#B78900', letterSpacing: '0.1em' }}
                  >
                    Niveau {currentLesson.id}
                  </p>

                  {/* Large lesson icon */}
                  <div className="text-8xl mb-8 select-none">
                    {currentLesson.icon}
                  </div>

                  {/* Mascot message */}
                  <div className="flex items-center gap-2 justify-center">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #29CC57 0%, #009B2B 100%)',
                        transform: 'rotate(45deg)',
                      }}
                    >
                      <span className="text-white text-xs font-bold" style={{ transform: 'rotate(-45deg)' }}>
                        Q
                      </span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#000' }}>
                      {progressMessage}
                    </span>
                  </div>
                </div>

                {/* Exercise progress row */}
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ borderTop: '1px solid #F2F2F2' }}
                >
                  <SmallCoin completed={completedExercisesForLesson > 0} />
                  <span
                    className="flex-1 text-sm font-medium truncate"
                    style={{ color: '#808080' }}
                  >
                    {currentExercise.title}
                  </span>
                  {progress.completedExercises.includes(currentExercise.id) && (
                    <GreenCheck />
                  )}
                </div>

                {/* Continue button */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => {
                      const route = exerciseRoutes[currentExercise.type];
                      navigate(`/${route}/${currentLesson.id}`);
                    }}
                    className="w-full py-3.5 text-base font-bold transition-all active:scale-[0.98]"
                    style={{
                      borderRadius: 54,
                      background: '#F7C325',
                      color: '#5C4400',
                      boxShadow: '0px -4px 0px 0px rgba(146, 109, 0, 0.3) inset, 0px 2px 0px 0px rgba(146, 109, 0, 0.2)',
                    }}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Lesson Carousel ── */}
            <div className="mt-6 w-full" style={{ maxWidth: 600 }}>
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide justify-center flex-wrap">
                {allLessons.map((lesson) => {
                  const completed = isLessonComplete(lesson);
                  const isCurrent = lesson.id === currentLesson.id;
                  return (
                    <LessonThumb
                      key={lesson.id}
                      lesson={lesson}
                      isCurrent={isCurrent}
                      isCompleted={completed}
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                    />
                  );
                })}
              </div>

              {/* Mobile dot indicators */}
              <div className="flex lg:hidden gap-1.5 justify-center mt-2">
                {allLessons.slice(0, 5).map((lesson, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      background: lesson.id === currentLesson.id ? '#F7C325' : '#E5E5E5',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Locked parties */}
            <div className="mt-6 w-full space-y-3" style={{ maxWidth: 600 }}>
              {parties.filter((p) => p.locked).map((partie) => (
                <div
                  key={partie.id}
                  className="flex items-center gap-4 p-5"
                  style={{
                    borderRadius: 20,
                    border: '2px solid #E5E5E5',
                    background: '#F8F8F8',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#E5E5E5' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#999">
                      <path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.76-2.24-5-5-5zm3 8H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#666' }}>
                      Partie {partie.id} : {partie.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#B3B3B3' }}>
                      Bientôt disponible
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
