// app/tracker/_layout.tsx
import { Slot } from "expo-router";
import CustomHeader from "@/components/StackHeader";
import { Header } from "@react-navigation/elements";

export default function TrackerLayout() {
    return (
        <Slot />
    )
}

/*
export default function TrackerLayout() {
    return (
        <Stack screenOptions={{
            header: (props) => (
                <CustomHeader
                    title={props.route.name}
                    showBackButton={props.back !== undefined}
                />
            ),
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(tracker)/tracker"
                options={{
                    headerShown: true,
                    title: "Start Shooting!",
                }}
            />
        </Stack>
    );
}
*/
