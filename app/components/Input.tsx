"use client";

import { ChangeEvent } from "react";
import { Selector } from "./Selector";
import { FormKey, useROI, SelectableFormKey } from "@/lib/state";

type Props = {
  prefix?: string;
  suffix?: string;
  label: string;
  formId: FormKey;
  disabled?: boolean;
  isSelector?: boolean;
  derivedValue?: number;
};

export const Input = ({
  prefix,
  suffix,
  label,
  formId,
  disabled = false,
  isSelector = false,
}: Props) => {
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
    <div className="flex flex-col-reverse">
      {" "}
      {/* The flex-col has to be reversed in order for peer functionality to work. Ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state */}
      <div className="peer flex flex-wrap-reverse gap-1">
        <input
          id={formId}
          value={
            typeof state[formId] === "number"
              ? state[formId]
              : typeof state[formId] === "object"
              ? state[formId].value
              : 0
          }
          className=" bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg text-xl max-w-[30ch] disabled:bg-zinc-200 disabled:text-zinc-600 disabled:border-zinc-400 disabled:dark:bg-zinc-900 disabled:dark:text-zinc-400 border-[1px] disabled:dark:border-zinc-800 dark:border-zinc-600"
          disabled={disabled}
          onChange={onValueChange}
        />
        {isSelector ? <Selector input={formId as SelectableFormKey} /> : null}
      </div>
      <label htmlFor={formId} className="peer-has-[:disabled]:text-zinc-600">
        {label}
      </label>
    </div>
  );
};

type PrefixProps = {
  prefix: string;
  formId: string;
  formValue: number;
};

const inputWithPrefix = ({ prefix, formId, formValue }: PrefixProps) => (
  <div>
    <div>{prefix}</div>
    <input id={formId} value={formValue} />
  </div>
);

type SuffixProps = {
  suffix: string;
  formId: string;
  formValue: number;
};

const inputWithSuffix = ({ suffix, formId, formValue }: SuffixProps) => {
  return (
    <div>
      <input id={formId} value={formValue} />
      <div>{suffix}</div>
    </div>
  );
};

type PrefixAndSuffixProps = {
  prefix: string;
  suffix: string;
  formId: string;
  formValue: number;
};

const inputWithPrefixAndSuffix = ({
  prefix,
  suffix,
  formId,
  formValue,
}: PrefixAndSuffixProps) => {
  return (
    <div>
      <div>{prefix}</div>
      <input id={formId} value={formValue} />
      <div>{suffix}</div>
    </div>
  );
};
