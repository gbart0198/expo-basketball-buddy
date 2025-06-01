import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { Text, StyleSheet, FlatList, View, Pressable } from "react-native";
import { FONT_SIZE, COLORS, SPACING, BORDER_RADIUS } from "@/theme";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";

export default function GoalsView() {
  const completedGoals = data.filter((goal) => goal.isCompleted);
  const inProgressGoals = data.filter((goal) => !goal.isCompleted);
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
    <PaddedSafeAreaView>
      <View style={styles.heading}>
        <Text style={styles.title}>My Goals</Text>
        <Pressable style={styles.headingButton}>
          <Text style={styles.headingButtonText}>Create Goal</Text>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={COLORS.background}
            onPress={() => alert("Open Create Goal Modal")}
          />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>In Progress</Text>
      <View style={styles.inProgressGoals}>
        <FlatList
          style={styles.list}
          data={inProgressGoals}
          renderItem={({ item }) => (
            <View style={styles.goalContainer}>
              <View style={styles.goalMainContent}>
                <View style={styles.goalWrapper}>
                  <View style={styles.goalHeader}>
                    <Text style={styles.goalText}>{item.goalName}</Text>
                    <Text style={styles.goalFinishDate}>
                      {renderDate(item.timePeriodEnd)}
                    </Text>
                    <Text style={styles.progressText}>
                      {item.currentValue}/{item.targetValue}
                    </Text>
                  </View>
                  <ProgressBar
                    progress={item.currentValue / item.targetValue}
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
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalDetailsText}>
                  Type: {item.goalType} | Aggregation: {item.aggregationType}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.subtitle}>Completed</Text>
      <View style={styles.inProgressGoals}>
        <FlatList
          style={styles.list}
          data={completedGoals}
          renderItem={({ item }) => (
            <View style={styles.goalMainContent}>
              <View style={styles.goalWrapper}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalText}>{item.goalName}</Text>
                  <Text style={styles.goalFinishDate}>
                    {renderDate(item.timePeriodEnd)}
                  </Text>
                  <Text style={styles.progressText}>
                    {item.currentValue}/{item.targetValue}
                  </Text>
                </View>
                <ProgressBar
                  progress={item.currentValue / item.targetValue}
                  color={COLORS.primaryAccent}
                />
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color={COLORS.textSecondary}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => handleOpenGoalDetails(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  inProgressGoals: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  completedGoals: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  list: {
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBlockEnd: SPACING.sm,
  },
  progressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "right",
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
  headingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryAccent,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  headingButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
    marginRight: SPACING.sm,
  },
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
});

const data = [
  {
    id: 1,
    goalName: "Goal 1",
    goalType: "Performance",
    aggregationType: "Session",
    currentValue: 2,
    targetValue: 10,
    timePeriodStart: new Date().toISOString(),
    timePeriodEnd: new Date().toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSynced: 0,
    isDeleted: 0,
  },
  {
    id: 2,
    goalName: "Goal 2",
    goalType: "Completion",
    aggregationType: "Sessions",
    currentValue: 4,
    targetValue: 5,
    timePeriodStart: new Date().toISOString(),
    timePeriodEnd: new Date().toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSynced: 0,
    isDeleted: 0,
  },
  {
    id: 3,
    goalName: "Goal 3",
    goalType: "Performance",
    aggregationType: "Shots",
    currentValue: 15,
    targetValue: 30,
    timePeriodStart: new Date().toISOString(),
    timePeriodEnd: new Date().toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSynced: 0,
    isDeleted: 0,
  },
  {
    id: 4,
    goalName: "Goal 4",
    goalType: "Completion",
    aggregationType: "Sessions",
    currentValue: 10,
    targetValue: 15,
    timePeriodStart: new Date().toISOString(),
    timePeriodEnd: new Date().toISOString(),
    isCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSynced: 0,
    isDeleted: 0,
  },
];
