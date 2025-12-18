"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (loading) return;

    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // LOGIN USING NEXTAUTH CREDENTIALS PROVIDER
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    // SUCCESS → REAL SESSION IS CREATED
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          Login
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-500/80 text-white p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-white font-semibold">Email</label>
          <input
            type="email"
            className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none border border-white/30 focus:ring-2 focus:ring-purple-300"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-white font-semibold">Password</label>
          <input
            type="password"
            className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none border border-white/30 focus:ring-2 focus:ring-purple-300"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-lg font-bold transition ${
            loading
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-white text-purple-700 hover:bg-gray-100 shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-white/80">
          Want Google login?
          <a href="/login" className="ml-1 underline text-white font-semibold">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}
