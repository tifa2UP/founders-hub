export type Faq = { q: string; a: string; link?: { label: string; href: string } };

export const FAQ: Faq[] = [
  {
    q: "What is Founders Hub?",
    a: "A workspace and community in Oslo for Norway’s most ambitious AI founders. Selected founders work side by side at Mesh Youngstorget, share what they learn and hold each other to a world-class standard. Think of it as Olympiatoppen for founders: a place where the best train together. The doors opened in January 2026.",
  },
  {
    q: "Why does it exist?",
    a: "Every generation gets one shift that rewrites everything, and ours is AI. Norway has built industries before. The next one will be built by a small number of exceptional teams, and they get better faster together than alone. We exist to give those teams a place, a network and partners, and we take nothing in return, so that what starts here moves all of Norway forward.",
  },
  {
    q: "Who is it for?",
    a: "Founders building AI companies with global ambition, and the builders who ship alongside them.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. We take no equity and charge no fee.",
  },
  {
    q: "How do I apply?",
    a: "Send a short application with your email, your LinkedIn and a few lines about what you are building.",
    link: { label: "Apply", href: "/apply" },
  },
  {
    q: "How are founders selected?",
    a: "Few get in. We read every application and look at what you have shipped and how fast you move.",
  },
  {
    q: "Where is it?",
    a: "At Mesh Youngstorget, in the centre of Oslo.",
  },
  {
    q: "Who backs Founders Hub?",
    a: "DNB, Verdane, Knowit, Amesto and Mesh Community are partners. We build with Google, AWS, Microsoft, Anthropic and Aiven.",
  },
  {
    q: "What have founders from the hub achieved?",
    a: "In the first year, Ara, Audun and Native were accepted into Y Combinator, Benford raised €5M and Mimir raised $600k.",
    link: { label: "Read the news", href: "/news" },
  },
  {
    q: "How can my company become a partner?",
    a: "Get in touch and we will set up a conversation.",
    link: { label: "Contact", href: "mailto:andreas@founder-hub.com" },
  },
];
