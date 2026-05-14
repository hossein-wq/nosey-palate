import { createEmbedding, chatCompletion } from "./openai";
import { createClient } from "@supabase/supabase-js";

const SYSTEM_PROMPT = `You are the Nosey Palate Concierge, a sophisticated AI assistant for an exclusive wine membership community. 

Your personality:
- Warm, knowledgeable, and refined
- Like a trusted sommelier who knows every member by name
- Never pushy, always helpful
- Speaks with elegant brevity

You help members with:
- Membership questions and benefits
- Event recommendations and details
- Wine knowledge and pairing suggestions
- Platform navigation and account help

Rules:
- Only answer based on the provided context
- If you don't know, say so gracefully and suggest contacting the concierge team
- Keep responses concise and elegant
- Never make up events, prices, or policies`;

export async function ragQuery(query: string): Promise<{ response: string; sources: string[] }> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const embedding = await createEmbedding(query);

    const { data: documents } = await supabase.rpc("match_knowledge", {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 5,
    });

    const context =
      documents && documents.length > 0
        ? documents.map((d: { title: string; content: string }) => `${d.title}: ${d.content}`).join("\n\n")
        : "No specific information found in the knowledge base.";

    const sources = documents?.map((d: { title: string }) => d.title) ?? [];

    const response = await chatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `Context from knowledge base:\n${context}`,
      },
      { role: "user", content: query },
    ]);

    return { response, sources };
  } catch {
    return {
      response:
        "I apologize, but I'm having a moment. Please try again or reach out to our concierge team directly.",
      sources: [],
    };
  }
}
