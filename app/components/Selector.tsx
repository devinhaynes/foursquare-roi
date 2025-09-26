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
        className="bg-zinc-100 dark:bg-zinc-900 dark:text-white p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
        value={(state[input] as Selectable).selector}
      >
        <option value="auto">Auto</option>
        <option value="percentage">Percentage</option>
        <option value="manual">Manual</option>
      </select>
    </form>
  );
};
