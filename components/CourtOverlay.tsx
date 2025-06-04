import { COURT_ZONES } from "@/utils/zones";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export function CourtOverlay() {
  const { width } = useWindowDimensions();
  const aspectRatio = 500 / 940; // example: height = width * ratio
  const height = width / aspectRatio;

  return (
    <View style={[StyleSheet.absoluteFill, { width, height }]}>
      {COURT_ZONES.map((zone) => {
        const { x1, y1, x2, y2 } = zone.bounds;
        const left = x1 * width;
        const top = y1 * height;
        const zoneWidth = (x2 - x1) * width;
        const zoneHeight = (y2 - y1) * height;

        return (
          <View
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
          >
            <Text style={styles.zoneText}>{zone.id}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  zoneBox: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  zoneText: {
    fontSize: 10,
    color: "red",
  },
});
