import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  LEAGUE_FORMAT,
  SESSION_STRUCTURE,
  STANDARD_EQUIPMENT,
  weeks,
} from '../../data/trainingPlan';
import { colors, radius, spacing } from '../../theme';

export default function SeasonScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionHeading}>How sessions work</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>{SESSION_STRUCTURE}</Text>
      </View>

      <Text style={styles.sectionHeading}>League format</Text>
      <View style={styles.card}>
        {LEAGUE_FORMAT.map((item, i) => (
          <View key={i} style={styles.bulletRow}>
            <Ionicons name="football" size={15} color={colors.primary} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeading}>The eight weeks</Text>
      {weeks.map((week) => {
        const drillA = week.blocks.find((b) => b.type === 'drillA');
        const drillB = week.blocks.find((b) => b.type === 'drillB');
        return (
          <Pressable
            key={week.id}
            onPress={() => router.push(`/week/${week.id}`)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.weekRow, pressed && styles.pressed]}
          >
            <View style={styles.weekBadge}>
              <Text style={styles.weekBadgeText}>{week.id}</Text>
            </View>
            <View style={styles.weekInfo}>
              <Text style={styles.weekFocus}>{week.focus}</Text>
              <Text style={styles.weekDrills} numberOfLines={2}>
                {drillA?.activity} · {drillB?.activity}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        );
      })}

      <Text style={styles.sectionHeading}>Season equipment</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>{STANDARD_EQUIPMENT}</Text>
      </View>
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
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  weekBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekBadgeText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  weekInfo: {
    flex: 1,
  },
  weekFocus: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  weekDrills: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
