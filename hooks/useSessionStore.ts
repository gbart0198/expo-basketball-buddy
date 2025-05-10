import { Session } from '@/models/Session';
import { Platform } from 'react-native';
import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';
import Shot from '@/models/Shot';

type SessionState = {
    currentSession: Session | null;
    setCurrentSession: (session: Session | null) => void;
    clearSession: () => void;
    addShot: (shot: Shot) => void;
    undoLastShot: () => void;
    loadSession: (session: Session) => Promise<void>;
    saveSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set, get) => ({
    currentSession: null,

    setCurrentSession: (session) => set({ currentSession: session }),

    clearSession: () => set({ currentSession: null }),

    addShot: (shot) => {
        const session = get().currentSession;
        if (!session) return;
        const updatedSession = {
            ...session,
            shots: [...(session.shots || []), shot],
        };
        set({ currentSession: updatedSession });
    },

    undoLastShot: () => {
        const session = get().currentSession;
        if (!session) return;
        const updatedSession = {
            ...session,
            shots: session.shots.slice(0, -1),
        };
        set({ currentSession: updatedSession });
    },

    loadSession: async (session) => {
        try {
            const fileUri = FileSystem.documentDirectory + `${session.name}.json`;
            const contents = await FileSystem.readAsStringAsync(fileUri);
            const shots = JSON.parse(contents);
            set({ currentSession: { ...session, shots } });
        } catch (err) {
            console.error("Error loading session file:", err);
        }
    },

    saveSession: async () => {
        const session = get().currentSession;
        if (!session) return;

        try {
            const fileUri = FileSystem.documentDirectory + `${session.name}.json`;
            const data = JSON.stringify(session.shots || []);
            if (Platform.OS === 'web') {
                const fileData = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(fileData);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${session.name}.json`;
                link.click();
                URL.revokeObjectURL(url);
            } else {
                await FileSystem.writeAsStringAsync(fileUri, data);
                console.log("Session saved to", fileUri);
            }
        } catch (error) {
            console.error("Error saving session:", error);
        }
    },
}));
