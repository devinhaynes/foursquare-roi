"use client";

import { ActionDispatch, createContext, ReactNode, useReducer } from "react";

type SelectorType = "auto" | "manual" | "percentage";

export type Selectable = {
  value: number;
  selector: SelectorType;
};

type TFormContext = {
  house_cost: number;
  rent: number;
  additional_income: number;
  total_income: number;
  tax: number;
  insurance: number;
  utilities: number;
  vacancy: number;
  monthly_repairs: number;
  capex: number;
  property_management: Selectable;
  mortgage: number;
  other: number;
  total_expenses: number;
  down_payment: number;
  closing_costs: number;
  repairs: number;
  monthly_cashflow: number;
  annual_cashflow: number;
  roi: number;
};

export const defaultFormState: TFormContext = {
  house_cost: 0,
  rent: 0,
  additional_income: 0,
  total_income: 0,
  tax: 0,
  insurance: 0,
  utilities: 0,
  vacancy: 0,
  monthly_repairs: 0,
  capex: 0,
  property_management: {
    value: 0,
    selector: "auto",
  },
  mortgage: 0,
  other: 0,
  total_expenses: 0,
  down_payment: 0,
  closing_costs: 0,
  repairs: 0,
  monthly_cashflow: 0,
  annual_cashflow: 0,
  roi: 0,
};

export const FormContext = createContext<{
  form: TFormContext;
  dispatchForm: ActionDispatch<[action: FormAction]>;
}>({ form: defaultFormState, dispatchForm: () => {} });

type FormActionType = "UPDATE_SELECTOR" | "UPDATE_VALUE";

export type FormKey = keyof TFormContext;

type FormActionValue = {
  formKey: FormKey;
  value: string | number;
};

type FormAction = {
  type: FormActionType;
  value: FormActionValue;
};

const FormReducer = (state: TFormContext, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_SELECTOR":
      return {
        ...state,
        [action.value.formKey]: {
          value: (state[action.value.formKey] as Selectable).value,
          selector: action.value.value,
        },
      };
    case "UPDATE_VALUE":
      // Does this have a selector
      if (typeof state[action.value.formKey] === "object") {
        return {
          ...state,
          [action.value.formKey]: {
            ...[action.value.formKey],
            value: action.value.value,
            selector: "manual",
          },
        };
      }
      return { ...state, [action.value.formKey]: action.value.value };
    default:
      return state;
  }
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, dispatchForm] = useReducer(FormReducer, defaultFormState);
  return (
    <FormContext.Provider value={{ form, dispatchForm }}>
      {children}
    </FormContext.Provider>
  );
};
