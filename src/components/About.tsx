"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Users } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "The Outliers Hub",
    description: "The best AI builders under the same roof",
    detail:
      "24/7 workspace in central Oslo. Access to our community of exceptional builders who ship fast.",
  },
  {
    icon: Calendar,
    title: "The Events",
    description: "Hosted by unicorn founders and global VCs",
    detail:
      "Priority invitations to exclusive events. Connect with the people who've built billion-dollar companies.",
  },
  {
    icon: Users,
    title: "The Community",
    description: "Built on ambition, collaboration, and velocity",
    detail:
      "Warm introductions to top-tier investors and operators. A network that accelerates everything you do.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-[#FF6B35] uppercase tracking-wider">
            What is Founders Hub?
          </span>
          <h2 className="text-headline mt-4 text-white">
            Oslo&apos;s home for AI builders
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Free office space and #1 community for the ones that ship fast.
            Connections to the right people to do it faster.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="glass glass-hover rounded-2xl p-8 h-full transition-all duration-300 hover:border-[#FF6B35]/30">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6B35]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#FF6B35] font-medium mb-4">
                  {feature.description}
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-medium text-white max-w-3xl mx-auto leading-relaxed">
            &ldquo;If you&apos;re building something{" "}
            <span className="gradient-text">world-class</span>, you belong
            here.&rdquo;
          </blockquote>
        </motion.div>

        {/* FAQ-style content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Are you a VC?
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              No. We don&apos;t take equity. We don&apos;t write checks.
              We&apos;re funded by sponsors that want you to succeed. That
              said, we&apos;re deeply connected to the top investors in the
              West. Being here gets you the right introductions when
              you&apos;re ready.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              So... like an accelerator?
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              No. No programs. Just the best builders gathered together,
              connected to unicorn founders and resourceful investors. Ship or
              leave.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Am I a good fit?
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              If you&apos;re building something ambitious in AI, probably
              yes. If you thrive around exceptional builders, definitely yes.
              If you value execution over planning, absolutely yes. If
              you&apos;re working on incremental improvements to existing
              ideas, probably not.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Where are you?
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              The top floor of Mesh Youngstorget, closed off for us. Easy to
              get to, great to be at. Designed for locking in and shipping
              fast.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
