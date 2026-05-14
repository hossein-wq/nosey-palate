// Supabase Edge Function: AI Embed
// Generates embeddings for knowledge base documents
// Deploy with: supabase functions deploy ai-embed

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { title, content, category } = await req.json();

    if (!title || !content || !category) {
      return new Response("Missing required fields", { status: 400 });
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      return new Response("OpenAI API key not configured", { status: 500 });
    }

    // Generate embedding
    const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: `${title}\n\n${content}`,
      }),
    });

    const embeddingData = await embeddingRes.json();
    const embedding = embeddingData.data[0].embedding;

    console.log(`Generated embedding for: ${title} (${category})`);

    return new Response(
      JSON.stringify({ embedding, dimensions: embedding.length }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error generating embedding:", error);
    return new Response("Internal error", { status: 500 });
  }
});
