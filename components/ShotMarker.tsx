import Shot from "@/models/Shot";
import { COLORS, createShadow } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useSessionStore } from "@/hooks/useSessionStore";
import { Ionicons } from "@expo/vector-icons";

const ShotMarker = ({ shot }: { shot: Shot }) => {
    const [renderShotPopup, setRenderShotPopup] = useState(false);
    const { removeShot, editShot } = useSessionStore();
    const handleShotPress = () => {
        setRenderShotPopup(!renderShotPopup);
    };
    return (
        <Pressable
            onPress={handleShotPress}
            style={{ position: "absolute", left: shot.x, top: shot.y }}
        >
            {renderShotPopup && (
                <View
                    style={[
                        styles.shotMarkerInfoContainer,
                        {
                            left: -10,
                            top: -40,
                        },
                    ]}
                >
                    <Pressable
                        onPress={(e) => {
                            e.stopPropagation();
                            removeShot(shot);
                            setRenderShotPopup(false);
                        }}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={16}
                            color={COLORS.textPrimary}
                            style={{
                                backgroundColor: COLORS.error,
                                borderRadius: 5000,
                                padding: 5,
                            }}
                        />
                    </Pressable>
                </View>
            )}
            <View
                style={[
                    styles.shotMarker,
                    {
                        backgroundColor: shot.made ? COLORS.success : COLORS.error,
                    },
                ]}
            />
        </Pressable>
    );
};

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
    shotMarkerInfoContainer: {
        flexDirection: "row",
        backgroundColor: "none",
        padding: 10,
        borderRadius: 10,
        zIndex: 10,
    },
    shotMarkerButton: {
        padding: 10,
        borderRadius: 100,
        marginRight: 5,
    },
    shotMarkerEditButton: {
        backgroundColor: COLORS.primaryAccent,
    },
    shotMarkerDeleteButton: {
        backgroundColor: COLORS.error,
    },
});

export default ShotMarker;
