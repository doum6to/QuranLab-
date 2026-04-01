import { useCallback } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useProgress } from './src/hooks/useProgress';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { colors } from './src/theme';

export default function App() {
  const { progress, setProgress, isLoading } = useProgress();

  const handleOnboardingComplete = useCallback(
    (goal: string, time: string) => {
      setProgress((prev) => ({
        ...prev,
        onboardingComplete: true,
        studyGoal: goal,
        studyTime: time,
      }));
    },
    [setProgress]
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        {progress.onboardingComplete ? (
          <AppNavigator />
        ) : (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
