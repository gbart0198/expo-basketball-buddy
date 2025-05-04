import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  Pressable,
} from "react-native";

export default function HomeView() {
  return (
    <SafeAreaView style={styles.viewContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.heading}>Recent Sessions</Text>
      <FlatList
        style={styles.list}
        data={[{ key: "session1" }, { key: "session2" }, { key: "session3" }]}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.key}</Text>
          </View>
        )}
      />
      <Text style={styles.heading}>My Goal</Text>
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>Run 10km in 45 minutes</Text>
      </View>
      <Pressable style={styles.startButton} onPress={() => alert("click")}>
        <Text style={styles.buttonText}>Start Shooting</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    margin: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    paddingVertical: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    paddingVertical: 8,
  },
  listItem: {
    fontSize: 18,
    padding: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    color: "black",
  },
  listItemText: {
    fontSize: 18,
    padding: 8,
    color: "black",
  },
  list: {
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 5,
  },
  goalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 5,
    margin: 16,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  startButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 5,
    margin: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
