"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function ApplyPage() {
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, linkedin, notes }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ kind: "error", message: data.error ?? "Something went wrong." });
        return;
      }

      setStatus({ kind: "success" });
      setEmail("");
      setLinkedin("");
      setNotes("");
    } catch {
      setStatus({ kind: "error", message: "Network error. Try again." });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col">
      {/* Top bar */}
      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-neutral-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-mono uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <Link href="/" className="font-display text-2xl">
          FH<span className="text-[#FF5722]">.</span>
        </Link>
      </header>

      <section className="flex-1 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="accent-bar" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              Apply for Residency
            </span>
          </div>

          <h1 className="text-display-sm mb-6">
            Join <span className="italic text-[#FF5722]">Founders Hub</span>
          </h1>
          <p className="text-neutral-500 mb-12 max-w-md">
            Tell us a little about yourself. We&apos;ll get back to you within a few days.
          </p>

          {status.kind === "success" ? (
            <div className="border border-[#FF5722] p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF5722] mb-4">
                Application received
              </p>
              <p className="text-neutral-300 mb-6">
                Thanks for applying. We&apos;ll be in touch soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
                className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
              >
                Submit another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <Field
                label="Email"
                required
                input={
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    disabled={submitting}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#FF5722] focus:outline-none py-3 text-lg placeholder:text-neutral-700 transition-colors"
                  />
                }
              />

              <Field
                label="LinkedIn"
                input={
                  <input
                    type="url"
                    autoComplete="url"
                    disabled={submitting}
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/you"
                    className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#FF5722] focus:outline-none py-3 text-lg placeholder:text-neutral-700 transition-colors"
                  />
                }
              />

              <Field
                label="Anything we should know?"
                input={
                  <textarea
                    rows={5}
                    disabled={submitting}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What are you building, why Founders Hub..."
                    className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-[#FF5722] focus:outline-none py-3 text-base placeholder:text-neutral-700 transition-colors resize-none"
                  />
                }
              />

              {status.kind === "error" && (
                <p className="text-sm font-mono text-[#FF5722]">{status.message}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Submit Application"}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  input,
}: {
  label: string;
  required?: boolean;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 block">
        {label}
        {required && <span className="text-[#FF5722] ml-1">*</span>}
      </span>
      {input}
    </label>
  );
}
