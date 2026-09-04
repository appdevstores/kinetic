import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, Vibration, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { Ionicons } from '@expo/vector-icons';
import { WeekSelector } from '../../components/WeekSelector';
import {
  BlockType,
  buildSessionTimeline,
  DEFAULT_WEEK_ID,
  TimelineSegment,
  weeks,
} from '../../data/trainingPlan';
import { colors, radius, spacing } from '../../theme';

const SEGMENT_COLORS: Record<TimelineSegment['type'], string> = {
  warmup: colors.warmup,
  drillA: colors.drillA,
  drillB: colors.drillB,
  game: colors.game,
  water: colors.water,
};

function formatTime(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function TimerScreen() {
  useKeepAwake();

  const params = useLocalSearchParams<{ week?: string }>();
  const [weekId, setWeekId] = useState(Number(params.week) || DEFAULT_WEEK_ID);
  const week = weeks.find((w) => w.id === weekId) ?? weeks[0];
  const segments = useMemo(() => buildSessionTimeline(week), [week]);

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(segments[0].durationSec);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const segment = segments[index];
  const totalSec = segments.reduce((sum, s) => sum + s.durationSec, 0);

  // Reset the timer when the selected week changes.
  useEffect(() => {
    setIndex(0);
    setSecondsLeft(segments[0].durationSec);
    setRunning(false);
    setFinished(false);
  }, [weekId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tick once per second while running.
  useEffect(() => {
    if (!running || finished) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, finished]);

  // When a segment reaches zero, move to the next one (or finish).
  useEffect(() => {
    if (secondsLeft > 0 || finished) return;
    Vibration.vibrate(600);
    if (index >= segments.length - 1) {
      setFinished(true);
      setRunning(false);
      return;
    }
    setIndex((i) => i + 1);
    setSecondsLeft(segments[index + 1].durationSec);
  }, [secondsLeft, finished, index, segments]);

  const skip = () => {
    if (finished) return;
    Vibration.vibrate(150);
    if (index >= segments.length - 1) {
      setFinished(true);
      setRunning(false);
      return;
    }
    setIndex((i) => i + 1);
    setSecondsLeft(segments[index + 1].durationSec);
  };

  const reset = () => {
    setIndex(0);
    setSecondsLeft(segments[0].durationSec);
    setRunning(false);
    setFinished(false);
  };

  const segmentColor = SEGMENT_COLORS[segment.type];
  const progress = segment ? 1 - secondsLeft / segment.durationSec : 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <WeekSelector selectedId={weekId} onSelect={setWeekId} />

      {/* Current segment */}
      <View style={[styles.currentCard, { backgroundColor: segmentColor }]}>
        <Text style={styles.currentLabel}>{segment.label}</Text>
        <Text style={styles.currentTitle} numberOfLines={2}>
          {segment.title}
        </Text>
        <Text style={styles.currentTime}>{formatTime(secondsLeft)}</Text>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.currentHint}>
          {running ? 'Running' : 'Paused'} · {segment.durationSec / 60} min block
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsRow}>
        <Pressable
          style={({ pressed }) => [styles.controlButton, styles.ghostButton, pressed && styles.pressed]}
          onPress={reset}
          accessibilityRole="button"
          accessibilityLabel="Reset timer"
        >
          <Ionicons name="refresh" size={22} color={colors.text} />
          <Text style={styles.ghostButtonText}>Reset</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.controlButton, styles.mainButton, pressed && styles.pressed]}
          onPress={() => (finished ? reset() : setRunning((r) => !r))}
          accessibilityRole="button"
          accessibilityLabel={running ? 'Pause timer' : 'Start timer'}
        >
          <Ionicons
            name={finished ? 'refresh' : running ? 'pause' : 'play'}
            size={26}
            color="#fff"
          />
          <Text style={styles.mainButtonText}>
            {finished ? 'Restart' : running ? 'Pause' : 'Start'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.controlButton, styles.ghostButton, pressed && styles.pressed]}
          onPress={skip}
          accessibilityRole="button"
          accessibilityLabel="Skip to next segment"
        >
          <Ionicons name="play-skip-forward" size={22} color={colors.text} />
          <Text style={styles.ghostButtonText}>Skip</Text>
        </Pressable>
      </View>

      {/* Timeline */}
      <Text style={styles.sectionHeading}>
        Session timeline · {Math.round(totalSec / 60)} min incl. water breaks
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.timelineRow}>
          {segments.map((seg, i) => {
            const isCurrent = i === index && !finished;
            const isDone = i < index || finished;
            const segColor = SEGMENT_COLORS[seg.type];
            return (
              <View key={seg.key} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineChip,
                    isCurrent && { backgroundColor: segColor, borderColor: segColor },
                    isDone && styles.timelineChipDone,
                  ]}
                >
                  {seg.type === 'water' ? (
                    <Ionicons
                      name="water-outline"
                      size={14}
                      color={isCurrent ? '#fff' : colors.textMuted}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.timelineChipText,
                        isCurrent && styles.timelineChipTextCurrent,
                        isDone && styles.timelineChipTextDone,
                      ]}
                    >
                      {seg.label}
                    </Text>
                  )}
                </View>
                <Text style={[styles.timelineTime, isCurrent && { color: segColor, fontWeight: '800' }]}>
                  {seg.durationSec / 60} min
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {finished && (
        <View style={styles.finishedCard}>
          <Ionicons name="trophy" size={22} color={colors.primary} />
          <Text style={styles.finishedText}>Session complete — great work!</Text>
        </View>
      )}
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
  currentCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  currentLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },
  currentTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  currentTime: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    marginBottom: spacing.md,
  },
  progressTrack: {
    alignSelf: 'stretch',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
  },
  currentHint: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  controlButton: {
    flex: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 4,
  },
  mainButton: {
    backgroundColor: colors.primary,
    flex: 1.4,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  ghostButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghostButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  timelineItem: {
    alignItems: 'center',
    gap: 4,
  },
  timelineChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  timelineChipDone: {
    opacity: 0.45,
  },
  timelineChipText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: colors.text,
  },
  timelineChipTextCurrent: {
    color: '#fff',
  },
  timelineChipTextDone: {
    color: colors.textMuted,
  },
  timelineTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  finishedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  finishedText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
