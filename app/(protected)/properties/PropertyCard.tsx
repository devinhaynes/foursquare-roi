"use client";

import { PropertyWithDerived } from "@/lib/supabase/properties";
import { Dispatch, SetStateAction } from "react";

type Props = {
  property: PropertyWithDerived;
  state: {
    selectedProperties: number[];
    setSelectedProperties: Dispatch<SetStateAction<number[]>>;
  };
};

export const PropertyCard = ({
  property,
  state: { selectedProperties, setSelectedProperties },
}: Props) => {
  const isSelected = selectedProperties.includes(property.id);
  return (
    <div
      key={property.id}
      className="relative flex flex-col p-1 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] hover:scale-[1.01] hover:outline-zinc-700 transition-colors | md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3] md:dark:hover:shadow-[0_0_8px_-4px_#a9a9a9]"
      onClick={() => {
        if (isSelected) {
          setSelectedProperties(
            selectedProperties.filter((id) => id !== property.id)
          );
        } else {
          setSelectedProperties([...selectedProperties, property.id]);
        }
      }}
    >
      <div
        className={`appearance-none h-4 w-4 rounded-full transition-all border-2 ${
          isSelected
            ? "bg-teal-600 border-zinc-200"
            : "bg-zinc-400/10 border-zinc-700"
        }`}
      ></div>
      <div className="flex flex-col gap-4 p-4 pt-1">
        <div className="flex justify-between gap-4 items-center">
          <h2 className="text-lg grow">{property.address}</h2>
          <p
            className={`px-2 py-1 rounded-lg ${
              property.roi > 0
                ? "bg-emerald-400 dark:bg-emerald-700"
                : property.roi < 0
                ? "bg-rose-400 dark:bg-rose-700"
                : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          >
            {parseFloat(property.roi.toFixed(2))}%
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            <div>
              <p>Monthly Income</p>
              <p>{property.monthly_income}</p>
            </div>
            <div>
              <p>Monthly Expenses</p>
              <p>{property.monthly_expenses}</p>
            </div>
            <div>
              <p>Monthly Cashflow</p>
              <p>{property.monthly_cashflow}</p>
            </div>
            <div>
              <p>Annual Cashflow</p>
              <p>{property.annual_cashflow}</p>
            </div>
            <div>
              <p>Total Investments</p>
              <p>{property.total_investments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
