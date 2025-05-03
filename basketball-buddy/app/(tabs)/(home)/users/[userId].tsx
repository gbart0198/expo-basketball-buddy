import { useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

export default function UserView() {
  const { userId } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>User ID: {userId}</Text>
    </SafeAreaView>
  );
}
