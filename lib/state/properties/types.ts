export type SelectorType = "auto" | "manual" | "percentage";

export type Selectable = {
  value: number;
  selector: SelectorType;
};

export type PropertyState = {
  property_cost: number;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  rent: number;
  additional_income: number;
  total_income: number;
  tax: number;
  insurance: number;
  utilities: number;
  vacancy: Selectable;
  monthly_repairs: Selectable;
  capex: Selectable;
  property_management: Selectable;
  mortgage: number;
  other_expenses: number;
  total_expenses: number;
  down_payment: Selectable;
  closing_costs: Selectable;
  upfront_repairs: number;
  monthly_cashflow: number;
  annual_cashflow: number;
  roi: number;
};

export type ROIField = keyof PropertyState;

export const defaultFormState: PropertyState = {
  property_cost: 0,
  address: "",
  rent: 0,
  additional_income: 0,
  total_income: 0,
  tax: 0,
  insurance: 0,
  utilities: 0,
  vacancy: {
    value: 0,
    selector: "auto",
  },
  monthly_repairs: {
    value: 0,
    selector: "auto",
  },
  capex: {
    value: 0,
    selector: "auto",
  },
  property_management: {
    value: 0,
    selector: "auto",
  },
  mortgage: 0,
  other_expenses: 0,
  total_expenses: 0,
  down_payment: {
    value: 0,
    selector: "auto",
  },
  closing_costs: {
    value: 0,
    selector: "auto",
  },
  upfront_repairs: 0,
  monthly_cashflow: 0,
  annual_cashflow: 0,
  roi: 0,
};

export type PropertyDerivedValues = {
  monthly_income: number;
  monthly_expenses: number;
  monthly_cashflow: number;
  annual_cashflow: number;
  total_investments: number;
  roi: number;
};

export type FormKey = keyof PropertyState;

export type SelectableFormKey =
  | "vacancy"
  | "monthly_repairs"
  | "capex"
  | "property_management"
  | "down_payment"
  | "closing_costs";
