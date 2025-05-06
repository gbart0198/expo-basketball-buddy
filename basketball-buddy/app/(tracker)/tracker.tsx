import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";

export default function ShotTrackerView() {
    return (
        <PaddedSafeAreaView style={styles.screen}>
            <View style={styles.sessionContainer}>
                <Text style={styles.sessionHeading}>SESSION STATS</Text>
                <View style={styles.sessionContent}>
                    <View style={styles.sessionStatBox}>
                        <Text style={styles.sessionSubheading}>Made</Text>
                        <Text style={styles.sessionText}>12</Text>
                    </View>
                    <View style={styles.sessionStatBox}>
                        <Text style={styles.sessionSubheading}>Attempted</Text>
                        <Text style={styles.sessionText}>22</Text>
                    </View>
                    <Text style={styles.sessionPercentage}>54%</Text>
                </View>
            </View>
            <View style={styles.courtContainer}>
                <Image source={require("@/assets/images/court.jpg")} style={styles.courtImage} />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable style={styles.endButton}>
                    <Text style={styles.buttonText}>End Session</Text>
                </Pressable>
            </View>
        </PaddedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#003952",
        flex: 1,
    },
    sessionContainer: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#032838",
        paddingHorizontal: 16,
        marginVertical: 0,
        marginHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    sessionHeading: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center"
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
        paddingBlockStart: 16,
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
        flex: 5,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: "hidden",
    },
    courtImage: {
        width: "100%",
        height: "100%",
    },
    trackerPoint: {},
});
