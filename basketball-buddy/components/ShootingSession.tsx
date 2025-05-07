import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface SessionProps {
  madeShots: number;
  attemptedShots: number;
  shootingPercentage: number;
}

const ShootingSession = ({
  madeShots,
  attemptedShots,
  shootingPercentage,
}: SessionProps) => {
  const router = useRouter();
  return (
    <View style={styles.sessionContainer}>
      <View style={styles.sessionHeaderContent}>
        <Text style={styles.sessionHeading}>SESSION STATS</Text>
        <Pressable style={styles.sessionClose} onPress={() => router.back()}>
          <Text style={{ color: "white" }}>Cancel Session</Text>
        </Pressable>
      </View>
      <View style={styles.sessionContent}>
        <View style={styles.sessionStatBox}>
          <Text style={styles.sessionSubheading}>Made</Text>
          <Text style={styles.sessionText}>{madeShots}</Text>
        </View>
        <View style={styles.sessionStatBox}>
          <Text style={styles.sessionSubheading}>Attempted</Text>
          <Text style={styles.sessionText}>{attemptedShots}</Text>
        </View>
        <View style={styles.sessionStatBox}>
          <Text style={styles.sessionSubheading}>Shooting Percentage</Text>
          <Text style={styles.sessionText}>{shootingPercentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionContainer: {
    flexDirection: "column",
    backgroundColor: "#032838",
    borderRadius: 5,
  },
  sessionHeading: {
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
  },
  sessionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  sessionSubheading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  sessionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  sessionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-between",
  },
  sessionStatBox: {
    flexDirection: "column",
    alignItems: "center",
  },
  mobileSessionContainer: {
    marginVertical: 0,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  sessionClose: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default ShootingSession;
