"use client";

import { formatField } from "@/lib/helpers";
import { PropertyWithDerived } from "@/lib/supabase/properties";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

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
  const [showDetails, setShowDetails] = useState(false);
  const isSelected = selectedProperties.includes(property.id);

  const {
    monthly_cashflow,
    annual_cashflow,
    roi,
    property_cost,
    address,
    bedrooms,
    bathrooms,
    rent,
    additional_income,
    monthly_income,
    tax,
    insurance,
    utilities,
    vacancy,
    monthly_repairs,
    capex,
    property_management,
    mortgage,
    other_expenses,
    monthly_expenses,
    down_payment,
    closing_costs,
    upfront_repairs,
    total_investments,
  } = property;

  const propertyDetails = {
    property_cost,
    address,
    bedrooms: bedrooms ?? "N/A",
    bathrooms: bathrooms ?? "N/A",
  };

  const income = {
    rent,
    additional_income,
    monthly_income,
  };

  const expenses = {
    tax,
    insurance,
    utilities,
    vacancy,
    monthly_repairs,
    capex,
    property_management,
    mortgage,
    other_expenses,
    monthly_expenses,
  };

  const investments = {
    down_payment,
    closing_costs,
    upfront_repairs,
    total_investments,
  };

  return (
    <div
      key={property.id}
      className="isolate overflow-hidden h-fit relative flex flex-col bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg transition-all | md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3] md:dark:hover:shadow-[0_0_8px_-4px_#a9a9a9]"
    >
      <div className="bg-white dark:bg-zinc-950 z-10">
        <div
          onClick={() => {
            if (isSelected) {
              setSelectedProperties(
                selectedProperties.filter((id) => id !== property.id)
              );
            } else {
              setSelectedProperties([...selectedProperties, property.id]);
            }
          }}
          className={`m-1 appearance-none h-4 w-4 rounded-full transition-all border-2 hover:border-zinc-200 ${
            isSelected
              ? "bg-teal-600 border-zinc-200"
              : "bg-zinc-400/10 border-zinc-700"
          }`}
        ></div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between gap-4 items-center">
            <h2 className="text-lg grow">{property.address}</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex flex-col">
              <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                Monthly Cashflow
              </p>
              <p className="text-lg font-bold text-center text-emerald-700">
                {monthly_cashflow}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                Annual Cashflow
              </p>
              <p className="text-lg font-bold text-center text-emerald-700">
                {annual_cashflow}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                Cash on Cash ROI
              </p>
              <p className="text-lg font-bold text-center text-emerald-700">
                {parseFloat(roi.toFixed(2))}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-white dark:bg-zinc-950 z-10">
        <div className="grow h-[1px] bg-zinc-800"></div>
        <button
          onClick={() => setShowDetails((details) => !details)}
          className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-(--foreground) hover:text-(--background) transition-colors outline-1 outline-zinc-800"
        >
          {/* <span className="text-sm">More</span> */}
          <FaCaretDown className="text-2xl" />
        </button>
        <div className="w-[5%] h-[1px] bg-zinc-800"></div>
      </div>

      <div className="flex flex-col p-4 pt-1 bg-white dark:bg-zinc-950">
        <div
          className={`${
            showDetails ? "" : "-mt-[100%] -z-10"
          } transition-all pt-4 gap-4`}
        >
          <div className="flex flex-col gap-4">
            <p className="uppercase font-semibold">Property Details</p>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(propertyDetails).map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                    {formatField(k)}
                  </p>
                  <p className="text-lg ">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <p className="uppercase font-semibold">Income</p>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(income).map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                    {formatField(k)}
                  </p>
                  <p className="text-lg ">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <p className="uppercase font-semibold">Expenses</p>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(expenses).map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                    {formatField(k)}
                  </p>
                  <p className="text-lg ">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <p className="uppercase font-semibold">Investments</p>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(investments).map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <p className="border-b-[1px] border-b-zinc-800 mb-1 text-sm">
                    {formatField(k)}
                  </p>
                  <p className="text-lg ">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
