import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { FlatList, StyleSheet, Text } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  createShadow,
} from "@/theme";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "expo-router";
import { SessionWithShots, useDatabase } from "@/context/database-context";
import { SessionCard } from "@/components/SessionCard";

export default function SessionView() {
  const router = useRouter();
  const { sessionsList, setSelectedSession, isLoading } = useDatabase();

  const handleOpenSession = (session: SessionWithShots, isEdit: boolean) => {
    const params = {
      timerValue: undefined,
      edit: String(isEdit),
    };
    setSelectedSession(session);
    router.push({
      pathname: "/(tracker)/tracker",
      params,
    });
  };

  return (
    <PaddedSafeAreaView>
      <Text style={styles.title}>My Sessions</Text>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <FlatList
          data={sessionsList.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )}
          renderItem={({ item }) => (
            <SessionCard item={item} handleOpenSession={handleOpenSession} />
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </PaddedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 700,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  listContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sessionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    ...createShadow(3),
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  sessionDate: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 600,
    color: COLORS.textPrimary,
  },
  sessionName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 600,
    color: COLORS.textPrimary,
  },
  percentageBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  percentageText: {
    color: COLORS.textPrimary,
    fontWeight: 700,
    fontSize: FONT_SIZE.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 700,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  sessionFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    paddingTop: SPACING.sm,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  buttonText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
});
