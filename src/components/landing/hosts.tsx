"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LUXURY_EASE, staggerContainer, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";

const HOSTS = [
  {
    name: "Daniela Moreau",
    role: "Head Sommelier",
    note: "Trained in Burgundy, passionate about discovering small-batch winemakers and sharing their stories over intimate tastings.",
    image: "/images/host1.jpg",
  },
  {
    name: "Marcus Okafor",
    role: "Experience Director",
    note: "A decade in luxury hospitality. Marcus designs every gathering to feel effortless yet extraordinary.",
    image: "/images/host2.jpg",
  },
  {
    name: "Elena Vasquez",
    role: "Community Lead",
    note: "The glue of Nosey Palate. Elena ensures every member feels seen, celebrated, and connected.",
    image: "/images/host3.jpg",
  },
] as const;

export function Hosts() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-16 max-w-xl">
          <Eyebrow>Your Hosts</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-ivory">
            The People Behind the Pour.
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HOSTS.map((host, i) => (
            <motion.div
              key={host.name}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, delay: i * 0.15, ease: LUXURY_EASE },
                },
              }}
              className="group relative aspect-4/5 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 transition-transform duration-1500 ease-out group-hover:scale-105">
                <Image
                  src={host.image}
                  alt={host.name}
                  fill
                  className="object-cover grayscale-[0.3] transition-[filter] duration-1500 group-hover:grayscale-0"
                />
              </div>

              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"
              />

              <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
                <p className="eyebrow mb-1 text-[0.6rem] text-gold">{host.role}</p>
                <h3 className="font-display text-xl text-ivory lg:text-2xl">
                  {host.name}
                </h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/70 transition-all duration-700 ease-out group-hover:max-h-32">
                  {host.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
