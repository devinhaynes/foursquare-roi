"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdAnalytics, MdSettings } from "react-icons/md";

import { TbHomeStar, TbCalculatorFilled } from "react-icons/tb";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="md:h-full">
      <div className="border-t-[1px] border-t-zinc-300 max-h-[calc(100vh-30px)] bg-white dark:bg-zinc-950 dark:border-t-zinc-800 shadow-[6px_0_12px_-2px_#c3c3c3] dark:shadow-[6px_0_12px_-2px_#333] | md:shadow-[0_0_12px_#c3c3c3] md:dark:shadow-[0_0_4px_#1e1e1e] md:m-4 md:border-0 md:outline-1 md:outline-zinc-300 md:dark:outline-zinc-800 md:rounded-lg md:w-fit md:sticky md:top-4 md:h-full">
        <nav className="text-3xl flex md:flex-col md:h-full justify-center">
          <div className="md:grow flex md:flex-col gap-4">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors p-2 md:px-2 md:py-3 md:rounded-t-[5px]"
                  : "p-2 md:px-2 md:py-3 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all md:rounded-t-[7px]"
              }
            >
              <TbCalculatorFilled />
            </Link>
            <Link
              href="analytics"
              className={
                pathname === "/analytics"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors p-2 md:px-2 md:py-3"
                  : "p-2 md:px-2 md:py-3 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all"
              }
            >
              <MdAnalytics />
            </Link>
            <Link
              href="properties"
              className={
                pathname === "/properties"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors p-2 md:px-2 md:py-3"
                  : "p-2 md:px-2 md:py-3 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all"
              }
            >
              <TbHomeStar />
            </Link>
          </div>
          <div className="flex ml-4 md:ml-0 md:flex-col md:border-t-[1px] md:border-t-zinc-300 md:dark:border-t-zinc-800">
            <Link
              href="settings"
              className={
                pathname === "/settings"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors p-2 md:px-2 md:py-3 md:rounded-b-[5px]"
                  : "p-2 md:px-2 md:py-3 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all md:rounded-b-[7px]"
              }
            >
              <MdSettings />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
