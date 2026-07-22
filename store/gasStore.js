import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const GAS_STATE = {
  SAFE: "SAFE",
  WARNING: "WARNING",
  DANGER: "DANGER",
};

const computeState = (level, warn, danger) => {
  if (level >= danger) return "DANGER";
  if (level >= warn) return "WARNING";
  return "SAFE";
};

const generateId = () =>
  Date.now().toString() + Math.random().toString(16);

/* =========================
   STORE
   ========================= */
export const useGasStore = create(
  persist(
    (set, get) => ({
      level: 100,
      state: GAS_STATE.SAFE,
      valveOpen: true,

      readings: [],
      alerts: [],
      logs: [],

      settings: {
        warningThreshold: 40,
        dangerThreshold: 70,
        notifications: true,
        soundAlerts: true,
        autoShutoff: true,
      },

      setLevel: (level) => {
        const {
          settings,
          state: prevState,
          valveOpen,
          readings,
          alerts,
          logs,
        } = get();

        const newState = computeState(
          level,
          settings.warningThreshold,
          settings.dangerThreshold
        );

        const ts = Date.now();

        const reading = {
          id: generateId(),
          level,
          state: newState,
          timestamp: ts,
        };

        const newReadings = [reading, ...readings].slice(0, 200);

        let newAlerts = alerts;

        let newLogs = [
          {
            id: generateId(),
            type: "reading",
            message: `Reading ${level.toFixed(1)} PPM (${newState})`,
            timestamp: ts,
          },
          ...logs,
        ].slice(0, 300);

        // ALERT STREAM
        if (newState !== "SAFE") {
          const message =
            newState === "DANGER"
              ? `Critical leak detected — gas concentration ${level.toFixed(1)} PPM`
              : `Warning threshold reached — gas concentration ${level.toFixed(1)} PPM`;

          if (settings.notifications) {
            newAlerts = [
              {
                id: generateId(),
                level,
                state: newState,
                message,
                timestamp: ts,
                read: false,
              },
              ...newAlerts,
            ].slice(0, 100);
          }

          newLogs = [
            {
              id: generateId(),
              type: "alert",
              message,
              timestamp: ts,
            },
            ...newLogs,
          ].slice(0, 300);
        }

        // AUTO SHUTOFF
        let nextValveOpen = valveOpen;

        if (
          newState === "DANGER" &&
          valveOpen &&
          settings.autoShutoff
        ) {
          nextValveOpen = false;

          newLogs = [
            {
              id: generateId(),
              type: "action",
              message: "Auto-shutoff engaged — valve CLOSED",
              timestamp: ts,
            },
            ...newLogs,
          ].slice(0, 300);
        }

        set({
          level,
          state: newState,
          valveOpen: nextValveOpen,
          readings: newReadings,
          alerts: newAlerts,
          logs: newLogs,
        });
      },

      manualShutoff: () => {
        const ts = Date.now();

        set({
          valveOpen: false,
          logs: [
            {
              id: generateId(),
              type: "action",
              message: "Manual shutoff activated",
              timestamp: ts,
            },
            ...get().logs,
          ].slice(0, 300),
        });
      },

      reopenValve: () => {
        const ts = Date.now();

        set({
          valveOpen: true,
          logs: [
            {
              id: generateId(),
              type: "action",
              message: "Valve reopened",
              timestamp: ts,
            },
            ...get().logs,
          ].slice(0, 300),
        });
      },

      markAlertRead: (id) =>
        set({
          alerts: get().alerts.map((a) =>
            a.id === id ? { ...a, read: true } : a
          ),
        }),

      markAllRead: () =>
        set({
          alerts: get().alerts.map((a) => ({
            ...a,
            read: true,
          })),
        }),

      clearAlerts: () => set({ alerts: [] }),

      clearHistory: () => set({ logs: [] }),

      updateSettings: (s) =>
        set({
          settings: {
            ...get().settings,
            ...s,
          },
        }),
    }),
    {
      name: "BRYTECH",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        settings: s.settings,
        alerts: s.alerts,
        logs: s.logs.slice(0, 100),
      }),
    }
  )
);