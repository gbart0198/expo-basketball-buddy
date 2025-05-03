import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, SafeAreaView } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Details number: {id}</Text>
    </SafeAreaView>
  );
}
