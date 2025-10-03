"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error signing out");
    } else {
      router.replace("/login");
    }
  };

  return (
    <div className="grid grid-cols-subgrid min-[300px]:col-start-2 items-center">
      <button
        onClick={handleSignOut}
        className="px-3 py-2 bg-accent text-accent-foreground rounded-lg w-fit ml-auto"
      >
        Sign out
      </button>
    </div>
  );
};
