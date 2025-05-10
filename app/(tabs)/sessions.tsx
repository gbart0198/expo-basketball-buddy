import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  createShadow,
} from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Shot from "@/models/Shot";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSessionService } from "@/hooks/useSessionService";
import { useEffect } from "react";

export default function SessionView() {
  const { sessionData, getSessions, isLoading } = useSessionService();

  useEffect(() => {
    getSessions();
  }, []);

  const getMakes = (shots: Shot[]) => {
    if (!shots.length) return 0;
    return shots.filter((shot) => shot.made).length;
  };
  const getMisses = (shots: Shot[]) => {
    if (!shots.length) return 0;
    return shots.filter((shot) => !shot.made).length;
  };
  const getPercentage = (shots: Shot[]) => {
    if (!shots.length) return 0;
    const madeShots = shots.filter((shot) => shot.made).length;
    return Math.round((madeShots / shots.length) * 100);
  };

  return (
    <PaddedSafeAreaView>
      <Text style={styles.title}>My Sessions</Text>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <FlatList
          data={sessionData}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionName}>{item.name}</Text>
                <Text style={styles.sessionDate}>{item.date}</Text>
                <View
                  style={[
                    styles.percentageBadge,
                    {
                      backgroundColor:
                        getPercentage(item.shots) >= 75
                          ? COLORS.success
                          : COLORS.primaryAccent,
                    },
                  ]}
                >
                  <Text style={styles.percentageText}>
                    {getPercentage(item.shots)}%
                  </Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{item.shots.length}</Text>
                  <Text style={styles.statLabel}>Total Shots</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{getMakes(item.shots)}</Text>
                  <Text style={styles.statLabel}>Made</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{getMisses(item.shots)}</Text>
                  <Text style={styles.statLabel}>Missed</Text>
                </View>
              </View>

              <View style={styles.sessionFooter}>
                <TouchableOpacity style={styles.footerButton}>
                  <Ionicons
                    name="analytics-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.buttonText}>Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                  <Ionicons
                    name="share-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                  <Ionicons
                    name="open-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.buttonText}>Open</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
    fontSize: FONT_SIZE.lg,
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
