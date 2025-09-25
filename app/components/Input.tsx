"use client";

import { ChangeEvent, useContext, useEffect } from "react";
import { Selector } from "./Selector";
import { FormContext, FormKey } from "@/lib/state";

type Props = {
  prefix?: string;
  suffix?: string;
  label: string;
  formId: FormKey;
  disabled?: boolean;
  selector?: boolean;
  selectorValue?: "auto" | "manual" | "percentage";
};

export const Input = ({
  prefix,
  suffix,
  label,
  formId,
  disabled = false,
  selector = false,
  selectorValue,
}: Props) => {
  const { form, dispatchForm } = useContext(FormContext);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue < 0) {
      console.log("No negative values");
      return;
    }

    dispatchForm({
      type: "UPDATE_VALUE",
      value: {
        formKey: formId,
        value: newValue,
      },
    });
  };

  useEffect(() => {
    if (selector && selectorValue) {
      // Get state values
      // Auto - based on recommended financial advice
      if (selectorValue === "auto") {
      }
      // Manual - Customer entered
      if (selectorValue === "manual") {
      }
      // Percentage - Percentage of custom selected field
      if (selectorValue === "percentage") {
      }
    }
  }, [selector, selectorValue, formId]);

  return (
    <div className="flex flex-col-reverse">
      {" "}
      {/* The flex-col has to be reversed in order for peer functionality to work. Ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state */}
      <div className="peer flex flex-wrap-reverse gap-1">
        <input
          id={formId}
          value={
            typeof form[formId] === "number"
              ? form[formId]
              : typeof form[formId] === "object"
              ? form[formId].value
              : 0
          }
          className=" bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg text-xl max-w-[30ch] disabled:bg-zinc-200 disabled:text-zinc-600 disabled:border-zinc-400 disabled:dark:bg-zinc-900 disabled:dark:text-zinc-400 border-[1px] disabled:dark:border-zinc-800 dark:border-zinc-600"
          disabled={disabled}
          onChange={onValueChange}
        />
        {selector ? <Selector input={formId} /> : null}
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
