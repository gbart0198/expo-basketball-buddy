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
import { eq } from "drizzle-orm";

export type SessionWithShots = Session & {
  shots?: ShotSummary[];
};

interface DatabaseContextType {
  sessionsList: SessionWithShots[];
  selectedSession: SessionWithShots | null;
  setSelectedSession: (session: SessionWithShots) => void;
  currentSessionShots: ShotSummary[];
  addSession: (sessionData: CreateSession) => Promise<void>;
  removeSession: (sessionId: number) => Promise<void>;
  addShotSummary: (shotSummaryData: CreateShotSummary) => Promise<void>;
  removeShotSummary: (
    shotSummaryId: number,
    sessionId: number,
  ) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [sessionsList, setSessionsList] = useState<SessionWithShots[]>([]);
  const [selectedSession, setSelectedSession] =
    useState<SessionWithShots | null>(null);
  const currentSessionShots = selectedSession?.shots || [];

  const loadSessions = async () => {
    try {
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
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const addSession = async (sessionData: CreateSession) => {
    try {
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
      } else throw new Error("Failed to add session");
    } catch (error) {
      console.error("Error adding session", error);
    }
  };

  const removeSession = async (sessionId: number) => {
    try {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
      setSessionsList((prev) =>
        prev.filter((session) => session.id != sessionId),
      );
    } catch (error) {
      console.error("Error removing session", error);
    }
  };

  const addShotSummary = async (shotSummaryData: CreateShotSummary) => {
    try {
      const newShot = await db
        .insert(shotSummaries)
        .values(shotSummaryData)
        .returning();
      if (newShot.length <= 0)
        throw new Error("Failed to add new shot summary");
      if (selectedSession?.id === shotSummaryData.sessionId) {
        currentSessionShots.push(newShot[0]);
      }
    } catch (error) {
      console.error("Error inserting shot summary", error);
    }
  };

  const removeShotSummary = async (
    shotSummaryId: number,
    sessionId: number,
  ) => {
    try {
      await db.delete(shotSummaries).where(eq(shotSummaries.id, shotSummaryId));
      if (selectedSession?.id === sessionId) {
        currentSessionShots.splice(
          currentSessionShots.findIndex((shot) => shot.id === shotSummaryId),
          1,
        );
      }
    } catch (error) {
      console.error("Error removing shot summary", error);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        sessionsList,
        selectedSession,
        setSelectedSession,
        currentSessionShots,
        addSession,
        removeSession,
        addShotSummary,
        removeShotSummary,
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
