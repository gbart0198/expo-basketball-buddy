import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
} from "react-native";
import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZE,
    createShadow,
} from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { SessionWithShots, useDatabase } from "@/context/database-context";
import { ShotSummary } from "@/db";

export default function SessionView() {
    const router = useRouter();
    const { sessionsList, setSelectedSession, isLoading, addSession, removeSession, addShotSummary } =
        useDatabase();

    const handleOpenSession = (session: SessionWithShots) => {
        const params = {
            timerValue: undefined,
        };
        setSelectedSession(session);
        router.push({
            pathname: "/(tracker)/tracker",
            params,
        });
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

    const renderDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        const formattedDate = new Date(date).toLocaleDateString("en-US", options);
        return formattedDate;
    }

    const addShotToSession = (session: SessionWithShots) => {
        if (!session.id) return;
        setSelectedSession(session);
        addShotSummary({
            sessionId: session.id,
            x: 0.5,
            y: 0.5,
            attempts: 10,
            makes: 5,
            lastShotAt: new Date().toISOString(),
        })
    }

    return (
        <PaddedSafeAreaView>
            <Text style={styles.title}>My Sessions</Text>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <FlatList
                    data={sessionsList}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.sessionCard}>
                            <View style={styles.sessionHeader}>
                                <Text style={styles.sessionName}>{item.name}</Text>
                                <Text style={styles.sessionDate}>{renderDate(item.date)}</Text>
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
                                    <Text style={styles.statValue}>
                                        {getAttempts(item.shots)}
                                    </Text>
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
                                <TouchableOpacity style={styles.footerButton}
                                    onPress={() => addShotToSession(item)}>
                                    <Ionicons
                                        name="add-outline"
                                        size={16}
                                        color={COLORS.textSecondary}
                                    />
                                    <Text style={styles.buttonText}>Add</Text>
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
                                    onPress={() => handleOpenSession(item)}
                                >
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
