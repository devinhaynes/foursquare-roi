"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { initialSettings, Percentages, SettingsState, Theme } from "./types";
import { reducer } from "./reducer";
import { getSettings } from "@/lib/supabase/settings";

type SettingsContextValue = {
  state: SettingsState;
  actions: {
    setTheme: (theme: Theme) => void;
    setAccent: (color: string) => void;
    setPercentages: (percentages: Partial<Percentages>) => void;
    setSettings: (settings: SettingsState) => void;
    reset: (mode: "dark" | "light") => void;
  };
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

type SettingsProviderProps = {
  children: ReactNode;
  initial?: Partial<SettingsState>;
};

export const SettingsProvider = ({
  children,
  initial,
}: SettingsProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialSettings,
    ...initial,
  });

  const value = useMemo<SettingsContextValue>(() => {
    return {
      state,
      actions: {
        setTheme: (theme) => dispatch({ type: "SET_THEME", value: theme }),
        setAccent: (color) => dispatch({ type: "SET_ACCENT", value: color }),
        setPercentages: (percentages) =>
          dispatch({ type: "SET_PERCENTAGES", value: percentages }),
        setSettings: (settings) =>
          dispatch({ type: "SET_SETTINGS", value: settings }),
        reset: (mode) => dispatch({ type: "RESET", value: mode }),
      },
    };
  }, [state]);

  async function getUserSettings() {
    const userSettings = await getSettings();
    if (userSettings) {
      // Convert UserSettings to SettingsState
      // eslint-disable-next-line
      const { id, created_at, ...rest } = userSettings;
      // Update state based on DB results
      dispatch({ type: "SET_SETTINGS", value: rest });
    }
  }

  //   Check localStorage for preferred accent color
  useEffect(() => {
    const saved = localStorage.getItem("accent");
    if (saved) dispatch({ type: "SET_ACCENT", value: saved });
  }, []);

  //   If the accent color changes, update localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", state.accent_color);
    // root.style.setProperty("--accent-fore", pickForeground(state.accent_color));
    localStorage.setItem("accent", state.accent_color);
  }, [state.accent_color]);

  useEffect(() => {
    // Get settings from DB
    getUserSettings();
  }, []);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used within the SettingsProvider");
  return ctx;
}
