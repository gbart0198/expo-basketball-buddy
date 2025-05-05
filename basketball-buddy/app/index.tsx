import {
    Text,
    StyleSheet,
    FlatList,
    View,
    Pressable,
} from "react-native";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";

export default function HomeView() {
    return (
        <PaddedSafeAreaView>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.heading}>Recent Sessions</Text>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemDate}>{item.date}</Text>
                        <View style={styles.listItemContent}>
                            <Text style={styles.listItemShots}>{item.makes} / {item.shots}</Text>
                            <Text style={styles.listItemPercentage}>{Math.round((item.makes / item.shots) * 100)}%</Text>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ccc", marginHorizontal: 16 }} />}
            />
            <Text style={styles.heading}>My Goal</Text>
            <View style={styles.goalContainer}>
                <Ionicons name="flag" size={24} color="#fcba03" />
                <View style={styles.goalContent}>
                    <Text style={styles.goalText}>Make 200 shots this week</Text>
                    <ProgressBar progress={0.25} />
                    <Text style={styles.progressText}>50/200</Text>
                </View>
            </View>
            <Pressable style={styles.startButton} onPress={() => alert("click")}>
                <Text style={styles.buttonText}>Start Shooting</Text>
            </Pressable>
        </PaddedSafeAreaView>
    );
}

const data = [
    { shots: 75, makes: 56, date: "Today" },
    { shots: 50, makes: 40, date: "Apr 23" },
    { shots: 100, makes: 80, date: "Apr 22" }
]


const styles = StyleSheet.create({
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
        padding: 8,
        margin: 4,
        color: "black",
        flexDirection: "row"
    },
    listItemShots: {
        fontSize: 24,
        color: "black",
    },
    listItemDate: {
        fontSize: 16,
        color: "#888",
    },
    listItemPercentage: {
        fontSize: 12,
        color: "black",
        marginLeft: "auto",
    },
    listItemContent: {
        flexDirection: "column",
        alignItems: "flex-end",
        flex: 1,
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
        flexDirection: "row",
    },
    goalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    goalContent: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 5
    },
    startButton: {
        backgroundColor: "#fcba03",
        padding: 16,
        borderRadius: 10,
        margin: 16,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    progressText: {
        fontSize: 12,
        color: "black",
        textAlign: "right",
    },
});
