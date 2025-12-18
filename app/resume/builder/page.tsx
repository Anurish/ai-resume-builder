"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleStart = () => {
    if (!session) return router.push("/login");
   router.push("/resume/new?template=modern");

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Navbar */}
      <header className="w-full px-8 py-5 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold">AI Resume Builder</h1>

        <nav className="flex items-center gap-6">
          {!session ? (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 hidden sm:block">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Create a Professional Resume in Minutes with AI Assistance
        </h2>

        <p className="text-gray-600 mt-6 text-lg max-w-2xl">
          Choose a modern ATS-friendly template and let AI help you write
          a powerful summary, experience, projects, and skills.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition"
          >
            Start Building Resume →
          </button>

          <Link
            href="/resume"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Browse Templates
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Resume Builder — All Rights Reserved
      </footer>
    </div>
  );
}
