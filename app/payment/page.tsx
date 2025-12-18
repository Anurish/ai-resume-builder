"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

export default function PaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) router.push("/login");
  }, [session, status, router]);

  const startPayment = async () => {
    // ✅ Type-safe guard (REQUIRED)
    if (!session?.user?.email) return;

    const order = await fetch("/api/create-order", {
      method: "POST",
    }).then((r) => r.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: order.amount,
      currency: order.currency,
      name: "AI Resume Builder Premium",
      description: "Access to unlimited downloads",
      order_id: order.id,

      handler: async () => {
        await fetch("/api/upgrade-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });

        router.push("/resume/preview?upgraded=true");
      },

      prefill: {
        email: session.user.email,
      },

      theme: {
        color: "#5A67D8",
      },
    };

    const Razorpay = (window as any).Razorpay;
    const razor = new Razorpay(options);
    razor.open();
  };

  // Optional loading state
  if (status === "loading") return null;

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-6">
      <h2 className="text-2xl font-semibold">Upgrade to Premium</h2>
      <p className="text-gray-600">Pay ₹1 to unlock unlimited downloads</p>

      <button
        onClick={startPayment}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded text-lg"
      >
        Pay ₹1 via UPI (Google Pay / Paytm / PhonePe)
      </button>

      {/* ✅ Correct way to load Razorpay */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
