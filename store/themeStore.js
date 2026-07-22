import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const themeMeta = {
  glass: {
    label: "Glassmorphism",
    description: "Frosted, translucent surfaces over a vibrant backdrop",
  },
  gradient: {
    label: "Gradient",
    description: "Bold blue→purple gradients across surfaces",
  },
  neumorph: {
    label: "Neumorphism",
    description: "Soft, extruded surfaces with dual shadows",
  },
};

export const themeStyles = {
  glass: {
    card: {
      backgroundColor: "rgba(15, 23, 42, 0.88)",
      borderColor: "rgba(148, 163, 184, 0.14)",
      borderWidth: 1,
      shadowColor: "#0f172a",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.16,
      shadowRadius: 18,
      elevation: 6,
    },
    button: {
      shadowColor: "#38bdf8",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4,
    },
    switch: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
  },
  gradient: {
    card: {
      backgroundColor: "#111827",
      borderColor: "#4f46e5",
      borderWidth: 1,
      shadowColor: "#7c3aed",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.22,
      shadowRadius: 16,
      elevation: 7,
    },
    button: {
      shadowColor: "#7c3aed",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 12,
      elevation: 4,
    },
    switch: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 5,
    },
  },
  neumorph: {
    card: {
      backgroundColor: "#111827",
      borderColor: "#111827",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.24,
      shadowRadius: 14,
      elevation: 5,
    },
    button: {
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
      elevation: 4,
    },
    switch: {
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 6,
    },
  },
};

export const useThemeStore = create(
  persist(
    (set) => ({
      style: "glass",

      setStyle: (style) => set({ style }),
    }),
    {
      name: "gasguard-theme",

      // ✅ REQUIRED FOR REACT NATIVE
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);