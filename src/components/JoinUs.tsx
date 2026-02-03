"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Resident",
    price: "Sponsored",
    priceAlt: "or 1,500 NOK/mo",
    description: "Full access. 24/7 office, unicorn founders, investor intros.",
    features: [
      "24/7 office access",
      "Direct access to unicorn founders",
      "Warm intros to investors",
      "Free coffee & amenities",
      "Exclusive WhatsApp group",
    ],
    highlight: true,
    cta: "Apply for Residency",
    href: "mailto:hello@foundershub.no?subject=Residency Application",
  },
  {
    name: "Member",
    price: "Free",
    priceAlt: null,
    description: "Norway's top AI founders. Priority events, exclusive resources.",
    features: [
      "Priority event invitations",
      "Exclusive WhatsApp group",
      "Access to selected resources",
      "Network with residents",
    ],
    highlight: false,
    cta: "Apply for Membership",
    href: "mailto:hello@foundershub.no?subject=Membership Application",
  },
  {
    name: "Community",
    price: "Free",
    priceAlt: null,
    description: "For aspiring founders interested in the AI ecosystem.",
    features: [
      "Access to larger events",
      "Meet residents & members",
      "Connect with AI founders",
      "LinkedIn updates",
    ],
    highlight: false,
    cta: "Join Community",
    href: "https://linkedin.com/company/foundershub-oslo",
  },
];

export default function JoinUs() {
  return (
    <section id="join" className="py-24 px-6 md:px-12 relative border-t border-neutral-800">
      {/* Large decorative number */}
      <div className="absolute top-0 left-0 text-[30vw] font-display text-[#141414] leading-none pointer-events-none select-none hidden lg:block">
        04
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="accent-bar" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              Get Involved
            </span>
          </div>
          <h2 className="text-display-sm">
            Join <span className="italic text-[#FF5722]">Us</span>
          </h2>
        </motion.div>

        {/* Tiers - flush layout */}
        <div className="grid md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${tier.highlight ? "md:-mt-8 md:mb-8" : ""}`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-0 z-10">
                  <span className="bg-[#FF5722] text-[#0a0a0a] font-heading font-bold text-xs uppercase tracking-wider px-4 py-2">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`h-full p-8 md:p-10 border border-neutral-800 ${
                  tier.highlight
                    ? "bg-[#FF5722] text-[#0a0a0a] border-[#FF5722]"
                    : "hover:border-[#FF5722] hover:bg-[#111] transition-all"
                }`}
              >
                <h3 className="font-heading font-bold text-2xl mb-2">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-display">{tier.price}</span>
                  {tier.priceAlt && (
                    <span
                      className={`block text-sm mt-1 ${
                        tier.highlight ? "text-[#0a0a0a]/60" : "text-neutral-600"
                      }`}
                    >
                      {tier.priceAlt}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm mb-8 ${
                    tier.highlight ? "text-[#0a0a0a]/80" : "text-neutral-500"
                  }`}
                >
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-sm ${
                        tier.highlight ? "text-[#0a0a0a]" : "text-neutral-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 ${
                          tier.highlight ? "bg-[#0a0a0a]" : "bg-[#FF5722]"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  target={tier.name === "Community" ? "_blank" : undefined}
                  rel={tier.name === "Community" ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wider transition-all ${
                    tier.highlight
                      ? "text-[#0a0a0a] border-b-2 border-[#0a0a0a] hover:border-b-4"
                      : "text-white border-b-2 border-white hover:border-[#FF5722] hover:text-[#FF5722]"
                  }`}
                >
                  {tier.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-display-sm mb-8">
            Ready to <span className="italic">ship</span>?
          </h3>
          <p className="text-neutral-500 max-w-xl mx-auto mb-12 text-lg">
            If you&apos;re building something that matters and want to be around
            others doing the same, apply now. The sooner you&apos;re in, the
            sooner you&apos;re building with the best.
          </p>
          <Link
            href="mailto:hello@foundershub.no?subject=Application"
            className="btn-primary text-lg px-12 py-5"
          >
            Apply Now
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
