import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home screen</Text>
            <Link href="/about" style={styles.button}>
                Go to About
            </Link>
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
