import Shot from "@/models/Shot"
import { COLORS, createShadow } from "@/theme"
import { Pressable, StyleSheet, View } from "react-native"

const ShotMarker = ({ shot }: { key: number, shot: Shot }) => {
    const handleShotPress = () => {
        alert(`Shot pressed: ${shot.made ? "Made" : "Missed"}`)
    }

    return (
        <View style={[
            styles.shotMarker,
            {
                left: shot.x,
                top: shot.y,
                backgroundColor: shot.made ? COLORS.success : COLORS.error,
            }
        ]} />
    )
}

const styles = StyleSheet.create({
    shotMarker: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.textPrimary,
        ...createShadow(2),
    },
})

export default ShotMarker
