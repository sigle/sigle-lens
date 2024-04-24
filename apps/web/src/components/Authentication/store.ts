import { create } from "zustand";

interface AuthenticationState {
  selectProfileOpen: boolean;
  setSelectProfileOpen: (selectProfileOpen: boolean) => void;
  registerProfileOpen: boolean;
  setRegisterProfileOpen: (registerProfileOpen: boolean) => void;
}

export const useAuthenticationStore = create<AuthenticationState>()((set) => ({
  selectProfileOpen: false,
  setSelectProfileOpen: (selectProfileOpen) =>
    set(() => ({ selectProfileOpen })),
  registerProfileOpen: false,
  setRegisterProfileOpen: (registerProfileOpen) =>
    set(() => ({ registerProfileOpen })),
}));
