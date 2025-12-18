"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AppNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isEdit = pathname.includes("/resume/new");
  const isPreview = pathname.includes("/resume/preview");

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-xl font-bold">
          AI Resume Builder
        </Link>

        {/* STEP INDICATOR */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <span className={isEdit ? "text-blue-600" : "text-gray-400"}>
            Edit
          </span>
          <span className="text-gray-300">→</span>
          <span className={isPreview ? "text-blue-600" : "text-gray-400"}>
            Preview
          </span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Download</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden lg:block text-sm font-semibold text-gray-600">
        {isEdit && "Editing Resume"}
        {isPreview && "Preview Resume"}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {session?.user?.name && (
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {session.user.name}
          </span>
        )}

        {/* PREVIEW BUTTON */}
        {isEdit && (
          <button
            onClick={() => router.push("/resume/preview")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            Preview
          </button>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
