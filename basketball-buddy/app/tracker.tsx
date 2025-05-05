import { StyleSheet, Text, View } from "react-native";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";


export default function ShotTrackerView() {
    return (
        <PaddedSafeAreaView>
            <View style={styles.sessionContainer}>
                <Text style={styles.sessionHeading}>Session</Text>
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
        </PaddedSafeAreaView>
    )
}

const styles = StyleSheet.create({
    sessionContainer: {
        flexDirection: "column",
    },
    sessionHeading: {

    },
    sessionContent: {
    },
    sessionStatBox: {
    },
    sessionSubheading: {
    },
    sessionText: {

    },
    sessionPercentage: {

    },
    saveButton: {
    },
    endButton: {
    },
    buttonText: {

    },
    courtContainer: {
    },
    trackerPoint: {

    }
})
