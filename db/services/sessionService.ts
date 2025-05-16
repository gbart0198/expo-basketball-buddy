import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { Session, sessions, shotSummaries } from "../schema";
import { desc } from "drizzle-orm";

export const sessionService = (db: any) => ({
    getAllSessionsWithShots: async () => {
        return db.query.sessions.findMany({
            with: {
                shots: {
                    orderBy: desc(shotSummaries.lastShotAt),
                },
            },
            orderBy: desc(sessions.startTime),
        });
    },
});
