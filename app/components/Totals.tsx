import { ntc } from "@/lib/helpers";

type Props = {
  label: string;
  value: number;
  type: "currency" | "percentage";
};

export const Totals = ({ label, value, type }: Props) => {
  const handleValueString = () => {
    // Validate isNaN
    if (isNaN(value) || !isFinite(value)) {
      return "N/A";
    }

    if (type === "currency") {
      return ntc(value);
    }

    if (type === "percentage") {
      return `${value} %`;
    }
  };

  const valueString = handleValueString();
  const valueClass = `${
    value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "text-inherit"
  } py-4 px-6 bg-zinc-100 dark:bg-zinc-900 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg text-center`;

  return (
    <div className="text-xl p-4 flex flex-col gap-2">
      <p>{label}</p>
      <p className={valueClass}>{valueString}</p>
    </div>
  );
};
