import { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { getLessonById } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'LessonDetail'>;

const exerciseRoutes: Record<string, keyof RootStackParamList> = {
  discover: 'Learn',
  quiz: 'Quiz',
  match: 'Match',
  write: 'Write',
  master: 'Master',
};

export default function LessonDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const { getExerciseStatus } = useProgress();

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Leçon introuvable</Text>
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
        <View style={styles.headerCenter}>
          <Text style={styles.lessonIcon}>{lesson.icon}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.levelLabel}>NIVEAU {lesson.id}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Exercise nodes */}
      <ScrollView contentContainerStyle={styles.nodeList}>
        {lesson.exercises.map((exercise, index) => {
          const status = getExerciseStatus(lesson.id, exercise.type);
          const isLast = index === lesson.exercises.length - 1;
          return (
            <View key={exercise.id}>
              <View style={styles.nodeRow}>
                {/* Connector line */}
                {!isLast && <View style={styles.connector} />}
                {/* Node circle */}
                <View
                  style={[
                    styles.nodeCircle,
                    status === 'completed' && styles.nodeCompleted,
                    status === 'active' && styles.nodeActive,
                    status === 'locked' && styles.nodeLocked,
                  ]}
                >
                  {status === 'completed' ? (
                    <Text style={styles.nodeCheck}>✓</Text>
                  ) : status === 'active' ? (
                    <View style={styles.nodeInner} />
                  ) : (
                    <View style={styles.nodeLockDot} />
                  )}
                </View>
                {/* Label */}
                <View style={styles.nodeLabel}>
                  <Text
                    style={[
                      styles.nodeTitle,
                      status === 'locked' && styles.nodeTitleLocked,
                    ]}
                  >
                    {exercise.title}
                  </Text>
                  <Text style={styles.nodeDesc}>{exercise.description}</Text>
                </View>
              </View>

              {/* Action button for active exercise */}
              {status === 'active' && (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => {
                    const r = exerciseRoutes[exercise.type] as 'Learn';
                    if (r) navigation.navigate(r, { lessonId: lesson.id } as any);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.startButtonText}>Commencer</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
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
  headerCenter: { flex: 1, alignItems: 'center' },
  lessonIcon: { fontSize: 40, marginBottom: 4 },
  lessonTitle: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  levelLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.gold,
    letterSpacing: 1.5,
    marginTop: 2,
  },

  nodeList: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: 100 },
  nodeRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  connector: {
    position: 'absolute',
    left: 20,
    top: 42,
    width: 2,
    height: 48,
    backgroundColor: colors.border,
  },
  nodeCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCompleted: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  nodeActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  nodeLocked: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  nodeCheck: { color: colors.white, fontSize: 18, fontWeight: '700' },
  nodeInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
  },
  nodeLockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  nodeLabel: { flex: 1 },
  nodeTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  nodeTitleLocked: { color: colors.textMuted },
  nodeDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },

  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 58,
    marginTop: -16,
    marginBottom: 24,
  },
  startButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
