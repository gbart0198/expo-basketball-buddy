import { useState, useEffect, useRef } from "react";
import {
    View,
    Animated,
    Pressable,
    Platform,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import ShotPopup from "./ShotPopup";
import { COLORS, BORDER_RADIUS, SPACING, createShadow } from "@/theme";
import ShotMarker from "./ShotMarker";
import AnimatedSwitch from "./AnimatedSwitch";
import { CreateShotSummary, ShotSummary } from "@/db";
import { useDatabase } from "@/context/database-context";

const BasketballCourt = ({
    isDesktop,
    shots,
    edit = true,
}: {
    isDesktop: boolean;
    shots: ShotSummary[];
    edit: boolean;
}) => {
    const { selectedSession, addShotSummary } = useDatabase();
    const [currentShot, setCurrentShot] = useState<CreateShotSummary | null>(null);
    const [isMultipleShotMode, setIsMultipleShotMode] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [imageLoaded, setImageLoaded] = useState(false);
    const dimensions = Dimensions.get("window");

    const handleLayout = (event: any) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    };

    if (!selectedSession || !selectedSession.id) {
        console.error("No session selected or session ID is missing.");
        return null;
    }

    console.log("Edit mode in BasketballCourt:", edit);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: currentShot ? 0.4 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentShot, fadeAnim]);

    const handleShot = (attempts: number, makes: number) => {
        if (!currentShot) return;
        currentShot.attempts = attempts;
        currentShot.makes = makes;
        const createdShot = addShotSummary(currentShot);
        setCurrentShot(null);
    };

    const handleCourtPress = (event: any) => {
        if (!selectedSession.id) return;

        if (currentShot) {
            setCurrentShot(null);
            return;
        }

        if (!edit) {
            console.warn("Edit mode is disabled. Cannot add shots.");
            return;
        }


        let scaleX = 0;
        let scaleY = 0;

        if (Platform.OS === "web") {
            const nativeEvent = event.nativeEvent;
            const rect = event.currentTarget.getBoundingClientRect();
            const locationX = nativeEvent.clientX - rect.left;
            const locationY = nativeEvent.clientY - rect.top;
            scaleX = locationX / rect.width;
            scaleY = locationY / rect.height;
        } else {
            const { locationX: x, locationY: y } = event.nativeEvent;
            const width = size.width;
            const height = size.height;
            scaleX = x / width;
            scaleY = y / height;
        }

        const shot: CreateShotSummary = {
            sessionId: selectedSession.id,
            x: scaleX,
            y: scaleY,
            makes: 0,
            attempts: 1,
            lastShotAt: new Date().toISOString(),
        };

        setCurrentShot(shot);
    };

    const getMobileStyles = () => {
        const isSmallDevice = dimensions.width < 375;
        const sidePadding = isSmallDevice ? SPACING.sm : SPACING.md;

        return {
            width: dimensions.width - sidePadding * 2,
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
            onLayout={handleLayout}
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
                    handleShots={handleShot}
                    isMultiple={isMultipleShotMode}
                    courtHeight={size.height}
                    courtWidth={size.width}
                />
            )}

            {shots.map((shot, index) => (
                <ShotMarker
                    key={index}
                    shot={shot}
                    courtHeight={size.height}
                    courtWidth={size.width}
                    edit={edit}
                />
            ))}
            {edit && (
                <AnimatedSwitch
                    onText="Single"
                    offText="Multiple"
                    isSwitched={isMultipleShotMode}
                    onPress={() => setIsMultipleShotMode((prev) => !prev)}
                />
            )}
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
        width: "90%",
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.cardBackground,
    },
    toggleContainer: {
        position: "absolute",
        bottom: SPACING.md,
        right: SPACING.md,
    },
    toggleBackground: {
        width: 80, // fixed width
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
        color: COLORS.textSecondary,
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

export default BasketballCourt;
