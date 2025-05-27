import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Text,
    StatusBar,
    Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import BasketballCourt from "@/components/BasketballCourt";
import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZE,
    createShadow,
} from "@/theme";
import { useDatabase } from "@/context/database-context";

export default function ShotTrackerView() {
    const { selectedSession } =
        useDatabase();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { timerValue, edit } = params;
    const insets = useSafeAreaInsets();
    const [isDesktop, setIsDesktop] = useState(false);
    const [editMode, setEditMode] = useState(edit === "true");
    const [dimensions, setDimensions] = useState({
        window: Dimensions.get("window"),
    });

    if (!selectedSession) {
        alert("error: No session found");
        router.back();
        return null;
    }

    const activateEditMode = () => {
        Alert.alert(
            "Confirm Edit Mode",
            "Would you like to enter edit mode for this session?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Enter Edit Mode",
                    onPress: () => {
                        setEditMode(true);
                        console.log("Edit mode is now: ", editMode);
                    }
                },
            ])
    }


    let madeShots = 0;
    let attemptedShots = 0;
    selectedSession.shots?.map((shot) => {
        madeShots += shot.makes;
        attemptedShots += shot.attempts;
    });
    const shootingPercentage =
        attemptedShots === 0 ? 0 : Math.round((madeShots / attemptedShots) * 100);

    useEffect(() => {
        setIsDesktop(Platform.OS === "web" && dimensions.window.width > 768);

        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions({ window });
            setIsDesktop(Platform.OS === "web" && window.width > 768);
        });

        return () => subscription?.remove();
    }, [dimensions.window]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>

                <View style={styles.statsPill}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Made</Text>
                        <Text style={styles.statValue}>{madeShots}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Attempts</Text>
                        <Text style={styles.statValue}>{attemptedShots}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Pct</Text>
                        <Text
                            style={[
                                styles.statValue,
                                {
                                    color:
                                        shootingPercentage >= 70
                                            ? COLORS.success
                                            : shootingPercentage >= 50
                                                ? COLORS.primaryAccent
                                                : COLORS.error,
                                },
                            ]}
                        >
                            {shootingPercentage}%
                        </Text>
                    </View>
                </View>

                {editMode && (
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.log("TODO: Undo Last Shot")}>
                        <Ionicons name="arrow-undo" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                ) || (
                        <TouchableOpacity style={styles.iconButton} onPress={activateEditMode}>
                            <Ionicons name="create-outline" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    )}
            </View>

            <View style={styles.content}>
                <View style={styles.courtContainer}>
                    <BasketballCourt
                        isDesktop={isDesktop}
                        shots={selectedSession.shots || []}
                        edit={editMode}
                    />
                </View>
            </View>

            <View
                style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
            >
                {editMode && (
                    <TouchableOpacity
                        style={[styles.actionButton, styles.endButton]}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="exit-outline" size={20} color={COLORS.textPrimary} />
                        <Text style={styles.actionText}>End Session</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
        zIndex: 10,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70, // Space for the bottom bar
    },
    courtContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.round,
        backgroundColor: COLORS.cardBackground,
        justifyContent: "center",
        alignItems: "center",
        ...createShadow(2),
    },
    statsPill: {
        flexDirection: "row",
        backgroundColor: COLORS.cardBackground,
        borderRadius: BORDER_RADIUS.lg,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        ...createShadow(2),
    },
    stat: {
        alignItems: "center",
        paddingHorizontal: SPACING.sm,
    },
    statValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        color: COLORS.textPrimary,
    },
    statLabel: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    statDivider: {
        width: 1,
        height: "80%",
        backgroundColor: COLORS.borderColor,
    },
    saveButton: {
        position: "absolute",
        bottom: 90,
        right: SPACING.lg,
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.round,
        backgroundColor: COLORS.primaryAccent,
        justifyContent: "center",
        alignItems: "center",
        ...createShadow(4),
        zIndex: 10,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        backgroundColor: COLORS.cardBackground,
        borderTopLeftRadius: BORDER_RADIUS.lg,
        borderTopRightRadius: BORDER_RADIUS.lg,
        ...createShadow(3),
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.success,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        ...createShadow(2),
    },
    endButton: {
        backgroundColor: COLORS.secondaryAccent,
    },
    actionText: {
        marginLeft: SPACING.xs,
        color: COLORS.textPrimary,
        fontWeight: 500,
    },
});
