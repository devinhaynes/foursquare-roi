import { PropertyDerivedValues } from "@/lib/state/properties/types";
import { SupabaseClient } from "@supabase/supabase-js";

export type Property = {
  id: number;
  created_at: Date;
  address: string;
  property_cost: number;
  rent: number;
  additional_income: number;
  tax: number;
  insurance: number;
  utilities: number;
  vacancy: number;
  monthly_repairs: number;
  capex: number;
  property_management: number;
  mortgage: number;
  other_expenses: number;
  down_payment: number;
  closing_costs: number;
  upfront_repairs: number;
  user_id: string;
};

// This datatype represents a property before it is submitted to the DB
export type PreflightProperty = Omit<Property, "id" | "created_at">;

export type PropertyWithDerived = Property & PropertyDerivedValues;

// GET all properties
export const getProperties = async () => {
  try {
    const res = await fetch("/api/properties");

    if (!res.ok) throw new Error(await res.text());
    let data = await res.json();
    data = normalizeProperty(data);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return [];
  }
};

// GET single property
export const getProperty = async (
  supabase: SupabaseClient,
  id: number
): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select()
      .eq("id", id)
      .limit(1)
      .single();

    if (error) {
      console.error("Error", error.message);
    }
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return null;
  }
};

// POST property
export const postProperty = async (property: PreflightProperty) => {
  try {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
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
export const updateProperty = async (
  supabase: SupabaseClient,
  id: number,
  newValues: Partial<Property>
) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .update(newValues)
      .eq("id", id);
    if (error) {
      console.error("Error", error.message);
    }
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error", e.message);
    }
    return null;
  }
};

// DELETE property
export const deleteProperties = async (ids: number[]) => {
  try {
    const res = await fetch("/api/properties", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
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

// Helper functions

const derivePropertyValues = (property: Property) => {
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
  } = property;
  // Calc monthly income
  const monthly_income = rent + additional_income;
  // Calc monthly expenses
  const monthly_expenses =
    vacancy +
    tax +
    insurance +
    monthly_repairs +
    utilities +
    mortgage +
    capex +
    other_expenses +
    property_management;
  // Calc monthly cashflow
  const monthly_cashflow = monthly_income - monthly_expenses;
  // Calc annual cashflow
  const annual_cashflow = monthly_cashflow * 12;
  // Calc total investments
  const total_investments = down_payment + closing_costs + upfront_repairs;
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

const normalizeProperty = (d: Property[]): PropertyWithDerived[] => {
  // Add derived values
  if (d) {
    return d.map((v) => {
      const derivedValues: PropertyDerivedValues = derivePropertyValues(v);
      const newObj: PropertyWithDerived = Object.assign({}, v, derivedValues);
      return newObj;
    });
  }
  return [];
};
