"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const goUpgrade = () => router.push(`/payment?redirect=${redirect}`);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-14 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Upgrade and Unlock Unlimited Downloads
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        Join thousands of professionals using our AI-powered resume builder to land interviews faster.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* FREE PLAN */}
        <div className="border rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Free Plan</h2>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✔ 1 resume download</li>
            <li>✔ Basic templates</li>
            <li>✖ AI rewrite suggestions</li>
            <li>✖ Premium templates</li>
          </ul>
          <h3 className="text-3xl font-bold mb-4">₹0</h3>
          <button
            onClick={() => router.push("/resume/preview")}
            className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Continue for free
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="border-2 border-green-600 rounded-2xl bg-white p-8 shadow-md relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </span>
          <h2 className="text-2xl font-semibold mb-3">Premium Plan</h2>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✔ Unlimited downloads</li>
            <li>✔ All premium templates</li>
            <li>✔ AI resume optimization</li>
            <li>✔ Priority support</li>
          </ul>
          <h3 className="text-3xl font-bold mb-1">₹199 <span className="text-gray-500 text-lg line-through ml-2">₹499</span></h3>
          <p className="text-green-600 font-medium mb-4">Limited-time 60% OFF</p>
       <button
  onClick={() => router.push("/resume/preview?premium=activated")}
  className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
>
  Upgrade Now
</button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-10">
        No auto-renew • Cancel anytime • 100% secure payment gateway
      </p>
    </div>
  );
}
