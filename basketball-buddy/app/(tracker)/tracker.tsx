import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Animated,
} from "react-native";
import { Image } from "expo-image";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Shot {
  x: number;
  y: number;
  made: boolean;
  timestamp: string;
}

export default function ShotTrackerView() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);
  const [currentShot, setCurrentShot] = useState<Shot | null>(null);
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });

  const madeShots = shots.filter((shot) => shot.made).length;
  const attemptedShots = shots.length; // this includes both made and missed shots
  const shootingPercentage =
    attemptedShots === 0 ? 0 : Math.round((madeShots / attemptedShots) * 100);

  const fadeAnim = useRef(new Animated.Value(1)).current; // starts fully visible

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: currentShot ? 0.4 : 1, // dim when popup is shown
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentShot, fadeAnim]);

  // Update dimensions on window resize (for web)
  useEffect(() => {
    // Check if we're on desktop
    setIsDesktop(Platform.OS === "web" && dimensions.window.width > 768);

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
      setIsDesktop(Platform.OS === "web" && window.width > 768);
    });

    return () => subscription?.remove();
  }, [dimensions.window]);

  const handleShotMake = () => {
    if (!currentShot) return;
    currentShot.made = true;

    setShots([...shots, currentShot]);
    setCurrentShot(null);
  };

  const handleShotMiss = () => {
    if (!currentShot) return;
    currentShot.made = false;

    setShots([...shots, currentShot]);
    setCurrentShot(null);
  };

  const handleCourtPress = (event: any) => {
    if (currentShot) return; // we already have a shot in progress
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

    console.log(`Court pressed at X: ${locationX}, Y: ${locationY}`);
    const shot: Shot = {
      x: locationX,
      y: locationY,
      made: true,
      timestamp: new Date().toISOString(),
    };
    setCurrentShot(shot);
  };

  const undoShot = () => {
    setShots(shots.slice(0, -1));
  };

  return (
    <PaddedSafeAreaView style={styles.screen}>
      <View style={isDesktop ? styles.desktopLayout : styles.mobileLayout}>
        <View
          style={[
            styles.sessionContainer,
            isDesktop
              ? styles.desktopSessionContainer
              : styles.mobileSessionContainer,
          ]}
        >
          <View
            style={
              isDesktop
                ? styles.desktopSessionHeaderContent
                : styles.sessionHeaderContent
            }
          >
            <Text style={styles.sessionHeading}>SESSION STATS</Text>
            <Pressable
              style={styles.trackerPoint}
              onPress={() => router.back()}
            >
              <Text style={{ color: "white" }}>Cancel Session</Text>
            </Pressable>
          </View>
          <View
            style={
              isDesktop ? styles.desktopSessionContent : styles.sessionContent
            }
          >
            <View style={styles.sessionStatBox}>
              <Text style={styles.sessionSubheading}>Made</Text>
              <Text style={styles.sessionText}>{madeShots}</Text>
            </View>
            <View style={styles.sessionStatBox}>
              <Text style={styles.sessionSubheading}>Attempted</Text>
              <Text style={styles.sessionText}>{attemptedShots}</Text>
            </View>
            <View style={styles.sessionStatBox}>
              <Text style={styles.sessionSubheading}>Shooting Percentage</Text>
              <Text style={styles.sessionText}>{shootingPercentage}%</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.courtContainer,
            isDesktop
              ? styles.desktopCourtContainer
              : styles.mobileCourtContainer,
          ]}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              ...StyleSheet.flatten(styles.courtImage),
            }}
          >
            <Image
              source={require("@/assets/images/court.jpg")}
              style={StyleSheet.absoluteFill} // fill the Animated.View container
              contentFit="cover"
            />
          </Animated.View>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleCourtPress}
          />
          {currentShot && (
            <View
              style={[
                styles.popup,
                {
                  left: currentShot.x,
                  top: currentShot.y,
                },
              ]}
            >
              <Pressable onPress={handleShotMake}>
                <Ionicons name="checkmark-circle" size={24} color="green" />
              </Pressable>
              <Pressable onPress={handleShotMiss}>
                <Ionicons name="close-circle" size={24} color="red" />
              </Pressable>
            </View>
          )}
          {shots.map((shot, index) => (
            <View
              key={index}
              style={[
                styles.shotMarker,
                {
                  left: shot.x,
                  top: shot.y,
                  backgroundColor: shot.made ? "green" : "red",
                },
              ]}
            />
          ))}
        </View>
        <View
          style={[
            styles.buttonsContainer,
            isDesktop ? styles.desktopButtonsContainer : {},
          ]}
        >
          <Pressable style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.endButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>End Session</Text>
          </Pressable>
        </View>
      </View>
    </PaddedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#76a6f5",
    flex: 1,
  },
  mobileLayout: {
    flex: 1,
    flexDirection: "column",
  },
  desktopLayout: {
    flex: 1,
    flexDirection: "column",
    maxWidth: 1200,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
  },
  sessionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-between",
  },
  desktopSessionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "space-between",
  },
  trackerPoint: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  sessionContainer: {
    flexDirection: "column",
    backgroundColor: "#032838",
    borderRadius: 5,
  },
  mobileSessionContainer: {
    marginVertical: 0,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  desktopSessionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sessionHeading: {
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
  },
  sessionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  desktopSessionContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    marginHorizontal: 8,
  },
  desktopButtonsContainer: {
    maxWidth: 600,
    marginHorizontal: "auto",
    width: "100%",
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
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  mobileCourtContainer: {
    flex: 2,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  desktopCourtContainer: {
    height: 500,
    marginVertical: 16,
    marginHorizontal: 16,
    aspectRatio: 1.5,
    alignSelf: "center",
  },
  courtImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  shotMarker: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "white",
  },
  popup: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 5,
    zIndex: 1,
  },
});
