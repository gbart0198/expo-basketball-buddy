import { View, Animated, Pressable, Platform, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import Shot from "@/models/Shot";
import ShotPopup from "./ShotPopup";

const BasketballCourt = ({
  isDesktop,
  shots,
  onShotConfirmed,
}: {
  isDesktop: boolean;
  shots: Shot[];
  onShotConfirmed: any;
}) => {
  const [currentShot, setCurrentShot] = useState<Shot | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
  return (
    <View
      style={[
        styles.courtContainer,
        isDesktop ? styles.desktopCourtContainer : styles.mobileCourtContainer,
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
              backgroundColor: shot.made ? "green" : "red",
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  courtContainer: {
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
    borderColor: "black",
    borderWidth: 1,
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
});

export default BasketballCourt;
