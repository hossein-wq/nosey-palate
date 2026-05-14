# Nosey Palate — Cinematic Members Club Homepage

A single, immersive homepage for Nosey Palate: a private wine members club. The experience should feel like an editorial film — warm, intimate, low-lit, gold-accented — not a SaaS landing page.

Note on stack: this project runs on **TanStack Start + Tailwind v4**, not Next.js. Functionally equivalent — same React, Tailwind, Framer Motion, shadcn. Aceternity-style effects (spotlight, beams, tracing beam, lamp, animated grid) will be hand-built as local components since they're just Framer Motion + Tailwind.

## Art direction

- **Palette**: near-black `#0A0706`, espresso `#1A0F0C`, burgundy `#3A0E1A`, warm ivory `#F5EDE0`, antique gold `#C9A24C`, champagne `#E8D5A8`. Defined as oklch tokens in `src/styles.css`.
- **Type**: Display serif (Cormorant Garamond / Fraunces) for editorial headlines + italic accents; humanist sans (Inter Tight) for body; small-caps eyebrows with wide tracking.
- **Texture**: subtle film grain overlay, warm vignette, soft golden god-rays, glassmorphism cards with 1px gold hairlines.
- **Motion**: slow easing (cubic-bezier .22,1,.36,1), staggered reveals, parallax on hero imagery, tracing beam down the page spine, lamp glow on section transitions. No bounce.

## Sections (top to bottom)

1. **Nav** — thin transparent bar, serif wordmark left, minimal links center, "Apply for Membership" gold pill right.
2. **Cinematic Hero** — full-bleed warm bar/cellar image, layered gradient, neon-italic "Better Wine. Better People." accent, headline "Real Connection.", subcopy, gold CTA + "Watch the Experience" play. Floating glass "Next Event" card right. Grain + spotlight.
3. **Membership Tiers** — three glass cards (Explorer / Connoisseur / Collector) over a dusk-vineyard backdrop; middle card elevated with gold ring + "Most Popular" ribbon. Hover lifts card and brightens gold edge.
4. **Upcoming Events** — horizontal cinematic carousel with date stamps, location, spots-left, hover expansion revealing details.
5. **Community** — wide editorial photograph of members at golden hour, overlaid copy "Good Wine. Great People.", clustered avatar stack + "2,500+ Members Worldwide".
6. **Exclusive Experiences** — five gold line-icons (Sommelier-Led Tastings, Private Winery, Chef Pairing, Global Journeys, Members-Only Invitations) over an atmospheric lounge image, with editorial left column.
7. **Editorial Storytelling** — asymmetrical magazine spread: oversized serif pull-quote, vertical caption, two stacked images with parallax.
8. **Sommelier / Host Showcase** — three host portraits with name, title, tasting signature; hover reveals bio.
9. **Member Testimonials** — animated marquee of glass quote cards with member avatar, tier badge, and chapter city.
10. **Mobile App Preview** — floating iPhone mockup + membership card with gold glow, App Store / Google Play badges.
11. **Loyalty & Status** — four tier icons (Explorer / Connoisseur / Collector / Grand Cru) with point ranges along a glowing horizontal track.
12. **FAQ** — elegant accordion with serif questions, hairline dividers.
13. **Final CTA** — "Your Wine Life Starts Here." over NYC dusk skyline with hand holding wine glass; single gold CTA.
14. **Footer** — wordmark, four link columns (Explore / Company / Legal / Stay in the Loop), email capture with gold send icon, socials.

## Technical plan

- Stack: TanStack Start, React 19, Tailwind v4, Framer Motion, shadcn primitives already in repo.
- Add `framer-motion` via `bun add`.
- Design tokens in `src/styles.css` (`@theme inline` + `:root`): background, foreground, gold, burgundy, champagne, ivory, plus `--shadow-luxe`, `--gradient-ember`, `--gradient-vignette`. Update `.dark` to match (default theme is dark).
- Fonts via Google Fonts `<link>` injected in `__root.tsx` head (Cormorant Garamond, Fraunces, Inter Tight).
- New components in `src/components/nosey/`:
  - `Navbar.tsx`, `Hero.tsx`, `MembershipTiers.tsx`, `UpcomingEvents.tsx`, `Community.tsx`, `Experiences.tsx`, `Editorial.tsx`, `Hosts.tsx`, `Testimonials.tsx`, `AppPreview.tsx`, `Loyalty.tsx`, `FAQ.tsx`, `FinalCTA.tsx`, `Footer.tsx`.
  - Effect primitives: `Spotlight.tsx`, `GrainOverlay.tsx`, `TracingBeam.tsx`, `LampGlow.tsx`, `AnimatedGrid.tsx`, `RevealText.tsx`, `ParallaxImage.tsx`.
- Hero, community, experiences, editorial, app-preview, final-CTA images generated via `imagegen` (premium quality, cinematic warm low-light wine-bar / vineyard / skyline scenes, no embedded text). Saved to `src/assets/`.
- iPhone + membership card composed in CSS/SVG (no real device frame asset needed) with gold border-glow.
- Replace `src/routes/index.tsx` placeholder; compose all sections inside one route. Add per-page `head()` with title, description, og:title, og:description, og:image (hero).
- Accessibility: semantic landmarks, `prefers-reduced-motion` disables parallax/marquee, focus rings in gold, alt text on all images.
- Responsive: mobile-first; carousel becomes swipe; membership cards stack; editorial columns collapse.

## Out of scope (this pass)

- Auth / real membership application flow (CTAs are visual only).
- Real event data / CMS integration.
- Separate routes for Events / Membership / About — homepage only as requested.
