import { View, StyleSheet, Text } from "react-native";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292E",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    }
})
