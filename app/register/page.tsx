"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") updateStrength(value);
  }

  function updateStrength(password: string) {
    let score = 0;
    if (password.length >= 6) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setStrength(score);
  }

  // ---------------------------------------------------
  // NEW FULLY FIXED REGISTER FUNCTION
  // ---------------------------------------------------
  async function registerUser() {
  if (loading) return;

  const name = form.name.trim();
  const email = form.email.trim();
  const password = form.password.trim();
  const confirmPassword = form.confirmPassword.trim();

  // VALIDATIONS
  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email address!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("REGISTER RESPONSE =>", data);

    if (!data.success) {
      alert(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    alert("Account created successfully!");

    // -----------------------------------------------
    // IMPORTANT: Redirect to manual login page
    // -----------------------------------------------
    window.location.href = "/user-login";

  } catch (err) {
    console.error("CLIENT ERROR:", err);
    alert("Something went wrong while creating your account.");
  }

  setLoading(false);
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">

        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        {/* NAME */}
        <div className="mb-5">
          <label className="text-white/90 font-semibold">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-white/90 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="text-white/90 font-semibold">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/3 text-white/70"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          {/* Strength Meter */}
          <div className="mt-3 w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength < 50
                  ? "bg-red-400"
                  : strength < 75
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${strength}%` }}
            ></div>
          </div>

          <p className="text-white/70 text-sm mt-1">
            Strength:{" "}
            {strength < 50 ? "Weak" : strength < 75 ? "Moderate" : "Strong"}
          </p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="text-white/90 font-semibold">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={registerUser}
          className="w-full py-3 bg-white text-purple-700 font-bold rounded-xl text-lg shadow-lg hover:bg-gray-100 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
