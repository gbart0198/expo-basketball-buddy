import { Pressable, StyleSheet, Animated, Easing } from "react-native";
import { COLORS, SPACING } from "@/theme";
import { useEffect, useRef } from "react";

const AnimatedSwitch = ({ onText, offText, isSwitched, onPress, circleColor }: { onText: string, offText: string, isSwitched: boolean, onPress: any, circleColor?: string }) => {
    const toggleAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(toggleAnim, {
            toValue: isSwitched ? 1 : 0,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [isSwitched]);

    // Interpolate background color of toggle container
    const toggleBackgroundColor = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.borderColor, COLORS.primaryAccent],
    });

    // Interpolate circle position from toggleAnim
    const circleTranslateX = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 56],
    });

    // Text opacity for each label
    const singleShotOpacity = toggleAnim.interpolate({
        inputRange: [0, 0.5],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });
    const multipleShotOpacity = toggleAnim.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <Pressable
            onPress={onPress}
            style={styles.toggleContainer}
            android_ripple={{ color: COLORS.primaryAccent }}
            accessibilityRole="switch"
            accessibilityState={{ checked: isSwitched }}
            accessibilityLabel="Toggle shot input mode"
        >
            <Animated.View
                style={[styles.toggleBackground, { backgroundColor: toggleBackgroundColor }]}
            >
                <Animated.View
                    style={[
                        styles.toggleCircle,
                        { transform: [{ translateX: circleTranslateX }] },
                    ]}
                />
                <Animated.Text
                    style={[styles.toggleText, { opacity: singleShotOpacity, right: "10%" }, styles.singleShotText]}
                    numberOfLines={1}
                >
                    {onText}
                </Animated.Text>
                <Animated.Text
                    style={[styles.toggleText, { opacity: multipleShotOpacity, left: "10%" }, styles.multipleShotText]}
                    numberOfLines={1}
                >
                    {offText}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    toggleContainer: {
        position: "absolute",
        bottom: SPACING.md,
        right: SPACING.md,
    },
    toggleBackground: {
        width: 80,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        paddingHorizontal: 2,
        overflow: "hidden",
    },
    toggleCircle: {
        position: "absolute",
        width: 36,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.cardBackground,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        top: 2,
        left: 2,
    },
    singleShotText: {
        color: COLORS.textSecondary
    },
    multipleShotText: {
        color: COLORS.textSecondary,
    },
    toggleText: {
        position: "absolute",
        fontWeight: "600",
        fontSize: 12,
        top: "50%",
        transform: [{ translateY: -8 }],
    },
});

export default AnimatedSwitch;

