"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

export type SelectorType = "auto" | "manual" | "percentage";

export type Selectable = {
  value: number;
  selector: SelectorType;
};

export type ROIState = {
  house_cost: number;
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
  other: number;
  total_expenses: number;
  down_payment: Selectable;
  closing_costs: Selectable;
  repairs: number;
  monthly_cashflow: number;
  annual_cashflow: number;
  roi: number;
};

export type ROIField = keyof ROIState;

export const defaultFormState: ROIState = {
  house_cost: 0,
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
  other: 0,
  total_expenses: 0,
  down_payment: {
    value: 0,
    selector: "auto",
  },
  closing_costs: {
    value: 0,
    selector: "auto",
  },
  repairs: 0,
  monthly_cashflow: 0,
  annual_cashflow: 0,
  roi: 0,
};

export type ROIDerived = {
  monthly_income: number;
  monthly_expenses: number;
  monthly_cashflow: number;
  annual_cashflow: number;
  total_investments: number;
  roi: number;
};

type ROIContextValue = {
  state: ROIState;
  derived: ROIDerived;
  actions: {
    setValue: (key: FormKey, value: number) => void;
    setSelector: (key: SelectableFormKey, value: SelectorType) => void;
    reset: () => void;
  };
};

export const ROIContext = createContext<ROIContextValue | null>(null);

export type FormKey = keyof ROIState;

export type SelectableFormKey =
  | "vacancy"
  | "monthly_repairs"
  | "capex"
  | "property_management"
  | "down_payment"
  | "closing_costs";

type Action =
  | {
      type: "SET_SELECTOR";
      key: SelectableFormKey;
      value: SelectorType;
    }
  | { type: "SET_VALUE"; key: FormKey; value: number }
  | { type: "RESET" };

const reducer = (state: ROIState, action: Action) => {
  switch (action.type) {
    case "SET_SELECTOR":
      if (action.value === "auto") {
        return {
          ...state,
          [action.key]: {
            value: recalculateAutoValue(state, action.key),
            selector: action.value,
          },
        };
      } else {
        return {
          ...state,
          [action.key]: {
            ...[state[action.key]],
            selector: action.value,
          },
        };
      }

    case "SET_VALUE":
      if (action.key === "rent" || action.key === "house_cost") {
        // return updateListeners(state, action.key, action.value);
        // // Find fields that are set to auto
        const fields: SelectableFormKey[] =
          action.key === "rent"
            ? ["vacancy", "monthly_repairs", "capex", "property_management"]
            : ["down_payment", "closing_costs"];

        const listeners = Object.keys(state)
          .filter((key) => fields.includes(key as SelectableFormKey))
          .reduce((obj, key) => {
            if (state[key as SelectableFormKey].selector === "auto") {
              // @ts-expect-error javascript is dumb
              obj[key] = {
                ...state[key as SelectableFormKey],
                value: recalculateAutoValue(
                  { ...state, [action.key]: action.value },
                  key as SelectableFormKey
                ),
              };
              return obj;
            }
            return obj;
          }, {});

        return {
          ...state,
          [action.key]: action.value,
          ...listeners,
        };
      }
      // Does this have a selector
      if (typeof state[action.key] === "object") {
        return {
          ...state,
          [action.key]: {
            ...[action.key],
            value: action.value,
            selector: "manual",
          },
        };
      }
      return { ...state, [action.key]: action.value };

    case "RESET":
      return defaultFormState;

    default:
      return state;
  }
};

export const FormProvider = ({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: Partial<ROIState>;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultFormState,
    ...initial,
  });

  const derived = useMemo(() => derive(state), [state]);

  const value = useMemo<ROIContextValue>(() => {
    return {
      state,
      derived,
      actions: {
        setValue: (key, value) => dispatch({ type: "SET_VALUE", key, value }),
        setSelector: (key, value) =>
          dispatch({ type: "SET_SELECTOR", key, value }),
        reset: () => dispatch({ type: "RESET" }),
      },
    };
  }, [state, derived]);
  return <ROIContext.Provider value={value}>{children}</ROIContext.Provider>;
};

const recalculateAutoValue = (state: ROIState, formKey: FormKey): number => {
  let newValue = (state[formKey] as Selectable).value;
  const { house_cost } = state;
  const { monthly_income } = derive(state);
  switch (formKey) {
    case "vacancy":
      newValue = monthly_income * 0.05;
      break;
    case "monthly_repairs":
      newValue = monthly_income * 0.08;
      break;
    case "capex":
      newValue = monthly_income * 0.08;
      break;
    case "property_management":
      newValue = monthly_income * 0.1;
      break;
    case "down_payment":
      newValue = house_cost * 0.2;
      break;
    case "closing_costs":
      newValue = house_cost * 0.04;
    default:
      break;
  }
  return newValue;
};

const derive = (state: ROIState): ROIDerived => {
  const {
    rent,
    additional_income,
    vacancy,
    tax,
    insurance,
    monthly_repairs,
    utilities,
    mortgage,
    capex,
    other,
    property_management,
    down_payment,
    closing_costs,
    repairs,
  } = state;
  // Calc monthly income
  const monthly_income = rent + additional_income;
  // Calc monthly expenses
  const monthly_expenses =
    vacancy.value +
    tax +
    insurance +
    monthly_repairs.value +
    utilities +
    mortgage +
    capex.value +
    other +
    property_management.value;
  // Calc monthly cashflow
  const monthly_cashflow = monthly_income - monthly_expenses;
  // Calc annual cashflow
  const annual_cashflow = monthly_cashflow * 12;
  // Calc total investments
  const total_investments = down_payment.value + closing_costs.value + repairs;
  // Calc ROI
  const roi = (annual_cashflow / total_investments) * 100;

  return {
    monthly_income,
    monthly_expenses,
    monthly_cashflow,
    annual_cashflow,
    total_investments,
    roi,
  };
};

// Hook
export function useROI() {
  const ctx = useContext(ROIContext);
  if (!ctx) throw new Error("useROI must be used within an ROIProvider");
  return ctx;
}
