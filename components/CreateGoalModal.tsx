import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  COMMON_STYLES,
} from "@/theme";
import { CreateGoal } from "@/db";

import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RadioOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 6,
    }}
  >
    <View
      style={{
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: selected ? COLORS.primaryAccent : COLORS.borderColor,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.sm,
      }}
    >
      {selected && (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: COLORS.primaryAccent,
          }}
        />
      )}
    </View>
    <Text
      style={{
        color: COLORS.textPrimary,
        fontSize: FONT_SIZE.md,
      }}
    >
      {label}
    </Text>
  </Pressable>
);

export const CreateGoalModal = ({
  visible,
  setModalRender,
  onCloseCallback,
}: {
  visible: boolean;
  setModalRender: any;
  onCloseCallback: any;
}) => {
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalType, setGoalType] = useState<"Completion" | "Performance">(
    "Performance",
  );
  const [aggregationType, setAggregationType] = useState<"Session" | "Shot">(
    "Session",
  );
  const [targetValue, setTargetValue] = useState("");
  const [timePeriodStart, setTimePeriodStart] = useState(
    new Date().toISOString(),
  );
  const [timePeriodEnd, setTimePeriodEnd] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const goalTypes = ["Completion", "Performance"];
  const aggregationTypes = ["Session", "Shot"];

  const isFormValid =
    goalName &&
    goalType &&
    aggregationType &&
    targetValue &&
    timePeriodStart &&
    timePeriodEnd;

  const onModalClose = () => {
    setModalRender(false);
    onCloseCallback();
  };

  const onCreateGoal = () => {
    if (!isFormValid) {
      console.warn("Form is not valid");
      alert("Please fill in all fields correctly.");
      return;
    }
    const newGoal: CreateGoal = {
      goalName,
      goalType,
      aggregationType,
      targetValue: parseInt(targetValue),
      timePeriodStart,
      timePeriodEnd,
      isCompleted: isCompleted ? 1 : 0,
    };

    onCloseCallback(newGoal);
    setModalRender(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onModalClose}
    >
      <Pressable style={styles.overlay} onPress={onModalClose}>
        <View style={styles.centeredView}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Create a New Goal</Text>
                <Pressable style={styles.closeButton} onPress={onModalClose}>
                  <Ionicons name="close" size={24} color={COLORS.borderColor} />
                </Pressable>
              </View>

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Goal Name"
                  placeholderTextColor={COLORS.textSecondary}
                  value={goalName}
                  onChangeText={setGoalName}
                />
                <View>
                  <Text style={COMMON_STYLES.subheader}>Goal Type</Text>
                  {goalTypes.map((type) => (
                    <RadioOption
                      key={type}
                      label={type}
                      selected={goalType === type}
                      onPress={() =>
                        setGoalType(type as "Completion" | "Performance")
                      }
                    />
                  ))}
                </View>

                <View>
                  <Text style={COMMON_STYLES.subheader}>Aggregation Type</Text>
                  {aggregationTypes.map((type) => (
                    <RadioOption
                      key={type}
                      label={type}
                      selected={aggregationType === type}
                      onPress={() =>
                        setAggregationType(type as "Session" | "Shot")
                      }
                    />
                  ))}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Target Value"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="numeric"
                  value={targetValue}
                  onChangeText={setTargetValue}
                />
                <View style={styles.switchRow}>
                  <Text style={styles.label}>Start Time</Text>
                  <Pressable
                    onPress={() => setStartTimePickerVisible(true)}
                    style={styles.dateTimePicker}
                  >
                    <Text style={styles.label}>
                      {new Date(timePeriodStart).toLocaleDateString()}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      setTimePeriodStart(date.toISOString());
                      setStartTimePickerVisible(false);
                    }}
                    onCancel={() => setStartTimePickerVisible(false)}
                  />
                </View>
                <View style={styles.switchRow}>
                  <Text style={styles.label}>End Time</Text>
                  <Pressable
                    onPress={() => setEndTimePickerVisible(true)}
                    style={styles.dateTimePicker}
                  >
                    <Text style={styles.label}>
                      {new Date(timePeriodEnd).toLocaleDateString()}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      setTimePeriodEnd(date.toISOString());
                      setEndTimePickerVisible(false);
                    }}
                    onCancel={() => setEndTimePickerVisible(false)}
                  />
                </View>
                <Pressable
                  style={[
                    styles.createButton,
                    {
                      backgroundColor: isFormValid
                        ? COLORS.primaryAccent
                        : COLORS.borderColor,
                    },
                  ]}
                  onPress={onCreateGoal}
                >
                  <Text style={styles.buttonText}>Create Goal</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    width: "90%",
    maxHeight: "90%",
    justifyContent: "center",
  },
  modalContent: {
    ...COMMON_STYLES.card,
  },
  header: {
    ...COMMON_STYLES.spaceBetween,
    marginBottom: SPACING.md,
  },
  headerText: {
    ...COMMON_STYLES.header,
    marginVertical: 0,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  form: {
    gap: SPACING.sm,
  },
  input: {
    ...COMMON_STYLES.input,
  },
  switchRow: {
    ...COMMON_STYLES.spaceBetween,
    marginTop: SPACING.sm,
  },
  label: {
    ...COMMON_STYLES.bodyText,
  },
  createButton: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  buttonText: {
    ...COMMON_STYLES.buttonText,
  },
  dateTimePicker: {
    height: 40,
    width: "50%",
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
