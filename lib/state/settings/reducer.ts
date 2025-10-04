import { initialSettings, Percentages, SettingsState, Theme } from "./types";

export type SettingsAction =
  | {
      type: "SET_THEME";
      value: Theme;
    }
  | { type: "SET_ACCENT"; value: string }
  | {
      type: "SET_PERCENTAGES";
      value: Partial<Percentages>;
    }
  | { type: "SET_SETTINGS"; value: SettingsState }
  | { type: "RESET"; value: "dark" | "light" };

export const reducer = (state: SettingsState, action: SettingsAction) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.value };
    case "SET_ACCENT":
      return { ...state, accent_color: action.value };
    case "SET_PERCENTAGES":
      return {
        ...state,
        percentages: { ...state.percentages, ...action.value },
      };
    case "SET_SETTINGS":
      return state;
    case "RESET":
      return {
        ...initialSettings,
        accent_color: action.value === "light" ? "#171717" : "#ededed",
      };
    default:
      return state;
  }
};
