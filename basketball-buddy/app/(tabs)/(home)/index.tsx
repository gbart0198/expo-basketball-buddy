import { Link } from "expo-router";
import { Text, StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Home Screen</Text>
      <Link href="/details/1" style={styles.link}>
        Details 1
      </Link>
      <Link
        href={{
          pathname: "/details/[id]",
          params: { id: "bacon" },
        }}
        style={styles.link}
      >
        Details 2
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});
