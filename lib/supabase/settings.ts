import { Percentages, SettingsState, Theme } from "../state/settings/types";

export type UserSettings = {
  id: number;
  created_at: Date;
  user_id: string;
  theme: Theme;
  accent_color: string;
  percentages: Percentages;
};

// GET settings
export const getSettings = async () => {
  try {
    const res = await fetch("/api/settings");

    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as UserSettings;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return null;
  }
};

// POST property -- This should only be called on sign up
export const postSettings = async (settings: SettingsState) => {
  try {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error", e.message);
    }
    return null;
  }
};

// PUT property
export const updateSettings = async (settings: SettingsState) => {
  try {
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error", e.message);
    }
    return null;
  }
};
