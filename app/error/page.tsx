"use client";

import { TbFaceIdError } from "react-icons/tb";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col items-center gap-4 p-8 md:p-20 rounded-lg bg-white dark:bg-zinc-900 text-center shadow outline-zinc-300 dark:outline-zinc-800">
        <div className="rounded-full p-4 bg-rose-600 outline-2 outline-zinc-800 dark:outline-white">
          <TbFaceIdError className="text-7xl text-white " />
        </div>
        <p className="text-lg">Apologies. Something has gone wrong</p>
      </div>
    </div>
  );
}
