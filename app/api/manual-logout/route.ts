import { NextResponse } from "next/server";

export async function POST() {
  // Delete manual login cookie
  const res = NextResponse.json({ success: true });

  res.headers.append(
    "Set-Cookie",
    `manual_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`
  );

  return res;
}
