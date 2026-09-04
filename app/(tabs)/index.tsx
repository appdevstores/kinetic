import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WeekPlan } from '../../components/WeekPlan';
import { WeekSelector } from '../../components/WeekSelector';
import { DEFAULT_WEEK_ID, PLAN_TITLE, TEAM_NAME, weeks } from '../../data/trainingPlan';
import { colors, radius, spacing } from '../../theme';

export default function ThisWeekScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(DEFAULT_WEEK_ID);
  const week = weeks.find((w) => w.id === selectedId) ?? weeks[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <Text style={styles.teamName}>{TEAM_NAME}</Text>
      <Text style={styles.planTitle}>{PLAN_TITLE}</Text>

      {/* Start timer */}
      <Pressable
        style={({ pressed }) => [styles.timerButton, pressed && styles.pressed]}
        onPress={() =>
          router.push({ pathname: '/(tabs)/timer', params: { week: String(selectedId) } })
        }
        accessibilityRole="button"
        accessibilityLabel="Start session timer"
      >
        <Ionicons name="timer-outline" size={20} color="#fff" />
        <Text style={styles.timerButtonText}>Start session timer</Text>
      </Pressable>

      {/* Week selector */}
      <WeekSelector selectedId={selectedId} onSelect={setSelectedId} />

      {/* The selected week's plan */}
      <WeekPlan week={week} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  planTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.md,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    marginBottom: spacing.md,
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.85,
  },
});
