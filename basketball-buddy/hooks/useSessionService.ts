import { Session } from "@/models/Session";
import { SessionService } from "@/services/sessionService";
import { useState } from "react";

export function useSessionService() {
    const [isLoading, setIsLoading] = useState(false);
    const [sessionData, setSessionData] = useState<Session[]>([]);

    const getSessions = async () => { //todo: fetch by userID or something
        setIsLoading(true);
        try {
            const response = await SessionService.getSessionData()
            if (response && response.length > 0) {
                setSessionData(response);
            } else {
                console.log("No session data found");
                throw new Error("No session data found");
            }
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const saveSessions = async (sessionData: Session) => {
        setIsLoading(true);
        try {
            await SessionService.saveSessionData(sessionData);
        } catch (error) {
            console.error("Error saving sessions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        sessionData,
        getSessions,
        saveSessions,
        isLoading,
    }
}
