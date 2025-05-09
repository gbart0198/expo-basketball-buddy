import React from "react";
import { ViewProps, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING } from "@/theme";

const PaddedSafeAreaView: React.FC<ViewProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.background}
      ></StatusBar>
      <SafeAreaView style={[styles.container, style]} {...props}>
        {children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
});

export default PaddedSafeAreaView;
