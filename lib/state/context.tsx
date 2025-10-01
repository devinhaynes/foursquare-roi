"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  defaultFormState,
  FormKey,
  ROIDerived,
  ROIState,
  SelectableFormKey,
  SelectorType,
} from "./types";
import { reducer } from "./reducer";
import { derive } from "../helpers";

type ROIContextValue = {
  state: ROIState;
  derived: ROIDerived;
  actions: {
    setValue: (key: FormKey, value: number | string) => void;
    setSelector: (key: SelectableFormKey, value: SelectorType) => void;
    reset: () => void;
  };
};

export const ROIContext = createContext<ROIContextValue | null>(null);

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

// Hook
export function useROI() {
  const ctx = useContext(ROIContext);
  if (!ctx) throw new Error("useROI must be used within an ROIProvider");
  return ctx;
}
