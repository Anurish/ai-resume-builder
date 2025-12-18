export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || text.length < 20) {
      return NextResponse.json({ error: "No valid text provided" });
    }

    const prompt = `
You are an expert resume parser.

Return ONLY valid JSON in exactly this format:

{
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": "",
  "experience": "",
  "education": "",
  "projects": ""
}

Rules:
- JSON only (no markdown)
- No invented data
- Skills must be comma-separated
- Experience / Education / Projects must use bullet points (•)
- Empty string if not found

Resume text:
"""${text}"""
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        input: prompt,
        temperature: 0.1,
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("OPENAI STATUS:", response.status);
      console.error("OPENAI RESPONSE:", raw);
      return NextResponse.json({ error: "OpenAI request failed" });
    }

    const data = JSON.parse(raw);

    const output =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    if (!output) {
      return NextResponse.json({ error: "Empty AI response" });
    }

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.error("INVALID JSON FROM AI:", output);
      return NextResponse.json({ error: "AI returned invalid JSON" });
    }

    return NextResponse.json(parsed);

  } catch (err) {
    console.error("PARSE API ERROR:", err);
    return NextResponse.json({ error: "AI parsing failed" });
  }
}
