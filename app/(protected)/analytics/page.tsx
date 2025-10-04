"use client";

import { PageHeader } from "@/app/components/PageHeader";
import { MdImportExport, MdSave } from "react-icons/md";

const AnalyticsPage = () => {
  return (
    <div className="font-sans flex flex-col gap-8 mb-20 items-center min-h-screen md:mr-4 md:min-w-[min(100vw,800px)]">
      <PageHeader
        header="analytics"
        toolbar={[
          {
            icon: MdImportExport,
            name: "import",
            action: () => console.log("import"),
            disabled: true,
          },
          {
            icon: MdSave,
            name: "save",
            action: () => console.log("save"),
            disabled: true,
          },
        ]}
      />
      <div className="flex flex-wrap gap-4 px-2 md:px-0">
        <h2>Need to put content here...</h2>
      </div>
    </div>
  );
};

export default AnalyticsPage;
