import { Session } from "@/models/Session";
import { SessionManagerService } from "@/services/sessionManagerService";
import { useEffect, useState } from "react";

export function useSessions() {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  });

  const loadSessions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await SessionManagerService.listSessions();
      if (response && response.length > 0) {
        setSessions(response);
      } else {
        console.log("No session data found");
        throw new Error("No session data found");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to load sessions");
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (sessionData: Session) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await SessionManagerService.createSession(sessionData);
      if (response) {
        setSessions((prevSessions) => [...prevSessions, response]);
      } else {
        console.log("Failed to create session");
        throw new Error("Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      setError("Failed to create session");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSession = async (id: string, sessionData: Session) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await SessionManagerService.updateSession(
        id,
        sessionData,
      );
      if (response) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === id ? response : session,
          ),
        );
      } else {
        console.log("Failed to update session");
        throw new Error("Failed to update session");
      }
    } catch (error) {
      console.error("Error updating session:", error);
      setError("Failed to update session");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await SessionManagerService.deleteSession(id);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== id),
      );
    } catch (error) {
      console.error("Error deleting session:", error);
      setError("Failed to delete session");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sessions,
    loadSessions,
    createSession,
    updateSession,
    deleteSession,
    isLoading,
    error,
  };
}
