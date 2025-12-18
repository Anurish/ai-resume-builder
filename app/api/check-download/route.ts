import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ allowed: false });

  await connectToDB();
  const user = await User.findOne({ email });

  if (!user) {
    // First time user → allow one download
    await User.create({ email, downloads: 0, plan: "free" });
    return NextResponse.json({ allowed: true });
  }

  // PRO/PREMIUM user → always allow
  if (user.plan !== "free") {
    return NextResponse.json({ allowed: true });
  }

  // FREE plan → only 1 download allowed
  if (user.downloads >= 1) {
    return NextResponse.json({ allowed: false });
  }

  return NextResponse.json({ allowed: true });
}
