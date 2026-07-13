#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";
import { z } from "zod";

const ROOT = resolve(import.meta.dirname, "..");
const SRC_JSON = join(ROOT, "content/residents/residents.json");
const SRC_IMAGES = join(ROOT, "content/residents/images");
const OUT_DIR = join(ROOT, "public/residents");
const OUT_SIZE = 800;
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const validateOnly = process.argv.includes("--validate");

const ProjectSchema = z.object({
  name: z.string().min(1, "project name is required"),
  role: z.string().min(1, "project role cannot be empty").optional(),
  url: z.url("project URL must be a full URL").optional(),
  description: z.string().min(1, "project description is required"),
});

const HighlightSchema = z.object({
  label: z.string().min(1, "highlight label is required"),
  value: z.string().min(1, "highlight value is required"),
});

const ResidentSchema = z.object({
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "slug must contain lowercase letters, numbers, and single hyphens only",
    ),
  name: z.string().min(1, "name is required"),
  company: z.string().min(1, "company is required"),
  title: z.string().min(1, "title is required"),
  linkedin: z.url("linkedin must be a full URL").optional(),
  twitter: z.url("twitter must be a full URL").optional(),
  website: z.url("website must be a full URL").optional(),
  companyUrl: z.url("companyUrl must be a full URL").optional(),
  alternateNames: z.array(z.string().min(1)).min(1).max(5).optional(),
  tagline: z.string().min(1, "tagline cannot be empty").optional(),
  bio: z.array(z.string().min(1, "bio paragraphs cannot be empty")).min(1).max(6).optional(),
  location: z.string().min(1, "location cannot be empty").optional(),
  residentSince: z
    .string()
    .regex(/^\d{4}$/, "residentSince must be a four-digit year")
    .optional(),
  focusAreas: z.array(z.string().min(1)).min(1).max(10).optional(),
  projects: z.array(ProjectSchema).min(1).max(8).optional(),
  highlights: z.array(HighlightSchema).min(1).max(8).optional(),
  imageAlt: z.string().min(1, "imageAlt cannot be empty").optional(),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "updatedAt must use YYYY-MM-DD")
    .optional(),
  image: z.string().min(1, "image filename is required"),
});

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

function ok(msg) {
  console.log(`✓ ${msg}`);
}

function fileHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 16);
}

function loadResidents() {
  if (!existsSync(SRC_JSON)) fail(`Missing ${SRC_JSON}`);
  let raw;
  try {
    raw = JSON.parse(readFileSync(SRC_JSON, "utf8"));
  } catch (e) {
    fail(`Invalid JSON in residents.json: ${e.message}`);
  }
  if (!Array.isArray(raw)) fail("residents.json must be a JSON array");

  const errors = [];
  const validated = [];
  raw.forEach((entry, i) => {
    const result = ResidentSchema.safeParse(entry);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`  [${i}] ${issue.path.join(".")}: ${issue.message}`);
      });
      return;
    }
    validated.push(result.data);
  });

  if (errors.length) {
    fail(`residents.json validation failed:\n${errors.join("\n")}`);
  }
  return validated;
}

function validateImageFiles(residents) {
  const errors = [];
  const seen = new Map();

  residents.forEach((r, i) => {
    const ext = extname(r.image).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
      errors.push(`  [${i}] ${r.name}: image "${r.image}" must have extension ${[...ALLOWED_EXT].join(", ")}`);
      return;
    }
    const full = join(SRC_IMAGES, r.image);
    if (!existsSync(full)) {
      errors.push(`  [${i}] ${r.name}: image "${r.image}" not found in content/residents/images/`);
      return;
    }
    if (seen.has(r.image)) {
      errors.push(`  [${i}] ${r.name}: image "${r.image}" already used by ${seen.get(r.image)}`);
    }
    seen.set(r.image, r.name);
  });

  if (errors.length) {
    fail(`Image validation failed:\n${errors.join("\n")}`);
  }
}

function validateUniqueFields(residents) {
  const errors = [];

  for (const field of ["slug", "name"]) {
    const seen = new Map();

    residents.forEach((resident, index) => {
      const value = resident[field];
      if (seen.has(value)) {
        errors.push(
          `  [${index}] ${field} "${value}" already used by ${seen.get(value)}`,
        );
      }
      seen.set(value, resident.name);
    });
  }

  if (errors.length) {
    fail(`Resident uniqueness validation failed:\n${errors.join("\n")}`);
  }
}

function firstName(fullName) {
  return fullName.split(/\s+/)[0].toLowerCase();
}

async function processImage(srcPath, outPath) {
  await sharp(srcPath)
    .resize(OUT_SIZE, OUT_SIZE, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(outPath);
}

async function main() {
  const residents = loadResidents();
  validateUniqueFields(residents);
  validateImageFiles(residents);
  ok(`Validated ${residents.length} residents`);

  if (validateOnly) {
    ok("Validation only — skipping image processing");
    return;
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const sorted = [...residents].sort((a, b) => firstName(a.name).localeCompare(firstName(b.name)));

  const manifestPath = join(OUT_DIR, ".manifest.json");
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
  const nextManifest = {};

  const enriched = [];
  let processed = 0;
  let cached = 0;

  for (const r of sorted) {
    const srcPath = join(SRC_IMAGES, r.image);
    const hash = fileHash(srcPath);
    const outName = `${basename(r.image, extname(r.image))}.webp`;
    const outPath = join(OUT_DIR, outName);

    nextManifest[outName] = hash;

    if (manifest[outName] === hash && existsSync(outPath)) {
      cached++;
    } else {
      await processImage(srcPath, outPath);
      processed++;
    }

    enriched.push({ ...r, image: `/residents/${outName}` });
  }

  // Sweep stale output files
  const wanted = new Set(Object.keys(nextManifest));
  for (const f of readdirSync(OUT_DIR)) {
    if (f === ".manifest.json") continue;
    if (!wanted.has(f)) {
      const { unlinkSync } = await import("node:fs");
      unlinkSync(join(OUT_DIR, f));
    }
  }

  writeFileSync(manifestPath, JSON.stringify(nextManifest, null, 2));

  const generatedDir = join(ROOT, "src/lib");
  if (!existsSync(generatedDir)) mkdirSync(generatedDir, { recursive: true });
  writeFileSync(
    join(generatedDir, "residents.generated.ts"),
    `// Generated by scripts/build-residents.mjs — do not edit by hand.\nexport type ResidentProject = {\n  name: string;\n  role?: string;\n  url?: string;\n  description: string;\n};\n\nexport type ResidentHighlight = {\n  label: string;\n  value: string;\n};\n\nexport type Resident = {\n  slug: string;\n  name: string;\n  company: string;\n  title: string;\n  linkedin?: string;\n  twitter?: string;\n  website?: string;\n  companyUrl?: string;\n  alternateNames?: string[];\n  tagline?: string;\n  bio?: string[];\n  location?: string;\n  residentSince?: string;\n  focusAreas?: string[];\n  projects?: ResidentProject[];\n  highlights?: ResidentHighlight[];\n  imageAlt?: string;\n  updatedAt?: string;\n  image: string;\n};\n\nexport const residents: Resident[] = ${JSON.stringify(enriched, null, 2)};\n`,
  );

  ok(`Images: ${processed} processed, ${cached} cached`);
  ok(`Wrote src/lib/residents.generated.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
