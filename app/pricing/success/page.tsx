"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function updatePlan() {
      if (!session?.user?.email) return;

      await fetch("/api/upgrade-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      router.push("/resume/preview?upgraded=true");
    }

    updatePlan();
  }, [session, router]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-xl">
      Updating your account. Please wait…
    </div>
  );
}
