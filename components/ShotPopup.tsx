import { View, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Shot from "@/models/Shot"
import { COLORS, BORDER_RADIUS, SPACING, createShadow } from "@/theme"

const ShotPopup = ({ shot, handleShotMake, handleShotMiss }: { shot: Shot, handleShotMake: any, handleShotMiss: any }) => {
    return (<View
        style={[
            styles.popup,
            {
                left: shot.x,
                top: shot.y,
            },
        ]}
    >
        <Pressable 
            style={styles.button} 
            onPress={handleShotMake}
        >
            <Ionicons name="checkmark-circle" size={32} color={COLORS.success} />
        </Pressable>
        <Pressable 
            style={styles.button} 
            onPress={handleShotMiss}
        >
            <Ionicons name="close-circle" size={32} color={COLORS.error} />
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    popup: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        backgroundColor: COLORS.cardBackground,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        zIndex: 10,
        width: 120,
        marginLeft: -60,
        marginTop: 10,
        ...createShadow(5),
    },
    button: {
        padding: SPACING.xs,
        borderRadius: BORDER_RADIUS.round,
        margin: SPACING.xs,
    },
})

export default ShotPopup;
