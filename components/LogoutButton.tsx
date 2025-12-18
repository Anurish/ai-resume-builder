"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" }); // redirect to home after logout
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
