"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35] flex items-center justify-center font-bold text-black">
                FH
              </div>
              <span className="text-xl font-bold text-white">Founders Hub</span>
            </Link>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              Oslo&apos;s home for AI builders. For the wildly ambitious
              building global AI impact.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="https://linkedin.com/company/foundershub-oslo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="mailto:hello@foundershub.no"
                className="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center text-zinc-400 hover:text-[#FF6B35] transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Residents", href: "#residents" },
                { label: "Join Us", href: "#join" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Location
            </h4>
            <div className="flex items-start gap-3 text-zinc-500">
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
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Founders Hub Oslo. All rights
            reserved.
          </p>
          <p className="text-xs text-zinc-700 font-mono">
            Ship fast. Build global.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
