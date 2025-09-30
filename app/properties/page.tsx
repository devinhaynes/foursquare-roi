"use client";

import { MdDeleteSweep, MdImportExport, MdSave } from "react-icons/md";
import { PageHeader } from "../components/PageHeader";
import {
  getProperties,
  Property,
  PropertyWithDerived,
} from "@/lib/supabase/properties";
import { convertObjNumbersToCurrency } from "@/lib/helpers";
import { useEffect, useState } from "react";

function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyWithDerived[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      let properties = await getProperties();

      properties = properties.map(
        (p: Property) =>
          convertObjNumbersToCurrency(p, [
            "roi",
            "id",
            "created_at",
          ]) as PropertyWithDerived
      );

      console.log(properties);

      setProperties(properties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="font-sans flex flex-col gap-8 mb-20 relative min-h-screen md:mr-4">
      <PageHeader
        header="properties"
        toolbar={[
          {
            icon: MdImportExport,
            name: "import",
            action: () => console.log("test"),
          },
          { icon: MdSave, name: "save", action: () => console.log("test") },
          {
            icon: MdDeleteSweep,
            name: "delete",
            action: () => console.log("test"),
          },
        ]}
      />
      <div className="flex flex-wrap gap-4 px-2 md:px-0">
        {properties && properties.length > 0 ? (
          properties
            .sort((a, b) => (a.roi < b.roi ? 1 : -1))
            .map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3]"
              >
                <div className="flex justify-between ">
                  <h2 className="text-lg ">{p.address}</h2>
                  <p
                    className={`px-2 py-1 rounded-lg ${
                      p.roi > 0
                        ? "bg-emerald-400 dark:bg-emerald-700"
                        : p.roi < 0
                        ? "bg-rose-400 dark:bg-rose-700"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  >
                    {parseFloat(p.roi.toFixed(2))}%
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p>Monthly Income</p>
                      <p>{p.monthly_income}</p>
                    </div>
                    <div>
                      <p>Monthly Expenses</p>
                      <p>{p.monthly_expenses}</p>
                    </div>
                    <div>
                      <p>Monthly Cashflow</p>
                      <p>{p.monthly_cashflow}</p>
                    </div>
                    <div>
                      <p>Annual Cashflow</p>
                      <p>{p.annual_cashflow}</p>
                    </div>
                    <div>
                      <p>Total Investments</p>
                      <p>{p.total_investments}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No properties</p>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
