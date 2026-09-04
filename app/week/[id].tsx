import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WeekPlan } from '../../components/WeekPlan';
import { weeks } from '../../data/trainingPlan';
import { colors, spacing } from '../../theme';

export default function WeekDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const week = weeks.find((w) => w.id === Number(id)) ?? weeks[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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
});
