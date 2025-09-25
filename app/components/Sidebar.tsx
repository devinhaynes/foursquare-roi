"use client";

import { useState } from "react";
import {
  MdAnalytics,
  MdOutlineAccountCircle,
  MdSettings,
} from "react-icons/md";

import { TbHomeStar, TbCalculatorFilled } from "react-icons/tb";

type Page = "calculator" | "analytics" | "properties" | "settings" | "account";

export const Sidebar = () => {
  const [active, setActive] = useState<Page>("calculator");
  return (
    <div className="md:h-full w-full">
      <div className="m-4 border-2 dark:border-white rounded-lg md:w-fit max-h-[calc(100vh-30px)] md:sticky md:top-4 md:h-full bg-[var(--background)]">
        <nav className="text-3xl flex md:flex-col md:h-full">
          <div className="grow flex md:flex-col">
            <button
              className={
                active === "calculator"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors px-2 py-3 md:rounded-t-[5px]"
                  : "px-2 py-3 hover:dark:bg-zinc-800 transition-all md:rounded-t-[7px]"
              }
              onClick={(e) => {
                e.preventDefault();
                if (active !== "calculator") {
                  setActive("calculator");
                }
              }}
            >
              <TbCalculatorFilled />
            </button>
            <button
              className={
                active === "analytics"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors px-2 py-3"
                  : "px-2 py-3 hover:dark:bg-zinc-800 transition-all"
              }
              onClick={(e) => {
                e.preventDefault();
                if (active !== "analytics") {
                  setActive("analytics");
                }
              }}
            >
              <MdAnalytics />
            </button>
            <button
              className={
                active === "properties"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors px-2 py-3"
                  : "px-2 py-3 hover:dark:bg-zinc-800 transition-all"
              }
              onClick={(e) => {
                e.preventDefault();
                if (active !== "properties") {
                  setActive("properties");
                }
              }}
            >
              <TbHomeStar />
            </button>
          </div>
          <div className="flex md:flex-col md:border-t-2 md:dark:border-t-white">
            <button
              className={
                active === "account"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors px-2 py-3"
                  : "px-2 py-3 hover:dark:bg-zinc-800 transition-all"
              }
              onClick={(e) => {
                e.preventDefault();
                if (active !== "account") {
                  setActive("account");
                }
              }}
            >
              <MdOutlineAccountCircle />
            </button>
            <button
              className={
                active === "settings"
                  ? "bg-[var(--foreground)] text-[var(--background)] transition-colors px-2 py-3 md:rounded-b-[5px]"
                  : "px-2 py-3 hover:dark:bg-zinc-800 transition-all md:rounded-b-[7px]"
              }
              onClick={(e) => {
                e.preventDefault();
                if (active !== "settings") {
                  setActive("settings");
                }
              }}
            >
              <MdSettings />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
