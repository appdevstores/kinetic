import { Fragment, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlockType, SessionBlock, sessionTotalMin, Week } from '../data/trainingPlan';
import { getDiagram } from '../data/diagrams';
import { colors, radius, spacing } from '../theme';

const BLOCK_COLORS: Record<BlockType, string> = {
  warmup: colors.warmup,
  drillA: colors.drillA,
  drillB: colors.drillB,
  game: colors.game,
};

function parseTime(t: string) {
  const [start, end] = t.split('–').map((x) => parseInt(x, 10));
  return { start, end };
}

/** Slim divider shown between session blocks while the timer is not involved. */
function WaterBreakCard({
  start,
  end,
  active,
}: {
  start: number;
  end: number;
  active?: boolean;
}) {
  return (
    <View style={[styles.waterBreak, active && styles.waterBreakActive]}>
      <View style={styles.waterIconCircle}>
        <Ionicons name="water" size={16} color={colors.water} />
      </View>
      <Text style={styles.waterBreakText}>Water break</Text>
      <Text style={styles.waterBreakTime}>
        {start}–{end} · {end - start} min
      </Text>
    </View>
  );
}

function BlockCard({
  block,
  diagram,
  active,
}: {
  block: SessionBlock;
  diagram?: ImageSourcePropType;
  active?: boolean;
}) {
  const blockColor = BLOCK_COLORS[block.type];
  const [diagramOpen, setDiagramOpen] = useState(false);
  const openVideo = () => {
    if (block.videoUrl) Linking.openURL(block.videoUrl);
  };

  return (
    <View
      style={[
        styles.blockCard,
        { borderLeftColor: blockColor },
        active && styles.blockCardActive,
        active && { borderColor: blockColor },
      ]}
    >
      <View style={styles.blockHeader}>
        <View style={[styles.timeBadge, { backgroundColor: blockColor }]}>
          <Text style={styles.timeBadgeText}>{block.time} MIN</Text>
        </View>
        <Text style={[styles.blockLabel, { color: blockColor }]}>{block.label}</Text>
        {active && (
          <View style={[styles.currentPill, { backgroundColor: blockColor }]}>
            <Ionicons name="play" size={10} color="#fff" />
            <Text style={styles.currentPillText}>NOW</Text>
          </View>
        )}
      </View>
      <Text style={styles.blockTitle}>{block.activity}</Text>
      <Text style={styles.blockBody}>{block.howToRun}</Text>
      {diagram && (
        <View style={styles.diagramSection}>
          <Pressable
            style={({ pressed }) => [styles.diagramButton, pressed && styles.pressed]}
            onPress={() => setDiagramOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel={`${diagramOpen ? 'Hide' : 'Show'} diagram for ${block.activity}`}
          >
            <Ionicons
              name={diagramOpen ? 'chevron-up' : 'image-outline'}
              size={16}
              color={colors.primary}
            />
            <Text style={styles.diagramButtonText}>
              {diagramOpen ? 'Hide diagram' : 'Show diagram'}
            </Text>
          </Pressable>
          {diagramOpen && (
            <View style={styles.diagramFrame}>
              <Image source={diagram} style={styles.diagramImage} resizeMode="contain" />
            </View>
          )}
        </View>
      )}
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

export function WeekPlan({
  week,
  highlightType,
  waterBreak,
}: {
  week: Week;
  /** Block (or water break) to draw attention to while the session timer runs. */
  highlightType?: BlockType | 'water' | null;
  /** Which water break is active: 1 = before Drill A, 2 = before Drill B, 3 = before the game. */
  waterBreak?: number;
}) {
  return (
    <View>
      {/* Session header */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <Text style={styles.weekNumber}>WEEK {week.id}</Text>
          <View style={styles.durationPill}>
            <Ionicons name="time-outline" size={13} color={colors.primary} />
            <Text style={styles.durationPillText}>{sessionTotalMin(week)} min</Text>
          </View>
        </View>
        <Text style={styles.focusTitle}>{week.focus}</Text>
        <Text style={styles.summary}>{week.summary}</Text>
      </View>

      {/* Session blocks with water breaks between them */}
      {week.blocks.map((block, i) => (
        <Fragment key={block.type}>
          {i > 0 && (
            <WaterBreakCard
              start={parseTime(week.blocks[i - 1].time).end}
              end={parseTime(block.time).start}
              active={highlightType === 'water' && waterBreak === i}
            />
          )}
          <BlockCard
            block={block}
            diagram={getDiagram(week.id, block.type)}
            active={block.type === highlightType}
          />
        </Fragment>
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
  blockCardActive: {
    borderWidth: 2,
    borderLeftWidth: 5,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  currentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: 'auto',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  currentPillText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
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
  diagramSection: {
    marginBottom: spacing.md,
  },
  diagramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    paddingVertical: 10,
  },
  diagramButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  diagramFrame: {
    marginTop: spacing.sm,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  diagramImage: {
    width: '100%',
    height: 260,
  },
  waterBreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.waterSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  waterBreakActive: {
    borderColor: colors.water,
  },
  waterIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterBreakText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.water,
  },
  waterBreakTime: {
    marginLeft: 'auto',
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
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
