import { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

type Route = RouteProp<RootStackParamList, 'Write'>;

export default function WriteScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const lesson = getLessonById(route.params.lessonId);
  const { updateWordProgress, addXp, markExerciseComplete, updateStreak } = useProgress();

  const words = lesson?.words ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = words[currentIndex];

  const handleCheck = useCallback(() => {
    if (!current || feedback) return;
    const isCorrect = input.trim().toLowerCase() === current.transliteration.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    updateWordProgress(current.id, isCorrect);
    if (isCorrect) {
      addXp(10);
      setCorrectCount((c) => c + 1);
    }
  }, [input, current, feedback]);

  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInput('');
      setFeedback(null);
    } else {
      if (lesson) {
        markExerciseComplete(`${lesson.id}-write`);
        updateStreak();
      }
      setCompleted(true);
    }
  }, [currentIndex, words.length, lesson]);

  if (!lesson) return null;

  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>✍️</Text>
          <Text style={styles.completeTitle}>Écriture terminée !</Text>
          <Text style={styles.completeScore}>{correctCount}/{words.length} correct</Text>
          <TouchableOpacity style={styles.completeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.completeButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentIndex + 1) / words.length) * 100}%` }]} />
          </View>
          <Text style={styles.counter}>{currentIndex + 1}/{words.length}</Text>
        </View>

        {/* Word display */}
        <View style={styles.wordArea}>
          <Text style={styles.arabicWord}>{current?.arabic}</Text>
          <Text style={styles.meaningHint}>{current?.meaningFr}</Text>
        </View>

        {/* Input */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Écris la translitération :</Text>
          <TextInput
            style={[
              styles.textInput,
              feedback === 'correct' && styles.inputCorrect,
              feedback === 'incorrect' && styles.inputIncorrect,
            ]}
            value={input}
            onChangeText={setInput}
            placeholder="Tape ici..."
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!feedback}
          />
          {feedback === 'incorrect' && (
            <Text style={styles.correctAnswer}>
              Réponse : {current?.transliteration}
            </Text>
          )}
        </View>

        {/* Button */}
        <View style={styles.bottomAction}>
          {!feedback ? (
            <TouchableOpacity
              style={[styles.checkBtn, !input.trim() && styles.checkBtnDisabled]}
              onPress={handleCheck}
              disabled={!input.trim()}
            >
              <Text style={[styles.checkBtnText, !input.trim() && styles.checkBtnTextDisabled]}>
                Vérifier
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Continuer</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
  counter: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },

  wordArea: { alignItems: 'center', paddingTop: spacing.xxl, paddingBottom: spacing.xl },
  arabicWord: { fontSize: 52, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  meaningHint: { fontSize: 16, color: colors.textSecondary },

  inputArea: { paddingHorizontal: spacing.lg, flex: 1 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm },
  textInput: {
    borderWidth: 2, borderColor: colors.border, borderRadius: borderRadius.lg,
    paddingVertical: 14, paddingHorizontal: 18, fontSize: 18, color: colors.textPrimary,
  },
  inputCorrect: { borderColor: colors.primary, backgroundColor: colors.correctBg },
  inputIncorrect: { borderColor: colors.incorrect, backgroundColor: colors.incorrectBg },
  correctAnswer: { fontSize: 14, color: colors.incorrect, marginTop: spacing.sm, fontWeight: '600' },

  bottomAction: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: spacing.lg },
  checkBtn: { backgroundColor: colors.charcoal, borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center' },
  checkBtnDisabled: { backgroundColor: colors.disabled },
  checkBtnText: { color: colors.white, fontSize: 17, fontWeight: '700' },
  checkBtnTextDisabled: { color: colors.disabledText },
  nextBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center' },
  nextBtnText: { color: colors.white, fontSize: 17, fontWeight: '700' },

  completeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  completeEmoji: { fontSize: 64, marginBottom: spacing.lg },
  completeTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  completeScore: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: spacing.xxl },
  completeButton: { backgroundColor: colors.charcoal, borderRadius: borderRadius.pill, paddingVertical: 16, alignItems: 'center', width: '100%' },
  completeButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});
