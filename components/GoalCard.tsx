import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZE } from "@/theme";
import { Goal } from "@/db";
import { useEffect, useState } from "react";
import { getGoalCurrentValue } from "@/utils/goalUtil";
import LoadingSpinner from "./LoadingSpinner";

export const GoalCard = ({ item }: { item: Goal }) => {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        setIsLoading(true);
        const value = await getGoalCurrentValue();
        console.log("Current Value:", value);
        setCurrentValue(value);
      } catch (error) {
        console.error("Error fetching current value:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentValue();
  }, [item]);
  const renderDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-US", options);
      return formattedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  };
  const handleOpenGoalDetails = (goalId: number) => {
    // Logic to open goal details
    alert(`Open Goal Details for ID: ${goalId}`);
  };
  return (
    <View style={styles.goalContainer}>
      <View style={styles.goalMainContent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <View style={styles.goalWrapper}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalText}>{item.goalName}</Text>
              <Text style={styles.goalFinishDate}>
                {renderDate(item.timePeriodEnd)}
              </Text>
              <Text style={styles.progressText}>
                {currentValue}/{item.targetValue}
              </Text>
            </View>
            <ProgressBar
              progress={currentValue ? currentValue / item.targetValue : 0}
              color={COLORS.primaryAccent}
            />
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={COLORS.textSecondary}
              style={{ alignSelf: "flex-end" }}
              onPress={() => handleOpenGoalDetails(item.id)}
            />
          </View>
        )}
      </View>
      <View style={styles.goalDetails}>
        <Text style={styles.goalDetailsText}>
          Type: {item.goalType} | Aggregation: {item.aggregationType}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  goalDetails: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    margin: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  goalWrapper: {
    flex: 1,
    flexDirection: "column",
    marginLeft: SPACING.md,
  },
  goalMainContent: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    margin: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  goalText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 700,
    color: COLORS.textPrimary,
  },
  goalDetailsText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  goalFinishDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  progressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
});
