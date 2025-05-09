import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZE,
    createShadow,
} from "@/theme";

const SessionActions = ({ onSave }: { onSave: any }) => {
    const router = useRouter();
    return (
        <View style={styles.buttonsContainer}>
            <Pressable style={styles.saveButton} onPress={onSave}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.endButton} onPress={() => router.back()}>
                <Text style={styles.buttonText}>End Session</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: COLORS.secondaryAccent,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        width: "48%",
        alignItems: "center",
        ...createShadow(3),
    },
    endButton: {
        backgroundColor: COLORS.primaryAccent,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        width: "48%",
        alignItems: "center",
        ...createShadow(3),
    },
    buttonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        color: COLORS.textPrimary,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: SPACING.lg,
        marginHorizontal: SPACING.md,
        padding: SPACING.sm,
    },
});

export default SessionActions;
