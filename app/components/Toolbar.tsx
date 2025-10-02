"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdAnalytics, MdSettings } from "react-icons/md";

import { TbHomeStar, TbCalculatorFilled } from "react-icons/tb";

export const Toolbar = () => {
  const pathname = usePathname();
  const activeLink =
    "mx-1 my-2 rounded-full bg-zinc-800 dark:bg-zinc-200 text-(--background) transition-colors p-2 | md:rounded-none md:mx-0 md:my-0 md:px-2 md:py-3";
  const link =
    "mx-1 my-2 rounded-full p-2 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all | md:rounded-none md:mx-0 md:my-0 md:px-2 md:py-3";
  return (
    <div className="md:h-full">
      <div className="border-t-[1px] border-t-zinc-300 max-h-[calc(100vh-30px)] bg-white dark:bg-zinc-950 dark:border-t-zinc-800 shadow-[6px_0_12px_-2px_#c3c3c3] dark:shadow-[6px_0_8px_-2px_#1e1e1e] | md:shadow-[0_0_8px_#c3c3c3] md:dark:shadow-[0_0_4px_#1e1e1e] md:m-4 md:border-0 md:outline-1 md:outline-zinc-300 md:dark:outline-zinc-800 md:rounded-lg md:w-fit md:sticky md:top-4 md:h-full">
        <nav className="text-4xl flex md:flex-col md:h-full justify-center">
          <div className="md:grow flex gap-x-4 items-center md:flex-col">
            <Link
              href="calc"
              className={
                pathname === "/calc" ? activeLink + " md:rounded-t-[8px]" : link
              }
            >
              <TbCalculatorFilled />
            </Link>
            <Link
              href="analytics"
              className={pathname === "/analytics" ? activeLink : link}
            >
              <MdAnalytics />
            </Link>
            <Link
              href="properties"
              className={pathname === "/properties" ? activeLink : link}
            >
              <TbHomeStar />
            </Link>
          </div>
          <div className="flex md:ml-0 md:flex-col md:border-t-[1px] md:border-t-zinc-300 md:dark:border-t-zinc-800">
            <Link
              href="settings"
              className={
                pathname === "/settings"
                  ? activeLink + " ml-4 md:rounded-b-[8px]"
                  : link + " ml-4"
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
