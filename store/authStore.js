import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: {},

      login: (email, password) => {
        const key = email.toLowerCase();
        const record = get().users[key];

        if (!record) {
          return { ok: false, error: "No account found" };
        }

        if (record.password !== password) {
          return { ok: false, error: "Wrong password" };
        }

        set({ user: record.user });
        return { ok: true };
      },

      signup: (name, email, password) => {
        const key = email.toLowerCase();

        if (get().users[key]) {
          return { ok: false, error: "User exists" };
        }

        const user = {
          id: Date.now().toString(),
          name,
          email: key,
        };

        set({
          users: {
            ...get().users,
            [key]: { password, user },
          },
          user,
        });

        return { ok: true };
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage), // ✅ CRITICAL FIX
    }
  )
);