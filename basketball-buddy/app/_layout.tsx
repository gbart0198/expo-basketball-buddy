// app/_layout.tsx
import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";

export default function TrackerLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <Slot />
    </>
  );
}
