import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface AuthState {
    userInfo: UserInfo | null;
    login: (userData: UserInfo) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            userInfo: null,
            login: (userData) => set({ userInfo: userData }),
            logout: () => set({ userInfo: null }),
        }),
        {
            name: "werq-auth-storage",
        }
    )
);
