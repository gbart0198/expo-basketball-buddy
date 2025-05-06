// app/tracker/_layout.tsx
import { Stack } from "expo-router";

export default function TrackerLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(tracker)/tracker"
                options={{ headerShown: true, title: "Start Shooting!" }}
            />
        </Stack>
    );
}
