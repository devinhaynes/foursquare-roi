import { IconType } from "react-icons";

type ToolbarButton = {
  icon: IconType;
  action: () => void;
  name: string;
  disabled?: boolean;
};

type Props = {
  header: string;
  toolbar: ToolbarButton[];
};

export const PageHeader = ({ header, toolbar }: Props) => {
  return (
    <div className="z-4 outline-1 outline-accent bg-white dark:bg-zinc-950 flex flex-col min-[440px]:flex-row justify-between items-center w-full text-3xl px-2 py-1 sticky top-0 shadow-[-6px_0_8px_-2px_#c3c3c3] dark:shadow-[-6px_0_8px_-2px_#1e1e1e] | md:shadow-[0_0_8px_#c3c3c3] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:rounded-full md:top-4 ">
      <h1 className="text-2xl uppercase hidden min-[440px]:block pl-4">
        {header}
      </h1>
      <div className="flex gap-2">
        {toolbar.map((t, i) => (
          <button
            key={t.name + `_${i}`}
            className="hover:bg-(--foreground) hover:text-(--background) transition-colors p-1 rounded-full min-[440px]:mx-1 min-[440px]:my-2 disabled:text-zinc-400 disabled:hover:bg-white disabled:hover:text-zinc-400 | md:m-0"
            onClick={t.action}
            disabled={t.disabled}
          >
            <t.icon className="text-4xl" />
          </button>
        ))}
      </div>
    </div>
  );
};
