"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-grid">
      {/* Large decorative number */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[40vw] font-display text-[#141414] leading-none pointer-events-none select-none hidden lg:block">
        01
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-end px-6 md:px-12 pb-0 pt-24">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
            Oslo, Norway — Est. 2024
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="relative mb-2">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-display"
          >
            <span className="block">Founders</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-display text-stroke-accent"
          >
            <span className="block">Hub</span>
          </motion.h1>
        </div>

        {/* Subheadline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mt-4"
        >
          <div className="max-w-md">
            <p className="text-lg md:text-xl text-neutral-400 leading-tight font-heading">
              For the wildly ambitious building{" "}
              <span className="text-[#FF5722]">global AI impact</span>.
              Oslo&apos;s home for builders who ship fast.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#join" className="btn-primary">
              Apply Now
              <ArrowDownRight className="w-4 h-4" />
            </Link>
            <Link href="#about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="border-t border-neutral-800 overflow-hidden py-3"
      >
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-mono text-sm uppercase tracking-wider text-neutral-600 mx-8"
            >
              Ship Fast • Build Global • AI Builders • No Equity • No Programs • Just Execution •
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-40 right-6 md:right-12 hidden md:flex flex-col items-center gap-2"
      >
        <span className="vertical-text font-mono text-xs uppercase tracking-wider text-neutral-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-[#FF5722] to-transparent"
        />
      </motion.div>
    </section>
  );
}
