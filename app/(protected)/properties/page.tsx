"use client";

import { MdDeleteSweep, MdImportExport, MdSave } from "react-icons/md";
import { PageHeader } from "../../components/PageHeader";
import {
  deleteProperties,
  getProperties,
  Property,
  PropertyWithDerived,
} from "@/lib/supabase/properties";
import { convertObjNumbersToCurrency } from "@/lib/helpers";
import { useCallback, useEffect, useState } from "react";
import { PageLoader } from "@/app/components/PageLoader";
import { PropertyCard } from "./PropertyCard";

function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyWithDerived[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    let list = await getProperties();
    list = list.map(
      (p: Property) =>
        convertObjNumbersToCurrency(p, [
          "roi",
          "id",
          "created_at",
        ]) as PropertyWithDerived
    );
    setProperties(list);
    setLoading(false);
  }, []);

  async function deleteSelectedProperties() {
    if (selectedProperties.length === 0) return;
    await deleteProperties(selectedProperties);
    setSelectedProperties([]);
    await fetchProperties();
  }

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="font-sans flex flex-col gap-8 mb-20 relative min-h-screen md:mr-4 md:min-w-[min(100vw,800px)]">
      <PageHeader
        header="properties"
        toolbar={[
          {
            icon: MdImportExport,
            name: "import",
            action: () => console.log("test"),
            disabled: true,
          },
          {
            icon: MdSave,
            name: "save",
            action: () => console.log("test"),
            disabled: true,
          },
          {
            icon: MdDeleteSweep,
            name: "delete",
            action: deleteSelectedProperties,
            disabled: selectedProperties.length <= 0,
          },
        ]}
      />
      <div className="flex flex-wrap gap-4 px-2 md:px-0">
        {loading ? (
          <div className="h-full w-full">
            <PageLoader />
          </div>
        ) : properties && properties.length > 0 ? (
          properties
            .sort((a, b) => (a.roi < b.roi ? 1 : -1))
            .map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                state={{ selectedProperties, setSelectedProperties }}
              />
            ))
        ) : (
          <p>No properties</p>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
