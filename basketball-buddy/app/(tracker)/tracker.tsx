import { StyleSheet, View, Platform, Dimensions } from "react-native";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import SessionActions from "@/components/SessionActions";
import SessionHeader from "@/components/SessionHeader";
import BasketballCourt from "@/components/BasketballCourt";
import { useState, useEffect } from "react";
import { useShotTracker } from "@/hooks/useShotTracker";

export default function ShotTrackerView() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });
  const {
    shots,
    addShot,
    loadSession,
    saveSession,
    undoLastShot,
    madeShots,
    attemptedShots,
    shootingPercentage,
  } = useShotTracker();

  useEffect(() => {
    setIsDesktop(Platform.OS === "web" && dimensions.window.width > 768);

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
      setIsDesktop(Platform.OS === "web" && window.width > 768);
    });

    return () => subscription?.remove();
  }, [dimensions.window]);

  return (
    <PaddedSafeAreaView style={styles.screen}>
      <View style={isDesktop ? styles.desktopLayout : styles.mobileLayout}>
        <SessionHeader
          madeShots={madeShots}
          attemptedShots={attemptedShots}
          shootingPercentage={shootingPercentage}
          loadSessionCallback={loadSession}
        />
        <BasketballCourt
          isDesktop={isDesktop}
          shots={shots}
          onShotConfirmed={addShot}
        />
        <SessionActions onSave={saveSession} />
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
});
