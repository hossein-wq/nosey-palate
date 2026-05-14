import host1 from "@/assets/host1.jpg";
import host2 from "@/assets/host2.jpg";
import host3 from "@/assets/host3.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

const HOSTS = [
  { name: "Lena Marchetti", role: "Head Sommelier", note: "Specialty: Burgundy & Old World whites", img: host1 },
  { name: "Marcus Vale", role: "Founder & Host", note: "Built rooms before he built lists", img: host2 },
  { name: "Iris Halloway", role: "Resident Chef", note: "Pairing chef, ex Le Bernardin", img: host3 },
];

export function Hosts() {
  return (
    <section className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 max-w-xl">
          <Eyebrow>Your Hosts</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ivory">
              The People Behind<br /><span className="italic text-gold-soft">the Pour.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {HOSTS.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-md"
            >
              <img src={h.img} alt={h.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[0.3] transition-all duration-[1500ms] group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display text-2xl text-ivory">{h.name}</div>
                <div className="text-xs text-gold tracking-wider mt-1">{h.role.toUpperCase()}</div>
                <div className="overflow-hidden">
                  <div className="mt-2 max-h-0 text-sm text-ivory/70 transition-all duration-700 group-hover:max-h-20">
                    {h.note}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
