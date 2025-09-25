import { FormContext, FormKey, Selectable } from "@/lib/state";
import { ChangeEvent, useContext } from "react";

type Props = {
  input: FormKey; // Form Id of related input
};

export const Selector = ({ input }: Props) => {
  const { form, dispatchForm } = useContext(FormContext);
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newValue = e.target.value;

    // Update state to new value
    dispatchForm({
      type: "UPDATE_SELECTOR",
      value: {
        formKey: input,
        value: newValue,
      },
    });
  };
  return (
    <form className="flex">
      <select
        onChange={onChange}
        className="dark:bg-zinc-800 dark:text-white p-2 rounded-lg border-[1px] dark:border-zinc-600"
        value={(form[input] as Selectable).selector}
      >
        <option value="auto">Auto</option>
        <option value="percentage">Percentage</option>
        <option value="manual">Manual</option>
      </select>
    </form>
  );
};
