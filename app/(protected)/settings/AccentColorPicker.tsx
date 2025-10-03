import { Dispatch, SetStateAction } from "react";

type Props = {
  accent: string;
  setAccent: Dispatch<SetStateAction<string>>;
};
export default function AccentColorPicker({ accent, setAccent }: Props) {
  return (
    <>
      <label>Accent</label>
      <div className="bg-white px-2 w-fit ml-auto rounded-lg border border-zinc-300 grid place-content-center dark:bg-zinc-900 dark:border-zinc-800">
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="cursor-pointer"
          aria-label="Pick accent color"
        />
      </div>
    </>
  );
}
