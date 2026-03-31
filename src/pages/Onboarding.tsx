import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}

function SpeechBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 mb-8">
      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
        Q
      </div>
      <div className="bg-speech border border-speech-border rounded-2xl rounded-tl-sm px-5 py-3 text-gray-800 font-medium text-lg">
        {text}
      </div>
    </div>
  );
}

function SelectionCard({
  emoji,
  label,
  subtitle,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`card w-full text-left flex items-center gap-4 cursor-pointer ${
        selected ? 'card-selected' : 'hover:border-gray-300'
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{label}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0"
        >
          <svg
            className="w-4 h-4 text-white"
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

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [schedule, setSchedule] = useState('');

  function goNext() {
    if (step >= TOTAL_STEPS) {
      onComplete();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  }

  function canContinue(): boolean {
    if (step === 2) return goal !== '';
    if (step === 3) return level !== '';
    if (step === 4) return schedule !== '';
    return true;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Progress bar for steps 2-5 */}
      {step > 1 && (
        <div className="px-6 pt-4">
          <ProgressBar step={step - 1} total={TOTAL_STEPS - 1} />
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-4xl font-bold mb-8"
                >
                  Q
                </motion.div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Apprends le Coran
                  <br />
                  par la pratique
                </h1>
                <p className="text-lg text-gray-500 max-w-sm mb-12">
                  Comprends 85% des mots du Coran en pratiquant 15 minutes par
                  jour.
                </p>
              </div>
            )}

            {/* Step 2: Goal */}
            {step === 2 && (
              <div className="flex-1 flex flex-col pt-8">
                <SpeechBubble text="Quel est ton objectif ?" />
                <div className="flex flex-col gap-3">
                  <SelectionCard
                    emoji="🤲"
                    label="Comprendre les prières"
                    selected={goal === 'prayers'}
                    onClick={() => setGoal('prayers')}
                  />
                  <SelectionCard
                    emoji="📖"
                    label="Lire le Coran sans traduction"
                    selected={goal === 'read'}
                    onClick={() => setGoal('read')}
                  />
                  <SelectionCard
                    emoji="⭐"
                    label="Approfondir ma foi"
                    selected={goal === 'faith'}
                    onClick={() => setGoal('faith')}
                  />
                  <SelectionCard
                    emoji="✨"
                    label="Autre objectif"
                    selected={goal === 'other'}
                    onClick={() => setGoal('other')}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Level */}
            {step === 3 && (
              <div className="flex-1 flex flex-col pt-8">
                <SpeechBubble text="Quel est ton niveau en arabe ?" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      key: 'beginner',
                      label: 'Débutant',
                      preview: 'أ ب ت',
                    },
                    {
                      key: 'notion',
                      label: 'Notion',
                      preview: 'بِسْمِ',
                    },
                    {
                      key: 'intermediate',
                      label: 'Intermédiaire',
                      preview: 'الرَّحِيمِ',
                    },
                    {
                      key: 'advanced',
                      label: 'Avancé',
                      preview: 'وَالْعَصْرِ إِنَّ',
                    },
                  ].map((item) => (
                    <motion.button
                      key={item.key}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLevel(item.key)}
                      className={`card text-center cursor-pointer py-6 ${
                        level === item.key
                          ? 'card-selected'
                          : 'hover:border-gray-300'
                      }`}
                    >
                      <p className="font-arabic text-2xl text-gray-700 mb-3">
                        {item.preview}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {item.label}
                      </p>
                      {level === item.key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mt-2"
                        >
                          <svg
                            className="w-3 h-3 text-white"
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
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <div className="flex-1 flex flex-col pt-8">
                <SpeechBubble text="Quand vas-tu apprendre ?" />
                <div className="flex flex-col gap-3">
                  <SelectionCard
                    emoji="🌅"
                    label="Routine matinale"
                    subtitle="Après Fajr"
                    selected={schedule === 'morning'}
                    onClick={() => setSchedule('morning')}
                  />
                  <SelectionCard
                    emoji="🍕"
                    label="Pause déjeuner"
                    subtitle="Entre Dhuhr et Asr"
                    selected={schedule === 'lunch'}
                    onClick={() => setSchedule('lunch')}
                  />
                  <SelectionCard
                    emoji="🌙"
                    label="Rituel du soir"
                    subtitle="Après Isha"
                    selected={schedule === 'evening'}
                    onClick={() => setSchedule('evening')}
                  />
                  <SelectionCard
                    emoji="📱"
                    label="Autre moment"
                    selected={schedule === 'other'}
                    onClick={() => setSchedule('other')}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Ready */}
            {step === 5 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="text-7xl mb-6"
                >
                  🎉
                </motion.div>
                <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                  Tu es prêt !
                </h1>
                <p className="text-lg text-gray-500 max-w-sm mb-2">
                  Les 100 mots les plus fréquents couvrent 85% du Coran.
                </p>
                <p className="text-lg text-gray-500 max-w-sm">
                  15 minutes par jour suffisent pour les maîtriser.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom button area */}
      <div className="px-6 pb-8 pt-4">
        {step === 1 ? (
          <>
            <button onClick={goNext} className="btn-primary">
              Commencer
            </button>
            <button className="w-full py-3 mt-2 text-gray-500 font-medium hover:text-gray-700 transition-colors">
              Se connecter
            </button>
          </>
        ) : (
          <button
            onClick={goNext}
            disabled={!canContinue()}
            className={canContinue() ? 'btn-primary' : 'btn-disabled'}
          >
            {step === TOTAL_STEPS
              ? "Commencer l'apprentissage"
              : 'Continuer'}
          </button>
        )}
      </div>
    </div>
  );
}
