"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) router.push("/login");
  }, [session, router]);

  const startPayment = async () => {
    const order = await fetch("/api/create-order", {
      method: "POST"
    }).then((r) => r.json());

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "AI Resume Builder Premium",
      description: "Access to unlimited downloads",
      order_id: order.id,
      handler: async function () {
        await fetch("/api/upgrade-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });

        router.push("/resume/preview?upgraded=true");
      },
      prefill: {
        email: session.user.email
      },
      theme: {
        color: "#5A67D8"
      }
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

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

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
