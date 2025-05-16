import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import migrations from "@/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { addDummyData } from "@/utils/addDummyData";
export const DB_NAME = "basketball-buddy.db";

export default function TrackerLayout() {
  const expoDb = SQLite.openDatabaseSync(DB_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);
  useEffect(() => {
    if (success) {
      addDummyData(db);
    }
  });

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
