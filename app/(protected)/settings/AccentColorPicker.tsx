"use client";

import { useSettings } from "@/lib/state/settings/context";
import { ChangeEvent } from "react";

export default function AccentColorPicker() {
  const { state, actions } = useSettings();

  function updateAccent(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    actions.setAccent(e.target.value);
  }

  return (
    <>
      <label>Accent</label>
      <div className="bg-white px-2 w-fit ml-auto rounded-lg border border-zinc-300 grid place-content-center dark:bg-zinc-900 dark:border-zinc-800">
        <input
          type="color"
          value={state.accent_color}
          onChange={updateAccent}
          className="cursor-pointer"
          aria-label="Pick accent color"
        />
      </div>
    </>
  );
}
