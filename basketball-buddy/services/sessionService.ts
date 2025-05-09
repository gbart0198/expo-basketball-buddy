import { Session } from "@/models/Session";

export const SessionService = {
    getSessionData: async (): Promise<Session[]> => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return [
            {
                date: "Apr 25, 2025",
                shots: [
                    { made: true, x: 100, y: 200, timestamp: "2023-04-25T10:00:00Z" },
                    { made: true, x: 150, y: 250, timestamp: "2023-04-25T10:05:00Z" },
                    { made: true, x: 200, y: 300, timestamp: "2023-04-25T10:10:00Z" },
                ]
            },
            {
                date: "Apr 23, 2025",
                shots: [
                    { made: true, x: 120, y: 220, timestamp: "2023-04-23T10:00:00Z" },
                    { made: false, x: 170, y: 270, timestamp: "2023-04-23T10:05:00Z" },
                    { made: true, x: 220, y: 320, timestamp: "2023-04-23T10:10:00Z" },
                ]
            },
            {
                date: "Apr 20, 2025",
                shots: [
                    { made: true, x: 140, y: 240, timestamp: "2023-04-20T10:00:00Z" },
                    { made: false, x: 190, y: 290, timestamp: "2023-04-20T10:05:00Z" },
                    { made: false, x: 240, y: 340, timestamp: "2023-04-20T10:10:00Z" },
                ]
            },
            {
                date: "Apr 18, 2025",
                shots: [
                    { made: true, x: 160, y: 260, timestamp: "2023-04-18T10:00:00Z" },
                    { made: false, x: 210, y: 310, timestamp: "2023-04-18T10:05:00Z" },
                    { made: true, x: 260, y: 360, timestamp: "2023-04-18T10:10:00Z" },
                ]
            }

        ]
    },

    saveSessionData: async (sessionData: Session): Promise<void> => {
    },
}
