import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const AppTabs = () => {
    return (
        <Tabs screenOptions={{
            header: () => <Header />,
        }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ color }) => {
                    return <Ionicons name="home-outline" size={24} color={color} />
                },
                title: "Home",
            }} />
            <Tabs.Screen name="sessions" options={{
                tabBarIcon: ({ color }) => {
                    return <Ionicons name="calendar-outline" size={24} color={color} />
                },
                title: "Sessions",
            }} />
            <Tabs.Screen name="settings" options={{
                tabBarIcon: ({ color }) => {
                    return <Ionicons name="settings-outline" size={24} color={color} />
                },
                title: "Settings",
            }} />
        </Tabs>
    );
};

const Header = () => {
    return (
        <View style={{ backgroundColor: '#fff', paddingBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8 }}>Shot Tracker</Text>
            <View style={{ height: 1, backgroundColor: '#ccc', marginHorizontal: 16 }} />
        </View>
    )
}

export default function RootLayout() {
    return AppTabs();
}
