import { Slot } from "expo-router";
import { COLORS } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { DatabaseProvider } from "@/context/database-context";
import { db } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabaseInit";
import Auth from "@/components/Auth";

export default function TrackerLayout() {
  const { success, error: migrationError } = useMigrations(db, migrations);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (migrationError) throw migrationError;
  }, [migrationError]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <DatabaseProvider>
      {session && session.user && (
        <>
          <StatusBar style="light" backgroundColor={COLORS.background} />
          <Slot />
        </>
      )}
      {(!session || !session.user) && <Auth />}
    </DatabaseProvider>
  );
}
