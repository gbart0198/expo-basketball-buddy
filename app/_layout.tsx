// app/_layout.tsx
import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { Provider } from "tinybase/ui-react";
import usePersistentStore from "@/store/usePersistentStore";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import migrations from "@/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
export const DB_NAME = "basketball-buddy.db";

export default function TrackerLayout() {
  const expoDb = SQLite.openDatabaseSync(DB_NAME);
  const db = drizzle(expoDb);

  const { success, error } = useMigrations(db, migrations);
  return (
    <Suspense
      fallback={
        <ActivityIndicator size="large" color={COLORS.cardBackground} />
      }
    >
      <SQLiteProvider
        databaseName={DB_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <StatusBar style="light" backgroundColor={COLORS.background} />
        <Slot />
      </SQLiteProvider>
    </Suspense>
  );
}
