const COLS = [
  { title: "Explore", links: ["Membership", "Events", "Experiences", "Community", "Journal"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Legal", links: ["Terms", "Privacy", "Refund Policy"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-background pt-20 pb-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="font-display text-2xl leading-none tracking-tight">
            <div className="text-ivory">NOSEY</div>
            <div className="-mt-1 italic text-ivory/90">Palate</div>
          </div>
          <p className="mt-5 max-w-xs text-sm text-ivory/55">
            A private members club for those who live for wine, conversation, and unforgettable evenings.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "FB", "X", "in"].map((s) => (
              <a key={s} href="#" aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-xs text-ivory/70 transition hover:border-gold hover:text-gold">
                {s}
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <div className="eyebrow mb-5">{col.title}</div>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="text-sm text-ivory/70 transition hover:text-gold">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <div className="eyebrow mb-5">Stay in the Loop</div>
          <p className="mb-4 text-sm text-ivory/60">Get exclusive invites and updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="glass flex items-center rounded-full px-4 py-2">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/40" />
            <button type="submit" aria-label="Subscribe" className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-espresso transition hover:scale-105">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10">
        <div className="hairline h-px w-full" />
        <div className="mt-6 text-center text-xs text-ivory/40">
          © 2026 Nosey Palate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
