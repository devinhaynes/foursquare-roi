"use client";
// This component is used for non-currency based inputs (ie. Num of bedrooms)

import { useROI } from "@/lib/state/properties/context";
import { FormKey } from "@/lib/state/properties/types";
import { ChangeEvent } from "react";

type Props = {
  formId: FormKey;
  disabled?: boolean;
  label: string;
};

export const NumberInput = ({ formId, disabled = false, label }: Props) => {
  const { state, actions } = useROI();

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isNaN(newValue) || !isFinite(newValue)) {
      return;
    }

    if (newValue < 0) {
      console.log("No negative values");
      return;
    }

    actions.setValue(formId, newValue);
  };
  return (
    <div className="flex flex-col-reverse gap-1 w-max">
      {" "}
      {/* The flex-col has to be reversed in order for peer functionality to work. Ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state */}
      <div className="peer">
        <input
          id={formId}
          defaultValue={0}
          type="number"
          className="bg-zinc-100 dark:bg-zinc-900 outline-1 outline-zinc-300 dark:outline-zinc-800 px-3 py-1 rounded-lg text-xl w-[8ch]"
          disabled={disabled}
          onChange={onValueChange}
        />
      </div>
      <div className="flex flex-col min-[350px]:flex-row justify-between">
        <label htmlFor={formId} className="peer-has-[:disabled]:text-zinc-600">
          {label}
        </label>
      </div>
    </div>
  );
};
