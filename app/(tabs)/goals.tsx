import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { FONT_SIZE, COLORS, SPACING, BORDER_RADIUS } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { GoalCard } from "@/components/GoalCard";
import { useEffect, useState } from "react";
import { CreateGoalModal } from "@/components/CreateGoalModal";
import { CreateGoal } from "@/db";
import { useDatabase } from "@/context/database-context";

export default function GoalsView() {
  const { addGoal, removeGoal, goalsList } = useDatabase();
  const completedGoals = goalsList.filter((goal) => goal.isCompleted);
  const inProgressGoals = goalsList.filter((goal) => !goal.isCompleted);
  const [renderCreateGoalPopup, setRenderCreateGoalPopup] = useState(false);

  const onCreateGoal = (goal?: CreateGoal) => {
    if (goal) {
      // Here you would typically call a function to save the goal to your database
      // For example: saveGoalToDatabase(goal);
      addGoal(goal);
    } else {
      console.log("Goal creation cancelled");
    }
    setRenderCreateGoalPopup(false);
  };

  return (
    <PaddedSafeAreaView>
      {renderCreateGoalPopup && (
        <CreateGoalModal
          visible={renderCreateGoalPopup}
          setModalRender={setRenderCreateGoalPopup}
          onCloseCallback={onCreateGoal}
        />
      )}
      <View style={styles.heading}>
        <Text style={styles.title}>My Goals</Text>
        <Pressable
          style={styles.headingButton}
          onPress={() => setRenderCreateGoalPopup(true)}
        >
          <Text style={styles.headingButtonText}>Create Goal</Text>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={COLORS.background}
          />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>In Progress</Text>
      <View style={styles.inProgressGoals}>
        <FlatList
          style={styles.list}
          data={inProgressGoals}
          renderItem={({ item }) => <GoalCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.subtitle}>Completed</Text>
      <View style={styles.inProgressGoals}>
        <FlatList
          style={styles.list}
          data={completedGoals}
          renderItem={({ item }) => <GoalCard item={item} />}
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
    height: "50%",
  },
  completedGoals: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    height: "50%",
  },
  list: {
    width: "100%",
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
