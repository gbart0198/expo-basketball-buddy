import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: true }} />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}
