import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { createStore } from "tinybase";
import { Provider } from "tinybase/ui-react";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { useCreatePersister, useCreateStore } from "tinybase/ui-react";
import { createContext, useEffect } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import migrations from "@/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";

export const DB_NAME = "basketball-buddy.db";

// The main app.
const useDb = () => {
  // Initialize the (memoized) TinyBase store and persist it.
  const expoDb = SQLite.openDatabaseSync(DB_NAME);
  const db = drizzle(expoDb);

  const { success, error } = useMigrations(db, migrations);

  return db;
};

export default useDb;
