import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { View, Text, StyleSheet } from "react-native";
import { FONT_SIZE, COLORS, SPACING } from "@/theme";

export default function GoalsView() {
  return (
    <PaddedSafeAreaView>
      <Text style={styles.title}>Goals and Progress Tracking</Text>
      <Text style={styles.subtitle}>
        Set your shooting goals, track your progress, and stay motivated!
      </Text>
    </PaddedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});
