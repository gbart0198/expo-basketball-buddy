import { View, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Shot from "@/models/Shot"

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
        <Pressable onPress={handleShotMake}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
        </Pressable>
        <Pressable onPress={handleShotMiss}>
            <Ionicons name="close-circle" size={24} color="red" />
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    popup: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 8,
        borderRadius: 5,
        zIndex: 1,
    },
})

export default ShotPopup;
