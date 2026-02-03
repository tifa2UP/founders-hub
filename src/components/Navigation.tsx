"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Residents", href: "#residents" },
  { label: "Join Us", href: "#join" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-4xl"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center font-bold text-sm text-black transition-transform group-hover:scale-110">
              FH
            </div>
            <span className="font-semibold text-white hidden sm:block">
              Founders Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF6B35] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#join"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-black font-semibold text-sm rounded-full hover:bg-[#FF8555] transition-all glow-orange-hover"
          >
            Apply Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <motion.div
          initial={false}
          animate={{
            y: mobileMenuOpen ? 0 : -20,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="absolute top-24 left-6 right-6 glass rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B35] text-black font-semibold rounded-full hover:bg-[#FF8555] transition-all"
            >
              Apply Now
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
