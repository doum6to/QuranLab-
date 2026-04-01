import { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProgress } from '../hooks/useProgress';
import { parties, getAllLessons } from '../data/lessons';
import type { Lesson, Partie } from '../types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_GAP = 12;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

type Nav = NativeStackNavigationProp<RootStackParamList>;

// ── Helper: find current active lesson ──
function useCurrentLesson() {
  const { progress } = useProgress();
  const allLessons = getAllLessons();
  return useMemo(() => {
    for (const lesson of allLessons) {
      const allDone = lesson.exercises.every((ex) =>
        progress.completedExercises.includes(ex.id)
      );
      if (!allDone) return lesson;
    }
    return allLessons[0];
  }, [allLessons, progress.completedExercises]);
}

function useCurrentExercise(lesson: Lesson) {
  const { progress } = useProgress();
  return useMemo(() => {
    for (const ex of lesson.exercises) {
      if (!progress.completedExercises.includes(ex.id)) return ex;
    }
    return lesson.exercises[0];
  }, [lesson, progress.completedExercises]);
}

// ── Course Card ──
function CourseCard({ lesson, onContinue, progressMessage }: {
  lesson: Lesson;
  onContinue: () => void;
  progressMessage: string;
}) {
  const { progress } = useProgress();
  const currentExercise = useCurrentExercise(lesson);
  const completedCount = lesson.exercises.filter((ex) =>
    progress.completedExercises.includes(ex.id)
  ).length;

  return (
    <View style={styles.card}>
      {/* Block 1: Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{lesson.title}</Text>
        <Text style={styles.cardLevel}>LEVEL {lesson.id}</Text>
      </View>

      {/* Block 2: Illustration */}
      <View style={styles.cardIllustration}>
        <Text style={styles.cardIcon}>{lesson.icon}</Text>
      </View>

      {/* Block 3: Status */}
      <View style={styles.cardStatus}>
        <View style={styles.mascotIcon}>
          <Text style={styles.mascotQ}>Q</Text>
        </View>
        <Text style={styles.statusText}>{progressMessage}</Text>
      </View>

      {/* Block 4: Progress row */}
      <View style={styles.progressRow}>
        <View style={[styles.coinDot, completedCount > 0 && styles.coinDotActive]} />
        <Text style={styles.exerciseName} numberOfLines={1}>
          {currentExercise.title}
        </Text>
        {progress.completedExercises.includes(currentExercise.id) && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        )}
      </View>

      {/* Block 5: Action button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Locked Partie Card ──
function LockedPartieCard({ partie }: { partie: Partie }) {
  return (
    <View style={styles.lockedCard}>
      <View style={styles.lockIconContainer}>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>
      <Text style={styles.lockedTitle}>Partie {partie.id}</Text>
      <Text style={styles.lockedSubtitle}>{partie.title}</Text>
      <Text style={styles.lockedDescription}>{partie.description}</Text>
      <View style={styles.coverageBadge}>
        <Text style={styles.coverageText}>{partie.coverage}% du Coran</Text>
      </View>
      <Text style={styles.comingSoon}>Bientôt disponible</Text>
    </View>
  );
}

// ── Main Dashboard ──
export default function DashboardScreen() {
  const navigation = useNavigation<Nav>();
  const { progress } = useProgress();
  const allLessons = getAllLessons();
  const lockedParties = useMemo(() => parties.filter((p) => p.locked), []);
  const totalItems = allLessons.length + lockedParties.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const exerciseRoutes: Record<string, keyof RootStackParamList> = {
    discover: 'Learn',
    quiz: 'Quiz',
    match: 'Match',
    write: 'Write',
    master: 'Master',
  };

  const getProgressMessage = useCallback((lesson: Lesson) => {
    const completedCount = lesson.exercises.filter((ex) =>
      progress.completedExercises.includes(ex.id)
    ).length;
    if (progress.totalXp === 0) return "Bismillah, c'est parti !";
    if (completedCount > 0) return 'Continue comme ça !';
    return 'Prêt pour la suite ?';
  }, [progress.completedExercises, progress.totalXp]);

  const handleContinue = useCallback((lesson: Lesson) => {
    const exercise = lesson.exercises.find(
      (ex) => !progress.completedExercises.includes(ex.id)
    ) || lesson.exercises[0];
    const route = exerciseRoutes[exercise.type] as 'Learn' | 'Quiz' | 'Match' | 'Write' | 'Master';
    if (route) {
      navigation.navigate(route, { lessonId: lesson.id } as any);
    }
  }, [progress.completedExercises, navigation]);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(index, totalItems - 1)));
  }, [totalItems]);

  const scrollToIndex = useCallback((index: number) => {
    scrollRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_GAP),
      animated: true,
    });
    setActiveIndex(index);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>QuranLab</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{progress.streak || 0}</Text>
            <Text style={styles.statIcon}>⚡</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{progress.totalXp}</Text>
            <Text style={styles.statIcon}>⭐</Text>
          </View>
        </View>
      </View>

      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
          gap: CARD_GAP,
          paddingBottom: spacing.lg,
        }}
        style={styles.carousel}
      >
        {allLessons.map((lesson) => (
          <View key={`lesson-${lesson.id}`} style={{ width: CARD_WIDTH }}>
            <CourseCard
              lesson={lesson}
              onContinue={() => handleContinue(lesson)}
              progressMessage={getProgressMessage(lesson)}
            />
          </View>
        ))}
        {lockedParties.map((partie) => (
          <View key={`partie-${partie.id}`} style={{ width: CARD_WIDTH }}>
            <LockedPartieCard partie={partie} />
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.dots}>
        {Array.from({ length: totalItems }).map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => scrollToIndex(i)}
            style={[
              styles.dot,
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statIcon: {
    fontSize: 16,
  },

  // Carousel
  carousel: {
    flexGrow: 0,
  },

  // Course Card
  card: {
    backgroundColor: '#FFFBF0',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    padding: spacing.lg,
    minHeight: SCREEN_WIDTH * 1.2,
    justifyContent: 'space-between',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardLevel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cardIllustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  cardIcon: {
    fontSize: 72,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  mascotIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  mascotQ: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    transform: [{ rotate: '-45deg' }],
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F0E8D8',
  },
  coinDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
  },
  coinDotActive: {
    backgroundColor: '#CCC',
  },
  exerciseName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  checkBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#29CC57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  // Continue button (emerald green, 3D press effect)
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Locked Partie Card
  lockedCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: SCREEN_WIDTH * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  lockIcon: {
    fontSize: 24,
  },
  lockedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 4,
  },
  lockedSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  lockedDescription: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  coverageBadge: {
    backgroundColor: '#EEEEEE',
    borderRadius: borderRadius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: spacing.md,
  },
  coverageText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  comingSoon: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Pagination dots
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
});
