"use client";

import { Input } from "./components/Input";
import { FormProvider } from "@/lib/state";
import { MdSave, MdDeleteSweep, MdImportExport } from "react-icons/md";

export default function Home() {
  return (
    <FormProvider>
      <div className="font-sans flex flex-col gap-8 px-2 mt-4 mb-20 items-center mx-auto relative">
        <div className="border-2 dark:border-white rounded-lg w-full text-3xl p-2 sticky top-4 bg-[var(--background)] flex justify-between items-center">
          <h1 className="text-2xl uppercase">ROI Calculator</h1>
          <div className="flex gap-2">
            <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
              <MdImportExport />
            </button>
            <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
              <MdSave />
            </button>
            <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
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
            <h2 className="text-2xl pb-8 ">Income</h2>
            <Input formId="rent" label="Rent" />{" "}
            <Input formId="additional_income" label="Additional Income" />
            <Input formId="total_income" label="Total Income" disabled />{" "}
          </div>
          <div className="flex flex-col gap-2 p-4 border-2 rounded-lg dark:border-white md:row-span-2  xl:row-span-1 xl:col-span-3 xl:grid xl:grid-cols-subgrid xl:place-items-center">
            <h2 className="text-2xl pb-8 col-span-3 mr-auto">Expenses</h2>
            <Input formId="vacancy" label="Vacancy" selector />
            <Input formId="tax" label="Tax" />{" "}
            <Input formId="insurance" label="Insurance" />
            <Input formId="monthly_repairs" label="Repairs" selector />{" "}
            <Input formId="utilities" label="Utilities" />{" "}
            <Input formId="mortgage" label="Mortgage" />{" "}
            <Input formId="capex" label="Capital Expenditures" selector />
            <Input formId="other" label="Other" />
            <div className="col-start-1">
              <Input
                formId="property_management"
                label="Property Management"
                selector
              />
            </div>
            <div className="col-start-3 row-start-4">
              <Input formId="total_expenses" label="Total Expenses" disabled />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white xl:col-start-3 xl:row-start-1">
            <h2 className="text-2xl pb-8">Investments</h2>
            <Input formId="down_payment" label="Down Payment" />{" "}
            <Input formId="closing_costs" label="Closing Costs" />
            <Input formId="repairs" label="Repairs" />{" "}
          </div>
          <div className="flex flex-col gap-4 p-4 border-2 rounded-lg dark:border-white xl:col-span-3 xl:grid xl:grid-cols-subgrid">
            <h2 className="text-2xl pb-8 col-span-3 mr-auto">Totals</h2>
            <Input
              formId="monthly_cashflow"
              label="Monthly Cashflow"
              disabled
            />{" "}
            <Input formId="annual_cashflow" label="Annual Cashflow" disabled />
            <Input formId="roi" label="Cash On Cash ROI" disabled />{" "}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
