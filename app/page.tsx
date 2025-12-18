"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <Image src="/globe.svg" alt="logo" width={28} height={28} />
            <span className="text-xl font-bold text-sky-500">ModernResume</span>
          </button>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/pricing" className="hover:text-sky-500">Pricing</Link>
            <Link href="/blog" className="hover:text-sky-500">Career Blog</Link>
            <Link href="/login" className="hover:text-sky-500">Sign in</Link>
          </nav>

          <Link
            href="/register"
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow"
          >
            Create Resume
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-sm font-medium">
              🚀 AI Resume Builder
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Resumes that
              <span className="block text-sky-500">get interviews</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Build ATS-optimized resumes using AI, modern structure and recruiter-approved layouts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="bg-sky-500 hover:bg-sky-600 text-white px-7 py-3 rounded-full font-semibold text-lg shadow-lg"
              >
                Create Resume Free →
              </Link>

              <Link
                href="/pricing"
                className="border border-gray-300 px-7 py-3 rounded-full text-lg font-semibold hover:border-sky-500 hover:text-sky-500"
              >
                View Pricing
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              ✅ First download free · ✅ No credit card required
            </p>
          </motion.div>

          {/* Resume Mock */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-sky-300 to-indigo-300 opacity-20 blur-3xl" />
            <div className="relative bg-white border shadow-2xl rounded-2xl w-[520px] h-[680px] overflow-hidden">

              <div className="p-6 border-b">
                <div className="h-6 w-40 bg-gray-800 rounded mb-2" />
                <div className="h-4 w-56 bg-gray-300 rounded" />
              </div>

              <div className="p-6 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-full" />
                ))}
              </div>

              <div className="absolute bottom-4 right-4 h-16 w-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
                QR
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["50k+", "Resumes Created"],
            ["3x", "Interview Rate"],
            ["ATS", "Optimized"],
            ["PDF + QR", "Instant Share"],
          ].map(([value, label], i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl font-bold text-sky-500">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              ["Choose layout", "Professional recruiter-tested layouts"],
              ["AI assisted writing", "Auto-generate strong bullets"],
              ["Download & share", "PDF + public resume link"],
            ].map(([title, desc]) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why ModernResume
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "AI Resume Writing",
              "Public Resume QR",
              "Unlimited Edits",
              "ATS Compatible",
              "Privacy Safe",
              "Fast Export",
            ].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 border p-8 rounded-2xl"
              >
                <h3 className="font-semibold">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start building your resume today
        </h2>

        <Link
          href="/register"
          className="inline-flex bg-white text-sky-600 px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
        >
          Create Resume Free
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ModernResume. All rights reserved.
      </footer>

    </main>
  );
}
