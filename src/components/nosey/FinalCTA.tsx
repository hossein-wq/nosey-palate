import skylineImg from "@/assets/skyline.jpg";
import { Eyebrow, Reveal } from "./primitives";

export function FinalCTA() {
  return (
    <section id="apply" className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <img src={skylineImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-10">
        <div className="max-w-xl">
          <Eyebrow>Ready to Elevate</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1] tracking-tight text-ivory">
              Your Wine Life<br /><span className="italic text-gold-soft">Starts Here.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-ivory/70">
              Join a community that celebrates wine, connection, and unforgettable experiences.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#apply" className="group mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-espresso transition-all hover:shadow-[0_0_60px_color-mix(in_oklab,var(--gold)_60%,transparent)]">
              Apply for Membership
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
