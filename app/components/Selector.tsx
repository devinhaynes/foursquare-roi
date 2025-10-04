import {
  Selectable,
  SelectableFormKey,
  SelectorType,
} from "@/lib/state/properties/types";
import { useROI } from "@/lib/state/properties/context";
import { ChangeEvent } from "react";

type Props = {
  input: SelectableFormKey; // Form Id of related input
};

export const Selector = ({ input }: Props) => {
  const { state, actions } = useROI();
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newValue: SelectorType = e.target.value as SelectorType;

    // Update state to new value
    actions.setSelector(input, newValue);
  };
  return (
    <form className="flex">
      <select
        onChange={onChange}
        className="min-[350px]:text-right p-1 dark:bg-zinc-950 w-fit"
        value={(state[input] as Selectable).selector}
      >
        <option value="auto">Auto</option>
        <option value="percentage">Percentage</option>
        <option value="manual">Manual</option>
      </select>
    </form>
  );
};
