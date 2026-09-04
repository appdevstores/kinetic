import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlockType, SessionBlock, Week } from '../data/trainingPlan';
import { colors, radius, spacing } from '../theme';

const BLOCK_COLORS: Record<BlockType, string> = {
  warmup: colors.warmup,
  drillA: colors.drillA,
  drillB: colors.drillB,
  game: colors.game,
};

const BLOCK_ICONS: Record<BlockType, keyof typeof Ionicons.glyphMap> = {
  warmup: 'flash-outline',
  drillA: 'school-outline',
  drillB: 'barbell-outline',
  game: 'trophy-outline',
};

function BlockCard({ block }: { block: SessionBlock }) {
  const blockColor = BLOCK_COLORS[block.type];
  const openVideo = () => {
    if (block.videoUrl) Linking.openURL(block.videoUrl);
  };

  return (
    <View style={[styles.blockCard, { borderLeftColor: blockColor }]}>
      <View style={styles.blockHeader}>
        <View style={[styles.timeBadge, { backgroundColor: blockColor }]}>
          <Text style={styles.timeBadgeText}>{block.time} MIN</Text>
        </View>
        <Text style={[styles.blockLabel, { color: blockColor }]}>{block.label}</Text>
      </View>
      <Text style={styles.blockTitle}>{block.activity}</Text>
      <Text style={styles.blockBody}>{block.howToRun}</Text>
      {block.videoUrl ? (
        <Pressable
          style={({ pressed }) => [styles.videoButton, pressed && styles.pressed]}
          onPress={openVideo}
          accessibilityRole="button"
          accessibilityLabel={`Watch video for ${block.activity}`}
        >
          <Ionicons name="play-circle" size={18} color="#fff" />
          <Text style={styles.videoButtonText}>Watch video</Text>
        </Pressable>
      ) : (
        <View style={styles.diagramNote}>
          <Ionicons name="image-outline" size={16} color={colors.textMuted} />
          <Text style={styles.diagramNoteText}>Diagram only — no video</Text>
        </View>
      )}
    </View>
  );
}

export function WeekPlan({ week }: { week: Week }) {
  return (
    <View>
      {/* Session header */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <Text style={styles.weekNumber}>WEEK {week.id}</Text>
          <View style={styles.durationPill}>
            <Ionicons name="time-outline" size={13} color={colors.primary} />
            <Text style={styles.durationPillText}>60 min</Text>
          </View>
        </View>
        <Text style={styles.focusTitle}>{week.focus}</Text>
        <Text style={styles.summary}>{week.summary}</Text>
      </View>

      {/* Session blocks */}
      {week.blocks.map((block) => (
        <BlockCard key={block.type} block={block} />
      ))}

      {/* Coaching points */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="chatbubbles-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Coaching points</Text>
        </View>
        {week.coachingPoints.map((point, i) => (
          <View key={i} style={styles.pointRow}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>

      {/* Equipment */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="bag-check-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Equipment</Text>
        </View>
        <Text style={styles.equipmentText}>{week.equipment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  weekNumber: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  durationPillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  focusTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  summary: {
    color: '#D1FAE5',
    fontSize: 14,
    lineHeight: 20,
  },
  blockCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderLeftWidth: 5,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  timeBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  blockLabel: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  blockBody: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.video,
    borderRadius: radius.sm,
    paddingVertical: 10,
  },
  videoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  diagramNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  diagramNoteText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  pointDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 7,
  },
  pointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  equipmentText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
});
