import { COLORS, createShadow } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ShotSummary } from "@/db";
import { useDatabase } from "@/context/database-context";

const SHOT_BASE_SIZE = 15;

const ShotMarker = ({
    shot,
    courtWidth,
    courtHeight,
    edit = true
}: {
    shot: ShotSummary;
    courtWidth: number;
    courtHeight: number;
    edit: boolean;
}) => {
    const [renderShotPopup, setRenderShotPopup] = useState(false);
    const { removeShotSummary } = useDatabase();
    const handleShotPress = () => {
        setRenderShotPopup(!renderShotPopup);
    };
    const shotPercentage = Math.round((shot.makes / shot.attempts) * 100);

    const shotDimensions = {
        left: courtWidth * shot.x,
        top: courtHeight * shot.y,
    };

    const shotScale = shot.attempts > 1 ? 2 : 1;


    console.log("Edit mode in ShotMarker:", edit);

    return (
        <Pressable
            onPress={handleShotPress}
            style={{
                position: "absolute",
                left: shotDimensions.left,
                top: shotDimensions.top,
            }}
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
                    {edit ? (
                        <Pressable
                            onPress={(e) => {
                                e.stopPropagation();
                                removeShotSummary(shot.id);
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

                    ) : (
                        <View style={styles.shotMarkerInfo}>
                            <Text style={{ color: COLORS.textPrimary }}>
                                {shot.attempts} Attempts
                            </Text>
                            <Text style={{ color: COLORS.textPrimary }}>
                                {shot.makes} Makes
                            </Text>
                            <Text style={{ color: COLORS.textPrimary }}>
                                {shotPercentage}% Success Rate
                            </Text>
                        </View>
                    )}
                </View>
            )}
            <View
                style={[
                    styles.shotMarker,
                    {
                        backgroundColor:
                            shotPercentage >= 70
                                ? COLORS.success
                                : shotPercentage >= 50
                                    ? COLORS.warning
                                    : COLORS.error,
                    },
                    {
                        width: SHOT_BASE_SIZE * shotScale,
                        height: SHOT_BASE_SIZE * shotScale,
                        left: -(SHOT_BASE_SIZE * shotScale) / 2,
                        top: -(SHOT_BASE_SIZE * shotScale) / 2,
                        borderRadius: (SHOT_BASE_SIZE * shotScale) / 2,
                    }
                ]}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    shotMarker: {
        position: "absolute",
        borderWidth: 2,
        borderColor: COLORS.textPrimary,
        ...createShadow(2),
    },
    multipleShotMarker: { // make it 
        position: "absolute",
        width: 30,
        height: 30,
        borderRadius: 15,
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
    shotMarkerInfo: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.textSecondary,
        borderRadius: 10,
    }
});

export default ShotMarker;
