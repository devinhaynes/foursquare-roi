import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 max-w-[1640px] mx-auto">
      <div className="fixed bottom-0 w-full z-10 md:relative md:w-fit">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
