export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split(";")
      .find((c) => c.trim().startsWith("manual_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

    return NextResponse.json({ user: decoded });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}
