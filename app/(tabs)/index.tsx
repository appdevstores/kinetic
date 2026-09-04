import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WeekPlan } from '../../components/WeekPlan';
import { DEFAULT_WEEK_ID, PLAN_TITLE, TEAM_NAME, weeks } from '../../data/trainingPlan';
import { colors, radius, spacing } from '../../theme';

export default function ThisWeekScreen() {
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

      {/* Week selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {weeks.map((w) => {
          const selected = w.id === selectedId;
          return (
            <Pressable
              key={w.id}
              onPress={() => setSelectedId(w.id)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipTitle, selected && styles.chipTitleSelected]}>
                Week {w.id}
              </Text>
              <Text
                style={[styles.chipFocus, selected && styles.chipFocusSelected]}
                numberOfLines={1}
              >
                {w.focus}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

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
  chipsRow: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: 170,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
  },
  chipTitleSelected: {
    color: '#fff',
  },
  chipFocus: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  chipFocusSelected: {
    color: '#D1FAE5',
  },
});
