import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { residents } from "@/lib/residents.generated";

const SITE_URL = "https://www.founder-hub.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return residents.map((resident) => ({ slug: resident.slug }));
}

function getResident(slug: string) {
  return residents.find((resident) => resident.slug === slug);
}

function getDescription(resident: (typeof residents)[number]) {
  return (
    resident.tagline ??
    resident.bio?.[0] ??
    `${resident.name} is ${resident.title} at ${resident.company} and a resident at Founders Hub Oslo.`
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resident = getResident(slug);

  if (!resident) {
    return { title: "Resident not found" };
  }

  const description = getDescription(resident);
  const profilePath = `/residents/${resident.slug}`;

  return {
    title: `${resident.name} — ${resident.company}`,
    description,
    alternates: {
      canonical: profilePath,
    },
    openGraph: {
      title: `${resident.name} — Founders Hub Oslo`,
      description,
      type: "website",
      url: profilePath,
      images: [
        {
          url: resident.image,
          width: 800,
          height: 800,
          alt: resident.imageAlt ?? resident.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resident.name} — Founders Hub Oslo`,
      description,
      images: [resident.image],
    },
  };
}

export default async function ResidentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resident = getResident(slug);

  if (!resident) {
    notFound();
  }

  const residentIndex = residents.findIndex((item) => item.slug === resident.slug);
  const relatedResidents = residents
    .filter((item) => item.slug !== resident.slug)
    .slice(0, 3);
  const description = getDescription(resident);
  const profileUrl = `${SITE_URL}/residents/${resident.slug}`;
  const sameAs = [resident.linkedin, resident.twitter, resident.website].filter(
    (url): url is string => Boolean(url),
  );
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    ...(resident.updatedAt ? { dateModified: resident.updatedAt } : {}),
    mainEntity: {
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      name: resident.name,
      ...(resident.alternateNames
        ? { alternateName: resident.alternateNames }
        : {}),
      url: profileUrl,
      image: `${SITE_URL}${resident.image}`,
      jobTitle: resident.title,
      description,
      worksFor: {
        "@type": "Organization",
        name: resident.company,
        ...(resident.companyUrl ? { url: resident.companyUrl } : {}),
      },
      memberOf: {
        "@type": "Organization",
        name: "Founders Hub Oslo",
        url: SITE_URL,
      },
      ...(resident.focusAreas ? { knowsAbout: resident.focusAreas } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
  };

  const hasAboutSection = Boolean(
    resident.bio ||
      resident.location ||
      resident.residentSince ||
      resident.focusAreas ||
      resident.highlights,
  );

  return (
    <main className="relative min-h-screen">
      <Navigation />

      <article>
        <header className="relative overflow-hidden border-b border-neutral-800 px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
          <div className="pointer-events-none absolute top-8 right-0 hidden font-display text-[28vw] leading-none text-[#141414] select-none lg:block">
            {String(residentIndex + 1).padStart(2, "0")}
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <Link
              href="/#residents"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-neutral-500 uppercase transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              All residents
            </Link>

            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
              <div className="relative aspect-square overflow-hidden border border-neutral-800 bg-neutral-900">
                <Image
                  src={resident.image}
                  alt={resident.imageAlt ?? resident.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 font-mono text-xs tracking-[0.2em] text-white/55">
                  RESIDENT {String(residentIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="pb-2">
                <div className="mb-8 flex items-center gap-6">
                  <div className="accent-bar" />
                  <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">
                    The Crew
                  </span>
                </div>

                <h1 className="font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.84] tracking-[-0.04em] text-white">
                  {resident.name}
                </h1>

                <div className="mt-8 border-l-2 border-[#FF5722] pl-5">
                  {resident.companyUrl ? (
                    <a
                      href={resident.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-heading text-xl font-bold text-[#FF5722] transition-colors hover:text-white"
                    >
                      {resident.company}
                      <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <p className="font-heading text-xl font-bold text-[#FF5722]">
                      {resident.company}
                    </p>
                  )}
                  <p className="mt-1 text-neutral-500">{resident.title}</p>
                </div>

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
                  {description}
                </p>

                {(resident.linkedin || resident.twitter || resident.website) && (
                  <div className="mt-10 flex flex-wrap gap-3">
                    {resident.linkedin && (
                      <a
                        href={resident.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-3 font-heading text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                      >
                        <SiLinkedin size={14} /> LinkedIn
                      </a>
                    )}
                    {resident.twitter && (
                      <a
                        href={resident.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-3 font-heading text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                      >
                        <SiX size={13} /> X
                      </a>
                    )}
                    {resident.website && (
                      <a
                        href={resident.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-3 font-heading text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                      >
                        <Globe size={14} /> Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {hasAboutSection && (
          <section className="border-b border-neutral-800 px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-24">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">
                  The person
                </span>
                <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
                  About <em className="text-[#FF5722]">{resident.name.split(" ")[0]}</em>
                </h2>

                {resident.bio && (
                  <div className="mt-9 max-w-3xl space-y-5 text-lg leading-relaxed text-neutral-400">
                    {resident.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              <aside className="border-t border-neutral-800 lg:border-t-0 lg:border-l lg:pl-10">
                {(resident.location || resident.residentSince || resident.highlights) && (
                  <dl>
                    {resident.location && (
                      <div className="border-b border-neutral-800 py-5">
                        <dt className="font-mono text-[0.68rem] tracking-[0.22em] text-neutral-600 uppercase">
                          Location
                        </dt>
                        <dd className="mt-2 font-heading font-bold text-neutral-200">
                          {resident.location}
                        </dd>
                      </div>
                    )}
                    {resident.residentSince && (
                      <div className="border-b border-neutral-800 py-5">
                        <dt className="font-mono text-[0.68rem] tracking-[0.22em] text-neutral-600 uppercase">
                          Resident since
                        </dt>
                        <dd className="mt-2 font-heading font-bold text-neutral-200">
                          {resident.residentSince}
                        </dd>
                      </div>
                    )}
                    {resident.highlights?.map((highlight) => (
                      <div
                        key={`${highlight.label}-${highlight.value}`}
                        className="border-b border-neutral-800 py-5"
                      >
                        <dt className="font-mono text-[0.68rem] tracking-[0.22em] text-neutral-600 uppercase">
                          {highlight.label}
                        </dt>
                        <dd className="mt-2 font-heading font-bold leading-snug text-neutral-200">
                          {highlight.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {resident.focusAreas && (
                  <div className="pt-7">
                    <h3 className="font-mono text-[0.68rem] tracking-[0.22em] text-neutral-600 uppercase">
                      Focus
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resident.focusAreas.map((area) => (
                        <span
                          key={area}
                          className="border border-neutral-800 px-3 py-2 text-sm text-neutral-400"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </section>
        )}

        {resident.projects && (
          <section className="border-b border-neutral-800 px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-7xl">
              <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">
                Selected work
              </span>
              <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
                Things <em className="text-[#FF5722]">built</em>
              </h2>

              <div className="mt-10 grid gap-px bg-neutral-800 md:grid-cols-2 xl:grid-cols-3">
                {resident.projects.map((project) => {
                  const content = (
                    <>
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-[#FF5722]">
                            {project.name}
                          </h3>
                          {project.role && (
                            <p className="mt-1 font-mono text-[0.68rem] tracking-[0.18em] text-[#FF5722] uppercase">
                              {project.role}
                            </p>
                          )}
                        </div>
                        {project.url && (
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-neutral-600 transition-colors group-hover:text-[#FF5722]"
                          />
                        )}
                      </div>
                      <p className="mt-8 leading-relaxed text-neutral-400">
                        {project.description}
                      </p>
                    </>
                  );

                  return project.url ? (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group min-h-64 bg-[#0a0a0a] p-7 transition-colors hover:bg-[#0d0d0d]"
                    >
                      {content}
                    </a>
                  ) : (
                    <article
                      key={project.name}
                      className="group min-h-64 bg-[#0a0a0a] p-7"
                    >
                      {content}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {relatedResidents.length > 0 && (
          <section className="border-b border-neutral-800 px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">
                    Keep exploring
                  </span>
                  <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
                    More <em className="text-[#FF5722]">residents</em>
                  </h2>
                </div>
                <Link
                  href="/#residents"
                  className="font-heading text-sm font-bold text-neutral-400 transition-colors hover:text-[#FF5722]"
                >
                  Meet the whole crew →
                </Link>
              </div>

              <div className="grid gap-px bg-neutral-800 sm:grid-cols-3">
                {relatedResidents.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/residents/${item.slug}`}
                    className="group bg-[#0a0a0a]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="border border-neutral-800 p-5 transition-colors group-hover:border-[#FF5722]">
                      <h3 className="font-heading font-bold transition-colors group-hover:text-[#FF5722]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.title} · {item.company}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
