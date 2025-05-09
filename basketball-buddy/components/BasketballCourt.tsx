import React, { useState, useEffect, useRef } from "react";
import { View, Animated, Pressable, Platform, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import Shot from "@/models/Shot";
import ShotPopup from "./ShotPopup";
import { COLORS, BORDER_RADIUS, SPACING, createShadow } from "@/theme";

const BasketballCourt = ({
    isDesktop,
    shots,
    onShotConfirmed,
}: {
    isDesktop: boolean;
    shots: Shot[];
    onShotConfirmed: (shot: Shot) => void;
}) => {
    const [currentShot, setCurrentShot] = useState<Shot | null>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [imageLoaded, setImageLoaded] = useState(false);
    const dimensions = Dimensions.get("window");

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: currentShot ? 0.4 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentShot, fadeAnim]);

    const handleShotMake = () => {
        if (!currentShot) return;
        currentShot.made = true;
        onShotConfirmed(currentShot);
        setCurrentShot(null);
    };

    const handleShotMiss = () => {
        if (!currentShot) return;
        currentShot.made = false;
        onShotConfirmed(currentShot);
        setCurrentShot(null);
    };

    const handleCourtPress = (event: any) => {
        if (currentShot) return;

        let locationX = 0;
        let locationY = 0;

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

        const shot: Shot = {
            x: locationX,
            y: locationY,
            made: true,
            timestamp: new Date().toISOString(),
        };

        setCurrentShot(shot);
    };

    const getMobileStyles = () => {
        const isSmallDevice = dimensions.width < 375;
        const sidePadding = isSmallDevice ? SPACING.sm : SPACING.md;

        return {
            width: dimensions.width - (sidePadding * 2),
            height: dimensions.width * 1.5,
            marginVertical: SPACING.md,
        };
    };

    return (
        <View
            style={[
                styles.courtContainer,
                isDesktop ? styles.desktopCourtContainer : styles.mobileCourtContainer,
                !isDesktop && Platform.OS !== "web" && getMobileStyles(),
            ]}
        >
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    ...StyleSheet.flatten(styles.courtImage),
                }}
            >
                {!imageLoaded && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primaryAccent} />
                    </View>
                )}
                <Image
                    source={require("@/assets/images/court.jpg")}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    onLoad={() => setImageLoaded(true)}
                />
            </Animated.View>

            <Pressable style={StyleSheet.absoluteFill} onPress={handleCourtPress} />

            {currentShot && (
                <ShotPopup
                    shot={currentShot}
                    handleShotMake={handleShotMake}
                    handleShotMiss={handleShotMiss}
                />
            )}

            {shots.map((shot, index) => (
                <View
                    key={index}
                    style={[
                        styles.shotMarker,
                        {
                            left: shot.x,
                            top: shot.y,
                            backgroundColor: shot.made ? COLORS.success : COLORS.error,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    courtContainer: {
        borderRadius: BORDER_RADIUS.lg,
        overflow: "hidden",
        position: "relative",
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        backgroundColor: COLORS.cardBackground,
        ...createShadow(4),
    },
    mobileCourtContainer: {
        flex: Platform.OS === "web" ? 1 : 0,
        alignSelf: "center",
    },
    desktopCourtContainer: {
        width: '90%',
        maxWidth: 900,
        height: 700,
        aspectRatio: 0.85,
        alignSelf: "center",
    },
    courtImage: {
        width: "100%",
        height: "100%",
        borderRadius: BORDER_RADIUS.lg,
    },
    shotMarker: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.textPrimary,
        ...createShadow(2),
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.cardBackground,
    },
});

export default BasketballCourt;
