"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// Placeholder residents data
const residents = [
  { id: 1, name: "Erik Nordmann", company: "NeuralForge AI", title: "CEO & Co-Founder", linkedin: "#", twitter: "#" },
  { id: 2, name: "Sofia Larsen", company: "DataMind Labs", title: "Founder & CTO", linkedin: "#", twitter: "#" },
  { id: 3, name: "Magnus Olsen", company: "AutoScale", title: "Co-Founder", linkedin: "#", twitter: "#" },
  { id: 4, name: "Ingrid Berg", company: "VoiceFlow AI", title: "CEO", linkedin: "#", twitter: "#" },
  { id: 5, name: "Anders Haugen", company: "Codex Intelligence", title: "Founder", linkedin: "#", twitter: "#" },
  { id: 6, name: "Emilie Strand", company: "HealthPredict", title: "CEO & Founder", linkedin: "#", twitter: "#" },
  { id: 7, name: "Henrik Bakken", company: "QuantumLeap", title: "Co-Founder & CTO", linkedin: "#", twitter: "#" },
  { id: 8, name: "Mia Johansen", company: "SynthAI", title: "Founder", linkedin: "#", twitter: "#" },
  { id: 9, name: "Lars Kristiansen", company: "DeepSense", title: "CEO", linkedin: "#", twitter: "#" },
  { id: 10, name: "Nina Pedersen", company: "AIFlow Systems", title: "Co-Founder", linkedin: "#", twitter: "#" },
  { id: 11, name: "Oskar Andersen", company: "RoboMind", title: "Founder & CEO", linkedin: "#", twitter: "#" },
  { id: 12, name: "Thea Nilsen", company: "VisionCore", title: "CTO", linkedin: "#", twitter: "#" },
  { id: 13, name: "Jakob Svendsen", company: "NLP Nordic", title: "Founder", linkedin: "#", twitter: "#" },
  { id: 14, name: "Astrid Hansen", company: "SmartAgent AI", title: "CEO & Co-Founder", linkedin: "#", twitter: "#" },
  { id: 15, name: "Kristian Moe", company: "InferAI", title: "Founder", linkedin: "#", twitter: "#" },
  { id: 16, name: "Julie Eriksen", company: "ModelStack", title: "Co-Founder & CTO", linkedin: "#", twitter: "#" },
  { id: 17, name: "Tor Holmen", company: "DataBridge", title: "CEO", linkedin: "#", twitter: "#" },
  { id: 18, name: "Ida Solberg", company: "AutoML Labs", title: "Founder", linkedin: "#", twitter: "#" },
  { id: 19, name: "Sander Lund", company: "NeuralOps", title: "Co-Founder", linkedin: "#", twitter: "#" },
  { id: 20, name: "Hanna Dahl", company: "GenAI Studio", title: "Founder & CEO", linkedin: "#", twitter: "#" },
];

export default function Residents() {
  return (
    <section id="residents" className="py-32 px-6 md:px-12 relative">
      {/* Large decorative number */}
      <div className="absolute top-0 right-0 text-[30vw] font-display text-[#141414] leading-none pointer-events-none select-none hidden lg:block">
        03
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="accent-bar" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              The Crew
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-display-sm">
              Our <span className="italic text-[#FF5722]">Residents</span>
            </h2>
            <p className="text-neutral-500 max-w-md">
              Norwegian entrepreneurs building the future. Founders, innovators,
              and AI pioneers under one roof.
            </p>
          </div>
        </motion.div>

        {/* Residents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {residents.map((resident, index) => (
            <motion.article
              key={resident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
              className="card-brutal p-6 group"
            >
              {/* Number */}
              <span className="font-mono text-xs text-neutral-700 group-hover:text-[#FF5722] transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="mt-4">
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF5722] transition-colors">
                  {resident.name}
                </h3>
                <p className="text-[#FF5722] text-sm font-heading mt-1">
                  {resident.company}
                </p>
                <p className="text-neutral-600 text-xs mt-1">{resident.title}</p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-800">
                <Link
                  href={resident.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-white transition-colors"
                  aria-label={`${resident.name}'s LinkedIn`}
                >
                  <Linkedin size={16} />
                </Link>
                <Link
                  href={resident.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-white transition-colors"
                  aria-label={`${resident.name}'s Twitter`}
                >
                  <Twitter size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-16 border-t border-neutral-800"
        >
          <p className="text-neutral-500 font-heading">
            Want to join these exceptional builders?
          </p>
          <Link href="#join" className="btn-primary">
            Apply for Residency
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
