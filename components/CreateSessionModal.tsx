import { Text, View, Pressable, StyleSheet, Switch, TextInput, Modal } from "react-native";
import { COLORS } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const CreateSessionModal = ({ visible, onClose }: { visible: boolean, onClose: any }) => {
    const [useTimer, setUseTimer] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const [timerDuration, setTimerDuration] = useState('');

    const isNameValid = sessionName.trim() !== '';
    const isTimerValid = () => {
        if (useTimer) {
            const duration = Number(timerDuration);
            return !isNaN(duration) && duration > 0 && duration <= 60;
        }
        return true;
    }

    const isSessionValid = isNameValid && isTimerValid();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.centeredView}>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalContent}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Create a New Session</Text>
                                <Pressable style={styles.closeButton} onPress={onClose}>
                                    <Ionicons name="close" size={24} color={COLORS.borderColor} />
                                </Pressable>
                            </View>
                            <View style={styles.form}>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter session name"
                                        placeholderTextColor={COLORS.textSecondary}
                                        value={sessionName}
                                        onChangeText={setSessionName}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <View style={styles.timerGroup}>
                                        <Text style={styles.label}>Use Timer</Text>
                                        <Switch
                                            value={useTimer}
                                            onValueChange={setUseTimer}
                                            trackColor={{ false: COLORS.borderColor, true: COLORS.primaryAccent }}
                                            thumbColor={useTimer ? "white" : COLORS.borderColor}
                                        />
                                    </View>
                                </View>
                                {useTimer && <View style={styles.inputGroup}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter duration in minutes (max 60)"
                                        placeholderTextColor={COLORS.textSecondary}
                                        keyboardType="numeric"
                                        value={timerDuration}
                                        onChangeText={setTimerDuration}
                                    />
                                </View>}
                                <View style={styles.inputGroup}>
                                    <Pressable
                                        style={[styles.input, styles.startButton, { backgroundColor: isSessionValid ? COLORS.primaryAccent : COLORS.borderColor }]}
                                        disabled={!isSessionValid}
                                        onPress={() => {
                                            onClose();
                                        }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 16 }}>Create Session</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
})

export default CreateSessionModal;
