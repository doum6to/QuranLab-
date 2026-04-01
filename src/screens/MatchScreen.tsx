import { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

type Route = RouteProp<RootStackParamList, 'Match'>;

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - spacing.lg * 2 - 12) / 2;

interface MatchItem {
  id: string;
  text: string;
  wordId: number;
  type: 'arabic' | 'french';
}

export default function MatchScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const lesson = getLessonById(route.params.lessonId);
  const { updateWordProgress, addXp, markExerciseComplete, updateStreak } = useProgress();

  const words = useMemo(() => (lesson?.words ?? []).slice(0, 6), [lesson]);

  const items = useMemo<MatchItem[]>(() => {
    const arabic = words.map((w) => ({
      id: `ar-${w.id}`,
      text: w.arabic,
      wordId: w.id,
      type: 'arabic' as const,
    }));
    const french = words.map((w) => ({
      id: `fr-${w.id}`,
      text: w.meaningFr,
      wordId: w.id,
      type: 'french' as const,
    }));
    return [...arabic, ...french].sort(() => Math.random() - 0.5);
  }, [words]);

  const [selected, setSelected] = useState<MatchItem | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handlePress = useCallback(
    (item: MatchItem) => {
      if (matched.has(item.wordId) && matched.has(item.wordId)) {
        // Already matched
        const count = items.filter(
          (i) => i.wordId === item.wordId && matched.has(i.wordId)
        ).length;
        if (count >= 2) return;
      }

      if (!selected) {
        setSelected(item);
        setWrong(null);
        return;
      }

      if (selected.id === item.id) {
        setSelected(null);
        return;
      }

      if (selected.wordId === item.wordId && selected.type !== item.type) {
        // Match!
        const newMatched = new Set(matched);
        newMatched.add(item.wordId);
        setMatched(newMatched);
        updateWordProgress(item.wordId, true);
        addXp(10);
        setSelected(null);

        if (newMatched.size === words.length) {
          if (lesson) {
            markExerciseComplete(`${lesson.id}-match`);
            updateStreak();
          }
          setTimeout(() => setCompleted(true), 500);
        }
      } else {
        // Wrong
        setWrong(item.id);
        setTimeout(() => {
          setSelected(null);
          setWrong(null);
        }, 600);
      }
    },
    [selected, matched, words.length, lesson]
  );

  if (!lesson) return null;

  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🎯</Text>
          <Text style={styles.completeTitle}>Associations terminées !</Text>
          <Text style={styles.completeScore}>+{words.length * 10} XP</Text>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Associe les paires</Text>
        <Text style={styles.counter}>{matched.size}/{words.length}</Text>
      </View>

      <View style={styles.grid}>
        {items.map((item) => {
          const isMatched = matched.has(item.wordId);
          const isSelected = selected?.id === item.id;
          const isWrong = wrong === item.id;

          // Check if both arabic and french for this wordId are matched
          const fullyMatched =
            isMatched &&
            items.filter((i) => i.wordId === item.wordId).every((i) => matched.has(i.wordId));

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.matchCard,
                isSelected && styles.matchCardSelected,
                fullyMatched && styles.matchCardMatched,
                isWrong && styles.matchCardWrong,
              ]}
              onPress={() => !fullyMatched && handlePress(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.matchText,
                  item.type === 'arabic' && styles.matchTextArabic,
                  fullyMatched && styles.matchTextMatched,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: colors.textPrimary },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  counter: { fontSize: 16, fontWeight: '600', color: colors.primary },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: 12, justifyContent: 'center',
  },
  matchCard: {
    width: CARD_SIZE, height: 64, borderRadius: borderRadius.md,
    borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8,
  },
  matchCardSelected: { borderColor: colors.primary, backgroundColor: '#F0FDF4' },
  matchCardMatched: { borderColor: colors.primary, backgroundColor: colors.primaryLight, opacity: 0.6 },
  matchCardWrong: { borderColor: colors.incorrect, backgroundColor: colors.incorrectBg },
  matchText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  matchTextArabic: { fontSize: 20 },
  matchTextMatched: { color: colors.primaryDark },

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
