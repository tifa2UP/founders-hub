"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden tech-grid">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#FF6B35]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="px-4 py-2 glass rounded-full text-sm font-mono text-zinc-400">
            <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mr-2 animate-pulse" />
            OSLO, NORWAY
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-display uppercase">
            <span className="block text-white">Founders</span>
            <span className="block gradient-text text-glow">Hub</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          For the wildly ambitious
          <br />
          <span className="text-white">building global AI impact</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#join"
            className="group relative px-8 py-4 bg-[#FF6B35] text-black font-bold text-lg rounded-full hover:bg-[#FF8555] transition-all glow-orange overflow-hidden"
          >
            <span className="relative z-10">Apply for Membership</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8555] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 glass glass-hover rounded-full font-semibold text-zinc-300 hover:text-white transition-all"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { value: "25+", label: "Desks" },
            { value: "AI", label: "Focus" },
            { value: "24/7", label: "Access" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs font-mono uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
