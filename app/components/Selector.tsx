import {
  Selectable,
  SelectableFormKey,
  SelectorType,
  useROI,
} from "@/lib/state";
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
        className="dark:bg-zinc-800 dark:text-white p-2 rounded-lg border-[1px] dark:border-zinc-600"
        value={(state[input] as Selectable).selector}
      >
        <option value="auto">Auto</option>
        <option value="percentage">Percentage</option>
        <option value="manual">Manual</option>
      </select>
    </form>
  );
};
