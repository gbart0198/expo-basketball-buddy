import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/db";
import {
    sessions,
    shotSummaries,
    Session,
    ShotSummary,
    CreateSession,
    CreateShotSummary,
} from "@/db";

interface DatabaseContextType {
    sessionsList: Session[];
    selectedSession: Session | null;
    setSelectedSession: (session: Session) => void;
    currentSessionShots: ShotSummary[];
    addSession: (sessionData: CreateSession) => Promise<void>;
    removeSession: (sessionId: number) => Promise<void>;
    addShotSummary: (
        shotSummaryData: CreateShotSummary,
        sessionId: number,
    ) => Promise<void>;
    removeShotSummary: (shotSummaryId: number) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const [sessionsList, setSessionsList] = useState<Session[]>([]);
    const [currentSessionShots, setCurrentSessionShots] = useState<
        ShotSummary[]
    >([]);
    const [selectedSession, setSelectedSession] = useState<Session | null>(
        null,
    );

    const loadSessions = async () => {
        try {
            const allSessions = await db.select().from(sessions);
            setSessionsList(allSessions);
        } catch (error) {
            console.error("Error loading sessions", error);
        }
    };

    const addSession = async (sessionData: CreateSession) => {
    }

    const removeSession = async (sessionId: number) => {
    }

    const addShotSummary = async (
        shotSummaryData: CreateShotSummary,
        sessionId: number,
    ) => {
    }

    const removeShotSummary = async (shotSummaryId: number) => {
    }

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
            > {children}
        </DatabaseContext.Provider>
    )

}

export function useDatabase() {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider");
    }
    return context;
}
