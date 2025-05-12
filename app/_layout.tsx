// app/_layout.tsx
import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { Provider } from "tinybase/ui-react";
import usePersistentStore from "@/store/usePersistentStore";

export default function TrackerLayout() {
  const store = usePersistentStore();
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <Slot />
    </Provider>
  );
}
