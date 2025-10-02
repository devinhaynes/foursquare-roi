"use client";

import { useROI } from "@/lib/state/context";
import { MdAccountCircle, MdSave } from "react-icons/md";

import { RiResetLeftFill } from "react-icons/ri";
import { PageHeader } from "../../components/PageHeader";
import { SignOutButton } from "./SignoutButton";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const SettingsPage = () => {
  const { state } = useROI();
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then((user) => setUser(user.data.user));
  }, []);
  return (
    <div className="font-sans flex flex-col gap-8 mb-20 relative w-full mx-auto md:mr-4 md:min-w-[min(100vw,800px)]">
      <PageHeader
        header="settings"
        toolbar={[
          {
            icon: MdSave,
            name: "save",
            action: () => console.log("save"),
            disabled: true,
          },
          {
            icon: RiResetLeftFill,
            name: "reset",
            action: () => console.log("reset"),
            disabled: true,
          },
        ]}
      />
      <div className="grid grid-cols-2 mx-auto md:mx-[unset] lg:grid-rows-5 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-y-20 md:gap-y-8 gap-x-8 w-full min-[440px]:w-fit mt-8 lg:gap-x-20 lg:gap-y-0 px-2 md:px-0">
        <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-rows-subgrid lg:row-span-full items-center gap-y-4">
          <h2 className="col-span-2 border-b-[1px] mb-4 lg:my-4 uppercase">
            Profile
          </h2>
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
            <p>Username:</p>
            <p className="px-2 py-1 dark:bg-zinc-900 rounded-lg ml-auto">
              {user ? user.email : "N/A"}
            </p>
          </div>
          {user?.user_metadata && user.user_metadata.avatar_url ? (
            <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
              <label>Avatar:</label>
              <MdAccountCircle className="text-3xl ml-auto" />
            </div>
          ) : (
            ""
          )}
          <SignOutButton />
        </div>
        <div className="grid grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-rows-subgrid lg:row-span-full items-center gap-y-4">
          <h2 className="col-span-2 border-b-[1px] my-4 uppercase">Theme</h2>
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
            <label>Theme:</label>
            <select className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg outline-1 outline-zinc-300 dark:outline-zinc-800">
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
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
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
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
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
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
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
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
          <div className="grid min-[440px]:grid-cols-subgrid col-span-2 lg:col-span-1 lg:grid-cols-2 lg:gap-x-2 items-center gap-y-1">
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
