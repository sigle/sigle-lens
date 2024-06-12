import type { GetApiProfileResponse } from "@/__generated__/opanapi/requests";
import { create } from "zustand";

interface SessionState {
  session?: GetApiProfileResponse;
  setSession: (session: GetApiProfileResponse) => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  session: undefined,
  setSession: (session) => set({ session }),
}));
