"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "The Hub",
    subtitle: "Best AI builders under one roof",
    description:
      "24/7 workspace in central Oslo. A curated community of exceptional builders who value execution over everything else.",
  },
  {
    number: "02",
    title: "The Events",
    subtitle: "Unicorn founders & global VCs",
    description:
      "Priority access to exclusive gatherings. Learn from those who've built billion-dollar companies.",
  },
  {
    number: "03",
    title: "The Network",
    subtitle: "Ambition, collaboration, velocity",
    description:
      "Warm introductions to top-tier investors and operators. A network that accelerates everything.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 relative">
      {/* Large decorative number */}
      <div className="absolute top-0 left-0 text-[30vw] font-display text-[#141414] leading-none pointer-events-none select-none hidden lg:block">
        02
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="accent-bar" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              What We Do
            </span>
          </div>
          <h2 className="text-display-sm max-w-4xl">
            Oslo&apos;s home for{" "}
            <span className="italic text-[#FF5722]">AI builders</span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-brutal p-8 md:p-12 group hover:bg-[#111]"
            >
              <span className="font-mono text-6xl md:text-7xl text-neutral-800 group-hover:text-[#FF5722] transition-colors">
                {pillar.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mt-6 mb-2">
                {pillar.title}
              </h3>
              <p className="text-[#FF5722] font-heading text-sm uppercase tracking-wider mb-4">
                {pillar.subtitle}
              </p>
              <p className="text-neutral-500 leading-relaxed">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Quote section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 border-l-2 border-[#FF5722] pl-8 md:pl-12"
        >
          <blockquote className="text-display-sm italic text-neutral-300">
            &ldquo;If you&apos;re building something world-class, you belong
            here.&rdquo;
          </blockquote>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 grid md:grid-cols-2 gap-12 md:gap-24"
        >
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-4">
              <span className="text-[#FF5722]">—</span>
              Are you a VC?
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              No. We don&apos;t take equity. We don&apos;t write checks.
              We&apos;re funded by sponsors that want you to succeed. That said,
              we&apos;re deeply connected to the top investors in the West.
              Being here gets you the right introductions when you&apos;re
              ready.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-4">
              <span className="text-[#FF5722]">—</span>
              So... like an accelerator?
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              No. No programs. Just the best builders gathered together,
              connected to unicorn founders and resourceful investors.{" "}
              <span className="text-white font-semibold">Ship or leave.</span>
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-4">
              <span className="text-[#FF5722]">—</span>
              Am I a good fit?
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              If you&apos;re building something ambitious in AI, probably yes.
              If you thrive around exceptional builders, definitely yes. If you
              value execution over planning, absolutely yes. If you&apos;re
              working on incremental improvements, probably not.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-4">
              <span className="text-[#FF5722]">—</span>
              Where are you?
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              The top floor of Mesh Youngstorget, closed off for us. Central
              Oslo. Easy to get to, great to be at. Designed for locking in and
              shipping fast.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
