import { Eyebrow, Reveal } from "./primitives";

const QUOTES = [
  { name: "Sofia R.", tier: "Connoisseur", city: "Brooklyn", text: "I've found my people. Every dinner feels like the start of a new chapter." },
  { name: "James P.", tier: "Collector", city: "London", text: "The pours are extraordinary. The conversations, even better." },
  { name: "Amara K.", tier: "Connoisseur", city: "Lisbon", text: "Nosey Palate didn't just teach me about wine. It widened my world." },
  { name: "Daniel V.", tier: "Collector", city: "Milan", text: "It's the only Saturday night I never want to miss." },
  { name: "Priya S.", tier: "Explorer", city: "New York", text: "I came for the wine. I stayed for the stories." },
  { name: "Henri G.", tier: "Collector", city: "Paris", text: "The closest thing to a salon I've found in this century." },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-14">
        <Eyebrow>Members Speak</Eyebrow>
        <Reveal>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ivory">
            What Belonging<br /><span className="italic">Sounds Like.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-6 px-6">
          {[...QUOTES, ...QUOTES].map((q, i) => (
            <figure key={i} className="glass relative w-[360px] shrink-0 rounded-md p-7 md:w-[420px]">
              <svg width="28" height="22" viewBox="0 0 28 22" className="text-gold/60 mb-4" fill="currentColor">
                <path d="M0 22V11C0 4.9 5 0 11 0v4c-3.9 0-7 3.1-7 7h7v11H0zm17 0V11c0-6.1 5-11 11-11v4c-3.9 0-7 3.1-7 7h7v11H17z" />
              </svg>
              <blockquote className="font-display text-lg leading-snug text-ivory/90 italic">"{q.text}"</blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-gold/15 pt-4">
                <div>
                  <div className="text-sm text-ivory">{q.name}</div>
                  <div className="text-xs text-ivory/55">{q.city}</div>
                </div>
                <span className="rounded-full border border-gold/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">{q.tier}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 60s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
