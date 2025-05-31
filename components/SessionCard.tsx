import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShotSummary } from "@/db";
import {
  COLORS,
  FONT_SIZE,
  SPACING,
  BORDER_RADIUS,
  createShadow,
} from "@/theme";
import { useDatabase } from "@/context/database-context";

export const SessionCard = ({
  item,
  handleOpenSession,
}: {
  item: any;
  handleOpenSession: any;
}) => {
  const { removeSession } = useDatabase();
  const renderDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-US", options);
      console.log(`Original date: ${date}, Formatted date: ${formattedDate}`);
      return formattedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  };

  const getMakes = (shots: ShotSummary[] | undefined) => {
    if (!shots || !shots.length) return 0;
    let madeShots = 0;
    shots.map((shot) => {
      madeShots += shot.makes;
    });
    return madeShots;
  };
  const getAttempts = (shots: ShotSummary[] | undefined) => {
    if (!shots || !shots.length) return 0;
    let attemptedShots = 0;
    shots.map((shot) => {
      attemptedShots += shot.attempts;
    });
    return attemptedShots;
  };
  const getPercentage = (shots: ShotSummary[] | undefined) => {
    if (!shots || !shots.length) return 0;
    let attemptedShots = 0;
    let madeShots = 0;
    shots.map((shot) => {
      madeShots += shot.makes;
      attemptedShots += shot.attempts;
    });
    return Math.round((madeShots / attemptedShots) * 100);
  };

  const handleRemoveSession = () => {
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this session? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            removeSession(item.id);
            alert("Session removed successfully.");
          },
        },
      ],
    );
  };
  const getBackgroundColor = (percentage: number) => {
    if (percentage >= 75) {
      return "rgba(0, 255, 0, 0.2)";
    } else if (percentage >= 50) {
      return "rgba(255, 165, 0, 0.2)";
    } else {
      return "rgba(255, 0, 0, 0.2)";
    }
  };
  return (
    <TouchableOpacity style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionName}>{item.name}</Text>
        <Text style={styles.sessionDate}>{renderDate(item.date)}</Text>
        <Pressable onPress={() => handleRemoveSession()}>
          <Ionicons name="remove-circle" size={16} color={COLORS.error} />
        </Pressable>
      </View>
      <View
        style={[
          styles.statsContainer,
          {
            backgroundColor: getBackgroundColor(getPercentage(item.shots)),
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{getAttempts(item.shots)}</Text>
          <Text style={styles.statLabel}>Total Shots</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{getMakes(item.shots)}</Text>
          <Text style={styles.statLabel}>Made</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {getAttempts(item.shots) - getMakes(item.shots)}
          </Text>
          <Text style={styles.statLabel}>Missed</Text>
        </View>
      </View>

      <View style={styles.sessionFooter}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleOpenSession(item, false)}
        >
          <Ionicons
            name="open-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleOpenSession(item, true)}
        >
          <Ionicons
            name="create-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  percentageText: {
    color: COLORS.textPrimary,
    fontWeight: 700,
    fontSize: FONT_SIZE.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
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
