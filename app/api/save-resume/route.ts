import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, resumeData, resumeTemplate } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        resumeData,
        resumeTemplate,
        isPublished: true,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
