"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center text-white bg-gradient-to-br from-[#020617] via-[#020d3a] to-black">

      {/* ========= ANIMATED BACKGROUND OBJECTS ========= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Floating Resume Cards */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute resume-float"
            style={{
              left: `${10 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}

        {/* Glowing Orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute glow-orb"
            style={{
              left: `${15 + i * 18}%`,
              bottom: `${10 + (i % 2) * 25}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ========= LOGIN CARD ========= */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">

        <div className="text-center mb-6">
          <Image src="/logo.svg" alt="logo" width={44} height={44} className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-sky-400">ModernResume</h1>
          <p className="text-xs text-slate-300">AI-powered resume builder</p>
        </div>

        <h2 className="text-xl font-semibold text-center">Welcome back</h2>
        <p className="text-sm text-slate-400 text-center mt-1">
          Sign in to continue building your resume
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-8 w-full flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-semibold hover:scale-[1.02] transition"
        >
          <Image src="/google.svg" alt="google" width={20} height={20} />
          Continue with Google
        </button>

        <div className="mt-6 space-y-2 text-sm text-slate-300">
          <div>✅ Free first resume download</div>
          <div>✅ ATS-optimized templates</div>
          <div>✅ PDF + public resume link</div>
        </div>

        <p className="text-xs text-center text-slate-400 mt-6">
          New here?{" "}
          <Link href="/register" className="text-sky-400 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* ========= GLOBAL ANIMATIONS ========= */}
      <style jsx global>{`
        .resume-float {
          width: 70px;
          height: 90px;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0.35),
            rgba(255,255,255,0.05)
          );
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 30px rgba(56,189,248,0.5);
          animation: floatUp 14s linear infinite;
          opacity: 0.85;
        }

        .glow-orb {
          width: 18px;
          height: 18px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 25px #38bdf8;
          animation: pulseMove 10s ease-in-out infinite;
          opacity: 0.9;
        }

        @keyframes floatUp {
          from {
            transform: translateY(80px) rotate(0deg);
            opacity: 0;
          }
          to {
            transform: translateY(-600px) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes pulseMove {
          0% { transform: translateY(0); }
          50% { transform: translateY(-80px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
