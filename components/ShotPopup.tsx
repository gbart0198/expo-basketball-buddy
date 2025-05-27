import { View, Pressable, StyleSheet, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, BORDER_RADIUS, SPACING, createShadow } from "@/theme";
import { useState } from "react";
import { CreateShotSummary, ShotSummary } from "@/db";

const ShotPopup = ({
    shot,
    handleShots,
    isMultiple,
    courtWidth,
    courtHeight,
}: {
    shot: ShotSummary | CreateShotSummary;
    handleShots: any;
    isMultiple: boolean;
    courtWidth: number;
    courtHeight: number;
}) => {
    const [shotAttempts, setShotAttempts] = useState("");
    const [shotMakes, setShotMakes] = useState("");
    const handleSingleShot = (isMake: boolean) => {
        handleShots(1, isMake ? 1 : 0);
    };
    const handleMultipleShots = () => {
        const attemptsNum = parseInt(shotAttempts);
        const makesNum = parseInt(shotMakes);
        handleShots(attemptsNum, makesNum);
    };
    const shotDimensions = {
        left: courtWidth * shot.x,
        top: courtHeight * shot.y,
    };
    return (
        <>
            {isMultiple && (
                <View
                    style={{
                        position: "absolute",
                        top: shotDimensions.top - 30,
                        left: shotDimensions.left - 60,
                        backgroundColor: COLORS.cardBackground,
                        padding: SPACING.sm,
                        borderRadius: BORDER_RADIUS.lg,
                        zIndex: 10,
                        ...createShadow(5),
                    }}
                >
                    <View style={styles.multipleShotContainer}>
                        <TextInput
                            style={styles.input}
                            value={shotAttempts}
                            onChangeText={setShotAttempts}
                            placeholder="Attempts"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.textSecondary}
                        />
                        <TextInput
                            style={styles.input}
                            value={shotMakes}
                            onChangeText={setShotMakes}
                            placeholder="Makes"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.textSecondary}
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => handleMultipleShots()}
                        >
                            <Text style={{ color: COLORS.success }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            {!isMultiple && (
                <View
                    style={[
                        styles.popup,
                        {
                            left: shotDimensions.left,
                            top: shotDimensions.top,
                        },
                    ]}
                >
                    <Pressable
                        style={styles.button}
                        onPress={() => handleSingleShot(true)}
                    >
                        <Ionicons
                            name="checkmark-circle"
                            size={32}
                            color={COLORS.success}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => handleSingleShot(false)}
                    >
                        <Ionicons name="close-circle" size={32} color={COLORS.error} />
                    </Pressable>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    popup: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        backgroundColor: COLORS.cardBackground,
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        zIndex: 10,
        width: "auto",
        marginLeft: -60,
        marginTop: 5,
        ...createShadow(5),
    },
    button: {
        padding: SPACING.xs,
        borderRadius: BORDER_RADIUS.round,
        margin: SPACING.xs,
    },
    multipleShotContainer: {
        alignItems: "center",
    },
    input: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: SPACING.xs,
        margin: SPACING.xs,
        backgroundColor: COLORS.cardBackground,
        color: "white",
    },
});

export default ShotPopup;
