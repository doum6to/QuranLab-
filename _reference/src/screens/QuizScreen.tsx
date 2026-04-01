import { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { Word } from '../types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

type Route = RouteProp<RootStackParamList, 'Quiz'>;

function generateQuestions(words: Word[]) {
  return words.map((word) => {
    const otherWords = words.filter((w) => w.id !== word.id);
    const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...shuffled.map((w) => w.meaningFr), word.meaningFr].sort(
      () => Math.random() - 0.5
    );
    return { word, options, correctAnswer: word.meaningFr };
  });
}

export default function QuizScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const lesson = getLessonById(route.params.lessonId);
  const { updateWordProgress, addXp, markExerciseComplete, updateStreak } = useProgress();

  const questions = useMemo(
    () => generateQuestions(lesson?.words ?? []),
    [lesson]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = useCallback(
    (answer: string) => {
      if (selectedAnswer) return;
      const correct = answer === current.correctAnswer;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      if (correct) setCorrectCount((c) => c + 1);
      updateWordProgress(current.word.id, correct);
      if (correct) addXp(15);
    },
    [selectedAnswer, current]
  );

  const handleContinue = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      if (lesson) {
        markExerciseComplete(`${lesson.id}-quiz`);
        updateStreak();
      }
      setCompleted(true);
    }
  }, [currentIndex, questions.length, lesson]);

  if (!lesson) return null;

  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>
            {correctCount === questions.length ? '🏆' : '💪'}
          </Text>
          <Text style={styles.completeTitle}>Quiz terminé !</Text>
          <Text style={styles.completeScore}>
            {correctCount}/{questions.length} correct
          </Text>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.completeButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]}
          />
        </View>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < currentIndex && (i < correctCount ? styles.dotCorrect : styles.dotWrong),
              i === currentIndex && styles.dotCurrent,
            ]}
          />
        ))}
      </View>

      {/* Question */}
      <View style={styles.questionArea}>
        <Text style={styles.arabicWord}>{current.word.arabic}</Text>
        <Text style={styles.questionHint}>{current.word.transliteration}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {current.options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === current.correctAnswer;

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selectedAnswer && isAnswer ? styles.optionCorrect : null,
                selectedAnswer && isSelected && !isCorrect ? styles.optionWrong : null,
              ]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer && isAnswer ? styles.optionTextCorrect : null,
                  selectedAnswer && isSelected && !isCorrect ? styles.optionTextWrong : null,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback + continue */}
      {selectedAnswer && (
        <View style={styles.feedbackArea}>
          <View
            style={[styles.feedbackBanner, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}
          >
            <Text style={styles.feedbackText}>
              {isCorrect ? 'Correct ! +15 XP 🎉' : `Incorrect. Réponse: ${current.correctAnswer}`}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.continueBtn, isCorrect ? styles.continueBtnGreen : styles.continueBtnCharcoal]}
            onPress={handleContinue}
          >
            <Text style={styles.continueBtnText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: colors.textPrimary },
  progressBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },

  dotsRow: {
    flexDirection: 'row', justifyContent: 'center', gap: 6,
    paddingVertical: spacing.sm, flexWrap: 'wrap', paddingHorizontal: spacing.lg,
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E5E7EB' },
  dotCorrect: { backgroundColor: colors.primary },
  dotWrong: { backgroundColor: colors.incorrect },
  dotCurrent: { backgroundColor: colors.gold, borderWidth: 2, borderColor: colors.gold },

  questionArea: { alignItems: 'center', paddingVertical: spacing.xl },
  arabicWord: { fontSize: 48, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  questionHint: { fontSize: 16, color: colors.textMuted },

  optionsContainer: { paddingHorizontal: spacing.lg, gap: 12 },
  option: {
    borderWidth: 2, borderColor: colors.border, borderRadius: borderRadius.lg,
    paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center',
  },
  optionCorrect: { borderColor: colors.primary, backgroundColor: colors.correctBg },
  optionWrong: { borderColor: colors.incorrect, backgroundColor: colors.incorrectBg },
  optionText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  optionTextCorrect: { color: colors.correctText },
  optionTextWrong: { color: colors.incorrectText },

  feedbackArea: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: spacing.xl },
  feedbackBanner: {
    paddingVertical: 14, paddingHorizontal: spacing.lg, alignItems: 'center',
  },
  feedbackCorrect: { backgroundColor: colors.correctBg },
  feedbackWrong: { backgroundColor: colors.incorrectBg },
  feedbackText: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  continueBtn: { marginHorizontal: spacing.lg, marginTop: spacing.sm, borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center' },
  continueBtnGreen: { backgroundColor: colors.primary },
  continueBtnCharcoal: { backgroundColor: colors.charcoal },
  continueBtnText: { color: colors.white, fontSize: 17, fontWeight: '700' },

  completeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  completeEmoji: { fontSize: 64, marginBottom: spacing.lg },
  completeTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  completeScore: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: spacing.xxl },
  completeButton: {
    backgroundColor: colors.charcoal, borderRadius: borderRadius.pill,
    paddingVertical: 16, alignItems: 'center', width: '100%',
  },
  completeButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});
