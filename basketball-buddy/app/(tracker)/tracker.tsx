import { Pressable, StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { Image } from "expo-image";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { useRouter } from "expo-router";

export default function ShotTrackerView() {
    const router = useRouter();

    const handleCourtPress = (event: any) => {
        var locationX = 0;
        var locationY = 0;
        if (Platform.OS === "web") {
            const nativeEvent = event.nativeEvent;

            const rect = event.currentTarget.getBoundingClientRect();

            locationX = nativeEvent.clientX - rect.left;
            locationY = nativeEvent.clientY - rect.top;
        } else {
            const { locationX: x, locationY: y } = event.nativeEvent;
            locationX = x;
            locationY = y;

        }
        console.log(`Court pressed at X: ${locationX}, Y: ${locationY}`);
        alert(`Court pressed at X: ${locationX}, Y: ${locationY}`);
    }
    return (
        <PaddedSafeAreaView style={styles.screen}>
            <View style={styles.sessionContainer}>
                <View style={styles.sessionHeaderContent}>
                    <Text style={styles.sessionHeading}>SESSION STATS</Text>
                    <Pressable style={styles.trackerPoint} onPress={() => router.back()}>
                        <Text style={{ color: "white" }}>Cancel Session</Text>
                    </Pressable>
                </View>
                <View style={styles.sessionContent}>
                    <View style={styles.sessionStatBox}>
                        <Text style={styles.sessionSubheading}>Made</Text>
                        <Text style={styles.sessionText}>12</Text>
                    </View>
                    <View style={styles.sessionStatBox}>
                        <Text style={styles.sessionSubheading}>Attempted</Text>
                        <Text style={styles.sessionText}>22</Text>
                    </View>
                    <View style={styles.sessionStatBox}>
                        <Text style={styles.sessionSubheading}>Shooting Percentage</Text>
                        <Text style={styles.sessionText}>54%</Text>
                    </View>
                </View>
            </View>
            <View style={styles.courtContainer}>
                <Image source={require("@/assets/images/court.jpg")} style={styles.courtImage} contentFit="cover" />
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={handleCourtPress}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable style={styles.endButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>End Session</Text>
                </Pressable>
            </View>
        </PaddedSafeAreaView >
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#76a6f5",
        flex: 1,
    },
    sessionHeaderContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        justifyContent: "space-between"
    },
    trackerPoint: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    sessionContainer: {
        flexDirection: "column",
        flex: 0.5,
        backgroundColor: "#032838",
        paddingHorizontal: 16,
        marginVertical: 0,
        marginHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    sessionHeading: {
        paddingVertical: 8,
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        alignSelf: "flex-start"
    },
    sessionContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
    },
    sessionStatBox: {
        flexDirection: "column",
        alignItems: "center",
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
    sessionPercentage: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 16,
        marginHorizontal: 8,
    },
    saveButton: {
        backgroundColor: "white",
        color: "black",
        padding: 16,
        borderRadius: 5,
        width: "48%",
        alignItems: "center",
    },
    endButton: {
        backgroundColor: "#fcba03",
        color: "black",
        padding: 16,
        borderRadius: 5,
        width: "48%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    courtContainer: {
        flex: 2,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: "hidden",
    },
    courtImage: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
    }
});
