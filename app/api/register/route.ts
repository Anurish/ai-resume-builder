export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

import { randomBytes } from "crypto";

export async function POST(req: Request) {

  try {
    await connectToDB();

    const body = await req.json();
    console.log("Received body:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({
        success: false,
        error: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 12);
    const publicId = randomBytes(6).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashed,
      publicId,
    });

    console.log("USER CREATED:", user);

    return NextResponse.json({ success: true, user });
  } catch (error) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  console.error("REGISTER ERROR:", error);

  return NextResponse.json(
    { success: false, error: message },
    { status: 500 }
  );
}

}
