import { ReactNode } from "react";
import { Toolbar } from "../components/Toolbar";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="flex flex-col-reverse md:flex-row max-w-[1640px] md:mx-auto md:w-fit">
      <div className="fixed bottom-0 w-full z-10 md:relative md:w-fit">
        <Toolbar />
      </div>
      {children}
    </div>
  );
}
