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

type Route = RouteProp<RootStackParamList, 'Master'>;

function generateMasterQuestions(words: Word[]) {
  return words.map((word) => {
    const others = words.filter((w) => w.id !== word.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...shuffled.map((w) => w.arabic), word.arabic].sort(
      () => Math.random() - 0.5
    );
    return { word, options, correctAnswer: word.arabic };
  });
}

export default function MasterScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const lesson = getLessonById(route.params.lessonId);
  const { updateWordProgress, addXp, markExerciseComplete, markLessonComplete, updateStreak } = useProgress();

  const questions = useMemo(() => generateMasterQuestions(lesson?.words ?? []), [lesson]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = useCallback((answer: string) => {
    if (selectedAnswer) return;
    const correct = answer === current.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) setCorrectCount((c) => c + 1);
    updateWordProgress(current.word.id, correct);
    if (correct) addXp(20);
  }, [selectedAnswer, current]);

  const handleContinue = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      if (lesson) {
        markExerciseComplete(`${lesson.id}-master`);
        markLessonComplete(lesson.id);
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
          <Text style={styles.completeEmoji}>🏆</Text>
          <Text style={styles.completeTitle}>Leçon maîtrisée !</Text>
          <Text style={styles.completeScore}>{correctCount}/{questions.length} correct</Text>
          <Text style={styles.xpText}>+{correctCount * 20} XP</Text>
          <TouchableOpacity style={styles.completeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.completeButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]} />
        </View>
      </View>

      {/* Question: French meaning → pick Arabic */}
      <View style={styles.questionArea}>
        <Text style={styles.meaningLabel}>Trouve le mot arabe pour :</Text>
        <Text style={styles.meaningWord}>{current.word.meaningFr}</Text>
        <Text style={styles.translitHint}>{current.word.transliteration}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {current.options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === current.correctAnswer;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selectedAnswer && isAnswer && styles.optionCorrect,
                selectedAnswer && isSelected && !isCorrect && styles.optionWrong,
              ]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer && isAnswer && styles.optionTextCorrect,
                  selectedAnswer && isSelected && !isCorrect && styles.optionTextWrong,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedAnswer && (
        <View style={styles.bottomAction}>
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
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 20, color: colors.textPrimary },
  progressBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },

  questionArea: { alignItems: 'center', paddingTop: spacing.xxl, paddingBottom: spacing.xl },
  meaningLabel: { fontSize: 14, color: colors.textMuted, marginBottom: spacing.sm },
  meaningWord: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.xs },
  translitHint: { fontSize: 14, color: colors.textMuted },

  optionsContainer: { paddingHorizontal: spacing.lg, gap: 12 },
  option: {
    borderWidth: 2, borderColor: colors.border, borderRadius: borderRadius.lg,
    paddingVertical: 18, alignItems: 'center',
  },
  optionCorrect: { borderColor: colors.primary, backgroundColor: colors.correctBg },
  optionWrong: { borderColor: colors.incorrect, backgroundColor: colors.incorrectBg },
  optionText: { fontSize: 24, fontWeight: '600', color: colors.textPrimary },
  optionTextCorrect: { color: colors.correctText },
  optionTextWrong: { color: colors.incorrectText },

  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  continueBtn: { borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center' },
  continueBtnGreen: { backgroundColor: colors.primary },
  continueBtnCharcoal: { backgroundColor: colors.charcoal },
  continueBtnText: { color: colors.white, fontSize: 17, fontWeight: '700' },

  completeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  completeEmoji: { fontSize: 64, marginBottom: spacing.lg },
  completeTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  completeScore: { fontSize: 18, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.xs },
  xpText: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: spacing.xxl },
  completeButton: { backgroundColor: colors.charcoal, borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center', width: '100%' },
  completeButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});
