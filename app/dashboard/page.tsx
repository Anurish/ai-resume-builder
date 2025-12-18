"use client";
export const dynamic = "force-dynamic";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const templates = [
  { id: 1, name: "Modern Template", tagline: "Best for Tech & ATS systems" },
  { id: 2, name: "Elegant Template", tagline: "Premium two-column design" },
];

export default function Dashboard() {
  const { data: nextAuthSession, status } = useSession();
  const router = useRouter();

  const [manualUser, setManualUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  // --------------------------------------------
  // STEP 1: Check JWT session for manual login
  // --------------------------------------------
  async function checkManualSession() {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = await res.json();

      if (data?.user) {
        setManualUser(data.user);
      }
    } catch (err) {
      console.log("Manual session check failed");
    }

    setChecking(false);
  }

  useEffect(() => {
    checkManualSession();
  }, []);

  // --------------------------------------------
  // STEP 2: Redirect if both login methods missing
  // --------------------------------------------
  useEffect(() => {
  if (checking) return;

  // If Google login exists → allow
  if (nextAuthSession?.user) return;

  // If manual login exists → allow
  if (manualUser) return;

  // Otherwise redirect
  router.push("/login");
}, [checking, nextAuthSession, manualUser]);


  if (checking || status === "loading") return null;

  // Unified session user
  const user = nextAuthSession?.user || manualUser;

  return (
    <div className="min-h-screen bg-[#f5f7fa] overflow-hidden">
      {/* ================= NAVBAR ================= */}
    <motion.header
  initial={{ y: -40, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20"
>
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
      ModernResume
    </h2>

    <div className="flex items-center gap-5">
      <span className="hidden md:block font-medium text-white/90">
        {user?.name}
      </span>

      <button
        onClick={() => {
          nextAuthSession
            ? signOut({ callbackUrl: "/login" })
            : router.push("/user-login");
        }}
        className="px-5 py-2 bg-white/20 border border-white/30 hover:bg-white/30 transition rounded-full text-white font-medium shadow-lg"
      >
        Logout
      </button>
    </div>
  </div>
</motion.header>


      {/* ================= HERO ================= */}
    <motion.section
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className="relative text-center pt-40 pb-32 bg-gradient-to-br from-[#0a0f24] via-[#111b43] to-[#030616] text-white overflow-hidden"
>
  {/* Floating Gradient Blobs */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-32 -left-16 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-ping" />
  </div>

  <div className="relative z-10 max-w-3xl mx-auto px-6">
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="text-5xl md:text-6xl font-extrabold tracking-tight"
    >
      Build resumes that feel  
      <span className="block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        crafted, not generated
      </span>
    </motion.h1>

    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="mt-6 text-lg text-gray-300 leading-relaxed"
    >
      Apple-level design. AI-assisted writing.  
      Built for modern professionals who take their careers seriously.
    </motion.p>
  </div>
</motion.section>


      {/* ================= TEMPLATE GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 pb-28 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Create New */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onClick={() => router.push("/resume/new")}
            className="cursor-pointer bg-white/70 backdrop-blur border-2 border-dashed border-gray-400 rounded-3xl flex items-center justify-center min-h-[420px] hover:border-blue-500 shadow-xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto flex items-center justify-center border rounded-full text-5xl text-gray-400 mb-6">
                +
              </div>
              <h3 className="text-2xl font-semibold">Create New Resume</h3>
            </div>
          </motion.div>

          {/* Template cards */}
          {templates.map((temp, index) => (
            <motion.div
              key={temp.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="h-72 p-8 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                {temp.id === 1 ? (
                  <div className="space-y-3">
                    <div className="h-6 w-40 bg-gray-400 rounded" />
                    <div className="h-4 w-56 bg-gray-300 rounded" />
                    <div className="h-4 w-48 bg-gray-300 rounded" />
                    <div className="h-4 w-64 bg-gray-300 rounded" />
                  </div>
                ) : (
                  <div className="flex gap-4 h-full">
                    <div className="w-1/3 bg-gray-300 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-400 rounded w-36" />
                      <div className="h-4 bg-gray-300 rounded w-56" />
                      <div className="h-4 bg-gray-300 rounded w-48" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-bold">{temp.name}</h3>
                <p className="text-gray-600 mt-2 flex-1">{temp.tagline}</p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    router.push(`/resume/new?template=${temp.id}`)
                  }
                  className="mt-6 bg-black text-white py-3 rounded-full font-medium"
                >
                  Use This Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
