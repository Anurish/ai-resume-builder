export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Evaluate this candidate resume for ATS score.
Output JSON strictly in this format:
{
  "score": number (0-100),
  "feedback": string
}
Resume data:
${JSON.stringify(body)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const content = completion.choices[0]?.message?.content;

    // ✅ Type-safe guard (fixes the build error)
    if (!content) {
      return NextResponse.json(
        { error: "Empty response from AI model" },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate ATS score" },
      { status: 500 }
    );
  }
}
