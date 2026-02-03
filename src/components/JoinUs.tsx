"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Users, Globe } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Resident",
    icon: Sparkles,
    description:
      "Full access to everything. 24/7 office, direct access to unicorn founders, warm intros to investors.",
    price: {
      sponsored: "Sponsored",
      paid: "1,500 NOK/mo",
    },
    features: [
      "24/7 office access",
      "Direct access to unicorn founders",
      "Warm intros to investors",
      "Free coffee & amenities",
      "Exclusive WhatsApp group",
    ],
    highlight: true,
    cta: "Apply for Residency",
    note: "10 fully sponsored desks + 15 half-sponsored desks available",
  },
  {
    name: "Member",
    icon: Users,
    description:
      "Norway's top AI founders. Priority event invitations and exclusive resources.",
    price: {
      sponsored: "Free",
      paid: null,
    },
    features: [
      "Priority event invitations",
      "Exclusive WhatsApp group",
      "Access to selected resources",
      "Network with residents",
    ],
    highlight: false,
    cta: "Apply for Membership",
    note: "For active AI founders building ambitious projects",
  },
  {
    name: "Community",
    icon: Globe,
    description:
      "For aspiring founders and those interested in the AI ecosystem.",
    price: {
      sponsored: "Free",
      paid: null,
    },
    features: [
      "Access to larger events",
      "Meet residents & members",
      "Connect with AI founders",
      "LinkedIn community updates",
    ],
    highlight: false,
    cta: "Join Community",
    note: "Follow us on LinkedIn and check our Luma calendar",
  },
];

export default function JoinUs() {
  return (
    <section id="join" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#FF6B35] uppercase tracking-wider">
            Get Involved
          </span>
          <h2 className="text-headline mt-4 text-white">Join Us</h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Three ways to be part of the community.
          </p>
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${tier.highlight ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-3 py-1 bg-[#FF6B35] text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div
                className={`glass rounded-2xl p-8 h-full transition-all duration-300 ${
                  tier.highlight
                    ? "border-[#FF6B35]/50 bg-[#FF6B35]/5"
                    : "glass-hover"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tier.highlight ? "bg-[#FF6B35]" : "bg-[#FF6B35]/10"
                    }`}
                  >
                    <tier.icon
                      className={`w-5 h-5 ${
                        tier.highlight ? "text-black" : "text-[#FF6B35]"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                </div>

                <p className="text-zinc-400 text-sm mb-6 min-h-[60px]">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white">
                    {tier.price.sponsored}
                  </div>
                  {tier.price.paid && (
                    <div className="text-sm text-zinc-500">
                      or {tier.price.paid}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <p className="text-xs text-zinc-600 mb-6 min-h-[32px]">
                  {tier.note}
                </p>

                {/* CTA */}
                <Link
                  href={
                    tier.name === "Community"
                      ? "https://linkedin.com/company/foundershub-oslo"
                      : "#contact"
                  }
                  target={tier.name === "Community" ? "_blank" : undefined}
                  rel={
                    tier.name === "Community"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`block w-full py-3 rounded-full text-center font-semibold transition-all ${
                    tier.highlight
                      ? "bg-[#FF6B35] text-black hover:bg-[#FF8555] glow-orange"
                      : "glass glass-hover text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to build with the best?
            </h3>
            <p className="text-zinc-400 mb-8">
              Apply now. If you&apos;re building something that matters and want
              to be around others doing the same, the sooner you&apos;re in, the
              sooner you&apos;re building with the best.
            </p>
            <Link
              href="mailto:hello@foundershub.no"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-black font-bold text-lg rounded-full hover:bg-[#FF8555] transition-all glow-orange"
            >
              Apply for Membership
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
