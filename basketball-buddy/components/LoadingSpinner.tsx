import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "@/theme";

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.primaryAccent} />
        </View>
    );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
