export type NewsItem = {
  when: string;
  title: string;
  summary: string;
  source: { label: string; href: string };
};

// Newest first. Add new stories at the top.
export const NEWS: NewsItem[] = [
  {
    when: "Autumn 2026",
    title: "Native joins Y Combinator",
    summary: "Native, built at Founders Hub in Oslo, is accepted into Y Combinator’s Fall 2026 batch. It is the third company from the hub to get in this year.",
    source: { label: "Nordic 9", href: "https://nordic9.com/news/native-norway-joined-y-combinator-fall-2026/" },
  },
  {
    when: "22 Sep 2026",
    title: "Benford raises €5M to rebuild financial audit",
    summary: "Benford raises €5M to rebuild financial audit from the ground up. The round is led by firstminute capital, with Global Founders Capital and Sondo.",
    source: {
      label: "Tech.eu",
      href: "https://tech.eu/2026/09/22/benford-raises-eur5m-to-rebuild-financial-audit-from-the-ground-up/",
    },
  },
  {
    when: "Aug 2026",
    title: "DNB joins Founders Hub",
    summary: "Norway’s largest bank joins Founders Hub as a partner, together with Amesto and Mesh Community. “Perhaps a little un-Norwegian,” as Shifter’s headline puts it.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/dnb-gar-inn-i-founders-hub-det-er-kanskje-litt-unorsk/474817",
    },
  },
  {
    when: "Summer 2026",
    title: "Audun joins Y Combinator",
    summary: "Audun becomes the second company from Founders Hub to be accepted into Y Combinator.",
    source: { label: "Y Combinator", href: "https://www.ycombinator.com/companies/audun" },
  },
  {
    when: "12 Jun 2026",
    title: "Mimir raises $600k pre-seed",
    summary: "The Oslo AI startup Mimir, already profitable, raises a pre-seed round to automate e-commerce operations. Sondo Capital leads, with angels from VILLOID, Kry, Enode and Whitson.",
    source: {
      label: "BeBeez",
      href: "https://bebeez.eu/2026/06/12/profitable-oslo-based-ai-startup-mimir-raises-e518-3k-pre-seed-to-automate-e-commerce-operations/",
    },
  },
  {
    when: "Spring 2026",
    title: "Ara joins Y Combinator",
    summary: "Ara is the first company from Founders Hub to be accepted into Y Combinator.",
    source: { label: "Y Combinator", href: "https://www.ycombinator.com/companies/reason-machines" },
  },
  {
    when: "15 Nov 2025",
    title: "An “Olympiatoppen” for founders",
    summary: "Finansavisen reports on the plan behind Founders Hub: Anders Mjåseth and Trond Hauga want to build for founders what Olympiatoppen is for Norway’s elite athletes. The doors opened in January 2026.",
    source: {
      label: "Finansavisen",
      href: "https://www.finansavisen.no/teknologi/2025/11/15/8306979/anders-mjaseth-og-trond-hauga-vil-skape-olympiatoppen-for-gruendere-gjennom-den-nye-satsingen-founders-hub",
    },
  },
];
