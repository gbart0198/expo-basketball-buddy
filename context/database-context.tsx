import React, { createContext, useContext, useEffect, useState } from "react";
import {
  db,
  sessions,
  shotSummaries,
  goals,
  Session,
  ShotSummary,
  Goal,
  CreateSession,
  CreateShotSummary,
  CreateGoal,
} from "@/db";
import { and, eq, inArray } from "drizzle-orm";
import { syncDbDeletes, syncDbUpserts } from "@/utils/syncDb";

export type SessionWithShots = Session & {
  shots?: ShotSummary[];
};

interface DatabaseContextType {
  isLoading: boolean;
  sessionsList: SessionWithShots[];
  goalsList: Goal[];
  selectedSession: SessionWithShots | null;
  setSelectedSession: (session: SessionWithShots) => void;
  currentSessionShots: ShotSummary[];
  addSession: (
    sessionData: CreateSession,
  ) => Promise<SessionWithShots | undefined>;
  removeSession: (sessionId: number) => Promise<void>;
  addShotSummary: (
    shotSummaryData: CreateShotSummary,
  ) => Promise<ShotSummary | undefined>;
  removeShotSummary: (shotSummaryId: number) => Promise<void>;
  addGoal: (goalData: CreateGoal) => Promise<Goal | undefined>;
  removeGoal: (goalId: number) => Promise<void>;
  runSyncJob: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [sessionsList, setSessionsList] = useState<SessionWithShots[]>([]);
  const [goalsList, setGoalsList] = useState<Goal[]>([]);
  const [selectedSession, setSelectedSession] =
    useState<SessionWithShots | null>(null);
  const currentSessionShots = selectedSession?.shots || [];
  const [isLoading, setIsLoading] = useState(true);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const allSessions = await db
        .select()
        .from(sessions)
        .where(eq(sessions.isDeleted, 0));
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
          .where(
            and(
              eq(shotSummaries.sessionId, session.id),
              eq(shotSummaries.isDeleted, 0),
            ),
          );
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
    loadGoals();
  }, []);

  const addSession = async (
    sessionData: CreateSession,
  ): Promise<SessionWithShots | undefined> => {
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
      await db
        .update(sessions)
        .set({ isDeleted: 1, isSynced: 0 })
        .where(eq(sessions.id, sessionId));
      setSessionsList((prev) =>
        prev.filter((session) => session.id != sessionId),
      );
      await db
        .update(shotSummaries)
        .set({ isDeleted: 1, isSynced: 0 })
        .where(eq(shotSummaries.sessionId, sessionId));
    } catch (error) {
      console.error("Error removing session", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addShotSummary = async (
    shotSummaryData: CreateShotSummary,
  ): Promise<ShotSummary | undefined> => {
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

  const removeShotSummary = async (shotSummaryId: number) => {
    try {
      setIsLoading(true);
      await db
        .update(shotSummaries)
        .set({ isDeleted: 1, isSynced: 0 })
        .where(eq(shotSummaries.id, shotSummaryId));
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

  const loadGoals = async () => {
    try {
      setIsLoading(true);
      const allGoals = await db
        .select()
        .from(goals)
        .where(eq(goals.isDeleted, 0));
      setGoalsList(allGoals);
    } catch (error) {
      console.error("Error loading goals", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addGoal = async (goalData: CreateGoal): Promise<Goal | undefined> => {
    try {
      setIsLoading(true);
      const newGoal = await db.insert(goals).values(goalData).returning();
      if (newGoal.length > 0) {
        setGoalsList((prev) => [...prev, newGoal[0]]);
        return newGoal[0];
      } else {
        throw new Error("Failed to add new goal");
      }
    } catch (error) {
      console.error("Error adding goal", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeGoal = async (goalId: number) => {
    try {
      setIsLoading(true);
      await db
        .update(goals)
        .set({ isDeleted: 1, isSynced: 0 })
        .where(eq(goals.id, goalId));
      setGoalsList((prev) => prev.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error("Error removing goal", error);
    } finally {
      setIsLoading(false);
    }
  };

  const runSyncJob = async () => {
    console.log("Running sync job...");
    const sessionSelectSchema = {
      id: sessions.id,
      name: sessions.name,
      date: sessions.date,
    };
    const shotSelectSchema = {
      id: shotSummaries.id,
      sessionId: shotSummaries.sessionId,
      makes: shotSummaries.makes,
      attempts: shotSummaries.attempts,
      x: shotSummaries.x,
      y: shotSummaries.y,
      lastShotAt: shotSummaries.lastShotAt,
    };
    const goalSelectSchema = {
      id: goals.id,
      goalName: goals.goalName,
      goalType: goals.goalType,
      aggregationType: goals.aggregationType,
      targetValue: goals.targetValue,
      timePeriodStart: goals.timePeriodStart,
      timePeriodEnd: goals.timePeriodEnd,
      isCompleted: goals.isCompleted,
      createdAt: goals.createdAt,
      updatedAt: goals.updatedAt,
    };
    const sessionUpdatesToSync = db
      .select(sessionSelectSchema)
      .from(sessions)
      .where(and(eq(sessions.isSynced, 0), eq(sessions.isDeleted, 0)));
    const sessionDeletesToSync = db
      .select(sessionSelectSchema)
      .from(sessions)
      .where(and(eq(sessions.isDeleted, 1), eq(sessions.isSynced, 0)));
    const shotUpdatesToSync = db
      .select(shotSelectSchema)
      .from(shotSummaries)
      .where(
        and(eq(shotSummaries.isSynced, 0), eq(shotSummaries.isDeleted, 0)),
      );
    const shotDeletesToSync = db
      .select(shotSelectSchema)
      .from(shotSummaries)
      .where(
        and(eq(shotSummaries.isDeleted, 1), eq(shotSummaries.isSynced, 0)),
      );
    const goalUpdatesToSync = db
      .select(goalSelectSchema)
      .from(goals)
      .where(and(eq(goals.isSynced, 0), eq(goals.isDeleted, 0)));
    const goalDeletesToSync = db
      .select(goalSelectSchema)
      .from(goals)
      .where(and(eq(goals.isDeleted, 1), eq(goals.isSynced, 0)));

    // await all and update the isSynced field
    try {
      const [
        sessionUpdates,
        sessionDeletes,
        shotUpdates,
        shotDeletes,
        goalUpdates,
        goalDeletes,
      ] = await Promise.all([
        sessionUpdatesToSync,
        sessionDeletesToSync,
        shotUpdatesToSync,
        shotDeletesToSync,
        goalUpdatesToSync,
        goalDeletesToSync,
      ]);
      const upsertedSessions = await syncDbUpserts(sessionUpdates, "sessions");
      await db
        .update(sessions)
        .set({ isSynced: 1 })
        .where(
          inArray(
            sessions.id,
            upsertedSessions.map((s) => s.id),
          ),
        );

      await syncDbDeletes(sessionDeletes, "sessions");
      await db
        .update(sessions)
        .set({ isSynced: 1 })
        .where(
          inArray(
            sessions.id,
            sessionDeletes.map((s) => s.id),
          ),
        );

      const upsertedShots = await syncDbUpserts(shotUpdates, "shotSummaries");
      await db
        .update(shotSummaries)
        .set({ isSynced: 1 })
        .where(
          inArray(
            shotSummaries.id,
            upsertedShots.map((s) => s.id),
          ),
        );

      await syncDbDeletes(shotDeletes, "shotSummaries");
      await db
        .update(shotSummaries)
        .set({ isSynced: 1 })
        .where(
          inArray(
            shotSummaries.id,
            shotDeletes.map((s) => s.id),
          ),
        );

      const upsertedGoals = await syncDbUpserts(goalUpdates, "goals");
      await db
        .update(goals)
        .set({ isSynced: 1 })
        .where(
          inArray(
            goals.id,
            upsertedGoals.map((g) => g.id),
          ),
        );

      await syncDbDeletes(goalDeletes, "goals");
      await db
        .update(goals)
        .set({ isSynced: 1 })
        .where(
          inArray(
            goals.id,
            goalDeletes.map((g) => g.id),
          ),
        );

      console.log("Sync job completed successfully");
    } catch (error) {
      console.error("Error syncing database", error);
    }
  };

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
        addGoal,
        removeGoal,
        goalsList,
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
