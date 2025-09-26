"use client";

import { useROI } from "@/lib/state";
import { MdAccountCircle, MdSave } from "react-icons/md";

import { RiResetLeftFill } from "react-icons/ri";

const SettingsPage = () => {
  const { state } = useROI();

  const formatFields = (fields: string[]): string[] => {
    const formattedFields = fields.map((f) => {
      // Replace underlines with spaces and uppercase first letter or each word
      return f
        .split("_")
        .map((v) => v.substring(0, 1).toUpperCase().concat(v.slice(1)))
        .join(" ");
    });
    return formattedFields;
  };

  const roiFields = formatFields(Object.keys(state));
  return (
    <div className="font-sans flex flex-col gap-8 px-2 mt-4 mb-20 relative min-h-screen w-full mx-auto">
      <div className="outline-1 outline-zinc-300 dark:outline-zinc-800 bg-white dark:bg-zinc-950 rounded-lg w-full text-3xl px-2 py-1 sticky top-4 flex justify-between items-center">
        <h1 className="text-2xl uppercase">Settings</h1>
        <div className="flex gap-2">
          <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
            <MdSave />
          </button>
          <button className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors p-1 rounded-full">
            <RiResetLeftFill />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 mx-auto md:mx-[unset] lg:grid-rows-5 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-y-20 md:gap-y-8 gap-x-8 w-fit mt-8 lg:gap-x-20 lg:gap-y-0">
        <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-rows-subgrid lg:row-span-full items-center gap-y-4">
          <h2 className="col-span-2 border-b-[1px] mb-4 lg:my-4 uppercase">
            Profile
          </h2>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:flex lg:gap-x-2 items-center">
            <p>Username:</p>
            <p className="px-2 py-1 dark:bg-zinc-900 rounded-lg ml-auto">
              Person
            </p>
          </div>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Avatar:</label>
            <MdAccountCircle className="text-3xl ml-auto" />
          </div>
          <div className="grid grid-cols-subgrid col-start-2 items-center">
            <button className="px-3 py-2 bg-[var(--foreground)] text-[var(--background)] dark:bg-zinc-900 dark:text-[var(--foreground)] rounded-lg w-fit ml-auto">
              Sign out
            </button>
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-rows-subgrid lg:row-span-full items-center gap-y-4">
          <h2 className="col-span-2 border-b-[1px] my-4 uppercase">Theme</h2>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Theme:</label>
            <select className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800">
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Accent color:</label>
            <select className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800">
              <option>Yellow</option>
              <option>Red</option>
              <option>Blue</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-rows-subgrid lg:row-span-full items-center gap-y-4">
          <h2 className="col-span-2 border-b-[1px] my-4 uppercase">
            Percentages
          </h2>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Vacancy:</label>
            <select
              defaultValue="total_income"
              className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
            >
              {roiFields.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Repairs (Monthly):</label>
            <select
              defaultValue="total_income"
              className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
            >
              {roiFields.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Capital Expenditures:</label>
            <select
              defaultValue="total_income"
              className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
            >
              {roiFields.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center">
            <label>Property Management:</label>
            <select
              defaultValue="total_income"
              className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800"
            >
              {roiFields.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
