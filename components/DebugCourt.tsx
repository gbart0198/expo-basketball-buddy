import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COURT_ZONES } from "@/utils/zones";

const DebugZoneOverlay = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  if (!width || !height) return null;

  const handleZonePress = (zoneId: any) => {
    console.log(`Zone pressed: ${zoneId}`);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {COURT_ZONES.map((zone) => {
        const { x1, y1, x2, y2 } = zone.bounds;
        const left = x1 * width;
        const top = y1 * height;
        const zoneWidth = (x2 - x1) * width;
        const zoneHeight = (y2 - y1) * height;

        return (
          <Pressable
            key={zone.id}
            style={[
              styles.zoneBox,
              {
                left,
                top,
                width: zoneWidth,
                height: zoneHeight,
              },
            ]}
            onPress={() => handleZonePress(zone.id)}
          >
            <Text style={styles.zoneText}>{zone.id}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  zoneBox: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,0,0,0.4)",
    backgroundColor: "rgba(255,0,0,0.1)",
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
