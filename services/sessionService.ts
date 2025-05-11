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
                    { id: "1", sessionId: "1", makes: 5, attempts: 10, x: 50, y: 50, last_shot_at: "2025-04-25T10:00:00Z" },
                    { id: "2", sessionId: "1", makes: 3, attempts: 5, x: 100, y: 100, last_shot_at: "2025-04-25T10:05:00Z" },
                    { id: "3", sessionId: "1", makes: 2, attempts: 8, x: 150, y: 150, last_shot_at: "2025-04-25T10:10:00Z" },
                ],
            },
            {
                id: "2",
                name: "Session 2",
                date: "Apr 23, 2025",
                shots: [
                    { id: "4", sessionId: "2", makes: 7, attempts: 10, x: 200, y: 200, last_shot_at: "2025-04-23T10:00:00Z" },
                    { id: "5", sessionId: "2", makes: 4, attempts: 5, x: 250, y: 250, last_shot_at: "2025-04-23T10:05:00Z" },
                    { id: "6", sessionId: "2", makes: 1, attempts: 8, x: 300, y: 300, last_shot_at: "2025-04-23T10:10:00Z" },
                ],
            },
            {
                id: "3",
                name: "Session 3",
                date: "Apr 20, 2025",
                shots: [
                    { id: "7", sessionId: "3", makes: 6, attempts: 10, x: 300, y: 350, last_shot_at: "2025-04-20T10:00:00Z" },
                    { id: "10", sessionId: "3", makes: 6, attempts: 7, x: 120, y: 75, last_shot_at: "2025-04-20T10:00:00Z" },
                    { id: "8", sessionId: "3", makes: 2, attempts: 5, x: 110, y: 25, last_shot_at: "2025-04-20T10:05:00Z" },
                    { id: "9", sessionId: "3", makes: 3, attempts: 8, x: 120, y: 250, last_shot_at: "2025-04-20T10:10:00Z" },
                ],
            },
            {
                id: "4",
                name: "Session 4",
                date: "Apr 18, 2025",
                shots: [
                    { id: "10", sessionId: "4", makes: 8, attempts: 10, x: 250, y: 120, last_shot_at: "2025-04-18T10:00:00Z" },
                    { id: "11", sessionId: "4", makes: 5, attempts: 5, x: 330, y: 200, last_shot_at: "2025-04-18T10:05:00Z" },
                    { id: "12", sessionId: "4", makes: 4, attempts: 8, x: 400, y: 25, last_shot_at: "2025-04-18T10:10:00Z" },
                ],
            },
        ];
    },

    saveSessionData: async (sessionData: Session): Promise<void> => { },
};
