import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../theme';

interface Props {
  onComplete: (goal: string, time: string) => void;
}

const goals = [
  { id: 'quran', icon: '📖', label: 'Comprendre le Coran' },
  { id: 'salat', icon: '🤲', label: 'Améliorer ma salat' },
  { id: 'culture', icon: '🕌', label: 'Culture islamique' },
  { id: 'other', icon: '✨', label: 'Autre' },
];

const times = [
  { id: 'morning', icon: '☀️', label: 'Le matin' },
  { id: 'evening', icon: '🌙', label: 'Le soir' },
  { id: 'anytime', icon: '🕐', label: "Quand j'ai le temps" },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.progressBarTrack}>
      <View style={[styles.progressBarFill, { width: `${(step / total) * 100}%` }]} />
    </View>
  );
}

function MascotBubble({ message }: { message: string }) {
  return (
    <View style={styles.bubbleContainer}>
      <View style={styles.mascotSmall}>
        <Text style={styles.mascotSmallQ}>Q</Text>
      </View>
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>{message}</Text>
      </View>
    </View>
  );
}

function SelectionCard({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.selectionCard, selected && styles.selectionCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.selectionIcon}>{icon}</Text>
      <Text style={[styles.selectionLabel, selected && styles.selectionLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && selectedGoal) {
      setStep(2);
    } else if (step === 2 && selectedTime) {
      onComplete(selectedGoal, selectedTime);
    }
  };

  const canContinue =
    step === 0 || (step === 1 && selectedGoal !== '') || (step === 2 && selectedTime !== '');

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar (steps 1 & 2 only) */}
      {step > 0 && (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressBarWrapper}>
            <ProgressBar step={step} total={2} />
          </View>
          <View style={{ width: 40 }} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 0: Welcome */}
        {step === 0 && (
          <View style={styles.welcomeContent}>
            <View style={styles.mascotLarge}>
              <Text style={styles.mascotLargeQ}>Q</Text>
            </View>
            <Text style={styles.welcomeTitle}>
              Apprends le Coran{'\n'}mot par mot
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Comprends 85% des mots du Coran avec seulement 300 mots.
            </Text>
          </View>
        )}

        {/* Step 1: Goal selection */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <MascotBubble message="Pourquoi veux-tu apprendre ?" />
            <View style={styles.cardsContainer}>
              {goals.map((g) => (
                <SelectionCard
                  key={g.id}
                  icon={g.icon}
                  label={g.label}
                  selected={selectedGoal === g.id}
                  onPress={() => setSelectedGoal(g.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Step 2: Study time */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <MascotBubble message="Quand préfères-tu étudier ?" />
            <View style={styles.cardsContainer}>
              {times.map((t) => (
                <SelectionCard
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  selected={selectedTime === t.id}
                  onPress={() => setSelectedTime(t.id)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[styles.actionButton, !canContinue && styles.actionButtonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!canContinue}
        >
          <Text
            style={[
              styles.actionButtonText,
              !canContinue && styles.actionButtonTextDisabled,
            ]}
          >
            {step === 0 ? 'Commencer' : 'Continuer'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  progressBarWrapper: {
    flex: 1,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  // Content
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },

  // Welcome (step 0)
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl * 2,
  },
  mascotLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  mascotLargeQ: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
    transform: [{ rotate: '-45deg' }],
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },

  // Step content
  stepContent: {
    paddingTop: spacing.xl,
  },

  // Mascot bubble
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: spacing.xl,
  },
  mascotSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
    marginTop: 4,
  },
  mascotSmallQ: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    transform: [{ rotate: '-45deg' }],
  },
  speechBubble: {
    flex: 1,
    backgroundColor: colors.speech,
    borderWidth: 1,
    borderColor: colors.speechBorder,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  speechText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 22,
  },

  // Selection cards
  cardsContainer: {
    gap: 12,
  },
  selectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  selectionCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  selectionIcon: {
    fontSize: 24,
  },
  selectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectionLabelSelected: {
    color: colors.primaryDark,
  },

  // Bottom action
  bottomAction: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  actionButton: {
    backgroundColor: colors.charcoal,
    borderRadius: borderRadius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  actionButtonTextDisabled: {
    color: colors.disabledText,
  },
});
