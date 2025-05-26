// app/_layout.tsx
import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { DatabaseProvider } from "@/context/database-context";
import { db } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { useEffect } from "react";

export default function TrackerLayout() {
  const { success, error: migrationError } = useMigrations(db, migrations);

  useEffect(() => {
    if (migrationError) throw migrationError;
  }, [migrationError]);

  return RootLayoutNav();
}

function RootLayoutNav() {
  return (
    <DatabaseProvider>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <Slot />
    </DatabaseProvider>
  );
}
