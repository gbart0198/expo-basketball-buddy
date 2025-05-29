import React, { createContext, useContext, useEffect, useState } from "react";
import {
    db,
    sessions,
    shotSummaries,
    Session,
    ShotSummary,
    CreateSession,
    CreateShotSummary,
} from "@/db";
import { and, eq } from "drizzle-orm";

export type SessionWithShots = Session & {
    shots?: ShotSummary[];
};

interface DatabaseContextType {
    isLoading: boolean;
    sessionsList: SessionWithShots[];
    selectedSession: SessionWithShots | null;
    setSelectedSession: (session: SessionWithShots) => void;
    currentSessionShots: ShotSummary[];
    addSession: (sessionData: CreateSession) => Promise<SessionWithShots | undefined>;
    removeSession: (sessionId: number) => Promise<void>;
    addShotSummary: (shotSummaryData: CreateShotSummary) => Promise<ShotSummary | undefined>;
    removeShotSummary: (
        shotSummaryId: number
    ) => Promise<void>;
    runSyncJob: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const [sessionsList, setSessionsList] = useState<SessionWithShots[]>([]);
    const [selectedSession, setSelectedSession] =
        useState<SessionWithShots | null>(null);
    const currentSessionShots = selectedSession?.shots || [];
    const [isLoading, setIsLoading] = useState(true);


    const loadSessions = async () => {
        try {
            setIsLoading(true);
            const allSessions = await db.select().from(sessions);
            let sessionsWithShots: SessionWithShots[] = allSessions.map(
                (session) => ({
                    ...session,
                    shots: [],
                }),
            );
            sessionsWithShots.forEach(async (session) => {
                if (!session.id) return; // this should not happen, but just in case
                const shots = await db
                    .select()
                    .from(shotSummaries)
                    .where(eq(shotSummaries.sessionId, session.id));
                session.shots = shots;
            });
            setSessionsList(sessionsWithShots);
        } catch (error) {
            console.error("Error loading sessions", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSessions();
    }, []);


    const addSession = async (sessionData: CreateSession): Promise<SessionWithShots | undefined> => {
        try {
            setIsLoading(true);
            let newSession = await db
                .insert(sessions)
                .values(sessionData)
                .returning();
            let newSessionWithShots: SessionWithShots = {
                ...newSession[0],
                shots: [],
            };
            if (newSession.length > 0) {
                setSessionsList((prev) => [...prev, newSessionWithShots]);
                setSelectedSession(newSessionWithShots);
                return newSessionWithShots;
            } else throw new Error("Failed to add session");
        } catch (error) {
            console.error("Error adding session", error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeSession = async (sessionId: number) => {
        try {
            setIsLoading(true);
            await db.delete(sessions).where(eq(sessions.id, sessionId));
            setSessionsList((prev) =>
                prev.filter((session) => session.id != sessionId),
            );
        } catch (error) {
            console.error("Error removing session", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addShotSummary = async (shotSummaryData: CreateShotSummary): Promise<ShotSummary | undefined> => {
        try {
            setIsLoading(true);
            const newShot = await db
                .insert(shotSummaries)
                .values(shotSummaryData)
                .returning();
            if (newShot.length <= 0)
                throw new Error("Failed to add new shot summary");
            if (selectedSession?.id === shotSummaryData.sessionId) {
                currentSessionShots.push(newShot[0]);
            }
            return newShot[0];
        } catch (error) {
            console.error("Error inserting shot summary", error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeShotSummary = async (
        shotSummaryId: number,
    ) => {
        try {
            setIsLoading(true);
            await db.delete(shotSummaries).where(eq(shotSummaries.id, shotSummaryId));
            currentSessionShots.splice(
                currentSessionShots.findIndex((shot) => shot.id === shotSummaryId),
                1,
            );
        } catch (error) {
            console.error("Error removing shot summary", error);
        } finally {
            setIsLoading(false);
        }
    };

    const runSyncJob = async () => {
        const sessionUpdatesToSync = db.select().from(sessions).where(eq(sessions.isSynced, 0));
        const sessionDeletesToSync = db.select().from(sessions)
            .where(and(eq(sessions.isDeleted, 1), eq(sessions.isSynced, 0)));
        const shotUpdatesToSync = db.select().from(shotSummaries).where(eq(shotSummaries.isSynced, 0));
        const shotDeletesToSync = db.select().from(shotSummaries)
            .where(and(eq(shotSummaries.isDeleted, 1), eq(shotSummaries.isSynced, 0)));

        // await all and update the isSynced field
        try {
            const [sessionUpdates, sessionDeletes, shotUpdates, shotDeletes] = await Promise.all([
                sessionUpdatesToSync,
                sessionDeletesToSync,
                shotUpdatesToSync,
                shotDeletesToSync,
            ]);
            console.log("--------- Session Updates ---------", sessionUpdates);
            console.log("--------- Session Deletes ---------", sessionDeletes);
            console.log("--------- Shot Updates ---------", shotUpdates);
            console.log("--------- Shot Deletes ---------", shotDeletes);

            /* Update after the sync to supabase is finished
            for (const session of sessionUpdates) {
                await db.update(sessions).set({ isSynced: 1 }).where(eq(sessions.id, session.id));
            }

            for (const session of sessionDeletes) {
                await db.delete(sessions).where(eq(sessions.id, session.id));
            }

            for (const shot of shotUpdates) {
                await db.update(shotSummaries)
                    .set({ isSynced: 1 })
                    .where(eq(shotSummaries.id, shot.id));
            }

            for (const shot of shotDeletes) {
                await db.delete(shotSummaries).where(eq(shotSummaries.id, shot.id));
            }
            */
        } catch (error) {
            console.error("Error syncing database", error);
        }
    }

    return (
        <DatabaseContext.Provider
            value={{
                sessionsList,
                isLoading,
                selectedSession,
                setSelectedSession,
                currentSessionShots,
                addSession,
                removeSession,
                addShotSummary,
                removeShotSummary,
                runSyncJob,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

export function useDatabase() {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider");
    }
    return context;
}
