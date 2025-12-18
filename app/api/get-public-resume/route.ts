import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" });

  await connectToDB();

  // Find user by publicId
  const user = await User.findOne({ publicId: id });
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if user has a published resume
  if (!user.isPublished || !user.resumeData) {
    return NextResponse.json({ error: "Resume not available" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    resume: {
      data: user.resumeData,       // Stored inside User collection
      template: user.resumeTemplate,
    },
  });
}
