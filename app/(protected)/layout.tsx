import { ReactNode } from "react";
import { Toolbar } from "../components/Toolbar";
import { SettingsProvider } from "@/lib/state/settings/context";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <SettingsProvider>
      <div className="flex flex-col-reverse md:flex-row max-w-[1840px] md:mx-auto md:w-fit">
        <div className="fixed bottom-0 w-full z-10 md:relative md:w-fit">
          <Toolbar />
        </div>
        {children}
      </div>
    </SettingsProvider>
  );
}
