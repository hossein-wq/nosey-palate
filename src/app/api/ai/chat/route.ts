import { NextResponse } from "next/server";
import { ragQuery } from "@/lib/ai/rag";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response:
          "The AI concierge is being set up. Please check back soon or contact our team directly.",
        sources: [],
      });
    }

    const result = await ragQuery(message);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
