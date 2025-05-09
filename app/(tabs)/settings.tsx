import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { Text, StyleSheet, View, Switch, ScrollView } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  createShadow,
} from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SettingsView() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [shotData, setShotData] = useState(true);

  return (
    <PaddedSafeAreaView>
      <Text style={styles.title}>Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>App Preferences</Text>

          <View style={styles.settingCard}>
            <SettingItem
              icon="moon-outline"
              title="Dark Mode"
              description="Use dark theme throughout the app"
              isSwitch={true}
              value={darkMode}
              onValueChange={setDarkMode}
            />

            <View style={styles.divider} />

            <SettingItem
              icon="notifications-outline"
              title="Push Notifications"
              description="Get updates on your progress and goals"
              isSwitch={true}
              value={notifications}
              onValueChange={setNotifications}
            />

            <View style={styles.divider} />

            <SettingItem
              icon="cloud-upload-outline"
              title="Auto-save Shot Data"
              description="Save your session data automatically"
              isSwitch={true}
              value={shotData}
              onValueChange={setShotData}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Account</Text>

          <View style={styles.settingCard}>
            <SettingItem
              icon="person-outline"
              title="Profile"
              description="Update your personal information"
              isSwitch={false}
            />

            <View style={styles.divider} />

            <SettingItem
              icon="stats-chart-outline"
              title="Statistics"
              description="Detailed shooting analytics"
              isSwitch={false}
            />

            <View style={styles.divider} />

            <SettingItem
              icon="trash-outline"
              title="Clear All Data"
              description="Delete all your session history"
              isSwitch={false}
              destructive={true}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>About</Text>

          <View style={styles.settingCard}>
            <SettingItem
              icon="information-circle-outline"
              title="App Info"
              description="Version 1.0.0"
              isSwitch={false}
            />

            <View style={styles.divider} />

            <SettingItem
              icon="help-circle-outline"
              title="Help & Support"
              description="Contact us for assistance"
              isSwitch={false}
            />
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

const SettingItem = ({
  icon,
  title,
  description,
  isSwitch,
  value,
  onValueChange,
  destructive = false,
}: SettingItemProps) => {
  return (
    <View style={styles.settingItem}>
      <View
        style={[
          styles.iconContainer,
          destructive && { backgroundColor: COLORS.error },
        ]}
      >
        <Ionicons
          name={icon as any}
          size={22}
          color={destructive ? COLORS.textPrimary : COLORS.primaryAccent}
        />
      </View>

      <View style={styles.settingContent}>
        <Text
          style={[styles.settingTitle, destructive && { color: COLORS.error }]}
        >
          {title}
        </Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.borderColor, true: COLORS.primaryAccent }}
          thumbColor={COLORS.textPrimary}
        />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.textSecondary}
        />
      )}
    </View>
  );
};

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
