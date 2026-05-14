"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const SUGGESTIONS = [
  "What membership benefits do I have?",
  "Recommend an upcoming event for me",
  "Tell me about wine pairing with seafood",
  "How do I upgrade my membership?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Good evening. I'm your Nosey Palate concierge. How may I help you today? I can assist with membership questions, event recommendations, wine knowledge, or anything about our community.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || data.error || "Something went wrong.",
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "My apologies — something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-6 py-8 md:px-10" style={{ height: "calc(100vh - 5rem)" }}>
      <div className="mb-6">
        <h1 className="font-display text-3xl text-ivory">
          Your <span className="italic text-gold-soft">Concierge</span>
        </h1>
        <p className="mt-1 text-sm text-ivory/50">AI-powered wine and membership assistant</p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gold/20 text-ivory"
                    : "glass text-ivory/90"
                }`}
              >
                {msg.content}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 border-t border-gold/15 pt-2">
                    <p className="text-[10px] uppercase tracking-widest text-ivory/40">Sources</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {msg.sources.map((s, i) => (
                        <span key={i} className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] text-gold/80">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass rounded-2xl px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/60" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/60 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/60 [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="rounded-full border border-gold/25 px-3 py-1.5 text-xs text-ivory/60 transition hover:border-gold hover:text-gold"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your concierge anything..."
          disabled={loading}
          className="flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/40"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-espresso transition hover:scale-105 disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
