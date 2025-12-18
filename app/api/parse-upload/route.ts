export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" });
    }

    // ❌ BLOCK PDFs
    if (file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({
        error:
          "PDF parsing is not supported. Please upload a DOCX resume.",
      });
    }

    if (
      !file.name.toLowerCase().endsWith(".doc") &&
      !file.name.toLowerCase().endsWith(".docx")
    ) {
      return NextResponse.json({ error: "Only DOCX files are supported" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await mammoth.extractRawText({ buffer });
    const text = result?.value || "";

    if (text.trim().length < 50) {
      return NextResponse.json({ error: "Could not read resume content" });
    }

    // AI PARSE
    const aiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/parse-api`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );

    const parsed = await aiRes.json();

    return NextResponse.json({
      name: parsed.name || "",
      title: parsed.title || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      summary: parsed.summary || "",
      experience: parsed.experience || "",
      education: parsed.education || "",
      skills: parsed.skills || "",
      projects: parsed.projects || "",
      languages: "",
      interests: "",
      certificates: "",
      achievements: "",
      photo: "",
    });
  } catch (e) {
    console.error("Parse error:", e);
    return NextResponse.json({ error: "Failed to parse file" });
  }
}
