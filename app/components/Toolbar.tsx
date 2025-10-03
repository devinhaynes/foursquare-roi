"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdAnalytics, MdSettings } from "react-icons/md";
import logo from "@/public/logo-color.svg";
import { TbHomeStar, TbCalculatorFilled } from "react-icons/tb";

export const Toolbar = () => {
  const pathname = usePathname();
  const activeLink =
    "mx-1 my-2 rounded-full bg-accent text-(--background) transition-colors p-2 | md:rounded-none md:mx-0 md:my-0 md:px-2 md:py-3";
  const link =
    "mx-1 my-2 text-accent rounded-full p-2 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-all | md:rounded-none md:mx-0 md:my-0 md:px-2 md:py-3";
  return (
    <div className="md:h-full">
      <div className="hidden md:grid bg-white outline-1 outline-accent dark:bg-zinc-950 rounded-full mt-4 ml-4 w-[52px] h-[52px] place-content-center">
        <Image src={logo} alt="" className="p-3" />
      </div>
      <div className="border-t-[1px] border-t-accent max-h-[calc(100vh-30px)] bg-white dark:bg-zinc-950 dark:border-t-zinc-800 shadow-[6px_0_12px_-2px_#c3c3c3] dark:shadow-[6px_0_8px_-2px_#1e1e1e] | md:shadow-[0_0_8px_#c3c3c3] md:dark:shadow-[0_0_4px_#1e1e1e] md:m-4 md:border-0 md:outline-1 md:outline-accent md:rounded-full md:w-fit md:sticky md:top-4 md:mt-4 md:h-full md:max-h-[calc(100vh-52px-40px)]">
        <nav className="text-4xl flex md:flex-col md:h-full justify-center">
          <div className="md:grow flex gap-x-4 items-center md:flex-col">
            <Link
              href="calc"
              className={
                pathname === "/calc"
                  ? activeLink + " md:rounded-t-full"
                  : link + " md:rounded-t-full"
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
                  ? activeLink + " ml-4 md:rounded-b-full"
                  : link + " ml-4 md:rounded-b-full"
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
