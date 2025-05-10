import { Session } from '@/models/Session';
import { create } from 'zustand';

type SessionState = {
    currentSession: Session | null;
    setCurrentSession: (session: Session | null) => void;
    clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    currentSession: null,
    setCurrentSession: (session) => set({ currentSession: session }),
    clearSession: () => set({ currentSession: null }),
}));
