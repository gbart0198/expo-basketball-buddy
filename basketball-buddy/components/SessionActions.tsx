import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

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
    backgroundColor: "white",
    color: "black",
    padding: 16,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  endButton: {
    backgroundColor: "#fcba03",
    color: "black",
    padding: 16,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    marginHorizontal: 8,
  },
});

export default SessionActions;
