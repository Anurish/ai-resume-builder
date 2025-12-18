import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ success: false });

  await connectToDB();
  await User.updateOne({ email }, { plan: "premium" }, { upsert: true });

  return NextResponse.json({ success: true });
}
