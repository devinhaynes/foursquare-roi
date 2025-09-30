import { FormKey, ROIDerived, ROIState, Selectable } from "@/lib/state/types";
import { PreflightProperty } from "./supabase/properties";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Number to currency function
export const ntc = (n: number) => formatter.format(n);

// Format obj numbers to currency (shallow)
export const convertObjNumbersToCurrency = (
  obj: object,
  exclusions: string[]
) => {
  let newObj = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!exclusions.includes(k) && typeof v === "number") {
      newObj = Object.assign({}, newObj, { [k]: ntc(v) });
    } else {
      newObj = Object.assign({}, newObj, { [k]: v });
    }
  }
  return newObj;
};

// Generate Derived values from state values
export const derive = (state: ROIState): ROIDerived => {
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
    other_expenses,
    property_management,
    down_payment,
    closing_costs,
    upfront_repairs,
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
    other_expenses +
    property_management.value;
  // Calc monthly cashflow
  const monthly_cashflow = monthly_income - monthly_expenses;
  // Calc annual cashflow
  const annual_cashflow = monthly_cashflow * 12;
  // Calc total investments
  const total_investments =
    down_payment.value + closing_costs.value + upfront_repairs;
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

// Calculate values based on a predetermined percentage of another value
export const recalculateAutoValue = (
  state: ROIState,
  formKey: FormKey
): number => {
  let newValue = (state[formKey] as Selectable).value;
  const { property_cost } = state;
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
      newValue = property_cost * 0.2;
      break;
    case "closing_costs":
      newValue = property_cost * 0.04;
    default:
      break;
  }
  return parseFloat(newValue.toFixed(2));
};

export const convertStateToProperty = (state: ROIState): PreflightProperty => {
  const derivedValues = [
    "total_income",
    "total_expenses",
    "monthly_cashflow",
    "annual_cashflow",
    "roi",
  ];

  // Remove derived values and extract values from selectables
  const property = Object.fromEntries(
    Object.entries(state)
      .filter(([k, v]) => !derivedValues.includes(k))
      .map(([k, v]) => (typeof v === "object" ? [k, v.value] : [k, v]))
  );
  return property as PreflightProperty;
};
