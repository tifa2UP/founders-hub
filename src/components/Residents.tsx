"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// Placeholder residents data - replace with real data
const residents = [
  {
    id: 1,
    name: "Erik Nordmann",
    company: "NeuralForge AI",
    title: "CEO & Co-Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 2,
    name: "Sofia Larsen",
    company: "DataMind Labs",
    title: "Founder & CTO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 3,
    name: "Magnus Olsen",
    company: "AutoScale",
    title: "Co-Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 4,
    name: "Ingrid Berg",
    company: "VoiceFlow AI",
    title: "CEO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 5,
    name: "Anders Haugen",
    company: "Codex Intelligence",
    title: "Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 6,
    name: "Emilie Strand",
    company: "HealthPredict",
    title: "CEO & Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 7,
    name: "Henrik Bakken",
    company: "QuantumLeap",
    title: "Co-Founder & CTO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 8,
    name: "Mia Johansen",
    company: "SynthAI",
    title: "Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 9,
    name: "Lars Kristiansen",
    company: "DeepSense",
    title: "CEO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 10,
    name: "Nina Pedersen",
    company: "AIFlow Systems",
    title: "Co-Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 11,
    name: "Oskar Andersen",
    company: "RoboMind",
    title: "Founder & CEO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 12,
    name: "Thea Nilsen",
    company: "VisionCore",
    title: "CTO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 13,
    name: "Jakob Svendsen",
    company: "NLP Nordic",
    title: "Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 14,
    name: "Astrid Hansen",
    company: "SmartAgent AI",
    title: "CEO & Co-Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 15,
    name: "Kristian Moe",
    company: "InferAI",
    title: "Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 16,
    name: "Julie Eriksen",
    company: "ModelStack",
    title: "Co-Founder & CTO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 17,
    name: "Tor Holmen",
    company: "DataBridge",
    title: "CEO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 18,
    name: "Ida Solberg",
    company: "AutoML Labs",
    title: "Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 19,
    name: "Sander Lund",
    company: "NeuralOps",
    title: "Co-Founder",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  {
    id: 20,
    name: "Hanna Dahl",
    company: "GenAI Studio",
    title: "Founder & CEO",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
];

function ResidentCard({
  resident,
  index,
}: {
  resident: (typeof residents)[0];
  index: number;
}) {
  // Generate initials for avatar placeholder
  const initials = resident.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
      className="group"
    >
      <div className="glass glass-hover rounded-xl p-5 h-full transition-all duration-300 hover:border-[#FF6B35]/30">
        <div className="flex items-start gap-4">
          {/* Avatar placeholder */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 flex items-center justify-center flex-shrink-0 border border-[#FF6B35]/20">
            <span className="text-sm font-bold text-[#FF6B35]">{initials}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate group-hover:text-[#FF6B35] transition-colors">
              {resident.name}
            </h3>
            <p className="text-sm text-[#FF6B35] font-medium truncate">
              {resident.company}
            </p>
            <p className="text-xs text-zinc-500 mt-1 truncate">
              {resident.title}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-3">
              <Link
                href={resident.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-[#0A66C2] transition-colors"
                aria-label={`${resident.name}'s LinkedIn`}
              >
                <Linkedin size={16} />
              </Link>
              <Link
                href={resident.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label={`${resident.name}'s Twitter`}
              >
                <Twitter size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Residents() {
  return (
    <section id="residents" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B35]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#FF6B35] uppercase tracking-wider">
            The Crew
          </span>
          <h2 className="text-headline mt-4 text-white">Our Residents</h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Norwegian entrepreneurs building the future. Founders, innovators,
            and AI pioneers under one roof.
          </p>
        </motion.div>

        {/* Residents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {residents.map((resident, index) => (
            <ResidentCard key={resident.id} resident={resident} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 mb-6">
            Want to join these exceptional builders?
          </p>
          <Link
            href="#join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-black font-semibold rounded-full hover:bg-[#FF8555] transition-all glow-orange-hover"
          >
            Apply for Residency
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
