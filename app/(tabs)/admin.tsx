import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  createShadow,
} from "@/theme";
import { useDatabase } from "@/context/database-context";

export default function AdminView() {
  const { removeAllSessions, removeAllGoals, removeAllShots } = useDatabase();
  const confirmDeleteSessions = () => {
    Alert.alert(
      "Delete All Sessions",
      "Are you sure you want to delete all sessions? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await removeAllSessions();
            console.log("All sessions deleted");
          },
        },
      ],
    );
  };

  const confirmDeleteGoals = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await removeAllGoals();
            console.log("All goals deleted");
          },
        },
      ],
    );
  };

  const confirmDeleteShots = () => {
    Alert.alert(
      "Delete All Shots",
      "Are you sure you want to delete all shots? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await removeAllShots();
            console.log("All shots deleted");
          },
        },
      ],
    );
  };

  return (
    <PaddedSafeAreaView>
      <Text style={styles.title}>Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Database</Text>

          <View style={styles.settingCard}>
            <Pressable
              style={styles.settingItem}
              onPress={() => confirmDeleteSessions()}
            >
              <Text style={styles.settingTitle}>Sync Database</Text>
            </Pressable>
          </View>
          <View style={styles.settingCard}>
            <Pressable
              style={styles.settingItem}
              onPress={() => confirmDeleteGoals()}
            >
              <Text style={styles.settingTitle}>Delete All Goals</Text>
            </Pressable>
          </View>
          <View style={styles.settingCard}>
            <Pressable
              style={styles.settingItem}
              onPress={() => confirmDeleteShots()}
            >
              <Text style={styles.settingTitle}>Delete All Shots</Text>
            </Pressable>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Idk</Text>
          </View>
        </View>
      </ScrollView>
    </PaddedSafeAreaView>
  );
}

interface SettingItemProps {
  icon: string;
  title: string;
  description: string;
  isSwitch: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  destructive?: boolean;
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
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    fontSize: FONT_SIZE.md,
    fontWeight: 600,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  settingCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.md,
    ...createShadow(2),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: `${COLORS.primaryAccent}20`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 600,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginHorizontal: SPACING.md,
  },
});
