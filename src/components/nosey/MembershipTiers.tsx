import vineyardImg from "@/assets/vineyard.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Explorer",
    price: 29,
    tagline: "Perfect for those starting their wine journey.",
    perks: ["Access to events", "Member community", "Exclusive invites"],
  },
  {
    name: "Connoisseur",
    price: 59,
    tagline: "For those who live for wine and experiences.",
    perks: ["All Explorer benefits", "Priority event access", "Invitations to private dinners", "Member pricing"],
    featured: true,
  },
  {
    name: "Collector",
    price: 99,
    tagline: "For the passionate and the discerning.",
    perks: ["All Connoisseur benefits", "VIP concierge access", "Exclusive tasting experiences", "Personalized wine support"],
  },
];

export function MembershipTiers() {
  return (
    <section id="membership" className="relative overflow-hidden py-28 md:py-40">
      <img src={vineyardImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-background/60" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Membership</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-tight text-ivory">
              More Than Access.<br />
              <span className="italic text-gold-soft">It's Belonging.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-ivory/65">
              We keep our community intentional, curated, and personal — every member is welcomed by invitation, vetted by taste.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a href="#explore" className="mt-8 inline-flex items-center gap-2 text-sm text-gold border-b border-gold/30 pb-1 transition hover:border-gold">
              Explore Membership <span>→</span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-3">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col rounded-md p-6 transition-all duration-500 hover:-translate-y-2 ${
                  tier.featured
                    ? "glass-strong sm:-mt-6 sm:mb-0 ring-1 ring-gold/60 shadow-[var(--shadow-luxe)]"
                    : "glass hover:ring-1 hover:ring-gold/40"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-espresso">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {tier.featured && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
                  )}
                  <h3 className="font-display text-xl text-ivory italic">{tier.name}</h3>
                </div>
                <p className="mt-2 text-xs text-ivory/55 leading-relaxed">{tier.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl text-ivory">${tier.price}</span>
                  <span className="text-xs text-ivory/50">/month</span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-ivory/75">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-gold"><path d="M5 12l5 5L20 7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>

                <button className={`mt-6 w-full rounded-sm py-3 text-sm font-medium transition-all ${
                  tier.featured
                    ? "bg-gold text-espresso hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_50%,transparent)]"
                    : "border border-gold/40 text-ivory hover:bg-gold/10 hover:border-gold"
                }`}>
                  Join Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
