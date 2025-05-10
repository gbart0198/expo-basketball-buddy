import Shot from "@/models/Shot";
import { useState } from "react";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export function useShotTracker() {
  const [shots, setShots] = useState<Shot[]>([]);

  const addShot = (shot: Shot) => {
    setShots([...shots, shot]);
  };

  const undoLastShot = () => {
    setShots((prev) => prev.slice(0, -1));
  };

  const loadSession = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "session.json";
      const jsonString = await FileSystem.readAsStringAsync(fileUri);
      const json = JSON.parse(jsonString);
      setShots(json);
    } catch (error) {
      console.error("Error loading shots:", error);
      return [];
    }
  };

  const saveSession = async () => {
    console.log(shots);
    if (Platform.OS === "web") {
      const fileData = new Blob([JSON.stringify(shots)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(fileData);
      const link = document.createElement("a");
      link.href = url;
      link.download = "session.json";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const fileUri = FileSystem.documentDirectory + "session.json";
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(shots));
      console.log("File saved successfully to ", fileUri);
    }
  };

  const madeShots = shots.filter((s) => s.made).length;
  const attemptedShots = shots.length;
  const shootingPercentage =
    attemptedShots === 0 ? 0 : Math.round((madeShots / attemptedShots) * 100);

  return {
    shots,
    addShot,
    loadSession,
    saveSession,
    undoLastShot,
    madeShots,
    attemptedShots,
    shootingPercentage,
  };
}
