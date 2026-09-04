import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PARENT_INFO, WHAT_TO_BRING } from '../../data/trainingPlan';
import { colors, radius, spacing } from '../../theme';

export default function InfoScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introCard}>
        <Image source={require('../../assets/logo.jpg')} style={styles.logo} resizeMode="cover" />
        <Text style={styles.introTitle}>{PARENT_INFO.title}</Text>
        <Text style={styles.introText}>{PARENT_INFO.intro}</Text>
      </View>

      <Text style={styles.sectionHeading}>What your child will work on</Text>
      {PARENT_INFO.whatYourChildWillWorkOn.map((phase, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.phaseHeader}>
            <View style={styles.phaseBadge}>
              <Text style={styles.phaseBadgeText}>{phase.when}</Text>
            </View>
          </View>
          <Text style={styles.phaseFocus}>{phase.focus}</Text>
          <Text style={styles.phaseDevelops}>{phase.develops}</Text>
        </View>
      ))}

      <Text style={styles.sectionHeading}>What to bring to every session</Text>
      <View style={styles.card}>
        {WHAT_TO_BRING.map((item, i) => (
          <View key={i} style={styles.checkRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}
        <Text style={styles.noteText}>{PARENT_INFO.everyPlayerNeedsABall}</Text>
      </View>

      <Text style={styles.sectionHeading}>Playing time</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>{PARENT_INFO.playingTime}</Text>
      </View>

      <Text style={styles.sectionHeading}>What progress looks like</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>{PARENT_INFO.progress}</Text>
      </View>

      <Text style={styles.sectionHeading}>Supporting from the sideline</Text>
      <View style={styles.card}>
        {PARENT_INFO.sideline.map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.aimCard}>
        <Text style={styles.aimText}>{PARENT_INFO.aim}</Text>
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
  introCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  introTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 6,
  },
  introText: {
    color: '#D1FAE5',
    fontSize: 14,
    lineHeight: 21,
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
  phaseHeader: {
    marginBottom: 6,
  },
  phaseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  phaseBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  phaseFocus: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  phaseDevelops: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  tipDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 7,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  aimCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  aimText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.primary,
    fontWeight: '600',
  },
});
