import { COLORS, createShadow } from "@/theme";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
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

    const onModalClose = () => {
        setRenderShotPopup(false);
    }

    const shotScale = shot.attempts > 1 ? 2 : 1;


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
                <Modal
                    visible={renderShotPopup}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={onModalClose}
                >
                    <Pressable style={styles.overlay} onPress={onModalClose}>
                        <View style={styles.centeredView}>
                            <Pressable onPress={(e) => e.stopPropagation()}>
                                <View style={styles.modalContent}>
                                    <View style={styles.form}>
                                        <View style={styles.inputGroup}>
                                            <View style={styles.shotMarkerButton}>
                                                <Text style={{ color: COLORS.textPrimary }}>
                                                    {shot.attempts} Attempts
                                                </Text>
                                            </View>
                                            <View style={styles.shotMarkerButton}>
                                                <Text style={{ color: COLORS.textPrimary }}>
                                                    {shot.makes} Makes
                                                </Text>
                                            </View>
                                            <View style={styles.shotMarkerButton}>
                                                <Text style={{ color: COLORS.textPrimary }}>
                                                    {shotPercentage}% Accuracy
                                                </Text>
                                            </View>
                                        </View>
                                        {edit && (
                                            <View style={styles.inputGroup}>
                                                <Pressable style={styles.shotMarkerEditButton} onPress={() => alert("Edit shot feature is not implemented yet.")}>
                                                    <Text style={{ color: COLORS.textPrimary }}>Edit Shot</Text>
                                                </Pressable>
                                                <Pressable style={styles.shotMarkerDeleteButton} onPress={() => alert("Delete shot feature is not implemented yet.")}>
                                                    <Text style={{ color: COLORS.textPrimary }}>Delete Shot</Text>
                                                </Pressable>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
                </Modal>
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
    shotMarkerButton: {
        padding: 10,
        borderRadius: 100,
        marginRight: 5,
    },
    shotMarkerEditButton: {
        backgroundColor: COLORS.primaryAccent,
        padding: 10,
        borderRadius: 100,
        marginRight: 5,
    },
    shotMarkerDeleteButton: {
        backgroundColor: COLORS.error,
        padding: 10,
        borderRadius: 100,
        marginRight: 5,
    },
    shotMarkerInfo: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.textSecondary,
        borderRadius: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        width: '80%',
        maxWidth: 400,
    },
    modalContent: {
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: 8,
        shadowColor: COLORS.borderColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primaryAccent,
    },
    form: {

    },
    closeButton: {
        padding: 8,
    },
    inputGroup: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timerGroup: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    startButton: {
        backgroundColor: COLORS.primaryAccent,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        color: COLORS.textPrimary,
    }
});

export default ShotMarker;
