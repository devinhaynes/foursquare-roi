import { recalculateAutoValue } from "../helpers";
import {
  defaultFormState,
  FormKey,
  ROIState,
  SelectableFormKey,
  SelectorType,
} from "./types";

type Action =
  | {
      type: "SET_SELECTOR";
      key: SelectableFormKey;
      value: SelectorType;
    }
  | { type: "SET_VALUE"; key: FormKey; value: number | string }
  | { type: "RESET" };

export const reducer = (state: ROIState, action: Action) => {
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
      // Many values can be based on a percentage of another value
      // ie. Expecting 10% of your monthly income to go towards a property manager
      // or the down payment is typically 20% of the house price
      if (action.key === "rent" || action.key === "property_cost") {
        // TODO - Need to update this to account for total monthly income vs just rent
        // Find fields that are set to auto
        const fields: SelectableFormKey[] =
          action.key === "rent"
            ? ["vacancy", "monthly_repairs", "capex", "property_management"]
            : ["down_payment", "closing_costs"];

        const listeners = Object.keys(state)
          .filter((key) => fields.includes(key as SelectableFormKey))
          .reduce((obj, key) => {
            if (state[key as SelectableFormKey].selector === "auto") {
              // @ts-expect-error javascript is dumb (jk I love you JS)
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
          [action.key]:
            typeof action.value === "number"
              ? parseFloat(action.value.toFixed(2))
              : action.value,
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
