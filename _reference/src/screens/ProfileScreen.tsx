import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../hooks/useProgress';
import { colors, spacing, borderRadius } from '../theme';

export default function ProfileScreen() {
  const { progress, resetProgress } = useProgress();

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Profil</Text>

      {/* Streak card */}
      <View style={styles.card}>
        <View style={styles.streakRow}>
          <Text style={styles.streakNumber}>{progress.streak || 0}</Text>
          <Text style={styles.streakIcon}>⚡</Text>
        </View>
        <Text style={styles.streakLabel}>Série de jours</Text>
        <View style={styles.daysRow}>
          {days.map((day, i) => (
            <View key={i} style={styles.dayCol}>
              <View
                style={[
                  styles.dayCircle,
                  i <= todayIndex && progress.streak > 0 && styles.dayCircleActive,
                ]}
              />
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.card}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Mots appris</Text>
          <Text style={styles.statVal}>{progress.wordsLearned}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>XP total</Text>
          <Text style={styles.statVal}>{progress.totalXp}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Leçons complétées</Text>
          <Text style={styles.statVal}>{progress.completedLessons.length}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  streakNumber: { fontSize: 36, fontWeight: '700', color: colors.textPrimary },
  streakIcon: { fontSize: 28 },
  streakLabel: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.md },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center', gap: 6 },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dayCircleActive: {
    borderColor: 'transparent',
    backgroundColor: '#D8E82E',
  },
  dayLabel: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  statLabel: { fontSize: 15, color: colors.textSecondary },
  statVal: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  divider: { height: 1, backgroundColor: colors.borderLight },
});
