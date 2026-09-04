import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SessionTimer } from '../../components/SessionTimer';
import { TeamSilhouette } from '../../components/TeamSilhouette';
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

  const handleActiveChange = useCallback(
    (type: BlockType | 'water' | null, waterBreak?: number) =>
      setActive(type ? { type, waterBreak } : null),
    [],
  );

  return (
    <View style={styles.screen}>
      {/* Team watermark: 14 kids + 2 coaches, faintly in the background */}
      <TeamSilhouette />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleRow}>
          <Image source={require('../../assets/logo.jpg')} style={styles.logo} resizeMode="cover" />
          <View style={styles.titleText}>
            <Text style={styles.teamName}>{TEAM_NAME}</Text>
            <Text style={styles.planTitle}>{PLAN_TITLE}</Text>
          </View>
        </View>

        {/* Week selector */}
        <WeekSelector selectedId={selectedId} onSelect={setSelectedId} />

        {/* Session timer + full plan on the same page */}
        <SessionTimer
          week={week}
          onActiveChange={handleActiveChange}
        />
        <WeekPlan
          week={week}
          highlightType={active?.type}
          waterBreak={active?.waterBreak}
        />
      </ScrollView>
    </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  titleText: {
    flex: 1,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.primary,
  },
  planTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
});
