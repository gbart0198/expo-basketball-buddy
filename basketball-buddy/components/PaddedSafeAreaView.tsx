import React from "react";
import { ViewProps, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaddedSafeAreaView: React.FC<ViewProps> = ({
    style,
    children,
    ...props
}) => {
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="#ffffff"
            ></StatusBar>
            <SafeAreaView style={[styles.container, style]} {...props}>
                {children}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
});

export default PaddedSafeAreaView;
