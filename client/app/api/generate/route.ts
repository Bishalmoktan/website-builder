import { env } from "@/config/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt } = await req.json();

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ content: text.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error generating content:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
