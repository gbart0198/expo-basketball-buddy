import { Session } from "@/models/Session";

export const SessionService = {
  getSessionData: async (): Promise<Session[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: "1",
        name: "Session 1",
        date: "Apr 25, 2025",
        shots: [
          {
            id: "1",
            sessionId: "1",
            makes: 5,
            attempts: 10,
            x: 0.32,
            y: 0.44,
            last_shot_at: "2025-04-25T10:00:00Z",
          },
          {
            id: "2",
            sessionId: "1",
            makes: 3,
            attempts: 5,
            x: 0.45,
            y: 0.55,
            last_shot_at: "2025-04-25T10:05:00Z",
          },
          {
            id: "3",
            sessionId: "1",
            makes: 2,
            attempts: 8,
            x: 0.55,
            y: 0.65,
            last_shot_at: "2025-04-25T10:10:00Z",
          },
        ],
      },
      {
        id: "2",
        name: "Session 2",
        date: "Apr 23, 2025",
        shots: [
          {
            id: "4",
            sessionId: "2",
            makes: 7,
            attempts: 10,
            x: 0.25,
            y: 0.35,
            last_shot_at: "2025-04-23T10:00:00Z",
          },
          {
            id: "5",
            sessionId: "2",
            makes: 4,
            attempts: 6,
            x: 0.15,
            y: 0.25,
            last_shot_at: "2025-04-23T10:05:00Z",
          },
        ],
      },
      {
        id: "3",
        name: "Session 3",
        date: "Apr 20, 2025",
        shots: [
          {
            id: "6",
            sessionId: "3",
            makes: 6,
            attempts: 10,
            x: 0.35,
            y: 0.45,
            last_shot_at: "2025-04-20T10:00:00Z",
          },
          {
            id: "7",
            sessionId: "3",
            makes: 2,
            attempts: 4,
            x: 0.55,
            y: 0.65,
            last_shot_at: "2025-04-20T10:05:00Z",
          },
        ],
      },
      {
        id: "4",
        name: "Session 4",
        date: "Apr 18, 2025",
        shots: [
          {
            id: "8",
            sessionId: "4",
            makes: 3,
            attempts: 5,
            x: 0.45,
            y: 0.55,
            last_shot_at: "2025-04-18T10:00:00Z",
          },
          {
            id: "9",
            sessionId: "4",
            makes: 1,
            attempts: 2,
            x: 0.65,
            y: 0.75,
            last_shot_at: "2025-04-18T10:05:00Z",
          },
        ],
      },
    ];
  },

  saveSessionData: async (sessionData: Session): Promise<void> => {},
};
