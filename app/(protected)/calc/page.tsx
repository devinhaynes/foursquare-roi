"use client";

import { MdSave, MdImportExport } from "react-icons/md";
import { useROI } from "@/lib/state/context";
import { RiResetLeftFill } from "react-icons/ri";
import { convertStateToProperty, ntc } from "@/lib/helpers";
import { postProperty } from "@/lib/supabase/properties";
import { PageHeader } from "@/app/components/PageHeader";
import { Input } from "@/app/components/Input";
import { Totals } from "@/app/components/Totals";

const ROI = () => {
  const { state, derived, actions } = useROI();

  const saveProperty = async () => {
    const property = convertStateToProperty(state);
    await postProperty(property);
    actions.reset();
  };

  return (
    <div className="font-sans flex flex-col gap-8 mb-20 items-center md:mr-4">
      <PageHeader
        header="roi calculator"
        toolbar={[
          {
            icon: MdImportExport,
            name: "import",
            action: () => console.log("import"),
          },
          {
            icon: MdSave,
            name: "save",
            action: saveProperty,
          },
          {
            icon: RiResetLeftFill,
            name: "reset",
            action: actions.reset,
          },
        ]}
      />
      <div className="flex flex-col px-2 md:px-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 p-4 outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg ">
          <h2 className="text-2xl pb-8 ">House Info</h2>
          <Input formId="property_cost" label="Property cost" />{" "}
          <div className="flex flex-col-reverse gap-1 w-max">
            {" "}
            {/* The flex-col has to be reversed in order for peer functionality to work. Ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state */}
            <div className="peer flex flex-wrap-reverse gap-1">
              <input
                id="address"
                value={state.address}
                className="bg-zinc-100 dark:bg-zinc-900 outline-1 outline-zinc-300 dark:outline-zinc-800 px-3 py-1 rounded-lg text-xl"
                onChange={(e) => actions.setValue("address", e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-between">
              <label htmlFor="address">Property Address</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg dark:border-white">
          <div className="flex justify-between">
            <h2 className="text-2xl pb-8">Income</h2>
            <p className="text-xl text-green-700">
              {ntc(derived.monthly_income)}
            </p>
          </div>
          <Input formId="rent" label="Rent" />{" "}
          <Input formId="additional_income" label="Additional Income" />
        </div>
        <div className="flex flex-col gap-2 p-4 outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg dark:border-white md:row-span-2  xl:row-span-1 xl:col-span-3 xl:grid xl:grid-cols-subgrid xl:place-items-center">
          <div className="flex justify-between col-span-3 mr-auto w-full">
            <h2 className="text-2xl pb-8 ">Expenses</h2>
            <p className="text-xl text-red-700">
              {ntc(derived.monthly_expenses)}
            </p>
          </div>
          <Input formId="vacancy" label="Vacancy" isSelector />
          <Input formId="tax" label="Tax" />{" "}
          <Input formId="insurance" label="Insurance" />
          <Input formId="monthly_repairs" label="Repairs" isSelector />{" "}
          <Input formId="utilities" label="Utilities" />{" "}
          <Input formId="mortgage" label="Mortgage" />{" "}
          <Input formId="capex" label="Capital Expenditures" isSelector />
          <Input formId="other_expenses" label="Other" />
          <div className="col-start-1">
            <Input
              formId="property_management"
              label="Property Management"
              isSelector
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg dark:border-white xl:col-start-3 xl:row-start-1">
          <div className="flex justify-between">
            <h2 className="text-2xl pb-8 ">Investments</h2>
            <p className="text-xl text-red-700">
              {ntc(derived.total_investments)}
            </p>
          </div>
          <Input formId="down_payment" label="Down Payment" isSelector />{" "}
          <Input formId="closing_costs" label="Closing Costs" isSelector />
          <Input formId="upfront_repairs" label="Repairs" />{" "}
        </div>
        <div className="flex flex-col gap-4 p-4 outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg dark:border-white xl:col-span-3">
          <h2 className="text-2xl pb-2 col-span-3 mr-auto">Totals</h2>
          <div className="flex flex-wrap gap-4">
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

export default ROI;
