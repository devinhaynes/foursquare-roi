"use client";

import { FormProvider } from "@/lib/state";
import { ROI } from "./components/ROI";

export default function Home() {
  return (
    <FormProvider>
      <ROI />
    </FormProvider>
  );
}
