import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SessionTimer } from '../../components/SessionTimer';
import { WeekPlan } from '../../components/WeekPlan';
import { WeekSelector } from '../../components/WeekSelector';
import { BlockType, DEFAULT_WEEK_ID, PLAN_TITLE, TEAM_NAME, weeks } from '../../data/trainingPlan';
import { colors, spacing } from '../../theme';

interface ActiveHighlight {
  type: BlockType | 'water';
  waterBreak?: number;
}

export default function ThisWeekScreen() {
  const [selectedId, setSelectedId] = useState(DEFAULT_WEEK_ID);
  const [active, setActive] = useState<ActiveHighlight | null>(null);
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
      <WeekSelector selectedId={selectedId} onSelect={setSelectedId} />

      {/* Session timer + full plan on the same page */}
      <SessionTimer
        week={week}
        onActiveChange={(type, waterBreak) =>
          setActive(type ? { type, waterBreak } : null)
        }
      />
      <WeekPlan
        week={week}
        highlightType={active?.type}
        waterBreak={active?.waterBreak}
      />
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
});
