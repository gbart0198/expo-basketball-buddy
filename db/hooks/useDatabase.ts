import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { sessions, shotSummaries } from "../schema";
import { sessionRelations, shotSummariesRelations } from "../relations";

export function useDatabase() {
    const [db, setDb] = useState<any>(null);
    const sqlite = useSQLiteContext();

    useEffect(() => {
        const drizzleDb = drizzle(sqlite, {
            schema: {
                sessions,
                shotSummaries,
                sessionRelations,
                shotSummariesRelations,
            },
        });

        setDb(drizzleDb);
    }, [sqlite]);

    return db;
}
