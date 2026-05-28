"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800">
      {/* Main footer */}
      <div className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block mb-6">
                <span className="text-4xl font-heading font-bold tracking-tight">
                  FH
                </span>
              </Link>
              <p className="text-neutral-500 max-w-sm leading-relaxed mb-8">
                Oslo&apos;s home for AI builders. For the wildly ambitious
                building global AI impact.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://linkedin.com/company/foundershub-oslo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-[#FF5722] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </Link>
                <Link
                  href="mailto:hello@foundershub.no"
                  className="w-12 h-12 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-[#FF5722] transition-colors"
                  aria-label="Email"
                >
                  <HiOutlineMail size={20} />
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Navigate
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "About", href: "#about" },
                  { label: "Residents", href: "#residents" },
                  { label: "Join Us", href: "#join" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-500 hover:text-white transition-colors link-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="md:col-span-3">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Location
              </h4>
              <div className="flex items-start gap-3 text-neutral-500">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <p>
                  Mesh Youngstorget
                  <br />
                  Top Floor
                  <br />
                  Oslo, Norway
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Ready?
              </h4>
              <Link
                href="#join"
                className="inline-flex items-center gap-2 text-[#FF5722] font-heading font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all"
              >
                Apply Now
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-neutral-800 px-6 md:px-12 py-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 font-mono">
            &copy; {new Date().getFullYear()} Founders Hub Oslo
          </p>
          <p className="text-xs text-neutral-700 font-mono uppercase tracking-wider">
            Ship fast. Build global.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
