import { ImSpinner5 } from "react-icons/im";

export const PageLoader = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <div className="flex flex-col gap-4 items-center">
        <ImSpinner5 className="text-5xl animate-spin" />
        <p className="text-2xl">Loading...</p>
      </div>
    </div>
  );
};
