import usePersistentStore from "@/store/usePersistentStore";

export const DatabaseService = {
  listSessions: (store: any) => {},
  loadSession: (store: any, id: string) => {},
  createSession: (store: any, sessionData: any) => {},
  updateSession: (store: any, id: string, sessionData: any) => {},
  deleteSession: (store: any, id: string) => {},

  listShots: (store: any, sessionId: string) => {},
  addShot: (store: any, sessionId: string, shotData: any) => {},
  deleteShot: (store: any, sessionId: string, shotId: string) => {},
  updateShot: (
    store: any,
    sessionId: string,
    shotId: string,
    shotData: any,
  ) => {},
  getShot: (store: any, sessionId: string, shotId: string) => {},
};
