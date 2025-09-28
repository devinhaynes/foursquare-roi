import { IconType } from "react-icons";

type ToolbarButton = {
  icon: IconType;
  action: () => void;
  name: string;
};

type Props = {
  header: string;
  toolbar: ToolbarButton[];
};

export const PageHeader = ({ header, toolbar }: Props) => {
  return (
    <div className="outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 flex justify-between items-center w-full text-3xl px-2 py-1 sticky top-0 shadow-[-6px_0_12px_-2px_#c3c3c3] dark:shadow-[-6px_0_12px_-2px_#1e1e1e] | md:shadow-[0_0_12px_#c3c3c3] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:rounded-lg md:top-4 ">
      <h1 className="text-2xl uppercase">{header}</h1>
      <div className="flex gap-2">
        {toolbar.map((t, i) => (
          <button
            key={t.name + `_${i}`}
            className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full"
          >
            <t.icon />
          </button>
        ))}
      </div>
    </div>
  );
};
