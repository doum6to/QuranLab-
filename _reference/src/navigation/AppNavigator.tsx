import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import WordListScreen from '../screens/WordListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import LearnScreen from '../screens/LearnScreen';
import QuizScreen from '../screens/QuizScreen';
import MatchScreen from '../screens/MatchScreen';
import WriteScreen from '../screens/WriteScreen';
import MasterScreen from '../screens/MasterScreen';
import { colors } from '../theme';

export type RootTabParamList = {
  Accueil: undefined;
  Leçons: undefined;
  Profil: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  LessonDetail: { lessonId: number };
  Learn: { lessonId: number };
  Quiz: { lessonId: number };
  Match: { lessonId: number };
  Write: { lessonId: number };
  Master: { lessonId: number };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leçons"
        component={WordListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
      <Stack.Screen name="Learn" component={LearnScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Match" component={MatchScreen} />
      <Stack.Screen name="Write" component={WriteScreen} />
      <Stack.Screen name="Master" component={MasterScreen} />
    </Stack.Navigator>
  );
}
