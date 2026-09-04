import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { weeks } from '../data/trainingPlan';
import { colors, radius, spacing } from '../theme';

interface Props {
  selectedId: number;
  onSelect: (id: number) => void;
}

/** Horizontal row of week chips, used on the This Week and Timer screens. */
export function WeekSelector({ selectedId, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {weeks.map((w) => {
        const selected = w.id === selectedId;
        return (
          <Pressable
            key={w.id}
            onPress={() => onSelect(w.id)}
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
  );
}

const styles = StyleSheet.create({
  row: {
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
