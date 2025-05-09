import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZE,
    createShadow,
} from "@/theme";

interface SessionProps {
    madeShots: number;
    attemptedShots: number;
    shootingPercentage: number;
    loadSessionCallback: any;
}

const SessionHeader = ({
    madeShots,
    attemptedShots,
    shootingPercentage,
    loadSessionCallback,
}: SessionProps) => {
    const router = useRouter();
    return (
        <View style={styles.sessionContainer}>
            <View style={styles.sessionHeaderContent}>
                <Text style={styles.sessionHeading}>SESSION STATS</Text>
                <Pressable style={styles.sessionImport} onPress={loadSessionCallback}>
                    <Text style={styles.buttonText}>Import</Text>
                </Pressable>
                <Pressable style={styles.sessionClose} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Cancel Session</Text>
                </Pressable>
            </View>
            <View style={styles.sessionContent}>
                <View style={styles.sessionStatBox}>
                    <Text style={styles.sessionSubheading}>Made</Text>
                    <Text style={styles.sessionText}>{madeShots}</Text>
                </View>
                <View style={styles.sessionStatBox}>
                    <Text style={styles.sessionSubheading}>Attempted</Text>
                    <Text style={styles.sessionText}>{attemptedShots}</Text>
                </View>
                <View style={styles.sessionStatBox}>
                    <Text style={styles.sessionSubheading}>Shooting Percentage</Text>
                    <Text style={styles.sessionText}>{shootingPercentage}%</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sessionContainer: {
        flexDirection: "column",
        backgroundColor: COLORS.cardBackground,
        borderRadius: BORDER_RADIUS.md,
        ...createShadow(3),
        margin: SPACING.md,
    },
    sessionHeading: {
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        color: COLORS.textPrimary,
        alignSelf: "flex-start",
    },
    sessionContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: SPACING.md,
    },
    sessionSubheading: {
        fontSize: FONT_SIZE.md,
        fontWeight: 600,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    sessionText: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: 700,
        color: COLORS.textPrimary,
    },
    sessionHeaderContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: SPACING.md,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
    },
    sessionStatBox: {
        flexDirection: "column",
        alignItems: "center",
        padding: SPACING.sm,
    },
    mobileSessionContainer: {
        marginVertical: SPACING.sm,
        marginHorizontal: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xs,
    },
    sessionClose: {
        backgroundColor: COLORS.error,
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        alignItems: "center",
        ...createShadow(2),
    },
    sessionImport: {
        backgroundColor: COLORS.success,
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        alignItems: "center",
        marginRight: SPACING.md,
        ...createShadow(2),
    },
    buttonText: {
        color: COLORS.textPrimary,
        fontWeight: 600,
    },
});

export default SessionHeader;
