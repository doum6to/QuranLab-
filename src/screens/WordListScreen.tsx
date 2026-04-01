import { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllLessons } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import type { Word, Lesson } from '../types';
import { colors, spacing, borderRadius } from '../theme';

export default function WordListScreen() {
  const allLessons = getAllLessons();
  const { progress } = useProgress();
  const [selectedLessonId, setSelectedLessonId] = useState(allLessons[0]?.id ?? 1);

  const selectedLesson = useMemo(
    () => allLessons.find((l) => l.id === selectedLessonId) || allLessons[0],
    [allLessons, selectedLessonId]
  );

  const renderWord = ({ item }: { item: Word }) => {
    const isLearned = progress.wordProgress[item.id] !== undefined;
    return (
      <View style={styles.wordRow}>
        <View style={styles.wordLeft}>
          <Text style={styles.wordArabic}>{item.arabic}</Text>
          <Text style={styles.wordTranslit}>{item.transliteration}</Text>
        </View>
        <View style={styles.wordRight}>
          <Text style={styles.wordMeaning}>{item.meaningFr}</Text>
          {isLearned && (
            <View style={styles.learnedBadge}>
              <Text style={styles.learnedCheck}>✓</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Vocabulaire</Text>
      </View>

      {/* Lesson tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {allLessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={[styles.tab, selectedLessonId === lesson.id && styles.tabActive]}
            onPress={() => setSelectedLessonId(lesson.id)}
          >
            <Text style={styles.tabIcon}>{lesson.icon}</Text>
            <Text
              style={[styles.tabLabel, selectedLessonId === lesson.id && styles.tabLabelActive]}
              numberOfLines={1}
            >
              {lesson.id}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Word list */}
      <FlatList
        data={selectedLesson.words}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWord}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },

  tabs: { paddingHorizontal: spacing.md, gap: 8, paddingBottom: spacing.md },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  tabActive: { borderColor: colors.gold, backgroundColor: '#FFFCF4' },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  tabLabelActive: { color: colors.gold },

  list: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  wordLeft: { gap: 2 },
  wordArabic: { fontSize: 20, fontWeight: '600', color: colors.textPrimary, textAlign: 'left' },
  wordTranslit: { fontSize: 12, color: colors.textMuted },
  wordRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordMeaning: { fontSize: 15, color: colors.textSecondary },
  learnedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnedCheck: { color: colors.white, fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.borderLight },
});
