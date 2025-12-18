import { NextResponse } from "next/server";
import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = `
  Evaluate this candidate resume for ATS score.
  Output JSON: { score (0-100), feedback (1 paragraph) }
  Resume data: ${JSON.stringify(body)}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-5.1",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return NextResponse.json(JSON.parse(completion.choices[0].message.content));
}
