export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResumeBuilder from "./ResumeBuilder";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function NewResumePage() {
  // GOOGLE LOGIN (NextAuth)
  const session = await getServerSession();

  // MANUAL LOGIN COOKIE (must await cookies())
  const cookieStore = await cookies(); 
  const manualToken = cookieStore.get("manual_token")?.value;

  // Not logged in by either method
  if (!session && !manualToken) {
    redirect("/login");
  }

  // Username (Google or manual)
  const userName = session?.user?.name || "User";

  return (
    <div className="bg-gray-100">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
          AI Resume Builder
        </Link>

        <div className="flex items-center gap-5">
          <span className="font-semibold hidden sm:block">{userName}</span>
          <LogoutButton />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative">
        <ResumeBuilder />
      </main>
    </div>
  );
}
