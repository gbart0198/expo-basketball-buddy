import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { useCreatePersister, useCreateStore } from "tinybase/ui-react";

// The main app.
const usePersistentStore = () => {
  // Initialize the (memoized) TinyBase store and persist it.
  const store = useCreateStore(createStore);
  useAndStartPersister(store);

  return store;
};

const useAndStartPersister = (store: any) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      Platform.OS === "web"
        ? createLocalPersister(store, "todos")
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync("todos.db")),
    [],
    (persister: any) => persister.load().then(persister.startAutoSave),
  );

export default usePersistentStore;
