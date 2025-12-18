export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectToDB();

  let email: string | null = null;

  // 1️⃣ GOOGLE LOGIN (NextAuth)
  const session = await getServerSession();
  if (session?.user?.email) {
    email = session.user.email;
  }

  // 2️⃣ MANUAL LOGIN (JWT cookie)
  if (!email) {
    const cookieStore = cookies();
    const manualToken = cookieStore.get("manual_token")?.value;

    if (manualToken) {
      try {
        const decoded: any = jwt.verify(
          manualToken,
          process.env.NEXTAUTH_SECRET!
        );
        email = decoded.email;
      } catch {
        return NextResponse.json({ success: false });
      }
    }
  }

  if (!email) {
    return NextResponse.json({ success: false });
  }

  const user = await User.findOne({ email }).lean();

  if (
    !user ||
    !user.resumeData ||
    Object.values(user.resumeData).every(v => !v)
  ) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({
    success: true,
    resumeData: user.resumeData,
    resumeTemplate: user.resumeTemplate || 1,
  });
}
