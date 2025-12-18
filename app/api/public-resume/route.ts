import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectToDB();
  const user = await User.findOne({ publicId: id });

  if (!user)
    return NextResponse.json({ success: false });

  return NextResponse.json({
    success: true,
    user: {
      resumeData: user.resumeData,
      resumeTemplate: user.resumeTemplate
    }
  });
}
