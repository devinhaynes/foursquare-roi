"use client";

import { formatField } from "@/lib/helpers";
import { useROI } from "@/lib/state/properties/context";
import { SelectableFormKey } from "@/lib/state/properties/types";
import { useSettings } from "@/lib/state/settings/context";
import { ChangeEvent } from "react";

type Props = {
  formKey: SelectableFormKey;
  label: string;
};

export const PercentageSelector = ({ formKey, label }: Props) => {
  const { state: propertyState } = useROI();
  const { state: settingsState, actions } = useSettings();

  function handleSelectionChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    actions.setPercentages({
      [formKey]: e.target.value,
    });
  }

  return (
    <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
      <label>{label}:</label>
      <select
        className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
        onChange={handleSelectionChange}
        value={settingsState.percentages[formKey]}
      >
        {Object.keys(propertyState).map((f) => (
          <option key={f} value={f}>
            {formatField(f)}
          </option>
        ))}
      </select>
    </div>
  );
};
