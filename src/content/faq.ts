export type Faq = { q: string; a: string; link?: { label: string; href: string } };

export const FAQ: Faq[] = [
  {
    q: "What is Founders Hub?",
    a: "A workspace on the top floor of Mesh Youngstorget in Oslo, with room for about 40 founders. It is a non-profit foundation, not an accelerator or a fund. Anders Mjåset and Trond Haugå started it, and the doors opened in January 2026.",
  },
  {
    q: "Why does it exist?",
    a: "In Norway, the founders who aim highest tend to work alone. Elite athletes have Olympiatoppen, where the best train together and get better from it. Founders Hub is meant to be the same thing for people building companies.",
  },
  {
    q: "Who is it for?",
    a: "Founders building very ambitious companies. Many of them work with AI, but it is not a requirement.",
  },
  {
    q: "What does it cost?",
    a: "1,500 kr, the same for everyone. We take no equity.",
  },
  {
    q: "How do I apply?",
    a: "Fill in the form with your email, your LinkedIn and a few lines about what you are building.",
    link: { label: "Apply", href: "/apply" },
  },
  {
    q: "How are founders selected?",
    a: "There are about 40 seats, so most applicants do not get one. We look at what you have built so far and what you are trying to build.",
  },
  {
    q: "Where is it?",
    a: "On the top floor of Mesh Youngstorget, in central Oslo.",
  },
  {
    q: "Who backs Founders Hub?",
    a: "DNB, Verdane, Knowit, Amesto and Mesh Community are partners. We build with Google, AWS, Microsoft, Anthropic and Aiven.",
  },
  {
    q: "What have founders from the hub achieved?",
    a: "In the first year, three companies got into Y Combinator: Ara, Audun and Native. Benford raised €5M and Mimir raised $600k.",
    link: { label: "Read the news", href: "/news" },
  },
  {
    q: "How can my company become a partner?",
    a: "Send us an email and we will find a time to talk.",
    link: { label: "Contact", href: "mailto:andreas@founder-hub.com" },
  },
];
