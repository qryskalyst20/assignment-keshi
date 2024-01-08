import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SessionType = {
  id: string;
  email: string;
  sessionToken: string;
  password: string;
};

type SessionStore = {
  session: SessionType | null;
  setSession: (session: SessionType | null) => void;
};

export const useSessionStore = create(
  persist<SessionStore>(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
