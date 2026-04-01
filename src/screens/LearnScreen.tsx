import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

type Route = RouteProp<RootStackParamList, 'Learn'>;

export default function LearnScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const lesson = getLessonById(route.params.lessonId);
  const { markWordLearned, addXp, markExerciseComplete, updateStreak } = useProgress();

  const words = lesson?.words ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const flipAnim = useMemo(() => new Animated.Value(0), []);

  const currentWord = words[currentIndex];

  const handleFlip = () => {
    const toValue = flipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const handleNext = useCallback(() => {
    if (currentWord) {
      markWordLearned(currentWord.id);
      addXp(5);
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      flipAnim.setValue(0);
    } else {
      if (lesson) {
        markExerciseComplete(`${lesson.id}-discover`);
        updateStreak();
      }
      setCompleted(true);
    }
  }, [currentIndex, words.length, currentWord, lesson]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  if (!lesson) return null;

  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeTitle}>Leçon terminée !</Text>
          <Text style={styles.completeXp}>+{words.length * 5} XP</Text>
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
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / words.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.counter}>
          {currentIndex + 1}/{words.length}
        </Text>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={handleFlip} style={styles.cardTouch}>
          {/* Front */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardFront,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <Text style={styles.arabicText}>{currentWord?.arabic}</Text>
            <Text style={styles.tapHint}>Touche pour retourner</Text>
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Text style={styles.translitText}>{currentWord?.transliteration}</Text>
            <Text style={styles.meaningText}>{currentWord?.meaningFr}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Bottom button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[styles.nextButton, !flipped && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!flipped}
          activeOpacity={0.8}
        >
          <Text style={[styles.nextButtonText, !flipped && styles.nextButtonTextDisabled]}>
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: colors.textPrimary },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  counter: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  cardTouch: { width: '100%', height: 300 },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    padding: spacing.xl,
  },
  cardFront: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cardBack: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  arabicText: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  tapHint: { fontSize: 14, color: colors.textMuted },
  translitText: {
    fontSize: 18,
    color: colors.primaryDark,
    marginBottom: spacing.sm,
  },
  meaningText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  bottomAction: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  nextButton: {
    backgroundColor: colors.charcoal,
    borderRadius: borderRadius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: { backgroundColor: colors.disabled },
  nextButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
  nextButtonTextDisabled: { color: colors.disabledText },

  // Completion
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  completeEmoji: { fontSize: 64, marginBottom: spacing.lg },
  completeTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  completeXp: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: spacing.xxl },
  completeButton: {
    backgroundColor: colors.charcoal,
    borderRadius: borderRadius.pill,
    paddingVertical: 16,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    width: '100%',
  },
  completeButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});
