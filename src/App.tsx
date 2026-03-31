import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import LessonDetail from './pages/LessonDetail';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import Match from './pages/Match';
import WriteExercise from './pages/WriteExercise';
import Master from './pages/Master';
import WordList from './pages/WordList';
import { useProgress } from './hooks/useProgress';

function App() {
  const { progress, setProgress } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!progress.onboardingComplete && location.pathname !== '/') {
      navigate('/');
    }
    setIsReady(true);
  }, []);

  const handleOnboardingComplete = () => {
    setProgress((prev) => ({
      ...prev,
      onboardingComplete: true,
    }));
    navigate('/dashboard');
  };

  if (!isReady) return null;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            progress.onboardingComplete ? (
              <Dashboard />
            ) : (
              <Onboarding onComplete={handleOnboardingComplete} />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson/:lessonId" element={<LessonDetail />} />
        <Route path="/learn/:lessonId" element={<Learn />} />
        <Route path="/quiz/:lessonId" element={<Quiz />} />
        <Route path="/match/:lessonId" element={<Match />} />
        <Route path="/write/:lessonId" element={<WriteExercise />} />
        <Route path="/master/:lessonId" element={<Master />} />
        <Route path="/words" element={<WordList />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
