This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resident profiles

Resident data lives in `content/residents/residents.json`, with source portraits in
`content/residents/images`. Every resident gets a static page at `/residents/[slug]`.

Only the core identity fields are required:

```json
{
  "slug": "jane-founder",
  "name": "Jane Founder",
  "company": "Example",
  "title": "Founder",
  "image": "jane-founder.jpg"
}
```

Residents can opt into a richer profile by adding any of these fields. Sections are
only rendered when their data is present, so existing profiles do not need to change.

```json
{
  "linkedin": "https://www.linkedin.com/in/jane-founder",
  "twitter": "https://x.com/janefounder",
  "website": "https://jane.example",
  "companyUrl": "https://example.com",
  "alternateNames": ["Jane A. Founder"],
  "tagline": "A concrete one-sentence description of what Jane is building.",
  "bio": [
    "The first short paragraph explains the current company and product.",
    "The second can cover relevant previous work or a more personal angle."
  ],
  "location": "Oslo · New York",
  "residentSince": "2026",
  "focusAreas": ["Artificial intelligence", "Developer tools"],
  "projects": [
    {
      "name": "Example",
      "role": "Founder",
      "url": "https://example.com",
      "description": "A factual sentence about the product and who it helps."
    }
  ],
  "highlights": [
    {
      "label": "Previously",
      "value": "A concise, verifiable career highlight"
    }
  ],
  "imageAlt": "Jane Founder at the Founders Hub office",
  "updatedAt": "2026-07-13"
}
```

`location` is deliberately a free-form string. Project links are optional. Use
`updatedAt` only when the profile copy is meaningfully revised; it is emitted as the
profile page's structured-data modification date. Kristian's entry in
`residents.json` is a complete worked example.

Validate content and image references before opening a PR:

```bash
bun run residents:validate
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
