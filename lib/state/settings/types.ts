import { FormKey } from "../properties/types";
import { SelectableFormKey } from "../properties/types";

export type Theme = "system" | "dark" | "light";

export type Percentages = {
  [K in SelectableFormKey]: FormKey;
};

export type SettingsState = {
  theme: "system" | "dark" | "light";
  accent_color: string;
  percentages: Percentages;
};

export const initialSettings: SettingsState = {
  theme: "system",
  accent_color: "#ededed",
  percentages: {
    vacancy: "rent",
    monthly_repairs: "rent",
    capex: "rent",
    property_management: "rent",
    down_payment: "property_cost",
    closing_costs: "property_cost",
  },
};
