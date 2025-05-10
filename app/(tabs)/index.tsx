import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZE,
    createShadow,
} from "@/theme";
import { useState } from "react";
import CreateSessionModal from "@/components/CreateSessionModal";

export default function HomeView() {
    const router = useRouter();
    const [renderSessionPopup, setRenderSessionPopup] = useState(false);
    const onSessionCreate = (sessionName: string, useTimer: boolean, timerValue?: number) => {
        alert(`creation of session ${sessionName} with timer ${useTimer} and value ${timerValue}`);
        console.log('test');
    }

    return (
        <PaddedSafeAreaView>
            {renderSessionPopup && <CreateSessionModal
                visible={renderSessionPopup}
                setModalRender={setRenderSessionPopup}
                onCloseCallback={onSessionCreate}
            />}
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.heading}>Recent Sessions</Text>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemDate}>{item.date}</Text>
                        <View style={styles.listItemContent}>
                            <Text style={styles.listItemShots}>
                                {item.makes} / {item.shots}
                            </Text>
                            <Text style={styles.listItemPercentage}>
                                {Math.round((item.makes / item.shots) * 100)}%
                            </Text>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1,
                            backgroundColor: COLORS.borderColor,
                            marginHorizontal: SPACING.md,
                        }}
                    />
                )}
            />
            <Text style={styles.heading}>My Goal</Text>
            <View style={styles.goalContainer}>
                <Ionicons name="flag" size={28} color={COLORS.primaryAccent} />
                <View style={styles.goalContent}>
                    <Text style={styles.goalText}>Make 200 shots this week</Text>
                    <ProgressBar progress={0.25} color={COLORS.primaryAccent} />
                    <Text style={styles.progressText}>50/200</Text>
                </View>
            </View>
            <Pressable
                style={styles.startButton}
                onPress={() => setRenderSessionPopup(true)}
            >
                <Text style={styles.buttonText}>Start Shooting</Text>
            </Pressable>
        </PaddedSafeAreaView>
    );
}

const data = [
    { shots: 75, makes: 56, date: "Today" },
    { shots: 50, makes: 40, date: "Apr 23" },
    { shots: 100, makes: 80, date: "Apr 22" },
];

const styles = StyleSheet.create({
    title: {
        fontSize: FONT_SIZE.xxxl,
        fontWeight: 700,
        color: COLORS.textPrimary,
        paddingVertical: SPACING.lg,
    },
    heading: {
        fontSize: FONT_SIZE.xl,
        fontWeight: 700,
        color: COLORS.textPrimary,
        paddingVertical: SPACING.md,
    },
    listItem: {
        padding: SPACING.md,
        margin: SPACING.xs,
        color: COLORS.textPrimary,
        flexDirection: "row",
        alignItems: "center",
    },
    listItemShots: {
        fontSize: FONT_SIZE.xl,
        color: COLORS.textPrimary,
    },
    listItemDate: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
        width: 70,
    },
    listItemPercentage: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primaryAccent,
        marginLeft: "auto",
        fontWeight: 700,
    },
    listItemContent: {
        flexDirection: "column",
        alignItems: "flex-end",
        flex: 1,
    },
    list: {
        backgroundColor: COLORS.cardBackground,
        margin: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        ...createShadow(3),
    },
    goalContainer: {
        backgroundColor: COLORS.cardBackground,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        margin: SPACING.md,
        flexDirection: "row",
        alignItems: "center",
        ...createShadow(3),
    },
    goalText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    goalContent: {
        flex: 1,
        flexDirection: "column",
        marginLeft: SPACING.md,
    },
    startButton: {
        backgroundColor: COLORS.primaryAccent,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        margin: SPACING.md,
        ...createShadow(4),
    },
    buttonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        color: COLORS.textPrimary,
        textAlign: "center",
    },
    progressText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        textAlign: "right",
        marginTop: SPACING.xs,
    },
});
