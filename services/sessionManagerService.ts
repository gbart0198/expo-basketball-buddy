import { Session } from "@/models/Session";

export const SessionManagerService = {
  loadSession: (id: string): Promise<Session> => {},

  listSessions: (): Promise<Session[]> => {},

  createSession: (sessionData: Session): Promise<Session> => {},

  updateSession: (id: string, sessionData: Session): Promise<Session> => {},

  deleteSession: (id: string): Promise<void> => {},
};
