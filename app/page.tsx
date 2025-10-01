"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const routeSession = async () => {
    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error.message);
      // Handle error appropriately
    } else if (session) {
      router.replace("/calc");
      // User is logged in, you can access session.user for user details
    } else {
      router.replace("/login");
      console.log("User is not logged in.");
      // User is not logged in
    }
  };

  routeSession();
}
