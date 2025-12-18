import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ success: false });

  await connectToDB();
  const user = await User.findOne({ email });

  if (!user) return NextResponse.json({ success: false });

  // Only increment for FREE users
  if (user.plan === "free") {
    user.downloads += 1;
    await user.save();
  }

  return NextResponse.json({ success: true });
}
