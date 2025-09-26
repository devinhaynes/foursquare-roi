"use client";

import { MdSave, MdDeleteSweep, MdImportExport } from "react-icons/md";
import { Input } from "./Input";
import { useROI } from "@/lib/state";
import { Totals } from "./Totals";

export const ROI = () => {
  const { derived, actions } = useROI();
  return (
    <div className="font-sans flex flex-col gap-8 px-2 mt-4 mb-20 items-center mx-auto relative">
      <div className="border-2 dark:border-white rounded-lg w-full text-3xl p-2 sticky top-4 bg-[var(--background)] flex justify-between items-center">
        <h1 className="text-2xl uppercase">ROI Calculator</h1>
        <div className="flex gap-2">
          <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
            <MdImportExport />
          </button>
          <button
            onClick={() => alert("Totally saved....")}
            className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full"
          >
            <MdSave />
          </button>
          <button
            onClick={() => actions.reset()}
            className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full"
          >
            <MdDeleteSweep />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white">
          <h2 className="text-2xl pb-8 ">House Info</h2>
          <Input formId="house_cost" label="Property cost" />{" "}
        </div>
        <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white">
          <div className="flex justify-between">
            <h2 className="text-2xl pb-8 ">Income</h2>
            <p className="text-xl text-green-700">+${derived.monthly_income}</p>
          </div>
          <Input formId="rent" label="Rent" />{" "}
          <Input formId="additional_income" label="Additional Income" />
        </div>
        <div className="flex flex-col gap-2 p-4 border-2 rounded-lg dark:border-white md:row-span-2  xl:row-span-1 xl:col-span-3 xl:grid xl:grid-cols-subgrid xl:place-items-center">
          <div className="flex justify-between col-span-3 mr-auto w-full">
            <h2 className="text-2xl pb-8 ">Expenses</h2>
            <p className="text-xl text-red-700">-${derived.monthly_expenses}</p>
          </div>
          <Input formId="vacancy" label="Vacancy" isSelector />
          <Input formId="tax" label="Tax" />{" "}
          <Input formId="insurance" label="Insurance" />
          <Input formId="monthly_repairs" label="Repairs" isSelector />{" "}
          <Input formId="utilities" label="Utilities" />{" "}
          <Input formId="mortgage" label="Mortgage" />{" "}
          <Input formId="capex" label="Capital Expenditures" isSelector />
          <Input formId="other" label="Other" />
          <div className="col-start-1">
            <Input
              formId="property_management"
              label="Property Management"
              isSelector
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white xl:col-start-3 xl:row-start-1">
          <div className="flex justify-between">
            <h2 className="text-2xl pb-8 ">Investments</h2>
            <p className="text-xl text-red-700">
              -${derived.total_investments}
            </p>
          </div>
          <Input formId="down_payment" label="Down Payment" isSelector />{" "}
          <Input formId="closing_costs" label="Closing Costs" isSelector />
          <Input formId="repairs" label="Repairs" />{" "}
        </div>
        <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white xl:col-span-3">
          <h2 className="text-2xl pb-2 col-span-3 mr-auto">Totals</h2>
          <div className="flex gap-4">
            <Totals
              label="Monthly Cashflow"
              value={derived.monthly_cashflow}
              type="currency"
            />
            <Totals
              label="Annual Cashflow"
              value={derived.annual_cashflow}
              type="currency"
            />
            <Totals
              label="Cash on Cash ROI"
              value={parseFloat(derived.roi.toFixed(2))}
              type="percentage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
