import { Session, sessions, shotSummaries, ShotSummary } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
    const existingVals: Session[] = await db
        .select()
        .from(sessions)
        .where(
            or(
                eq(sessions.name, "Test Session 1"),
                eq(sessions.name, "Test Session 2"),
            ),
        )
        .limit(1);

    if (existingVals.length === 0) {
        console.log("inserting example data");
        const currentTime = new Date().toISOString();
        const newSessions = await db
            .insert(sessions)
            .values([
                {
                    name: "Test Session 1",
                    startTime: currentTime,
                    endTime: currentTime,
                },
                {
                    name: "Test Session 2",
                    startTime: currentTime,
                    endTime: currentTime,
                },
            ])
            .returning();
        const example_shots_1 = [
            {
                sessionId: newSessions[0].id,
                x: 0.3,
                y: 0.5,
                attempts: 10,
                makes: 5,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[0].id,
                x: 0.1,
                y: 0.3,
                attempts: 1,
                makes: 0,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[0].id,
                x: 0.7,
                y: 0.3,
                attempts: 5,
                makes: 3,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[0].id,
                x: 0.4,
                y: 0.2,
                attempts: 12,
                makes: 7,
                lastShotAt: currentTime,
            },
        ];
        const example_shots_2 = [
            {
                sessionId: newSessions[1].id,
                x: 0.3,
                y: 0.5,
                attempts: 10,
                makes: 5,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[1].id,
                x: 0.1,
                y: 0.3,
                attempts: 1,
                makes: 0,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[1].id,
                x: 0.7,
                y: 0.3,
                attempts: 5,
                makes: 3,
                lastShotAt: currentTime,
            },
            {
                sessionId: newSessions[1].id,
                x: 0.4,
                y: 0.2,
                attempts: 12,
                makes: 7,
                lastShotAt: currentTime,
            },
        ];

        await db.insert(shotSummaries).values(example_shots_1);
        await db.insert(shotSummaries).values(example_shots_2);
    }
};
