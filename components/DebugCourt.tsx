import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { COURT_ZONES } from "@/utils/zones";

const DebugZoneOverlay = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  if (!width || !height) return null;

  const scaleMap = useRef<Record<string, Animated.Value>>({});

  COURT_ZONES.forEach((zone) => {
    if (!scaleMap.current[zone.id]) {
      scaleMap.current[zone.id] = new Animated.Value(1);
    }
  });

  const handleZonePress = (zoneId: any) => {
    console.log(`Zone pressed: ${zoneId}`);
    const scaleAnim = scaleMap.current[zoneId];

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {COURT_ZONES.map((zone) => {
        const { x1, y1, x2, y2 } = zone.bounds;
        const left = x1 * width;
        const top = y1 * height;
        const zoneWidth = (x2 - x1) * width;
        const zoneHeight = (y2 - y1) * height;

        // Ensure minimum touch target size for Android
        const minTouchSize = 44;
        const touchWidth = Math.max(zoneWidth, minTouchSize);
        const touchHeight = Math.max(zoneHeight, minTouchSize);

        // Center the touch area if it's larger than the visual zone
        const touchLeft = left - (touchWidth - zoneWidth) / 2;
        const touchTop = top - (touchHeight - zoneHeight) / 2;

        return (
          <Pressable
            key={zone.id}
            onPress={() => handleZonePress(zone.id)}
            style={[
              styles.touchableZone,
              {
                left: touchLeft,
                top: touchTop,
                width: touchWidth,
                height: touchHeight,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.zoneBox,
                {
                  width: zoneWidth,
                  height: zoneHeight,
                  transform: [{ scale: scaleMap.current[zone.id] }],
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableZone: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  zoneBox: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoneText: {
    fontSize: 10,
    color: "red",
    fontWeight: "bold",
  },
});

export default DebugZoneOverlay;
